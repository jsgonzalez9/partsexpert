import { supabase } from './supabase';

export interface NicheMetrics {
  niche_name: string;
  pages_live: number;
  pages_indexed: number;
  indexing_rate: number;
  total_revenue: number;
  rpm: number;
  verdict: string;
}

export interface TemplateMetrics {
  template_name: string;
  type: string;
  rpm: number;
  ctr: number;
  conversion_rate: number;
  pages_count: number;
  revenue: number;
  status: string;
}

export interface ScalingLog {
  id: string;
  part_id: string;
  status: 'SUCCESS' | 'FAILURE' | 'IN_PROGRESS';
  details: string;
  duration_ms: number;
  created_at: string;
  parts_data?: {
    name: string;
    part_number: string;
  };
}

export interface SystemAlert {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  message: string;
  recommendation?: string;
  created_at: string;
  is_resolved: boolean;
}

export async function fetchNichePerformance(): Promise<NicheMetrics[]> {
  const { data, error } = await supabase
    .from('system_performance')
    .select('*');

  if (error) {
    console.error('Error fetching niche performance:', error);
    return [];
  }

  return data || [];
}

export async function fetchTemplatePerformance(): Promise<TemplateMetrics[]> {
  const { data, error } = await supabase
    .from('template_metrics')
    .select('*')
    .order('revenue', { ascending: false });

  if (error) {
    console.error('Error fetching template performance:', error);
    return [];
  }

  return (data || []).map((item: any) => ({
    ...item,
    status: item.rpm > 40 ? 'Scale' : item.rpm > 20 ? 'Hold' : 'Iterate'
  }));
}

export async function fetchScalingLogs(limit = 20): Promise<ScalingLog[]> {
  const { data, error } = await supabase
    .from('scaling_logs')
    .select(`
      *,
      parts_data (
        name,
        part_number
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching scaling logs:', error);
    return [];
  }

  return data || [];
}

export async function fetchIndexingSummary() {
  const data = await fetchNichePerformance();
  
  const totalLive = data.reduce((acc, curr) => acc + curr.pages_live, 0);
  const totalIndexed = data.reduce((acc, curr) => acc + curr.pages_indexed, 0);
  const avgRate = totalLive > 0 ? (totalIndexed / totalLive) * 100 : 0;
  
  return {
    totalLive,
    totalIndexed,
    avgRate,
    niches: data.map(n => ({
      name: n.niche_name,
      total: n.pages_live,
      indexed: n.pages_indexed,
      rate: Math.round(n.indexing_rate),
      status: n.indexing_rate > 70 ? 'Healthy' : n.indexing_rate > 40 ? 'Warning' : 'Critical',
      color: n.indexing_rate > 70 ? 'bg-emerald-500' : n.indexing_rate > 40 ? 'bg-amber-500' : 'bg-red-500',
      badge: n.indexing_rate > 70 ? 'bg-emerald-100 text-emerald-800' : n.indexing_rate > 40 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
    }))
  };
}

export async function fetchPageTypePerformance() {
  const templates = await fetchTemplatePerformance();
  const types: Record<string, { type: string, rpm: number, count: number }> = {};

  templates.forEach(tpl => {
    if (!types[tpl.type]) {
      types[tpl.type] = { type: tpl.type, rpm: 0, count: 0 };
    }
    types[tpl.type].rpm += Number(tpl.rpm);
    types[tpl.type].count += 1;
  });

  return Object.values(types).map(t => ({
    type: t.type,
    rpm: t.rpm / t.count,
    width: `${Math.min(100, (t.rpm / t.count / 80) * 100)}%`
  })).sort((a, b) => b.rpm - a.rpm);
}

export async function fetchSystemAlerts(onlyUnresolved = true): Promise<SystemAlert[]> {
  let query = supabase
    .from('system_alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (onlyUnresolved) {
    query = query.eq('is_resolved', false);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching system alerts:', error);
    return [];
  }

  return data || [];
}
