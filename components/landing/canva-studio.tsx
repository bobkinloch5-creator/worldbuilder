"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Sparkles, Image, Palette, Layers, PenTool, Frame, Star, Copy, Check, Loader2, Download, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const canvaTemplates = [
    {
        id: "texture",
        icon: Image,
        title: "Texture / Material",
        description: "Create seamless textures, surface materials, and tiling patterns for prims and mesh objects.",
        canvaUrl: "https://www.canva.com/design?create&width=1024&height=1024&units=px",
        width: 1024,
        height: 1024,
        dimensions: "1024×1024",
        badge: "Most Popular",
        tips: [
            "Use Magic Media to generate base textures from text prompts",
            "Enable 'Seamless' or tile your design for repeating surfaces",
            "Export as PNG for best quality, or JPG for smaller file size",
            "Use Background Remover to isolate texture elements",
        ],
        prompts: [
            "Weathered stone brick wall with moss",
            "Futuristic metal panel with glowing circuit lines",
            "Hand-painted wooden planks, cartoon style",
            "Marble floor tile, white with grey veins",
        ],
    },
    {
        id: "sign",
        icon: PenTool,
        title: "Signs & Displays",
        description: "Design storefront signs, info boards, menus, and display panels for in-world placement.",
        canvaUrl: "https://www.canva.com/design?create&width=1920&height=1080&units=px",
        width: 1920,
        height: 1080,
        dimensions: "1920×1080 (16:9)",
        tips: [
            "Use bold, high-contrast fonts — small text is hard to read in-world",
            "Keep designs simple; avoid fine details that vanish at distance",
            "Export at 1024×512 or 2048×1024 for optimal in-world readability",
            "Use Dream Lab for stylized sign artwork",
        ],
        prompts: [
            "Medieval tavern sign with ornate lettering",
            "Neon cyberpunk nightclub sign, pink and blue",
            "Professional real estate 'For Sale' sign",
            "Fantasy potion shop storefront banner",
        ],
    },
    {
        id: "ui",
        icon: Frame,
        title: "HUD & UI Elements",
        description: "Create HUD overlays, menu backgrounds, button sets, and dialog box textures.",
        canvaUrl: "https://www.canva.com/design?create&width=1024&height=1024&units=px",
        width: 1024,
        height: 1024,
        dimensions: "1024×1024 (square)",
        tips: [
            "Design on a transparent background for HUD overlays",
            "Keep UI elements within the safe zone (avoid extreme edges)",
            "Use consistent icon styles across your HUD set",
            "Export as PNG to preserve transparency",
        ],
        prompts: [
            "Sci-fi holographic HUD frame with rounded corners",
            "Fantasy RPG inventory slot grid, ornate gold borders",
            "Minimalist health bar and mana bar set",
            "Steampunk gear-themed dialog box background",
        ],
    },
    {
        id: "skybox",
        icon: Layers,
        title: "Skybox & Panoramas",
        description: "Generate skybox textures, panoramic backdrops, and environmental textures for scenic builds.",
        canvaUrl: "https://www.canva.com/design?create&width=2048&height=1024&units=px",
        width: 2048,
        height: 1024,
        dimensions: "2048×1024",
        tips: [
            "Create wide panoramic scenes for skybox interiors",
            "Use AI image generation for alien landscapes and fantasy skies",
            "Generate individual faces for a 6-sided skybox cube",
            "Blend edges carefully for seamless wrapping",
        ],
        prompts: [
            "Sunset over alien mountains with two moons",
            "Deep space nebula with stars and asteroids",
            "Enchanted forest canopy view looking upward",
            "Underwater ocean scene with light rays and fish",
        ],
    },
    {
        id: "concept",
        icon: Palette,
        title: "Concept Art & Reference",
        description: "Generate concept art, mood boards, and visual references to guide your in-world builds.",
        canvaUrl: "https://www.canva.com/design?create&width=1920&height=1080&units=px",
        width: 1920,
        height: 1080,
        dimensions: "1920×1080 (presentation)",
        tips: [
            "Use Magic Media for quick concept iterations",
            "Create mood boards by combining AI images with color palettes",
            "Use Dream Lab for photorealistic or stylized concepts",
            "Add annotations to reference sheets for builders",
        ],
        prompts: [
            "Medieval castle courtyard with market stalls, aerial view",
            "Cyberpunk apartment interior, neon lighting, lived-in feel",
            "Cozy fantasy tavern with fireplace and wooden beams",
            "Futuristic space station docking bay with ships",
        ],
    },
    {
        id: "logo",
        icon: Star,
        title: "Brand & Logo",
        description: "Design brand assets, logos, group insignias, and profile pictures for your virtual identity.",
        canvaUrl: "https://www.canva.com/design?create&width=500&height=500&units=px",
        width: 500,
        height: 500,
        dimensions: "500×500 (square)",
        tips: [
            "Keep logos simple — they need to be recognizable at small sizes",
            "Use transparent backgrounds for versatile placement",
            "Create variations: full logo, icon only, and text only",
            "Test readability at 64×64 pixels (profile picture size)",
        ],
        prompts: [
            "Elegant gold crest for a medieval roleplay group",
            "Minimalist tech logo for a virtual architecture studio",
            "Cute kawaii mascot for a fashion brand",
            "Edgy cyberpunk gang emblem with skull and neon",
        ],
    },
]

