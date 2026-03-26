"use client"

import Link from "next/link"
import { Search, Compass, LayoutDashboard, Wrench, ChevronRight } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <Wrench className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-lg font-headline font-bold tracking-tight text-zinc-100">
                Parts<span className="text-emerald-500">Expert</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/parts" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors">Parts Catalog</Link>
              <Link href="/compare" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors">Compatibility</Link>
              <Link href="/symptoms" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors">Diagnostics</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://parts-toll-booth-jsgonzalez9.vercel.app"} 
              className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-3 h-3" />
              Industrial Hub
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
