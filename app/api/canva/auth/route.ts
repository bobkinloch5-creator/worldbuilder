import { NextResponse } from "next/server"
import { getCanvaClientId } from "@/lib/canva-tokens"

export async function GET() {
    const clientId = getCanvaClientId()

    if (!clientId) {
        return NextResponse.json(
            { error: "CANVA_CLIENT_ID not configured" },
            { status: 500 }
        )
    }

    // Build the Canva OAuth authorization URL
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/canva/callback`

    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "design:content:write design:content:read design:meta:read asset:write asset:read profile:read",
        state: crypto.randomUUID(),
    })

    const authUrl = `https://www.canva.com/api/oauth/authorize?${params.toString()}`

    return NextResponse.redirect(authUrl)
}
