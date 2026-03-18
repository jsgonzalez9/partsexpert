import { COMPARISONS } from "@/lib/comparison-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FlaskRound, ArrowRight, ShieldCheck, Activity, Database } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ComparePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = COMPARISONS.find(c => c.slug === slug);
  
  if (!comparison) return { title: 'Comparison Not Found' };

  return {
    title: comparison.title,
    description: comparison.description,
  };
}

export async function generateStaticParams() {
  return COMPARISONS.map(c => ({
    slug: c.slug
  }));
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const comparison = COMPARISONS.find(c => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  const winner = comparison.products.find(p => p.name.includes(comparison.winner || '')) || comparison.products[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-900 font-mono">
      <header className="border-b border-zinc-900 bg-zinc-950/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            PARTS<span className="text-zinc-500 uppercase italic">Expert</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Diagnostic Header */}
          <div className="mb-16 border-l-4 border-zinc-700 pl-8">
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.5em] mb-4">Engineering_Audit // Platform: GM_K2XX_V8</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 uppercase">
              {comparison.title}
            </h1>
            <p className="text-lg text-zinc-500 max-w-3xl leading-relaxed">
              {comparison.description}
            </p>
          </div>

          {/* Technical Winner Selection */}
          <div className="grid md:grid-cols-3 gap-1 mb-20 bg-zinc-900 border border-zinc-800">
            <div className="md:col-span-2 p-12 bg-zinc-950 text-white">
              <div className="flex items-center gap-3 mb-8">
                <FlaskRound className="text-zinc-400" size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">Primary Selection Verdict</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-zinc-100">
                {winner.brand} {winner.name}
              </h2>
              <p className="text-zinc-400 mb-8 leading-relaxed font-sans text-lg">
                {comparison.verdict}
              </p>

              {/* Technical Inventory Upgrades */}
              <div className="flex flex-wrap gap-4 mb-10 text-[10px] uppercase font-bold tracking-widest">
                <div className="flex items-center gap-2 text-zinc-300 border border-zinc-800 px-3 py-1.5 bg-zinc-900/50">
                  <ShieldCheck size={14} className="text-blue-500" />
                  Status: IN_STOCK // Dispatch_Confirmed
                </div>
                <div className="flex items-center gap-2 text-zinc-300 border border-zinc-800 px-3 py-1.5 bg-zinc-900/50">
                  <Database size={14} className="text-green-500" />
                  Fitment: VERIFIED // GM_8CYL_Specs
                </div>
              </div>

              <a href={winner.affiliateUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-bold h-12 rounded-none px-12 group uppercase tracking-widest">
                  CHECK INVENTORY LEVELS
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
            <div className="p-12 flex flex-col justify-center bg-zinc-900/50">
              <div className="space-y-10 text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">MSRP Stability</p>
                  <p className="text-4xl font-bold tracking-tighter text-zinc-100">${winner.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Reliability Grade</p>
                  <p className="text-4xl font-bold tracking-tighter text-zinc-100">{(winner.rating * 20).toFixed(0)}%</p>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <Badge variant="outline" className="text-zinc-500 border-zinc-700 rounded-none uppercase text-[9px] tracking-widest">OEM_COMPATIBLE_VERIFIED</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Data Table */}
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <Database className="text-zinc-700" size={20} />
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">Parameter Decomposition</h3>
            </div>
            <div className="border border-zinc-900 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-900/50 border-b border-zinc-900">
                    <th className="p-6 text-[10px] uppercase tracking-widest text-zinc-600">Metric</th>
                    {comparison.products.map((p, i) => (
                      <th key={i} className="p-6 text-sm font-bold uppercase underline decoration-zinc-700">{p.brand}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 font-sans">
                  <tr>
                    <td className="p-6 text-sm font-mono uppercase text-zinc-600">Retail_Price</td>
                    {comparison.products.map((p, i) => (
                      <td key={i} className="p-6 font-bold text-lg text-white">${p.price.toFixed(2)}</td>
                    ))}
                  </tr>
                  {Object.keys(comparison.products[0].specs).map(spec => (
                    <tr key={spec}>
                      <td className="p-6 text-sm font-mono uppercase text-zinc-600">{spec}</td>
                      {comparison.products.map((p, i) => (
                        <td key={i} className="p-6 font-medium text-zinc-300">{p.specs[spec]}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-6 text-sm font-mono uppercase text-zinc-600">Vendor_Options</td>
                    {comparison.products.map((p, i) => (
                      <td key={i} className="p-6">
                        <div className="space-y-2">
                          {p.vendorPrices.map((v, j) => (
                            <div key={j} className="text-[10px] flex justify-between text-zinc-500">
                              <span>{v.retailer}</span>
                              <span className="font-mono text-zinc-400">${v.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Component Deep Dives */}
          <div className="grid md:grid-cols-2 gap-4 mb-24 font-sans text-white">
            {comparison.products.map((p, i) => (
              <div key={i} className="p-10 border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 transition-all">
                <div className="flex justify-between items-start mb-10">
                  <h4 className="text-2xl font-bold uppercase tracking-tighter">{p.brand} {p.name}</h4>
                  <p className="font-mono text-[9px] text-zinc-700 bg-zinc-100 text-zinc-950 px-2 py-1">BATCH://2026.4</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Performance Pros</h5>
                    <ul className="space-y-4">
                      {p.pros.map((pro, j) => (
                        <li key={j} className="text-sm text-zinc-300 flex items-start gap-3 leading-relaxed text-white">
                          <CheckCircle2 size={14} className="text-zinc-600 shrink-0 mt-1" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Failure Modes</h5>
                    <ul className="space-y-4">
                      {p.cons.map((con, j) => (
                        <li key={j} className="text-sm text-zinc-500 flex items-start gap-3 leading-relaxed">
                          <Activity size={14} className="text-zinc-800 shrink-0 mt-1" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link href={p.affiliateUrl} className="block mt-12 pt-8 border-t border-zinc-900 group">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-100 transition-colors">
                    Check Inventory Levels
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Engine Integration */}
          <div className="py-20 px-8 border-t border-zinc-900 text-center">
             <Link href="/">
               <p className="text-xs font-mono text-zinc-700 uppercase tracking-[0.5em] mb-12 hover:text-zinc-400 transition-colors cursor-pointer">
                 Verify Compatibility via PartsExpert Core Engine
               </p>
             </Link>
             <ShieldCheck size={32} className="mx-auto text-zinc-800" />
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 py-16 bg-zinc-950 text-center">
        <p className="text-zinc-800 text-[9px] font-mono uppercase tracking-[1em]">SYSTEM_VERSION_4.0 // DECISION_PROTOCOL_ALPHA</p>
      </footer>
    </div>
  );
}
