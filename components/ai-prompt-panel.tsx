"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, Copy, Check, Loader2 } from "lucide-react"
import type { Category } from "@/lib/generator-data"

interface AiPromptPanelProps {
    category: Category
}

const categoryLabels: Record<Category, string> = {
    models: "3D Model / Asset",
    scripts: "LSL Script",
    prefabs: "Build Plan",
    textures: "Asset Brief",
    npcs: "NPC System",
    worlds: "World Layout",
    modules: "Module Config",
}

const placeholders: Record<Category, string> = {
    models: "e.g., A low-poly medieval sword with glowing runes...",
    scripts: "e.g., Make a script that changes prim color on touch with a menu of 8 colors...",
    prefabs: "e.g., Design a medieval watchtower with 3 floors, archer slits, and a spiral staircase...",
    textures: "e.g., Create a weathered stone brick texture for a dungeon wall, PBR with normal map...",
    npcs: "e.g., Make a fortune teller NPC that reads tarot cards and gives random predictions...",
    worlds: "e.g., Plan a cyberpunk nightclub district with 4 zones: dance floor, VIP lounge, bar, rooftop...",
    modules: "e.g., Design a snap-together modular wall system with doors, windows, and corner pieces...",
}

export function AiPromptPanel({ category }: AiPromptPanelProps) {
    const [prompt, setPrompt] = useState("")
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)

    const handleGenerate = async () => {
        if (!prompt.trim() || loading) return

        setLoading(true)
        setError("")
        setResult("")

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: prompt.trim(), category }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "AI generation failed. Please try again.")
                return
            }

            setResult(data.content)
        } catch {
            setError("Network error. Please check your connection and try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async () => {
        if (!result) return
        await navigator.clipboard.writeText(result)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
                <Sparkles className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                    AI Assistant — {categoryLabels[category]}
                </h3>
                <span className="ml-auto text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    Powered by DeepSeek
                </span>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <p className="text-xs text-muted-foreground mb-2">
                        Describe what you want to create in natural language. The AI will generate a complete {categoryLabels[category].toLowerCase()} for you.
                    </p>
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={placeholders[category]}
                        className="min-h-24 bg-secondary border-border text-foreground resize-none text-sm"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                handleGenerate()
                            }
                        }}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleGenerate}
                        disabled={!prompt.trim() || loading}
                        size="sm"
                        className="gap-2"
                    >
                        {loading ? (
                            <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                            <Send className="size-3.5" />
                        )}
                        {loading ? "Generating..." : "Ask AI"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                        Ctrl+Enter to send
                    </span>
                </div>

                {error && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground">AI Response</span>
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
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        </div>
                        <ScrollArea className="max-h-[400px]">
                            <pre className="rounded-lg bg-secondary/80 border border-border p-4 text-xs leading-relaxed font-mono text-foreground/90 whitespace-pre-wrap overflow-x-auto">
                                {result}
                            </pre>
                        </ScrollArea>
                    </div>
                )}
            </div>
        </div>
    )
}
