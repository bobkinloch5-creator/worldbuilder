import { NextRequest, NextResponse } from "next/server"
import { getValidAccessToken } from "@/lib/canva-tokens"

export async function POST(req: NextRequest) {
    const token = await getValidAccessToken()
    if (!token) {
        return NextResponse.json(
            { error: "Canva not connected" },
            { status: 401 }
        )
    }

    try {
        const body = await req.json()
        const { design_id, format = "png", quality = 80, width, height } = body

        if (!design_id) {
            return NextResponse.json(
                { error: "design_id is required" },
                { status: 400 }
            )
        }

        // Build export format
        let exportFormat: Record<string, unknown>
        if (format === "pdf") {
            exportFormat = {
                type: "pdf",
                export_quality: "pro",
            }
        } else if (format === "jpg") {
            exportFormat = {
                type: "jpg",
                quality: quality || 90,
                export_quality: "pro",
                ...(width ? { width } : {}),
                ...(height ? { height } : {}),
            }
        } else {
            exportFormat = {
                type: "png",
                export_quality: "pro",
                ...(width ? { width } : {}),
                ...(height ? { height } : {}),
            }
        }

        // Create export job
        const res = await fetch("https://api.canva.com/rest/v1/exports", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                design_id,
                format: exportFormat,
            }),
        })

        if (!res.ok) {
            const error = await res.text()
            console.error("Create export failed:", error)
            return NextResponse.json(
                { error: "Failed to create export", details: error },
                { status: res.status }
            )
        }

        const data = await res.json()
        const jobId = data.job.id

        // Poll for completion (max 30 seconds)
        let attempts = 0
        while (attempts < 15) {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            attempts++

            const pollRes = await fetch(
                `https://api.canva.com/rest/v1/exports/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (!pollRes.ok) continue

            const pollData = await pollRes.json()

            if (pollData.job.status === "success") {
                return NextResponse.json({
                    success: true,
                    export: {
                        urls: pollData.job.urls,
                        status: "success",
                    },
                })
            }

            if (pollData.job.status === "failed") {
                return NextResponse.json(
                    {
                        error: "Export failed",
                        details: pollData.job.error,
                    },
                    { status: 500 }
                )
            }
        }

        // Timeout — return job ID so client can poll
        return NextResponse.json({
            success: false,
            job_id: jobId,
            status: "in_progress",
            message: "Export is still processing. Try polling later.",
        })
    } catch (err) {
        console.error("Export error:", err)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
