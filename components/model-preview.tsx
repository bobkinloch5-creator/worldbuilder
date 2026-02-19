"use client"

import { useRef, Suspense, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
    OrbitControls,
    Environment,
    ContactShadows,
    useGLTF,
    Center,
    Grid,
    Html,
    Float,
} from "@react-three/drei"
import * as THREE from "three"
import { Loader2 } from "lucide-react"

// Expanded library using reliable PMNDRS Market assets (Supabase CDN)
// These are standard, optimized assets for React Three Fiber examples.
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

// Smart matching function
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
            <primitive
                object={scene}
                scale={scale}
                rotation={[0, -Math.PI / 4, 0]}
            />
        </Center>
    )
}

function LoadingSpinner() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-3 text-emerald-400 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-emerald-500/30 shadow-xl">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium tracking-wide">Generating Preview...</span>
            </div>
        </Html>
    )
}

function Scene({ modelData }: { modelData: { url: string; scale: number; } }) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow color="#ffffff" />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#a78bfa" />
            <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} color="#6EE7B7" />

            {/* Use key to force remount when URL changes */}
            <Suspense fallback={<LoadingSpinner />}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                    <LoadedModel key={modelData.url} url={modelData.url} scale={modelData.scale} />
                </Float>
            </Suspense>

            <Grid
                args={[30, 30]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor="#334155"
                sectionSize={2.5}
                sectionThickness={1}
                sectionColor="#475569"
                fadeDistance={20}
                fadeStrength={1}
                infiniteGrid
                position={[0, -1.5, 0]}
            />

            <ContactShadows
                position={[0, -1.49, 0]}
                opacity={0.7}
                scale={20}
                blur={2}
                far={4}
                color="#000000"
            />

            <Environment preset="city" blur={0.8} />

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                minDistance={2}
                maxDistance={10}
                autoRotate={true}
                autoRotateSpeed={0.5}
                makeDefault
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

    // Preload commonly used models to ensure fast switching
    useEffect(() => {
        useGLTF.preload(MODEL_LIBRARY["Astro"].url)
        useGLTF.preload(MODEL_LIBRARY["Duck"].url)
    }, [])

    return (
        <div
            className="w-full h-[360px] rounded-2xl overflow-hidden relative group border border-slate-700/50 shadow-2xl"
            style={{
                background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
            }}
        >
            {/* Glow Overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.15), transparent 70%)",
                }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* 3D Scene */}
            <Canvas
                camera={{ position: [3, 2, 4], fov: 45 }}
                shadows
                gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
                className="cursor-move"
            >
                <Scene modelData={modelData} />
            </Canvas>

            {/* Info Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50 shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-200">AI Preview Active</span>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/30 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-400">ASSET:</span>
                    <span className="text-xs text-slate-300">{modelData.label}</span>
                </div>
            </div>

            {/* Tech Badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-60 pointer-events-none">
                <div className="text-[10px] font-bold text-slate-500 tracking-wider">WEBGL</div>
            </div>
        </div>
    )
}
