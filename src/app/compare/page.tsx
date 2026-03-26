"use client"

import { CompatibilityChecker } from "@/components/CompatibilityChecker"
import { ResultsView } from "@/components/ResultsView"
import { ShieldCheck, Zap, History, Info } from "lucide-react"
import { useState } from "react"

export default function ComparePage() {
  const [result, setResult] = useState<any>(null)

  const handleCheck = (make: string, model: string, partNumber: string, year: number) => {
    // Mock result for verification UI
    setResult({
      part_number: partNumber,
      make,
      model,
      year,
      status: "compatible",
      confidence: 0.98,
      notes: "Direct OEM replacement verified for industrial duty cycles."
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-zinc-100 tracking-tight lowercase mb-4">
              Cross-Brand <span className="text-emerald-500">Compatibility</span>
            </h1>
            <p className="text-sm text-zinc-500">
              Our proprietary fitment engine validates part compatibility across 15,000+ equipment configurations.
            </p>
          </div>

          <CompatibilityChecker onCheck={handleCheck} />

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-900 space-y-4">
            <div className="flex items-center gap-3 text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Certified Fits</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Every compatibility result is generated from the technical blueprints of the equipment and verified against field telemetry.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <ResultsView partNumber={result.part_number} />
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-dashed border-zinc-900 bg-zinc-950">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-zinc-800" />
              </div>
              <h3 className="text-sm font-bold text-zinc-400 mb-2 uppercase tracking-widest">Awaiting Parameter Selection</h3>
              <p className="text-xs text-zinc-600 max-w-xs lowercase">
                Select a vehicle and part number to trigger the real-time compatibility audit.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
