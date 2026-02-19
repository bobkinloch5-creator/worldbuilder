"use client"

import { useRef, Suspense, useMemo, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
    OrbitControls,
    Environment,
    ContactShadows,
    useGLTF,
    Center,
    Grid,
    Html,
    Float,
    SpotLight,
} from "@react-three/drei"
import * as THREE from "three"
import { Loader2, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Expanded library using reliable PMNDRS Market assets (Supabase CDN)
const MODEL_LIBRARY: Record<string, { url: string; scale: number; label: string; keywords: string[] }> = {
    // --- Vehicles ---
    "Lamborghini": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lamborghini/model.gltf",
        scale: 0.015,
        label: "Lamborghini",
        keywords: ["car", "vehicle", "auto", "automobile", "sportscar", "racing", "drive"],
    },
    "Truck": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/truck/model.gltf",
        scale: 0.5,
        label: "Delivery Truck",
        keywords: ["truck", "lorry", "delivery", "van"],
    },

    // --- Furniture & Interior ---
    "ClassicChair": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf",
        scale: 1,
        label: "Wooden Chair",
        keywords: ["chair", "seat", "stool", "sitting"],
    },
    "Sofa": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sofa/model.gltf",
        scale: 1.5,
        label: "Modern Sofa",
        keywords: ["sofa", "couch", "lounge", "furniture", "living room"],
    },
    "Bed": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bed-single/model.gltf",
        scale: 1,
        label: "Single Bed",
        keywords: ["bed", "sleep", "bedroom", "furniture"],
    },

    // --- Electronics & Misc ---
    "Macbook": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
        scale: 0.2,
        label: "Laptop",
        keywords: ["computer", "laptop", "pc", "mac", "tech", "electronics"],
    },
    "AntiqueCamera": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/camera-retro/model.gltf",
        scale: 1,
        label: "Retro Camera",
        keywords: ["camera", "photo", "film", "antique", "retro"],
    },

    // --- Nature ---
    "Tree": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf",
        scale: 0.5,
        label: "Lime Tree",
        keywords: ["tree", "plant", "nature", "leaves", "forest"],
    },
    "Duck": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf",
        scale: 1,
        label: "Rubber Duck",
        keywords: ["duck", "bird", "toy", "water", "animal"],
    },

    // --- Sci-Fi / Space ---
    "Astro": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/astronaut/model.gltf",
        scale: 1,
        label: "Astronaut",
        keywords: ["space", "sci-fi", "astronaut", "helmet", "suit", "cosmos"],
    },

    // --- Buildings ---
    "House": {
        url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/house/model.gltf",
        scale: 3,
        label: "Small House",
        keywords: ["house", "building", "home", "structure"],
    },
}

// Fallback model
const DEFAULT_MODEL = MODEL_LIBRARY["Astro"]

function getModelFromPrompt(prompt: string) {
    if (!prompt || prompt.length < 2) return DEFAULT_MODEL
    const lowercasePrompt = prompt.toLowerCase()
    const matchedKey = Object.keys(MODEL_LIBRARY).find(key =>
        MODEL_LIBRARY[key].keywords.some(keyword => lowercasePrompt.includes(keyword))
    )
    return matchedKey ? MODEL_LIBRARY[matchedKey] : DEFAULT_MODEL
}

function LoadedModel({ url, scale }: { url: string; scale: number }) {
    const { scene } = useGLTF(url)
    return (
        <Center>
            <primitive object={scene} scale={scale} rotation={[0, -Math.PI / 4, 0]} />
        </Center>
    )
}

function LoadingSpinner() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2 text-primary animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-xs font-medium uppercase tracking-wider">Loading Asset...</span>
            </div>
        </Html>
    )
}

function Scene({ modelData }: { modelData: { url: string; scale: number; } }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <Suspense fallback={<LoadingSpinner />}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <LoadedModel key={modelData.url} url={modelData.url} scale={modelData.scale} />
                </Float>
            </Suspense>

            <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />
            <Environment preset="city" />

            <OrbitControls
                makeDefault
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minDistance={2}
                maxDistance={10}
            />
        </>
    )
}

interface ModelPreviewProps {
    prompt: string
    style?: string
}

export function ModelPreview({ prompt }: ModelPreviewProps) {
    const modelData = useMemo(() => getModelFromPrompt(prompt), [prompt])
    const [isExpanded, setIsExpanded] = useState(false)

    // Preload basic
    useEffect(() => {
        useGLTF.preload(MODEL_LIBRARY["Astro"].url)
    }, [])

    return (
        <div
            className={`relative transition-all duration-500 ease-in-out ${isExpanded
                    ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] rounded-3xl shadow-2xl ring-1 ring-white/10"
                    : "w-full h-[500px] mb-12 rounded-3xl"
                }`}
            style={{
                background: "radial-gradient(circle at center, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0) 70%)",
            }}
        >
            {/* Seamless Canvas - Floating effect */}
            <Canvas
                shadows
                camera={{ position: [4, 2, 5], fov: 40 }}
                gl={{ alpha: true, antialias: true }}
                className="!absolute inset-0 z-10"
            >
                <Scene modelData={modelData} />
            </Canvas>

            {/* Floating UI Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">
                    {modelData.label}
                </span>
                <div className="w-px h-4 bg-white/20" />
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
            </div>

            {/* Subtle Vignette for depth perception without hard borders */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[radial-gradient(transparent_40%,rgba(2,6,23,0.4)_100%)]" />
        </div>
    )
}
