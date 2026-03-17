import { CommandSearch } from "@/components/CommandSearch";
import { CompatibilityChecker } from "@/components/CompatibilityChecker";
import { ResultsView } from "@/components/ResultsView";
import { STATIC_PARTS } from "@/lib/static-data";

export default function Home() {
  // Use first part as sample
  const samplePart = STATIC_PARTS[0];

  return (
    <div className="container relative mx-auto flex flex-col items-center justify-start min-h-[calc(100vh-3.5rem)] px-4 py-8 sm:px-6 md:py-16 gap-8 bg-zinc-950">
      {/* Search Header */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-4 mb-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-zinc-100 font-sans">
          Parts <span className="text-zinc-500 font-mono italic">Compatibility</span> Engine
        </h1>
        <p className="text-zinc-400 max-w-[85%] text-sm sm:text-base md:text-lg">
          Search over 2.4M industrial parts and ensure cross-brand compatibility instantly.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <CommandSearch />
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        <div className="lg:col-span-5 w-full">
           <CompatibilityChecker />
        </div>
        <div className="lg:col-span-7 w-full hidden lg:block">
           <ResultsView part={samplePart} />
        </div>
      </div>
    </div>
  );
}
