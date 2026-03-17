import { STATIC_PARTS } from "@/lib/static-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Static calculation to match what we put in allSymptoms.json
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

interface SymptomPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allSymptoms = new Set<string>();
  STATIC_PARTS.forEach(part => {
    part.symptoms.forEach(s => allSymptoms.add(s.description));
  });

  return Array.from(allSymptoms).map(description => ({
    slug: slugify(description)
  }));
}

export default async function SymptomPage({ params }: SymptomPageProps) {
  const { slug } = await params;
  
  const matchedParts = STATIC_PARTS.filter(part => 
    part.symptoms.some(s => slugify(s.description) === slug)
  );

  if (matchedParts.length === 0) {
    notFound();
  }

  const symptomName = matchedParts[0].symptoms.find(s => slugify(s.description) === slug)?.description || slug;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            PARTS<span className="text-zinc-500">EXPERT</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-500/10 rounded-lg">
              <AlertTriangle className="text-amber-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold capitalize tracking-tight">{symptomName}</h1>
              <p className="text-zinc-500">Technical Diagnostic & Compatibility Report</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-zinc-400">
              The occurrence of "{symptomName}" in modern V8 platforms typically indicates a failure in specific 
              control modules or mechanical components. Below is the technical breakdown of matched parts 
              with validated compatibility and diagnostic procedures.
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-zinc-300">
            <Wrench className="text-zinc-500" size={20} />
            Validated Solution Components
          </h2>

          <div className="grid gap-6">
            {matchedParts.map(part => {
              const symptomDetails = part.symptoms.find(s => slugify(s.description) === slug);
              return (
                <div key={part.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:bg-zinc-900 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 font-mono">{part.brand}</Badge>
                        <Badge className={`
                          ${symptomDetails?.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                          ${symptomDetails?.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                          ${symptomDetails?.severity === 'Medium' ? 'bg-zinc-700 text-zinc-300' : ''}
                          ${symptomDetails?.severity === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                        `}>
                          {symptomDetails?.severity} Risk
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-1 tracking-tight">{part.name}</h3>
                      <p className="text-xs font-mono text-zinc-600 mb-4">REF: {part.part_number}</p>
                      
                      <div className="border-l-2 border-zinc-800 pl-4 py-1 mb-4">
                        <p className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Diagnostic Protocol</p>
                        <ul className="space-y-2">
                          {symptomDetails?.diagnostic_steps.map((step, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-zinc-700 mt-2 shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="md:w-48 pt-2">
                      <Link href={`/p/${part.part_number}`} className="block">
                        <Button className="w-full bg-zinc-100 text-zinc-950 hover:bg-white font-semibold">
                          Compatibility Details
                        </Button>
                      </Link>
                      <p className="text-center text-xs text-zinc-600 mt-3 font-mono">EST: ${part.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 mt-24 py-12 bg-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em]">PartsExpert Technical Database v2.1</p>
        </div>
      </footer>
    </div>
  );
}
