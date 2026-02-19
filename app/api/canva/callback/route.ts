import { NextRequest, NextResponse } from "next/server"
import {
    getCanvaClientId,
    getCanvaClientSecret,
    storeTokens,
} from "@/lib/canva-tokens"

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code")

    if (!code) {
        return NextResponse.json(
            { error: "No authorization code received" },
            { status: 400 }
        )
    }

    const clientId = getCanvaClientId()
    const clientSecret = getCanvaClientSecret()
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/canva/callback`

    try {
        // Exchange authorization code for tokens
        const res = await fetch("https://api.canva.com/rest/v1/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                    `${clientId}:${clientSecret}`
                ).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
            }),
        })

        if (!res.ok) {
            const error = await res.text()
            console.error("Token exchange failed:", error)
            return NextResponse.json(
                { error: "Failed to exchange code for token" },
                { status: 500 }
            )
        }

        const data = await res.json()

        // Store tokens
        storeTokens({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: Date.now() + data.expires_in * 1000,
        })

        // Redirect back to the site with success
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        return NextResponse.redirect(
            `${baseUrl}/?canva=connected#canva-studio`
        )
    } catch (err) {
        console.error("OAuth callback error:", err)
        return NextResponse.json(
            { error: "OAuth callback failed" },
            { status: 500 }
        )
    }
}
