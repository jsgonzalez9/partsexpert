"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="text-lg font-headline font-bold text-zinc-100 uppercase tracking-tighter">
              Parts<span className="text-emerald-500">Expert</span>
            </span>
            <p className="text-sm text-zinc-500 max-w-xs lowercase">
              Leading the digital transformation of industrial and automotive parts discovery.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Database</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/parts" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">Parts Catalog</Link>
              <Link href="/p" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">Cross References</Link>
              <Link href="/symptoms" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">Diagnostics</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Tools</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/compare" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">Compatibility Checker</Link>
              <Link href="/api/parts" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">API Access</Link>
              <Link href="/docs" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">Technical Docs</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors"><Twitter size={16} /></Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors"><Mail size={16} /></Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors"><Github size={16} /></Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">
            © 2026 PartsExpert Technical Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
