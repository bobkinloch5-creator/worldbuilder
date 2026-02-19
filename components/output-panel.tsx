"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Download, RotateCcw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Category } from "@/lib/generator-data"
import { Loader2 } from "lucide-react"

interface OutputPanelProps {
  output: string
  category: Category
  prompt?: string // Add prompt prop for regeneration
  onReset: () => void
}

const categoryLabels: Record<Category, { label: string; ext: string }> = {
  models: { label: "3D Model Guide", ext: ".txt" },
  scripts: { label: "LSL Script", ext: ".lsl" },
  prefabs: { label: "Build Plan", ext: ".txt" },
  textures: { label: "Asset Brief", ext: ".txt" },
  npcs: { label: "NPC Script", ext: ".lsl" },
  worlds: { label: "World Layout", ext: ".txt" },
  modules: { label: "Module Config", ext: ".lsl" },
}

// LSL syntax highlighting
const LSL_KEYWORDS = /\b(default|state_entry|touch_start|touch_end|timer|sensor|no_sensor|listen|money|changed|collision_start|collision_end|land_collision_start|on_rez|attach|run_time_permissions|link_message|dataserver|http_response|if|else|for|while|do|return|jump|state|integer|float|string|vector|rotation|key|list)\b/g
const LSL_FUNCTIONS = /\b(ll[A-Z][a-zA-Z0-9]*)\b/g
const LSL_CONSTANTS = /\b(TRUE|FALSE|NULL_KEY|ZERO_VECTOR|ZERO_ROTATION|PI|DEG_TO_RAD|RAD_TO_DEG|AGENT|ACTIVE|PASSIVE|SCRIPTED|LINK_SET|LINK_ALL_OTHERS|LINK_ALL_CHILDREN|LINK_THIS|LINK_ROOT|ALL_SIDES|EOF|PERMISSION_[A-Z_]+|PRIM_[A-Z_]+|PSYS_[A-Z_]+|CLICK_ACTION_[A-Z_]+|KFM_[A-Z_]+)\b/g

interface Section {
  title: string
  startLine: number
  endLine: number
  content: string
}

