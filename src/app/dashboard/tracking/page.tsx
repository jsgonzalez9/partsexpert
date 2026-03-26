'use client';

import { useEffect, useState } from 'react';
import { fetchScalingLogs, fetchSystemAlerts, ScalingLog, SystemAlert } from '@/lib/dashboard-data';
import { Activity, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TrackingPage() {
  const [logs, setLogs] = useState<ScalingLog[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [l, a] = await Promise.all([
        fetchScalingLogs(),
        fetchSystemAlerts(false)
      ]);
      setLogs(l);
      setAlerts(a);
      setLoading(false);
    }
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-8 animate-pulse text-emerald-900 font-medium">Initializing Parts Expert Surveillance...</div>;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-zinc-950 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
          <Activity className="text-emerald-500 w-8 h-8" />
          Parts Expert Scaling Monitor
        </h1>
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Autonomous Batch Ingestion Surveillance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scaling Logs */}
        <div className="bg-zinc-900/50 rounded-2xl shadow-xl border border-zinc-800 overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
            <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              Live Ingestion Feed
            </h2>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5 animate-pulse">
              LIVE PULSE
            </Badge>
          </div>
          <div className="divide-y divide-zinc-800 max-h-[600px] overflow-y-auto">
            {logs.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 italic">Standby: Monitoring swarm activity...</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-zinc-800/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-zinc-100">
                      {log.parts_data?.name || 'Bulk SKU Batch'}
                    </span>
                    <Badge className={`${
                      log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' : 
                      log.status === 'FAILURE' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                    } border-none`}>
                      {log.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-zinc-400">{log.details}</div>
                  <div className="text-[10px] text-zinc-500 mt-2 font-mono flex items-center gap-2">
                    {new Date(log.created_at).toLocaleTimeString()} • {log.duration_ms}ms
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Alerts */}
        <div className="bg-zinc-900/50 rounded-2xl shadow-xl border border-zinc-800 overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/30">
            <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Auditor Quality Control
            </h2>
          </div>
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 flex flex-col items-center gap-4">
                <CheckCircle className="w-16 h-16 text-emerald-500/20" />
                <span className="uppercase tracking-widest text-xs font-black">All Systems Nominal</span>
                <p className="text-xs text-zinc-600 italic">The Auditor has not flagged any data quality issues in the current batch.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-xl border ${
                  alert.severity === 'CRITICAL' ? 'bg-red-500/5 border-red-500/20 text-red-200' :
                  alert.severity === 'HIGH' ? 'bg-orange-500/5 border-orange-500/20 text-orange-200' :
                  'bg-amber-500/5 border-amber-500/20 text-amber-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest">{alert.category}</span>
                    <span className="text-[10px] font-mono opacity-50">{new Date(alert.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm font-bold mb-2">{alert.message}</p>
                  {alert.recommendation && (
                    <div className="text-xs bg-black/20 p-3 rounded-lg mt-2 border border-white/5 italic text-zinc-400">
                      Recommendation: {alert.recommendation}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
