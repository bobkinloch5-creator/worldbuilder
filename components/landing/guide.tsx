"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Code, Box, Paintbrush, Users, Globe, Puzzle, CheckCircle2, AlertTriangle, Lightbulb, Rocket } from "lucide-react"

const guideItems = [
    {
        id: "scripts",
        icon: Code,
        title: "LSL Scripts",
        generates: "Complete, copy-paste ready LSL scripts with configuration variables, event handlers, and implementation comments.",
        tips: [
            "Be specific in the behavior description — mention exact triggers, responses, and effects",
            "Use chat channel 0 for public messages, or pick a unique negative channel for private inter-object communication",
            "Add extra features like sound or particles to make objects feel more alive",
        ],
        implementation: [
            "Open your virtual world viewer and rez (create) a new prim",
            "Right-click the prim → Edit → Content tab",
            "Click 'New Script', delete the default code, and paste the generated LSL",
            "Save the script — it compiles and runs automatically",
            "Replace any placeholder UUIDs (00000000-...) with your actual asset UUIDs",
        ],
        mistakes: [
            "Forgetting to replace placeholder UUIDs with real sound/texture keys",
            "Using channel 0 for inter-object communication (use negative channels instead)",
            "Not testing permissions — some functions require owner or avatar permissions",
        ],
    },
    {
        id: "prefabs",
        icon: Box,
        title: "Prefabs & Objects",
        generates: "Step-by-step building plans with exact prim dimensions, texturing guides, and linking instructions.",
        tips: [
            "Specify exact dimensions in WxDxH format (e.g., 10x10x4 meters)",
            "Set a realistic max prim count — most parcels have limits",
            "Mention the style early; it affects texture and material recommendations",
        ],
        implementation: [
            "Follow each building step in order — start with the base",
            "Use the Edit tool position fields for precise placement",
            "Apply textures as described in the Texture Guide section",
            "Link all prims together (Ctrl+L) with the base as root",
            "Name the final linked object and set permissions",
        ],
        mistakes: [
            "Building too large for your parcel's prim allowance",
            "Forgetting to set phantom on decorative-only prims",
            "Not linking objects — loose prims use more Land Impact",
        ],
    },
    {
        id: "textures",
        icon: Paintbrush,
        title: "Textures & Mesh",
        generates: "Detailed art briefs for 3D artists: visual style, color palette, resolution specs, optimization tips, and file format requirements.",
        tips: [
            "Specify the visual style clearly — \"PBR realistic\" vs. \"hand-painted cartoon\" produce very different results",
            "Include color palette descriptions with specific tones",
            "Mention where the texture will be used — this affects resolution recommendation",
        ],
        implementation: [
            "Share the generated brief with your 3D artist or use it as a Blender reference",
            "For textures: save as PNG/TGA, upload in-world (Build > Upload > Image)",
            "For meshes: export as .dae (COLLADA), upload via Build > Upload > Model",
            "Test at multiple distances to verify LOD levels look correct",
            "Use recommended file naming conventions for organization",
        ],
        mistakes: [
            "Using 2048x2048 textures on small objects — wasteful and laggy",
            "Forgetting to create LOD levels for mesh objects",
            "Not making textures seamlessly tileable when they need to repeat",
        ],
    },
    {
        id: "npcs",
        icon: Users,
        title: "NPCs & Systems",
        generates: "Complete NPC behavior scripts with dialog menus, sensor detection, pathfinding, and personality-driven dialog text.",
        tips: [
            "Match NPC type to your use case — a greeter behaves differently than a guard",
            "Personality choice directly affects all dialog strings in the output",
            "Select 'All Features' to get the most comprehensive NPC script",
        ],
        implementation: [
            "Create a prim or rez a mesh avatar to serve as the NPC body",
            "Name the object to match the NPC name from the script",
            "Drop the script into the object's Content tab",
            "Add any referenced inventory items (notecards, objects to give)",
            "Replace placeholder animation names with your actual animation names",
            "Test by touching the NPC and navigating through dialog menus",
        ],
        mistakes: [
            "Not adjusting scan range — 10m default may be too small for large areas",
            "Forgetting to add items to inventory that the NPC is supposed to give",
            "Using the same menu channel for multiple NPCs (each uses random channels by default, which is correct)",
        ],
    },
    {
        id: "worlds",
        icon: Globe,
        title: "World Layouts",
        generates: "Full region/parcel layout plans with zone breakdowns, coordinates, pathway connections, landmark listings, land settings, and prim budget allocation.",
        tips: [
            "Start with the right layout size — full regions have 15,000 prims, parcels have less",
            "Choose a theme that matches your vision; it affects zone names and windlight settings",
            "Check multiple features to get the most comprehensive plan",
        ],
        implementation: [
            "Use the zone coordinates to plan your build areas",
            "Set terrain height using the Region/Estate tools",
            "Configure windlight/EEP as recommended in the Land Settings section",
            "Build spawn/landing points first, then work outward by zone",
            "Use the prim budget per zone to guide your building density",
        ],
        mistakes: [
            "Exceeding the total prim budget — plan carefully before building",
            "Not setting up a landing point — visitors need a clear arrival area",
            "Ignoring pathway connections — visitors should flow naturally between zones",
        ],
    },
    {
        id: "modules",
        icon: Puzzle,
        title: "Modular Systems",
        generates: "Reusable building system configs with component inventories, assembly instructions, configuration scripts, and scaling guidelines.",
        tips: [
            "Pick the right system type for your needs — wall kits vs. lighting rigs have very different outputs",
            "Enable 'Inter-Module Communication' for systems that need to sync states",
            "Include 'Color Change' for user-customizable kits",
        ],
        implementation: [
            "Rez the modules one at a time, starting with Module 1 as your reference",
            "Drop the configuration script into each module's Content tab",
            "Set unique MODULE_ID values (1, 2, 3...) in each script",
            "Use grid snap for precise alignment between modules",
            "Link modules into logical groups, keeping groups under 256 prims",
            "Test color change and communication features before distributing",
        ],
        mistakes: [
            "Using the same MODULE_ID in multiple modules — each must be unique",
            "Linking too many prims together (max 256 per link set)",
            "Not testing inter-module communication with multiple instances rezzed",
        ],
    },
]

