"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wrench, Settings2, ShieldCheck, ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { getVehicleYears, getVehicleMakes, getVehicleModels } from "@/lib/supabase"

interface CompatibilityCheckerProps {
  onCheck?: (make: string, model: string, partNumber: string, year: number) => void;
}

export function CompatibilityChecker({ onCheck }: CompatibilityCheckerProps) {
  const [years, setYears] = useState<number[]>([])
  const [makes, setMakes] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [partNumber, setPartNumber] = useState("")
  
  const [loading, setLoading] = useState({ years: false, makes: false, models: false })

  // Initial load: years
  useEffect(() => {
    const loadYears = async () => {
      setLoading(prev => ({ ...prev, years: true }))
      try {
        const data = await getVehicleYears()
        setYears(data)
      } catch (e) {
        console.error("Failed to load years:", e)
      } finally {
        setLoading(prev => ({ ...prev, years: false }))
      }
    }
    loadYears()
  }, [])

  // Load makes when year changes
  useEffect(() => {
    if (!selectedYear) {
      setMakes([])
      setSelectedMake("")
      return
    }
    const loadMakes = async () => {
      setLoading(prev => ({ ...prev, makes: true }))
      try {
        const data = await getVehicleMakes(selectedYear)
        setMakes(data)
      } catch (e) {
        console.error("Failed to load makes:", e)
      } finally {
        setLoading(prev => ({ ...prev, makes: false }))
      }
    }
    loadMakes()
  }, [selectedYear])

  // Load models when make changes
  useEffect(() => {
    if (!selectedMake) {
      setModels([])
      setSelectedModel("")
      return
    }
    const loadModels = async () => {
      setLoading(prev => ({ ...prev, models: true }))
      try {
        const data = await getVehicleModels(selectedMake, selectedYear || undefined)
        setModels(data)
      } catch (e) {
        console.error("Failed to load models:", e)
      } finally {
        setLoading(prev => ({ ...prev, models: false }))
      }
    }
    loadModels()
  }, [selectedMake, selectedYear])

  const handleCheck = () => {
    if (onCheck && selectedMake && selectedModel && selectedYear) {
      onCheck(selectedMake, selectedModel, partNumber, selectedYear)
    }
  }

  const isComplete = selectedYear && selectedMake && selectedModel && partNumber;

  return (
    <Card className="w-full bg-zinc-950 border-zinc-800 shadow-2xl shadow-black/60 overflow-hidden ring-1 ring-white/5">
      <CardHeader className="border-b border-zinc-900 bg-zinc-900/40 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <CardTitle className="text-xl font-headline font-bold text-zinc-100 tracking-tight">Industrial Part Selector</CardTitle>
        </div>
        <CardDescription className="text-zinc-400 font-sans text-xs">
          Verify cross-brand equipment compatibility using live fitment data.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Year Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Year</label>
            <select 
              className="w-full h-11 bg-zinc-900 border border-zinc-800 rounded-lg px-3 text-sm font-mono text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              <option value="" disabled>Select Year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Make Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Make / Brand</label>
            <select 
              className="w-full h-11 bg-zinc-900 border border-zinc-800 rounded-lg px-3 text-sm font-mono text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer disabled:opacity-50"
              disabled={!selectedYear}
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="" disabled>Select Make</option>
              {makes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Model Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Equipment Model</label>
          <select 
            className="w-full h-11 bg-zinc-900 border border-zinc-800 rounded-lg px-3 text-sm font-mono text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer disabled:opacity-50"
            disabled={!selectedMake}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="" disabled>Select Model</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Part Number Input */}
        <div className="space-y-1.5 pt-2 border-t border-zinc-900 mt-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Replacement Part #</label>
          <div className="relative">
            <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              className="pl-10 h-11 bg-zinc-900 border-zinc-800 focus-visible:ring-emerald-500/20 text-sm rounded-lg font-mono placeholder:text-zinc-600"
              placeholder="e.g. 1R-0719"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleCheck}
          disabled={!isComplete}
          className={`w-full h-11 mt-2 font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
            isComplete 
              ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20' 
              : 'bg-zinc-800 text-zinc-500 grayscale'
          }`}
        >
          {isComplete ? 'Verify Compatibility' : 'Select All Fields'}
        </Button>
      </CardContent>
    </Card>
  )
}
