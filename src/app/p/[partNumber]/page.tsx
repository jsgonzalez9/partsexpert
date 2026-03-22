import { getPartByNumber } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ResultsView } from "@/components/ResultsView";
import { CompatibilityChecker } from "@/components/CompatibilityChecker";

interface PartPageProps {
  params: Promise<{
    partNumber: string;
  }>;
}

export default async function PartPage({ params }: PartPageProps) {
  const { partNumber } = await params;
  
  let part;
  try {
    part = await getPartByNumber(partNumber);
  } catch (error) {
    console.error('Error fetching part:', error);
    notFound();
  }

  if (!part) {
    notFound();
  }

  return (
    <div className="container relative mx-auto flex flex-col items-center justify-start min-h-[calc(100vh-3.5rem)] px-4 py-8 sm:px-6 md:py-16 gap-8 bg-zinc-950">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 font-sans mb-2">
            {part.name}
          </h1>
          <p className="text-zinc-400 font-mono">Part Number: {part.part_number}</p>
          <p className="text-zinc-500 mt-2">{part.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <CompatibilityChecker />
          </div>
          <div className="lg:col-span-7">
            {/* Note: ResultsView might need adjustment for the new Part schema if it uses fields that don't match exactly. */}
            <ResultsView part={part as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
