"use client"

import { CommandSearch } from "@/components/CommandSearch"
import { Search, Package, ArrowRight, Filter } from "lucide-react"

const CATEGORIES = [
  "Filtration Systems",
  "Engine Components",
  "Hydraulic Systems",
  "Transmission",
  "Electrical 24V",
  "Braking",
  "Undercarriage",
  "Wear Parts"
]

export default function PartsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 mb-6 group hover:border-emerald-500/30 transition-colors">
          <Package className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-zinc-100 tracking-tight lowercase mb-6 leading-tight">
          Global <span className="text-emerald-500">Parts</span> Inventory
        </h1>
        <p className="text-sm text-zinc-500 max-w-lg mb-12">
          Access the definitive technical specifications for over 12,000 industrial and automotive components.
        </p>
        
        <div className="w-full max-w-2xl">
          <CommandSearch />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-24">
        <div className="md:col-span-4 flex items-center justify-between mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Browse by Category</h2>
          <div className="h-px flex-1 mx-6 bg-zinc-900 opacity-50" />
        </div>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className="group flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-emerald-500/20 hover:bg-zinc-900/50 transition-all duration-300 text-left"
          >
            <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-100 transition-colors">
              {cat}
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-700 group-hover:text-emerald-500 translate-x-[-4px] group-hover:translate-x-0 transition-all" />
          </button>
        ))}
      </div>

      <div className="mt-32 p-12 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Can't find a specific part?</h3>
          <p className="text-sm text-zinc-500">Our engineering database is updated hourly with new cross-references.</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors">
          Request Technical Audit
        </button>
      </div>
    </div>
  )
}