function parseSections(text: string): Section[] {
  const lines = text.split("\n")
  const sections: Section[] = []
  let currentSection: Section | null = null

  lines.forEach((line, i) => {
    const sectionMatch = line.match(/^(?:\/\/\s*)?(?:={3,}|#{1,3}\s+|-{3,})?\s*(\d+\.\s+.+|[A-Z][A-Z\s/&]+(?::\s*|$))/)
    const headerLine = line.match(/^={3,}$/) || line.match(/^-{3,}$/)

    if (sectionMatch && !headerLine) {
      if (currentSection) {
        currentSection.endLine = i - 1
        currentSection.content = lines.slice(currentSection.startLine, i).join("\n")
        sections.push(currentSection)
      }
      currentSection = {
        title: sectionMatch[1]?.trim().replace(/^\/\/\s*/, "") || line.trim(),
        startLine: i,
        endLine: lines.length - 1,
        content: "",
      }
    }
  })

  if (currentSection) {
    currentSection.endLine = lines.length - 1
    currentSection.content = lines.slice(currentSection.startLine).join("\n")
    sections.push(currentSection)
  }

  return sections
}

function highlightLSL(text: string): string {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Simple highlighting for speed and reliability
  html = html.replace(LSL_KEYWORDS, (m) => `<span class="lsl-keyword">${m}</span>`)
  html = html.replace(LSL_FUNCTIONS, (m) => `<span class="lsl-function">${m}</span>`)
  html = html.replace(LSL_CONSTANTS, (m) => `<span class="lsl-constant">${m}</span>`)
  html = html.replace(/\/\/.*$/gm, (m) => `<span class="lsl-comment">${m}</span>`)
  html = html.replace(/"(?:[^"\\]|\\.)*"/g, (m) => `<span class="lsl-string">${m}</span>`)
  html = html.replace(/(?<![a-zA-Z_"=>])(\b\d+\.?\d*\b)(?![a-zA-Z_<])/g, (m) => `<span class="lsl-number">${m}</span>`)

  return html
}

export function OutputPanel({ output, category, prompt, onReset }: OutputPanelProps) {
  const [copied, setCopied] = useState(false)
  const [copiedSection, setCopiedSection] = useState<number | null>(null)

  // Texture generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  const isLSL = category === "scripts" || category === "npcs" || category === "modules"
  const sections = useMemo(() => parseSections(output), [output])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopySection = useCallback(async (index: number, content: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedSection(index)
    setTimeout(() => setCopiedSection(null), 2000)
  }, [])

  const handleDownload = () => {
    if (generatedImage && category === 'textures') {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `generated-texture.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const { ext } = categoryLabels[category]
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sl-builder-output${ext}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  // Generate texture using our new API
  const handleGenerateTexture = async () => {
    if (!prompt || category !== 'textures') return

    setIsGenerating(true)
    setProgress(10)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10))
    }, 800)

    try {
      const response = await fetch("/api/ai/textures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate texture")
      }

      const data = await response.json()
      setGeneratedImage(data.image)
      setShowComparison(true)
    } catch (error) {
      console.error("Texture generation failed:", error)
    } finally {
      clearInterval(progressInterval)
      setProgress(100)
      setIsGenerating(false)
    }
  }

  const scrollToSection = (index: number) => {
    const el = document.getElementById(`output-section-${index}`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const info = categoryLabels[category]
  const lineCount = output.split("\n").length

  const highlightedOutput = useMemo(() => {
    if (isLSL) return highlightLSL(output)
    return output
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }, [output, isLSL])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-primary border-primary/30 bg-primary/10 text-xs"
          >
            {info.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {lineCount} lines
          </span>
        </div>
        <div className="flex items-center gap-1">
          {category === 'textures' && (
            <Button
              variant="default"
              size="sm"
              onClick={handleGenerateTexture}
              disabled={isGenerating || !prompt}
              className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white mr-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Visual"
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            <span className="sr-only md:not-sr-only">Reset</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Download className="size-3.5" />
            <span className="sr-only md:not-sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <Check className="size-3.5 text-primary" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span className="sr-only md:not-sr-only">
              {copied ? "Copied" : "Copy All"}
            </span>
          </Button>
        </div>
      </div>

      {/* Comparison View for Textures */}
      {category === 'textures' && generatedImage && (
        <div className="p-4 border-b border-border bg-black/20">
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden border border-border shadow-2xl">
            <img src={generatedImage} alt="Generated Texture" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-emerald-400 border border-emerald-500/30">
              1024x1024 • Seamless
            </div>
          </div>
        </div>
      )}

      {/* Section navigation */}
      {sections.length > 2 && (
        <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-secondary/30 overflow-x-auto">
          <span className="text-xs text-muted-foreground shrink-0 mr-1">Jump:</span>
          {sections.map((section, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className="shrink-0 text-xs px-2 py-0.5 rounded-md bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors truncate max-w-[120px]"
              title={section.title}
            >
              {section.title.replace(/^\d+\.\s*/, "").substring(0, 18)}
            </button>
          ))}
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="relative">
          {/* Section copy buttons */}
          {sections.length > 1 && sections.map((section, i) => (
            <div
              key={i}
              id={`output-section-${i}`}
              className="absolute right-2 z-10"
              style={{ top: `${section.startLine * 1.5 + 1}rem` }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopySection(i, section.content)}
                className="h-6 px-1.5 text-xs text-muted-foreground/50 hover:text-foreground opacity-0 hover:opacity-100 transition-opacity"
                title={`Copy "${section.title}"`}
              >
                {copiedSection === i ? (
                  <Check className="size-3 text-primary" />
                ) : (
                  <Copy className="size-3" />
                )}
              </Button>
            </div>
          ))}
          <pre
            className="p-4 text-xs leading-relaxed font-mono text-foreground/90 whitespace-pre overflow-x-auto lsl-output"
            dangerouslySetInnerHTML={{ __html: highlightedOutput }}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
