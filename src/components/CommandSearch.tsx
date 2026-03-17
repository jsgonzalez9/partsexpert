"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { searchParts, PartData } from "@/lib/supabase"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<PartData[]>([])
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    
    const timer = setTimeout(async () => {
      try {
        const data = await searchParts(query)
        setResults(data)
      } catch (e) {
        console.error("Search error:", e)
      }
    }, 150)
    
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (partNumber: string) => {
    setOpen(false)
    router.push(`/p/${partNumber}`)
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-400 hover:border-zinc-700 hover:text-zinc-300 transition-colors shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
      >
        <div className="flex items-center gap-3">
          <Search className="h-4 w-4" />
          <span className="font-mono">Search parts, models, or categories...</span>
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-zinc-800 bg-zinc-950 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type a part number or name..." 
          className="font-mono text-sm"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[300px] overflow-y-auto">
          <CommandEmpty className="py-6 text-center text-sm text-zinc-500 font-mono">
            {query.length < 2 ? "Type to search..." : "No parts found."}
          </CommandEmpty>
          
          {results.length > 0 && (
            <CommandGroup heading="Parts" className="text-zinc-500 font-mono text-xs">
              {results.map((part) => (
                <CommandItem 
                  key={part.id}
                  className="font-mono text-sm cursor-pointer hover:bg-zinc-800"
                  onSelect={() => handleSelect(part.part_number)}
                >
                  <Search className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>{part.part_number} - {part.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          <CommandSeparator className="bg-zinc-800" />
          <CommandGroup heading="Categories" className="text-zinc-500 font-mono text-xs">
            <CommandItem className="font-mono text-sm cursor-pointer hover:bg-zinc-800">
              <span>Fuel Systems & Filters</span>
            </CommandItem>
            <CommandItem className="font-mono text-sm cursor-pointer hover:bg-zinc-800">
              <span>Bearings & Bushings</span>
            </CommandItem>
            <CommandItem className="font-mono text-sm cursor-pointer hover:bg-zinc-800">
              <span>Hydraulic Components</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
