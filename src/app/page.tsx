"use client"

import { CommandSearch } from "@/components/CommandSearch"
import { CompatibilityChecker } from "@/components/CompatibilityChecker"
import { ResultsView } from "@/components/ResultsView"
import { STATIC_PARTS } from "@/lib/static-data"
import { ShieldCheck, Zap, Globe, Cpu, ArrowRight, Gauge, Database } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const samplePart = STATIC_PARTS[0];

  return (
    <div className="bg-zinc-950 min-h-screen relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-8"
          >
            <Zap className="w-3 h-3" /> Technical Compatibility Engine v2.4
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-headline font-bold text-zinc-100 tracking-tighter lowercase leading-[0.9] mb-8"
          >
            The definitive <span className="text-emerald-500 italic font-mono tracking-normal">expert</span> resource for <br className="hidden md:block" /> industrial parts.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mb-12 font-medium"
          >
            Access real-time technical specs, cross-brand compatibility audits, and deep diagnostics for over 12,000 components.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-2xl relative"
          >
            <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-2xl -z-10" />
            <CommandSearch />
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-20">
          <div className="lg:col-span-12 flex items-center justify-between mb-4 px-4">
             <div className="flex flex-col">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Deep Diagnostics</span>
               <h2 className="text-2xl font-headline font-bold text-zinc-100 tracking-tight">Interactive Compatibility</h2>
             </div>
             <Link href="/parts" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-2">
                Browse Full Catalog <ArrowRight className="w-3 h-3" />
             </Link>
          </div>

          <div className="lg:col-span-5 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-1 rounded-3xl bg-zinc-900/10 border border-zinc-900"
            >
              <div className="absolute inset-0 bg-emerald-500/5 blur-xl -z-10" />
              <CompatibilityChecker />
            </motion.div>
          </div>

          <div className="lg:col-span-7 w-full hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm"
            >
              <ResultsView part={samplePart as any} />
            </motion.div>
          </div>
        </div>

        {/* Technical Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 border-t border-zinc-900 pt-16 px-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
               <Database className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Database</span>
            </div>
            <p className="text-3xl font-headline font-bold text-zinc-100 italic">2.4M+</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Verified Unique Parts</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
               <ShieldCheck className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Verification</span>
            </div>
            <p className="text-3xl font-headline font-bold text-zinc-100 italic">99.8%</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Fitment Confidence</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
               <Globe className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Availability</span>
            </div>
            <p className="text-3xl font-headline font-bold text-zinc-100 italic">150+</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Marketplace Sources</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
               <Gauge className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Intelligence</span>
            </div>
            <p className="text-3xl font-headline font-bold text-zinc-100 italic">&lt;2ms</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Discovery Latency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
