import { cookies } from "next/headers"

// Cookie names
const ACCESS_TOKEN_COOKIE = "canva_access_token"
const REFRESH_TOKEN_COOKIE = "canva_refresh_token"
const EXPIRES_AT_COOKIE = "canva_expires_at"

const CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID || ""
const CANVA_CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET || ""

export interface CanvaTokens {
    access_token: string
    refresh_token: string
    expires_at: number
}

export async function getStoredTokens(): Promise<CanvaTokens | null> {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value
    const expiresAt = cookieStore.get(EXPIRES_AT_COOKIE)?.value

    if (accessToken && refreshToken && expiresAt) {
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: parseInt(expiresAt, 10),
        }
    }
    return null
}

export async function storeTokens(tokens: CanvaTokens): Promise<void> {
    const cookieStore = await cookies()
    const maxAge = 60 * 60 * 24 * 30 // 30 days

    cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge
    })
    cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge
    })
    cookieStore.set(EXPIRES_AT_COOKIE, tokens.expires_at.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge
    })
}

export async function clearTokens(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_TOKEN_COOKIE)
    cookieStore.delete(REFRESH_TOKEN_COOKIE)
    cookieStore.delete(EXPIRES_AT_COOKIE)
}

export async function getValidAccessToken(): Promise<string | null> {
    const tokens = await getStoredTokens()
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
        await storeTokens(tokens)
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
