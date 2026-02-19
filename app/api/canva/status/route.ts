import { NextResponse } from "next/server"
import { getStoredTokens } from "@/lib/canva-tokens"

export async function GET() {
    const tokens = getStoredTokens()

    return NextResponse.json({
        connected: !!tokens,
        expires_at: tokens?.expires_at || null,
        has_client_id: !!process.env.CANVA_CLIENT_ID,
    })
}
