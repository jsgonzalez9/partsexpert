import { Activity, Zap, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getSEOPagesByType } from "@/lib/supabase"

export const revalidate = 3600; // Revalidate every hour

export default async function SymptomsPage() {
  const symptoms = await getSEOPagesByType('symptom', 20);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 mb-6 group hover:border-emerald-500/30 transition-colors">
          <Activity className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-zinc-100 tracking-tight lowercase mb-6 leading-tight">
          Expert <span className="text-emerald-500">Diagnostics</span> Engine
        </h1>
        <p className="text-sm text-zinc-500 max-w-lg mb-12">
          Identify root causes and pinpoint failing components using our AI-driven symptom recognition database.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 flex items-center justify-between mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Common Industrial Symptoms</h2>
          <div className="h-px flex-1 mx-6 bg-zinc-900 opacity-50" />
        </div>
        
        {symptoms.map((symptom: any) => (
          <div key={symptom.id}>
            <Link 
              href={`/symptoms/${symptom.slug}`}
              className="group flex items-center justify-between p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-emerald-500/20 hover:bg-zinc-900/40 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{symptom.page_type}</span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    symptom.page_priority <= 2 ? 'bg-red-500/10 text-red-500' : 
                    symptom.page_priority <= 5 ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    Priority: {symptom.page_priority}
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors capitalize">
                  {symptom.target_keyword || symptom.slug.replace(/-/g, ' ')}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
              </div>
            </Link>
          </div>
        ))}

        {symptoms.length === 0 && (
          <div className="md:col-span-2 py-20 text-center border border-dashed border-zinc-900 rounded-3xl">
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Diagnostic database initializing...</p>
          </div>
        )}
      </div>

      <div className="mt-24 p-12 rounded-3xl border border-zinc-900 bg-zinc-950 text-center">
        <Zap className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
        <h3 className="text-xl font-bold text-zinc-100 mb-4 tracking-tight">Need an On-Site Diagnostic Audit?</h3>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-8 lowercase">
          Connect your equipment telemetry directly to our expert systems for real-time failure prediction.
        </p>
        <button className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-widest hover:text-white hover:border-zinc-700 transition-all">
          Contact Engineering Support
        </button>
      </div>
    </div>
  )
}
