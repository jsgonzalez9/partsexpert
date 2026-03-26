"use client"

import { CommandSearch } from "@/components/CommandSearch"
import { Search, Package, ArrowRight, Filter, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { searchParts, Part } from "@/lib/supabase"
import { ResultsView } from "@/components/ResultsView"

const CATEGORIES = [
  "Engine",
  "Brakes",
  "Electrical",
  "HVAC",
  "Suspension"
]

export default function PartsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [results, setResults] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setLoading(true);
      searchParts("", { category })
        .then(setResults)
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4 text-emerald-500">
            <Package className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Inventory Explorer</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-zinc-100 tracking-tight lowercase mb-6">
            Industrial <span className="text-emerald-500 italic font-mono">Parts</span> Catalog
          </h1>
          <p className="text-sm text-zinc-500 lowercase leading-relaxed">
            Query our global database of high-precision components. Search by OEM part number, 
            application model, or technical category.
          </p>
        </div>
      </div>

      <div className="relative mb-24">
        <div className="absolute inset-0 bg-emerald-500/5 blur-3xl -z-10" />
        <CommandSearch />
      </div>

      {category ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-4">
              <Link href="/parts" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <div>
                <h2 className="text-xl font-bold text-zinc-100">{category}</h2>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{results.length} Parts Found</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase">
              <Filter className="w-3 h-3" />
              Active Filter
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 rounded-3xl bg-zinc-900/50 animate-pulse border border-zinc-800" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map(part => (
                <div key={part.id} className="rounded-3xl border border-zinc-900 bg-zinc-950 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                  <ResultsView part={part as any} />
                </div>
              ))}
              {results.length === 0 && (
                <div className="md:col-span-2 py-32 text-center border border-dashed border-zinc-900 rounded-3xl">
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No matching components found in {category}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ): (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-24">
          <div className="md:col-span-4 flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Browse by Category</h2>
            <div className="h-px flex-1 mx-6 bg-zinc-900 opacity-50" />
          </div>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat}
              href={`/parts?category=${encodeURIComponent(cat)}`}
              className="group flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-emerald-500/20 hover:bg-zinc-900/50 transition-all duration-300 text-left"
            >
              <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {cat}
              </span>
              <ArrowRight className="w-3 h-3 text-zinc-700 group-hover:text-emerald-500 translate-x-[-4px] group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
      )}

      <div className="mt-32 p-12 rounded-[40px] bg-gradient-to-br from-zinc-900/50 to-zinc-950 border border-zinc-900 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] group-hover:bg-emerald-500/10 transition-colors" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-2xl font-headline font-bold text-zinc-100 mb-4 tracking-tight leading-tight">Can&apos;t find the exact component?</h3>
            <p className="text-sm text-zinc-400 lowercase mb-8">Manual search through physical archives available for legacy Caterpillar and Komatsu systems.</p>
            <button className="px-8 py-4 rounded-xl bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
              Request Archive Search
            </button>
          </div>
          <div className="flex gap-4 p-8 rounded-3xl bg-zinc-950 border border-zinc-900">
             <div className="text-center">
                <p className="text-2xl font-mono font-bold text-emerald-500">24h</p>
                <p className="text-[9px] uppercase tracking-tighter text-zinc-500">SLA Recovery</p>
             </div>
             <div className="w-px h-10 bg-zinc-900 self-center" />
             <div className="text-center">
                <p className="text-2xl font-mono font-bold text-emerald-500">12k+</p>
                <p className="text-[9px] uppercase tracking-tighter text-zinc-500">Serial Mappings</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
