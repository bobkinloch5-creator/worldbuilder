import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const apiKey = process.env.OPENROUTER_API_KEY
    console.log("API Key check:", apiKey ? "Exists" : "Missing")

    if (!apiKey) {
        return NextResponse.json(
            { error: "API key not configured" },
            { status: 500 }
        )
    }

    try {
        const { prompt, category } = await req.json()

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { error: "Missing or invalid prompt" },
                { status: 400 }
            )
        }

        const systemPrompt = getSystemPrompt(category)

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://sl-builder.vercel.app",
                    "X-Title": "SL Builder",
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-chat-v3-0324:free",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt },
                    ],
                    max_tokens: 4000,
                    temperature: 0.7,
                }),
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error("OpenRouter error:", errorText)
            return NextResponse.json(
                { error: "AI generation failed. Please try again." },
                { status: response.status }
            )
        }

        const data = await response.json()
        const content =
            data.choices?.[0]?.message?.content || "No response generated."

        return NextResponse.json({ content })
    } catch (error) {
        console.error("AI route error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

function getSystemPrompt(category?: string): string {
    const base = `You are an expert LSL (Linden Scripting Language) developer and virtual world builder. You generate production-ready code and detailed building plans for virtual worlds.

Rules:
- Generate clean, well-commented, optimized LSL code
- Include configuration variables at the top of scripts
- Add implementation instructions as comments
- Follow LSL best practices (efficient memory use, proper event handling)
- Never use deprecated LSL functions
- Include error handling where appropriate`

    const categoryPrompts: Record<string, string> = {
        scripts: `${base}

Focus: Generate complete, copy-paste ready LSL scripts. Include:
- Configuration section with adjustable variables
- Proper event handlers (state_entry, touch_start, listen, timer, etc.)
- Comments explaining each section
- A Quick Start checklist at the bottom`,

        prefabs: `${base}

Focus: Generate detailed building plans for in-world objects. Include:
- Exact prim dimensions in meters (W x D x H)
- Step-by-step building instructions
- Texture and material recommendations
- Linking order and hierarchy
- Material shopping list`,

        textures: `${base}

Focus: Generate detailed art briefs for 3D artists. Include:
- Visual style description
- Color palette with specific hex/values
- Resolution and format recommendations
- Optimization tips for virtual world upload
- File naming conventions`,

        npcs: `${base}

Focus: Generate complete NPC behavior systems in LSL. Include:
- Dialog menu system using llDialog
- Sensor-based detection and greeting
- Personality-driven response text
- Inventory management (giving items, notecards)
- Testing checklist`,

        worlds: `${base}

Focus: Generate region and parcel layout plans. Include:
- Zone breakdown with coordinates
- Terrain and windlight recommendations
- Prim budget allocation per zone
- Pathway connections between zones
- Landmark and POI listings`,

        modules: `${base}

Focus: Generate modular building system configurations. Include:
- Component inventory with prim counts
- Assembly instructions
- Inter-module communication scripts
- Color change / texture swap menus
- Scaling guidelines`,

        models: `${base}

Focus: You are a 3D modeling expert specializing in COST-EFFECTIVE Second Life assets. Your #1 priority is keeping Land Impact (LI) as low as possible to minimize upload costs (L$) and land usage. Generate a comprehensive design brief and step-by-step modeling guide. Include:

COST OPTIMIZATION (CRITICAL):
- Target under 5,000 triangles for LOD0 (highest detail) — this keeps LI ≤ 1-2
- Provide a LOD chain: LOD0 (full), LOD1 (50% reduction), LOD2 (75% reduction), LOD3 (lowest, convex hull or 100-200 tris)
- Physics shape should be the simplest convex hull possible
- Estimate the upload cost in L$ and the resulting Land Impact
- Suggest ways to fake detail with normal maps instead of extra geometry

GEOMETRY:
- Exact triangle budget for each LOD level
- Clean topology with no n-gons, no interior faces, no overlapping verts
- Efficient UV layout — single texture atlas when possible (1024x1024 max)

TEXTURES:
- Maps needed: diffuse, normal, specular (keep total texture memory low)
- Use texture atlasing to combine multiple materials into one
- Recommend 512x512 for small objects, 1024x1024 only for large/detailed items

EXPORT:
- Export as .DAE (COLLADA) for SL upload
- Include exact Blender/tool export settings
- SL-specific: set correct scale (1 unit = 1 meter), Y-up orientation

AI GENERATION PROMPT:
- A detailed "Prompt for Text-to-3D AI" section the user can copy into Meshy, CSM, or Tripo3D
- Emphasize "low poly, game-ready, clean topology, single UV island" in the prompt`,
    }

    return categoryPrompts[category || "scripts"] || categoryPrompts.scripts
}
