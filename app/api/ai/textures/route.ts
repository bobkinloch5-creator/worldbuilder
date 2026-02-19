
import { NextResponse } from 'next/server';

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

// Force texture generation to be seamless and game-ready
const SYSTEM_PROMPT_PREFIX = "seamless texture, tileable, game asset, 4k, high detail, ";
const NEGATIVE_PROMPT = "blurry, low quality, watermark, text, signature, cartoon, disney, copyrighted, character, face, messy, distorted";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.HUGGING_FACE_TOKEN;
        if (!apiKey) {
            return NextResponse.json({ error: 'Server configuration error: Missing API Key' }, { status: 500 });
        }

        // Prepare the payload for Hugging Face Inference API
        const response = await fetch(HUGGING_FACE_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: `${SYSTEM_PROMPT_PREFIX}${prompt}`,
                parameters: {
                    negative_prompt: NEGATIVE_PROMPT,
                    width: 1024,
                    height: 1024,
                    num_inference_steps: 30, // Good balance for speed/quality on Inference API
                    guidance_scale: 7.5,
                },
                options: {
                    wait_for_model: true,
                    use_cache: false
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Hugging Face API Error:", response.status, errorText);
            return NextResponse.json(
                { error: `Hugging Face API Error: ${response.statusText}`, details: errorText },
                { status: response.status }
            );
        }

        // The Inference API returns the raw image blob directly on success for this endpoint
        const imageBuffer = await response.arrayBuffer();

        // Convert to base64 to send back to client
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        const dataUrl = `data:image/png;base64,${base64Image}`;

        return NextResponse.json({
            image: dataUrl,
            prompt: prompt,
            metadata: {
                model: "stable-diffusion-xl-base-1.0",
                resolution: "1024x1024",
                tileable: true
            }
        });

    } catch (error) {
        console.error('Texture Generation Error:', error);
        return NextResponse.json(
            { error: 'Internal server error during texture generation' },
            { status: 500 }
        );
    }
}
