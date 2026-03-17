import { executeOpenClawTask, savePartToSupabase } from '../lib/openclaw/scraper';

async function main() {
  const targetPart = process.argv[2] || 'Brake Pads for 2022 Toyota Camry';
  
  console.log(`--- Starting Scrape for: ${targetPart} ---`);

  try {
    // 1. Execute OpenClaw Task
    const result = await executeOpenClawTask(`Find ${targetPart} on a major auto parts site and extract the name, part number, price, and availability.`);
    
    if (result.status === 'success' && result.data) {
      console.log('Scrape successful:', result.data);

      // 2. Save to Supabase
      const saved = await savePartToSupabase(result.data);
      console.log('Saved to Supabase:', saved);
    } else {
      console.error('Scrape failed or returned no data.');
    }
  } catch (error) {
    console.error('Execution error:', error);
  }

  console.log('--- Task Finished ---');
}

main();
