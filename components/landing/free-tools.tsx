import { ExternalLink, Box, Sparkles, Wand2, Palette } from "lucide-react"

const tools3D = [
    {
        name: "Meshy AI",
        url: "https://meshy.ai",
        description: "Text-to-3D and image-to-3D model generation. Free tier available. Great for quick game assets.",
        tags: ["Text-to-3D", "Image-to-3D", "Free Tier"],
    },
    {
        name: "Tripo AI",
        url: "https://tripo3d.ai",
        description: "Generate high-quality 3D models from text or images. Free plan with up to 10 models/month.",
        tags: ["Text-to-3D", "Free Plan", "GLB Export"],
    },
    {
        name: "HexaGen",
        url: "https://hexa3d.io",
        description: "Free online text-to-3D generator with PBR materials, adjustable resolution up to 4K.",
        tags: ["PBR", "Free", "High-Res"],
    },
    {
        name: "Fast3D",
        url: "https://fast3d.io",
        description: "Quick AI 3D model generation from text or images. No login required to start.",
        tags: ["No Login", "Fast", "Free Trial"],
    },
    {
        name: "Magic 3D",
        url: "https://magic3d.io",
        description: "AI text-to-3D generator. 30 free credits on signup. Good for simple objects and props.",
        tags: ["Free Credits", "Text-to-3D"],
    },
    {
        name: "Canva Pro ⭐",
        url: "https://www.canva.com/ai",
        description: "Full Pro suite — unlimited Magic Media, Dream Lab, AI image & 3D generation, background remover, and batch resize for textures.",
        tags: ["Pro Active", "Magic Media", "Dream Lab", "AI Textures"],
    },
    {
        name: "Blender (Free)",
        url: "https://blender.org",
        description: "Industry-standard open-source 3D modeling. Fully free. Export to .dae for virtual world upload.",
        tags: ["Open Source", "Professional", "DAE Export"],
    },
]

const toolsAI = [
    {
        name: "ChatGPT (Free)",
        url: "https://chat.openai.com",
        description: "Generate LSL code, brainstorm world designs, write NPC dialog, and create asset descriptions.",
        tags: ["Code Gen", "Free Tier", "Dialog Writing"],
        prompts: [
            "Write an LSL script that makes a prim glow when touched",
            "Create dialog for a medieval shopkeeper NPC",
            "Describe a sci-fi space station region layout",
        ],
    },
    {
        name: "Google Gemini (Free)",
        url: "https://gemini.google.com",
        description: "AI assistant for code generation, creative writing, and world-building ideas.",
        tags: ["Code Gen", "Free", "Creative"],
        prompts: [
            "Generate a color change menu script in LSL",
            "Help me plan a fantasy village layout for a 256x256 region",
            "Write a backstory for an NPC quest-giver",
        ],
    },
    {
        name: "Claude (Free Tier)",
        url: "https://claude.ai",
        description: "Excellent for code review, debugging LSL scripts, and generating detailed building plans.",
        tags: ["Code Review", "Debugging", "Free Tier"],
        prompts: [
            "Review this LSL script for memory optimization",
            "Help me debug why my listener isn't responding",
            "Create a modular furniture system design doc",
        ],
    },
    {
        name: "Microsoft Copilot (Free)",
        url: "https://copilot.microsoft.com",
        description: "AI-powered coding assistant. Generate and explain LSL scripts with code context.",
        tags: ["Coding", "Free", "Explanations"],
        prompts: [
            "Explain how llSetPrimitiveParams works in LSL",
            "Write a particle system script for fire effects",
            "Create a teleporter network with menu selection",
        ],
    },
    {
        name: "Canva Pro AI Studio ⭐",
        url: "https://www.canva.com/ai",
        description: "Your Pro account unlocks unlimited AI generations. Use Magic Media for textures, Dream Lab for concept art, and bulk export assets at any resolution.",
        tags: ["Pro Active", "Unlimited Gen", "Bulk Export", "Concept Art"],
        prompts: [
            "Generate a seamless cobblestone texture for a medieval path",
            "Create a neon sign design for a cyberpunk nightclub",
            "Design a fantasy treasure chest icon for an NPC shop",
            "Generate a PBR wood plank texture, tileable, 2048x2048",
            "Create a sci-fi holographic display panel for a space station",
        ],
    },
]

export function FreeTools() {
    return (
        <section id="tools" className="px-6 py-20 lg:py-32 bg-secondary/20">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                        Free Tools
                    </p>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Supercharge your workflow
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
                        Free 3D model generators and AI assistants to complement the SL Builder. Generate
                        models, get coding help, and brainstorm world designs — all without spending a dime.
                    </p>
                </div>

                {/* 3D Model Tools */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <Box className="size-5 text-primary" />
                        <h3 className="text-xl font-bold text-foreground">Free 3D Model Generators</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {tools3D.map((tool) => (
                            <a
                                key={tool.name}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {tool.name}
                                    </h4>
                                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {tool.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* AI Prompt Tools */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="size-5 text-primary" />
                        <h3 className="text-xl font-bold text-foreground">Free AI Assistants & Prompts</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {toolsAI.map((tool) => (
                            <div
                                key={tool.name}
                                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                                    >
                                        {tool.name}
                                        <ExternalLink className="size-3.5 text-muted-foreground" />
                                    </a>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {tool.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {"prompts" in tool && tool.prompts && (
                                    <div className="border-t border-border pt-3 mt-3">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Wand2 className="size-3 text-muted-foreground" />
                                            <span className="text-xs font-medium text-muted-foreground">Example Prompts</span>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {tool.prompts.map((prompt, i) => (
                                                <li
                                                    key={i}
                                                    className="text-xs text-muted-foreground bg-secondary/80 rounded-md px-3 py-1.5 font-mono"
                                                >
                                                    "{prompt}"
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
