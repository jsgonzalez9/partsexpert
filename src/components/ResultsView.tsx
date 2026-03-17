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
import { CheckCircle2, AlertTriangle, Info } from "lucide-react"
import { PartData } from "@/lib/supabase"

interface ResultsViewProps {
  part?: PartData;
}

export function ResultsView({ part }: ResultsViewProps) {
  const isCompatible = part ? true : false;

  return (
    <Card className="w-full bg-zinc-950/50 border-zinc-800 shadow-xl overflow-hidden backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="border-b border-zinc-900 pb-6 bg-zinc-900/10">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-medium text-zinc-100 flex items-center gap-2">
            Analysis Report
          </CardTitle>
          {isCompatible ? (
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono text-xs px-2 py-0.5">
              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
              COMPATIBLE
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-mono text-xs px-2 py-0.5">
              <AlertTriangle className="h-3 w-3 mr-1 inline" />
              CHECK SPECS
            </Badge>
          )}
        </div>
        <CardDescription className="text-zinc-400 font-mono text-sm">
          {part ? `Part No: ${part.part_number} (${part.name})` : "Enter a part number to see analysis"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 space-y-8"
        >
          {/* Tech Specs */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Info className="h-4 w-4" /> Technical Specifications
            </h3>
            <div className="rounded-md border border-zinc-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-zinc-900/50">
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="w-1/2 text-zinc-400 font-mono text-xs">Parameter</TableHead>
                    <TableHead className="text-zinc-400 font-mono text-xs">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {part?.technical_specs ? (
                    Object.entries(part.technical_specs).map(([key, value]) => (
                      <TableRow key={key} className="border-zinc-800 hover:bg-zinc-900/50">
                        <TableCell className="font-mono text-sm text-zinc-300 capitalize">
                          {key.replace(/_/g, ' ')}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-zinc-300">{String(value)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={2} className="font-mono text-sm text-zinc-500 text-center py-4">
                        No specifications available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Cross Reference */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Cross Reference Alternatives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {part?.cross_references ? (
                part.cross_references.map((ref, idx) => (
                  <div key={idx} className="flex flex-col p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <span className="text-xs font-mono text-zinc-500 mb-1">{ref.brand}</span>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-zinc-200">{ref.part}</span>
                      <Badge 
                        variant={ref.fit === 'exact' ? 'outline' : 'secondary'} 
                        className={
                          ref.fit === 'exact' 
                            ? 'border-zinc-700 text-zinc-400' 
                            : ref.fit === 'verify_seal'
                            ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                            : 'bg-zinc-500/10 text-zinc-400'
                        }
                      >
                        {ref.fit === 'exact' ? 'Exact Fit' : ref.fit === 'verify_seal' ? 'Verify Seal' : 'Check Specs'}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-4 text-zinc-500 font-mono text-sm">
                  No cross-references available
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
