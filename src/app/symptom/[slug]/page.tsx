import { STATIC_PARTS } from "@/lib/static-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wrench, ArrowRight, ShieldAlert, Clock, Phone, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: SymptomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchedParts = STATIC_PARTS.filter(part => 
    part.symptoms.some(s => slugify(s.description) === slug)
  );

  if (matchedParts.length === 0) return { title: 'Symptom Not Found' };

  const symptom = matchedParts[0].symptoms.find(s => slugify(s.description) === slug)?.description || slug;
  const vehicle = "Silverado / Sierra 1500";
  
  const title = `${symptom} - ${vehicle} (Symptoms, Fix & Cost)`;
  const description = `Technical guide for ${symptom} on ${vehicle}. Is it safe to drive? Discover likely causes, repair costs, and verified replacement parts.`;

  return {
    title,
    description,
  };
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

  const firstPart = matchedParts[0];
  const symptomData = firstPart.symptoms.find(s => slugify(s.description) === slug);
  const symptomName = symptomData?.description || slug;

  const relatedSymptoms = firstPart.symptoms
    .filter(s => slugify(s.description) !== slug)
    .slice(0, 1);
  
  const otherRelatedSymptoms = STATIC_PARTS
    .filter(p => !matchedParts.includes(p))
    .flatMap(p => p.symptoms)
    .filter(s => slugify(s.description) !== slug)
    .slice(0, 1);

  // Lead Gen Injection Metadata (LocalBusiness Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Certified GM Repair Hub",
    "description": `2014-2019 Silverado/Sierra 1500 specialist for ${symptomName}. Official diagnostic and component replacement protocol.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Your City",
      "addressRegion": "ST"
    },
    "telephone": "1-888-EXPERT-FIX",
    "priceRange": "$$$"
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-zinc-900 bg-zinc-950/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            PARTS<span className="text-zinc-500 uppercase">Expert</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <AlertTriangle className="text-zinc-100" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight capitalize">{symptomName} - Diagnostic</h1>
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Platform: 2014-2019 GM V8 (5.3/6.2)</p>
            </div>
          </div>

          <p className="text-lg text-zinc-400 mb-12 leading-relaxed">
            Diagnosing <span className="text-zinc-100 font-semibold">{symptomName}</span> requires isolating the failure between electronic control modules and mechanical wear items. Below is the verified engineering data for this symptom.
          </p>

          {/* Mechanic Verdict Box */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-8">
              <div className="flex items-center gap-2 mb-8 text-zinc-100">
                <ShieldAlert size={20} />
                <h2 className="text-sm font-mono uppercase tracking-[0.3em] font-bold">Mechanic Verdict</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Severity</label>
                  <p className={`text-xl font-bold ${symptomData?.severity === 'Critical' ? 'text-red-500' : 'text-zinc-100'}`}>
                    {symptomData?.severity}
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Safe to Drive</label>
                  <p className="text-xl font-bold">{symptomData?.drivable ? 'Conditional' : 'Restricted'}</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Likely Component</label>
                  <p className="text-xl font-bold">{firstPart.name}</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Estimated Cost</label>
                  <p className="text-xl font-bold font-mono tracking-tighter">${firstPart.price} - ${firstPart.price + 180}</p>
                </div>
              </div>
            </div>

            {/* Recommended Fix CTA */}
            <div className="bg-zinc-100 rounded-xl p-8 text-zinc-950 flex flex-col justify-between shadow-2xl shadow-zinc-100/10">
              <div>
                <h3 className="font-bold text-lg mb-4">Recommended Fix</h3>
                <p className="text-zinc-600 text-sm leading-snug mb-8">
                  Get the exact specification <span className="font-bold">{firstPart.brand}</span> replacement today.
                </p>
              </div>
              <Link href={`/part/${firstPart.part_number}`}>
                <Button className="w-full bg-zinc-950 text-zinc-100 hover:bg-zinc-800 font-bold h-12 uppercase tracking-widest text-xs">
                  Check price
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Lead Gen Injection: Get Help Near You */}
          <div className="mb-16 bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Need this fixed today?</h2>
                <p className="text-zinc-500 text-sm mb-0">
                  Secure professional diagnosis and installation from a certified GM specialist in your area. Avoid downstream damage.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-bold h-11 px-8 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                  <MapPin size={16} />
                  Find local mechanic
                </Button>
                <a href="tel:1-888-EXPERT-FIX" className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors py-2 font-mono text-[10px] uppercase tracking-[0.2em] border border-zinc-800 rounded">
                  <Phone size={16} />
                  Call: 1-888-EXPERT-FIX
                </a>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            <Wrench className="text-zinc-500" size={20} />
            Technical Performance Components
          </h2>

          <div className="space-y-8">
            {matchedParts.map(part => {
              const matchedSymptom = part.symptoms.find(s => slugify(s.description) === slug);
              return (
                <div key={part.id} className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-8 hover:bg-zinc-900/60 transition-all border-l-4 border-l-zinc-700">
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest bg-zinc-950 px-2 py-1 rounded border border-zinc-800">{part.brand}</span>
                        <Badge variant="outline" className="text-zinc-400 border-zinc-800 font-bold uppercase text-[9px] tracking-widest">{matchedSymptom?.urgency}</Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{part.name}</h3>
                      
                      <p className="text-zinc-500 mb-8 leading-relaxed">
                        The <Link href={`/part/${part.part_number}`} className="text-zinc-200 font-bold underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-100 transition-all italic">failing {part.name}</Link> has been identified as a high-frequency cause for this failure mode. Precision tolerances are required for successful remediation.
                      </p>

                      <div className="bg-zinc-950/50 rounded-lg p-6 border border-zinc-800">
                        <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Engineering Test Protocol</h4>
                        <div className="space-y-3">
                          {matchedSymptom?.diagnostic_steps.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start text-sm text-zinc-400">
                              <CheckCircle2 size={16} className="text-zinc-700 mt-0.5 shrink-0" />
                              <p>{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:w-64 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-zinc-900 pt-8 md:pt-0 md:pl-8">
                      <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest mb-1">MSRP REFERENCE</p>
                      <p className="text-3xl font-bold mb-8 tracking-tighter">${part.price.toFixed(2)}</p>
                      <Link href={`/part/${part.part_number}`} className="w-full">
                        <Button className="w-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-black h-12 rounded-none">
                          View compatible parts
                        </Button>
                      </Link>
                      <a href={`https://amazon.com/s?k=${part.brand}+${part.part_number}`} target="_blank" className="text-[9px] text-zinc-600 mt-6 block underline uppercase tracking-[0.2em] font-mono hover:text-zinc-400">
                        External Inventory Link
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Related Error States */}
          <div className="mt-20 pt-10 border-t border-zinc-900">
            <h3 className="text-sm font-mono uppercase tracking-[0.3em] font-bold text-zinc-600 mb-8">Related Error States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...relatedSymptoms, ...otherRelatedSymptoms].map((s, i) => (
                <Link key={i} href={`/symptom/${slugify(s.description)}`} className="group flex items-center justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-700 transition-all">
                  <span className="text-zinc-400 group-hover:text-zinc-100 transition-colors font-medium">{s.description}</span>
                  <ArrowRight size={16} className="text-zinc-800 group-hover:text-zinc-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 mt-32 py-16 bg-zinc-950 text-center">
        <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-[0.4em]">PartsExpert :: Technical Content Protocol v2.4</p>
      </footer>
    </div>
  );
}
