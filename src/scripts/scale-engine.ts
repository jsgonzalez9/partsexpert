import { createClient } from '@supabase/supabase-js';
import { AgentOrchestrator } from '../lib/openclaw/orchestrator';
import { AgentRole } from '../config/swarm';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const orchestrator = new AgentOrchestrator(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const BATCH_SIZE = 50;

async function runScaleEngine() {
  const startTime = Date.now();
  console.log(`--- Parts Expert: Scaling Engine Active (Batch: ${BATCH_SIZE}) ---`);

  const { data: skus, error } = await supabase
    .from('parts_data')
    .select('id, name, part_number, category')
    .is('seo_title', null)
    .limit(BATCH_SIZE);

  if (error || !skus || skus.length === 0) {
    console.log('No new SKUs found for enrichment.');
    return;
  }

  for (const part of skus) {
    const partStartTime = Date.now();
    console.log(`[Processing] ${part.name} (PN-${part.part_number})...`);

    const { data: logEntry } = await supabase.from('scaling_logs').insert({
      part_id: part.id,
      status: 'IN_PROGRESS',
      details: `Starting enrichment for ${part.name}`
    }).select().single();

    try {
      const prompt = `
        As an Expert Automotive Content Generator for Parts Expert, enrich this part record:
        Name: ${part.name}
        PN: ${part.part_number}
        Category: ${part.category}

        Return JSON:
        {
          "seo_title": "...",
          "seo_description": "...",
          "technical_specs": { ... },
          "fitment": [ { "make": "...", "model": "...", "year": 2020, ... } ],
          "failures": [ { "symptom": "...", "severity_score": 8, "urgency_score": 9, "common_causes": ["..."] } ]
        }
      `;

      const response = await orchestrator.dispatch({ 
        role: AgentRole.EXPERT, 
        input: prompt 
      });

      if (!response.success) throw new Error(response.error);

      let jsonStr = response.output.trim();
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) jsonStr = jsonMatch[0];
      const data = JSON.parse(jsonStr);

      const { error: partError } = await supabase
        .from('parts_data')
        .update({
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          technical_specs: data.technical_specs,
          updated_at: new Date().toISOString()
        })
        .eq('id', part.id);

      if (partError) throw partError;

      if (data.fitment && data.fitment.length > 0) {
        const fitmentRecords = data.fitment.map((f: any) => ({
          part_id: part.id,
          make: f.make,
          model: f.model,
          year: f.year,
          engine: f.engine || 'Standard',
          notes: f.notes || 'Verified Fitment'
        }));

        await supabase.from('fitment').upsert(fitmentRecords, {
          onConflict: 'part_id,make,model,year,engine'
        });
      }

      // Ported: Failure Modes Ingestion
      if (data.failures && data.failures.length > 0) {
          const failureRecords = data.failures.map((f: any) => ({
              part_id: part.id,
              symptom: f.symptom,
              severity_score: f.severity_score,
              urgency_score: f.urgency_score,
              common_causes: f.common_causes,
              verified: true
          }));
          await supabase.from('failure_modes').upsert(failureRecords, {
              onConflict: 'part_id,symptom'
          });
      }

      await supabase.from('scaling_logs').update({
        status: 'SUCCESS',
        details: `Enriched ${part.name}. Fitment: ${data.fitment?.length || 0}, Failures: ${data.failures?.length || 0}`,
        duration_ms: Date.now() - partStartTime
      }).eq('id', logEntry!.id);

      console.log(`   [SUCCESS] ${part.part_number}`);

    } catch (err: any) {
      console.error(`   [FAILURE] ${part.part_number}: ${err.message}`);
      await supabase.from('scaling_logs').update({
        status: 'FAILURE',
        details: `Error: ${err.message}`,
        duration_ms: Date.now() - partStartTime
      }).eq('id', logEntry!.id);
    }
  }

  console.log(`--- Parts Expert: Scale Engine Complete ---`);
}

runScaleEngine();