export function Guide() {
    return (
        <section id="guide" className="px-6 py-20 lg:py-32 bg-secondary/20">
            <div className="mx-auto max-w-4xl">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                        Guide
                    </p>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        How to use this tool
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
                        Everything you need to know about each generator tab — from crafting
                        the perfect input to deploying the output in your virtual world.
                    </p>
                </div>

                <Accordion type="multiple" className="space-y-3">
                    {guideItems.map((item) => (
                        <AccordionItem
                            key={item.id}
                            value={item.id}
                            className="rounded-xl border border-border bg-card px-6 overflow-hidden"
                        >
                            <AccordionTrigger className="py-4 hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                                        <item.icon className="size-4" />
                                    </div>
                                    <span className="text-base font-semibold text-foreground">
                                        {item.title}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6">
                                <div className="space-y-5 pt-2">
                                    {/* What it generates */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Rocket className="size-4 text-primary" />
                                            <h4 className="text-sm font-semibold text-foreground">What it generates</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground pl-6">{item.generates}</p>
                                    </div>

                                    {/* Best practices */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Lightbulb className="size-4 text-chart-4" />
                                            <h4 className="text-sm font-semibold text-foreground">Best practices for input</h4>
                                        </div>
                                        <ul className="space-y-1.5 pl-6">
                                            {item.tips.map((tip, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary mt-1 shrink-0">•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Implementation steps */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            <h4 className="text-sm font-semibold text-foreground">After you generate</h4>
                                        </div>
                                        <ol className="space-y-1.5 pl-6">
                                            {item.implementation.map((step, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary mt-0.5 shrink-0 font-mono text-xs">{i + 1}.</span>
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    {/* Common mistakes */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="size-4 text-destructive" />
                                            <h4 className="text-sm font-semibold text-foreground">Common mistakes to avoid</h4>
                                        </div>
                                        <ul className="space-y-1.5 pl-6">
                                            {item.mistakes.map((mistake, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-destructive mt-1 shrink-0">⚠</span>
                                                    {mistake}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
