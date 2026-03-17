"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wrench, Settings2, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface CompatibilityCheckerProps {
  onCheck?: (make: string, model: string, partNumber: string) => void;
}

export function CompatibilityChecker({ onCheck }: CompatibilityCheckerProps) {
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [partNumber, setPartNumber] = useState("")

  const handleCheck = () => {
    if (onCheck) {
      onCheck(make, model, partNumber)
    }
  }

  return (
    <Card className="w-full bg-zinc-950 border-zinc-800 shadow-xl shadow-black/40 overflow-hidden">
      <CardHeader className="border-b border-zinc-900 bg-zinc-900/20 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <CardTitle className="text-xl font-medium text-zinc-100">Compatibility Checker</CardTitle>
        </div>
        <CardDescription className="text-zinc-400 font-mono text-sm">
          Verify cross-brand equipment compatibility instantly.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              Equipment Make / Brand
            </label>
            <div className="relative">
              <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                className="pl-10 h-12 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700 text-base rounded-md font-mono"
                placeholder="e.g. Caterpillar"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              Equipment Model
            </label>
            <div className="relative">
              <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                className="pl-10 h-12 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700 text-base rounded-md font-mono"
                placeholder="e.g. 320D L"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              Replacement Part Number
            </label>
            <div className="relative">
              <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                className="pl-10 h-12 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700 text-base rounded-md font-mono"
                placeholder="e.g. 1R-0719"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleCheck}
            className="w-full h-12 mt-4 bg-zinc-100 text-zinc-900 hover:bg-zinc-300 font-medium text-base transition-colors"
          >
            Verify Compatibility
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}
