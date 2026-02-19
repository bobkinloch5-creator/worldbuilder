import fs from "fs"
import path from "path"

const TOKEN_FILE = path.join(process.cwd(), "canva-tokens.json")

const CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID || ""
const CANVA_CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET || ""

export interface CanvaTokens {
    access_token: string
    refresh_token: string
    expires_at: number
}

export function getStoredTokens(): CanvaTokens | null {
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            const data = fs.readFileSync(TOKEN_FILE, "utf-8")
            return JSON.parse(data) as CanvaTokens
        }
    } catch {
        // ignore
    }
    return null
}

export function storeTokens(tokens: CanvaTokens): void {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2), "utf-8")
}

export async function getValidAccessToken(): Promise<string | null> {
    const tokens = getStoredTokens()
    if (!tokens) return null

    // If token expires within 5 minutes, refresh
    if (Date.now() > tokens.expires_at - 5 * 60 * 1000) {
        const refreshed = await refreshAccessToken(tokens.refresh_token)
        if (!refreshed) return null
        return refreshed.access_token
    }

    return tokens.access_token
}

async function refreshAccessToken(
    refreshToken: string
): Promise<CanvaTokens | null> {
    try {
        const res = await fetch("https://api.canva.com/rest/v1/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                    `${CANVA_CLIENT_ID}:${CANVA_CLIENT_SECRET}`
                ).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        })

        if (!res.ok) {
            console.error("Failed to refresh token:", await res.text())
            return null
        }

        const data = await res.json()
        const tokens: CanvaTokens = {
            access_token: data.access_token,
            refresh_token: data.refresh_token || refreshToken,
            expires_at: Date.now() + data.expires_in * 1000,
        }
        storeTokens(tokens)
        return tokens
    } catch (err) {
        console.error("Token refresh error:", err)
        return null
    }
}

export function getCanvaClientId(): string {
    return CANVA_CLIENT_ID
}

export function getCanvaClientSecret(): string {
    return CANVA_CLIENT_SECRET
}
