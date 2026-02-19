import { NextRequest, NextResponse } from "next/server"
import { getValidAccessToken } from "@/lib/canva-tokens"

export async function POST(req: NextRequest) {
    const token = await getValidAccessToken()
    if (!token) {
        return NextResponse.json(
            {
                error: "Canva not connected",
                message:
                    "The site owner needs to authorize Canva. Visit /api/canva/auth to connect.",
            },
            { status: 401 }
        )
    }

    try {
        const body = await req.json()
        const { title, width, height, preset } = body

        // Build design type
        let design_type
        if (preset && ["doc", "whiteboard", "presentation"].includes(preset)) {
            design_type = { type: "preset", name: preset }
        } else {
            design_type = {
                type: "custom",
                width: width || 1024,
                height: height || 1024,
            }
        }

        // Create the design via Canva API
        const res = await fetch("https://api.canva.com/rest/v1/designs", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                design_type,
                title: title || "SL Builder Design",
            }),
        })

        if (!res.ok) {
            const error = await res.text()
            console.error("Create design failed:", error)
            return NextResponse.json(
                { error: "Failed to create design", details: error },
                { status: res.status }
            )
        }

        const data = await res.json()

        return NextResponse.json({
            success: true,
            design: {
                id: data.design.id,
                title: data.design.title,
                url: data.design.urls?.edit_url || data.design.urls?.view_url,
                thumbnail: data.design.thumbnail?.url,
                created_at: data.design.created_at,
            },
        })
    } catch (err) {
        console.error("Create design error:", err)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