interface CreatedDesign {
    id: string
    title: string
    url: string
    thumbnail?: string
}

export function CanvaStudio() {
    const [selectedTemplate, setSelectedTemplate] = useState(canvaTemplates[0])
    const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const [createdDesign, setCreatedDesign] = useState<CreatedDesign | null>(null)
    const [exportUrl, setExportUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Check Canva connection status on mount
    useEffect(() => {
        fetch("/api/canva/status")
            .then((res) => res.json())
            .then((data) => {
                setIsConnected(data.connected)
                setIsChecking(false)
            })
            .catch(() => setIsChecking(false))
    }, [])

    const handleCopyPrompt = (prompt: string, index: number) => {
        navigator.clipboard.writeText(prompt)
        setCopiedPrompt(index)
        setTimeout(() => setCopiedPrompt(null), 1500)
    }

    const handleCreateDesign = async () => {
        setIsCreating(true)
        setError(null)
        setCreatedDesign(null)
        setExportUrl(null)

        try {
            const res = await fetch("/api/canva/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: `SL Builder - ${selectedTemplate.title}`,
                    width: selectedTemplate.width,
                    height: selectedTemplate.height,
                }),
            })

            const data = await res.json()
            if (data.success) {
                setCreatedDesign(data.design)
            } else {
                setError(data.error || "Failed to create design")
            }
        } catch {
            setError("Network error — could not reach server")
        } finally {
            setIsCreating(false)
        }
    }

    const handleExportDesign = async () => {
        if (!createdDesign) return
        setIsExporting(true)
        setError(null)

        try {
            const res = await fetch("/api/canva/export", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    design_id: createdDesign.id,
                    format: "png",
                    width: selectedTemplate.width,
                    height: selectedTemplate.height,
                }),
            })

            const data = await res.json()
            if (data.success && data.export?.urls) {
                const downloadUrl = Array.isArray(data.export.urls)
                    ? data.export.urls[0]
                    : data.export.urls
                setExportUrl(typeof downloadUrl === 'string' ? downloadUrl : downloadUrl?.url || null)
            } else {
                setError(data.error || "Export failed or timed out")
            }
        } catch {
            setError("Network error during export")
        } finally {
            setIsExporting(false)
        }
    }

    const openCanvaPopup = () => {
        const url = createdDesign?.url || selectedTemplate.canvaUrl
        const w = Math.min(1400, window.screen.availWidth - 100)
        const h = Math.min(900, window.screen.availHeight - 100)
        const left = (window.screen.availWidth - w) / 2
        const top = (window.screen.availHeight - h) / 2
        window.open(
            url,
            "canva_editor",
            `width=${w},height=${h},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
        )
    }

    return (
        <section id="canva-studio" className="px-6 py-20 lg:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-4">
                        <Sparkles className="h-3.5 w-3.5" />
                        {isConnected ? "Canva Pro Connected ✓" : "Powered by Canva Pro"}
                    </div>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Design studio for virtual worlds
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
                        {isConnected
                            ? "Create and export designs directly from this page using Canva Pro. Choose a template, create your design, edit it in Canva, then export."
                            : "Create textures, signs, HUDs, skyboxes, and concept art using Canva's AI design tools. Choose a template and launch the editor to start designing."}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    {/* Template selector sidebar */}
                    <div className="space-y-2">
                        {canvaTemplates.map((template) => {
                            const Icon = template.icon
                            const isActive = selectedTemplate.id === template.id
                            return (
                                <button
                                    key={template.id}
                                    onClick={() => {
                                        setSelectedTemplate(template)
                                        setCreatedDesign(null)
                                        setExportUrl(null)
                                        setError(null)
                                    }}
                                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${isActive
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
                                        }`}
                                >
                                    <Icon className="size-4 shrink-0" />
                                    <div className="flex items-center gap-2 min-w-0">
                                        <p className="text-sm font-medium truncate">{template.title}</p>
                                        {"badge" in template && template.badge && (
                                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                                                }`}>
                                                {template.badge}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            )
                        })}

                        {/* Connect Canva button (owner only) */}
                        {!isChecking && !isConnected && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full gap-2 text-xs"
                                    asChild
                                >
                                    <a href="/api/canva/auth">
                                        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                                        </svg>
                                        Connect Canva Pro
                                    </a>
                                </Button>
                                <p className="text-[10px] text-muted-foreground/50 mt-1.5 text-center">Site owner only</p>
                            </div>
                        )}
                    </div>

                    {/* Template detail panel */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{selectedTemplate.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{selectedTemplate.description}</p>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded-md shrink-0">
                                {selectedTemplate.dimensions}
                            </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 mb-6">
                            {isConnected ? (
                                <>
                                    <Button
                                        size="lg"
                                        className="flex-1 gap-2 text-base font-semibold"
                                        onClick={handleCreateDesign}
                                        disabled={isCreating}
                                    >
                                        {isCreating ? (
                                            <>
                                                <Loader2 className="size-5 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 14.66c-.163.655-.61 1.222-1.334 1.684-.724.462-1.63.78-2.697.948-.236.036-.472.064-.707.082a7.627 7.627 0 01-.721.03c-.733 0-1.418-.1-2.047-.3a4.593 4.593 0 01-1.578-.864 3.87 3.87 0 01-1.022-1.37 4.524 4.524 0 01-.361-1.84c0-.96.258-1.826.774-2.594a5.28 5.28 0 012.078-1.844c.87-.468 1.835-.702 2.893-.702.68 0 1.279.122 1.797.366.518.244.921.584 1.21 1.02.288.436.432.934.432 1.494 0 .56-.132 1.056-.396 1.488a2.863 2.863 0 01-1.068 1.02 2.72 2.72 0 01-1.428.378c-.32 0-.575-.074-.766-.222-.19-.148-.286-.352-.286-.612 0-.08.01-.168.03-.264l.588-2.688h-.924l-.09.312c-.16-.22-.508-.396-.972-.396-.52 0-1.024.172-1.512.516a3.51 3.51 0 00-1.116 1.332c-.276.552-.414 1.116-.414 1.692 0 .56.162 1.008.486 1.344.324.336.756.504 1.296.504.404 0 .774-.09 1.11-.27.234-.128.452-.296.654-.504-.048.228-.068.42-.068.576 0 .22.074.398.222.534.148.136.348.204.6.204.48 0 .942-.144 1.386-.432a3.138 3.138 0 001.008-.99c.252-.408.378-.856.378-1.23 0-.376-.122-.684-.366-.924-.244-.24-.604-.36-1.08-.36-.14 0-.302.014-.486.042l.12-.516h.924l.768-3.504z" />
                                                </svg>
                                                Create {selectedTemplate.title}
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="gap-2"
                                        onClick={openCanvaPopup}
                                        title="Open Canva editor"
                                    >
                                        <ExternalLink className="size-4" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size="lg"
                                        className="flex-1 gap-2 text-base font-semibold"
                                        onClick={openCanvaPopup}
                                    >
                                        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 14.66c-.163.655-.61 1.222-1.334 1.684-.724.462-1.63.78-2.697.948-.236.036-.472.064-.707.082a7.627 7.627 0 01-.721.03c-.733 0-1.418-.1-2.047-.3a4.593 4.593 0 01-1.578-.864 3.87 3.87 0 01-1.022-1.37 4.524 4.524 0 01-.361-1.84c0-.96.258-1.826.774-2.594a5.28 5.28 0 012.078-1.844c.87-.468 1.835-.702 2.893-.702.68 0 1.279.122 1.797.366.518.244.921.584 1.21 1.02.288.436.432.934.432 1.494 0 .56-.132 1.056-.396 1.488a2.863 2.863 0 01-1.068 1.02 2.72 2.72 0 01-1.428.378c-.32 0-.575-.074-.766-.222-.19-.148-.286-.352-.286-.612 0-.08.01-.168.03-.264l.588-2.688h-.924l-.09.312c-.16-.22-.508-.396-.972-.396-.52 0-1.024.172-1.512.516a3.51 3.51 0 00-1.116 1.332c-.276.552-.414 1.116-.414 1.692 0 .56.162 1.008.486 1.344.324.336.756.504 1.296.504.404 0 .774-.09 1.11-.27.234-.128.452-.296.654-.504-.048.228-.068.42-.068.576 0 .22.074.398.222.534.148.136.348.204.6.204.48 0 .942-.144 1.386-.432a3.138 3.138 0 001.008-.99c.252-.408.378-.856.378-1.23 0-.376-.122-.684-.366-.924-.244-.24-.604-.36-1.08-.36-.14 0-.302.014-.486.042l.12-.516h.924l.768-3.504z" />
                                        </svg>
                                        Launch Canva Editor
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="gap-2"
                                        asChild
                                    >
                                        <a href={selectedTemplate.canvaUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="size-4" />
                                        </a>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Design result card */}
                        {createdDesign && (
                            <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <Check className="size-4 text-primary" />
                                        Design Created!
                                    </h4>
                                    <span className="text-xs text-muted-foreground font-mono">{createdDesign.id}</span>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1.5"
                                        onClick={openCanvaPopup}
                                    >
                                        <Link2 className="size-3.5" />
                                        Edit in Canva
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="gap-1.5"
                                        onClick={handleExportDesign}
                                        disabled={isExporting}
                                    >
                                        {isExporting ? (
                                            <>
                                                <Loader2 className="size-3.5 animate-spin" />
                                                Exporting...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="size-3.5" />
                                                Export as PNG
                                            </>
                                        )}
                                    </Button>
                                </div>
                                {exportUrl && (
                                    <div className="mt-3 pt-3 border-t border-primary/10">
                                        <a
                                            href={exportUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:underline flex items-center gap-1.5"
                                        >
                                            <Download className="size-3" />
                                            Download your exported design
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Error display */}
                        {error && (
                            <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                                <p className="text-xs text-destructive">{error}</p>
                            </div>
                        )}

                        <div className="grid gap-5 sm:grid-cols-2">
                            {/* Tips */}
                            <div>
                                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <Sparkles className="size-3.5 text-primary" />
                                    Design Tips
                                </h4>
                                <ul className="space-y-2">
                                    {selectedTemplate.tips.map((tip, i) => (
                                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary mt-0.5 shrink-0">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* AI Prompt Ideas */}
                            <div>
                                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <Palette className="size-3.5 text-chart-4" />
                                    AI Prompt Ideas
                                </h4>
                                <ul className="space-y-2">
                                    {selectedTemplate.prompts.map((prompt, i) => (
                                        <li
                                            key={i}
                                            className="group text-xs text-muted-foreground bg-secondary/80 rounded-md px-3 py-2 font-mono cursor-pointer hover:bg-secondary transition-colors flex items-center justify-between gap-2"
                                            onClick={() => handleCopyPrompt(prompt, i)}
                                            title="Click to copy"
                                        >
                                            <span>&ldquo;{prompt}&rdquo;</span>
                                            {copiedPrompt === i ? (
                                                <Check className="size-3 text-primary shrink-0" />
                                            ) : (
                                                <Copy className="size-3 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-muted-foreground/60 mt-2 italic">Click a prompt to copy → paste into Canva&apos;s Magic Media</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
