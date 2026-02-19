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

// Expanded library of high-quality GLB models from Khronos Group
// These serve as "generated" previews matching the user's intent as closely as possible
const MODEL_LIBRARY: Record<string, { url: string; scale: number; label: string; keywords: string[] }> = {
    // --- Vehicles ---
    "CarConcept": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb",
        scale: 0.008,
        label: "Concept Car",
        keywords: ["car", "vehicle", "auto", "automobile", "sportscar", "racing", "drive"],
    },
    "ToyCar": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb",
        scale: 15,
        label: "Vintage Toy Car",
        keywords: ["toy", "miniature", "vintage", "buggy"],
    },
    "CesiumMilkTruck": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb",
        scale: 0.3,
        label: "Display Truck",
        keywords: ["truck", "lorry", "delivery", "van"],
    },

    // --- Furniture & Interior ---
    "GlamVelvetSofa": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb",
        scale: 1.2,
        label: "Velvet Sofa",
        keywords: ["sofa", "couch", "seat", "lounge", "furniture", "living room"],
    },
    "SheenChair": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb",
        scale: 1.5,
        label: "Designer Chair",
        keywords: ["chair", "stool", "sitting", "seat"],
    },
    "StainedGlassLamp": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/StainedGlassLamp/glTF-Binary/StainedGlassLamp.glb",
        scale: 1.5,
        label: "Stained Glass Lamp",
        keywords: ["lamp", "light", "lantern", "illumination", "bulb"],
    },
    "AntiqueCamera": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb",
        scale: 0.5,
        label: "Antique Camera",
        keywords: ["camera", "photo", "film", "antique", "retro"],
    },

    // --- Clothing & Accessories ---
    "MaterialsVariantsShoe": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
        scale: 3,
        label: "Sneaker",
        keywords: ["shoe", "sneaker", "boot", "footwear", "clothing", "gear"],
    },
    "Corset": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Corset/glTF-Binary/Corset.glb",
        scale: 15,
        label: "Vintage Corset",
        keywords: ["corset", "dress", "clothing", "wear", "top", "shirt"],
    },
    "FlightHelmet": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/FlightHelmet/glTF-Binary/FlightHelmet.glb",
        scale: 0.8,
        label: "Flight Helmet",
        keywords: ["helmet", "hat", "cap", "headwear", "armor", "military"],
    },

    // --- Sci-Fi & Fantasy ---
    "SciFiHelmet": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SciFiHelmet/glTF-Binary/SciFiHelmet.glb",
        scale: 1.2,
        label: "Sci-Fi Helmet",
        keywords: ["sci-fi", "space", "cyber", "futuristic", "robot", "tech"],
    },
    "DragonAttenuation": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DragonAttenuation/glTF-Binary/DragonAttenuation.glb",
        scale: 1,
        label: "Crystal Dragon",
        keywords: ["dragon", "monster", "creature", "beast", "fantasy", "scales"],
    },

    // --- Nature & Environment ---
    "Fox": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Fox/glTF-Binary/Fox.glb",
        scale: 0.015,
        label: "Low Poly Fox",
        keywords: ["fox", "animal", "pet", "dog", "cat", "nature", "wild"],
    },
    "Avocado": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb",
        scale: 8,
        label: "Avocado",
        keywords: ["food", "fruit", "vegetable", "plant", "organic"],
    },

    // --- Architecture ---
    "Sponza": { // Use specific building parts if full scene is too heavy? No, Sponza might be too big. Using a simpler structure.
        // Switching to a simpler prop for 'house' for now until finding a good lightweight building
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Lantern/glTF-Binary/Lantern.glb",
        scale: 0.04,
        label: "Japanese Lantern", // Placeholder for structures for now
        keywords: ["house", "building", "structure", "temple", "tower", "home"],
    },

    // --- Misc ---
    "BoomBox": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoomBox/glTF-Binary/BoomBox.glb",
        scale: 30,
        label: "Vintage BoomBox",
        keywords: ["radio", "music", "audio", "speaker", "electronics"],
    },
    "Duck": {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb",
        scale: 1.5,
        label: "Rubber Duck",
        keywords: ["duck", "bird", "toy", "water"],
    },
}

// Fallback model if no keywords match
const DEFAULT_MODEL = MODEL_LIBRARY["SciFiHelmet"]

// Smart matching function
function getModelFromPrompt(prompt: string) {
    if (!prompt || prompt.length < 2) return DEFAULT_MODEL

    const lowercasePrompt = prompt.toLowerCase()

    // Find the first model that has a keyword in the prompt
    // Sort by keyword length to match "sports car" before "car" if needed (not implemented here but good to know)
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

            {/* Use key to force remount when URL changes - solving the 'stuck model' bug */}
            <Suspense fallback={<LoadingSpinner />}>
                {/* Float animation for a more dynamic "AI Generated" feel */}
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
}

export function ModelPreview({ prompt }: ModelPreviewProps) {
    const modelData = useMemo(() => getModelFromPrompt(prompt), [prompt])

    // Preload commonly used models to ensure fast switching
    useEffect(() => {
        useGLTF.preload(MODEL_LIBRARY["CarConcept"].url)
        useGLTF.preload(MODEL_LIBRARY["SciFiHelmet"].url)
    }, [])

    return (
        <div
            className="w-full h-[360px] rounded-2xl overflow-hidden relative group border border-slate-700/50 shadow-2xl"
            style={{
                background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
            }}
        >
            {/* Dynamic Glow Overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.15), transparent 70%)",
                }}
            />

            {/* Grid Pattern Overlay */}
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

            {/* Interactivity Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-medium text-white/80 border border-white/10">
                    Right Click to Pan • Scroll to Zoom
                </div>
            </div>

            {/* Tech Badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-60 pointer-events-none">
                <div className="text-[10px] font-bold text-slate-500 tracking-wider">WEBGL</div>
            </div>
        </div>
    )
}
