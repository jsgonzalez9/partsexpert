"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion } from "framer-motion"
import { CheckCircle2, AlertTriangle, Info, ChevronRight, Layers, ShieldAlert } from "lucide-react"
import { Part } from "@/lib/supabase"
import Link from "next/link"

interface ResultsViewProps {
  part?: Part & { failures?: any[] };
}

export function ResultsView({ part }: ResultsViewProps) {
  const isCompatible = part ? true : false;

  return (
    <Card className="w-full bg-zinc-950/50 border-zinc-800 shadow-xl overflow-hidden backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="border-b border-zinc-900 pb-6 bg-zinc-900/10">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-medium text-zinc-100 flex items-center gap-2">
            Expert Analysis Report
          </CardTitle>
          {isCompatible ? (
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono text-xs px-2 py-0.5">
              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
              VERIFIED FITMENT
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-mono text-xs px-2 py-0.5">
              <AlertTriangle className="h-3 w-3 mr-1 inline" />
              PENDING DATA
            </Badge>
          )}
        </div>
        <CardDescription className="text-zinc-400 font-mono text-sm">
          {part ? `PN: ${part.part_number} — ${part.name}` : "Enter a part number to start diagnostic analysis."}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 space-y-12"
        >
          {/* Tech Specs */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Info className="h-4 w-4" /> Technical Specifications
            </h3>
            <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/10">
              <Table>
                <TableHeader className="bg-zinc-900/30">
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="w-1/2 text-zinc-400 font-mono text-xs uppercase tracking-tighter">Parameter</TableHead>
                    <TableHead className="text-zinc-400 font-mono text-xs uppercase tracking-tighter">Verified Metric</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {part?.technical_specs ? (
                    Object.entries(part.technical_specs).map(([key, value]) => (
                      <TableRow key={key} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                        <TableCell className="font-mono text-sm text-zinc-400 capitalize py-3">
                          {key.replace(/_/g, ' ')}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-zinc-100 font-bold py-3">{String(value)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={2} className="font-mono text-sm text-zinc-500 text-center py-8">
                        Technical profile verification in progress.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Diagnostic Symptoms (PORTED FROM TOLL-BOOTH) */}
          {(part as any)?.failures && (part as any).failures.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-emerald-500" /> Common Symptoms & Failure Modes
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {(part as any).failures.map((failure: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-emerald-500/30 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Symptom</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${failure.severity_score > 7 ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        Severity: {failure.severity_score}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-zinc-100 text-base font-bold flex-1">{failure.symptom || failure.symptom_legacy}</p>
                      {failure.drivable === false && (
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-[8px] font-bold uppercase py-0 px-1.5 flex items-center gap-1">
                          <ShieldAlert className="w-2.5 h-2.5" />
                          Non-Drivable
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                        <p className="text-[8px] uppercase tracking-widest text-zinc-500 mb-1">Est. Repair Cost</p>
                        <p className="text-sm font-mono font-bold text-emerald-500">
                          ${failure.estimated_repair_cost_low} - ${failure.estimated_repair_cost_high}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                        <p className="text-[8px] uppercase tracking-widest text-zinc-500 mb-1">Drivability</p>
                        <p className={`text-sm font-mono font-bold ${failure.drivable ? 'text-zinc-300' : 'text-red-400'}`}>
                          {failure.drivable ? 'Safe to Drive' : 'Immediate Risk'}
                        </p>
                      </div>
                    </div>

                    <Link 
                      href={failure.slug ? `/symptoms/${failure.slug}` : `/symptoms/${(failure.symptom || failure.symptom_legacy || '').toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      View Deep Diagnostic <ChevronRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cross Reference */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Layers className="h-4 w-4" /> Performance Cross-References
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {part?.cross_references ? (
                part.cross_references.map((ref, idx) => (
                  <div key={idx} className="flex flex-col p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 group hover:bg-zinc-900/50 transition-all">
                    <span className="text-[10px] font-bold text-zinc-500 mb-1 uppercase tracking-widest">{ref.brand}</span>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-zinc-200 font-bold">{ref.part}</span>
                      <Badge 
                        variant="outline" 
                        className={
                          ref.fit === 'exact' 
                            ? 'border-zinc-700 text-zinc-400' 
                            : 'bg-amber-500/10 text-amber-500'
                        }
                      >
                        {ref.fit === 'exact' ? 'Exact Fit' : 'Verify'}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-6 text-zinc-600 font-mono text-sm border border-dashed border-zinc-800 rounded-xl">
                  Alternative technical pairings pending.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
