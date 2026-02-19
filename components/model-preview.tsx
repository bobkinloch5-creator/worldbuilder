"use client"

import { useRef, Suspense, useState, useCallback } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {
    OrbitControls,
    Environment,
    ContactShadows,
    useGLTF,
    Center,
    Grid,
    Html,
} from "@react-three/drei"
import * as THREE from "three"

// Free GLB models from reliable public CDNs
const MODEL_URLS: Record<string, { url: string; scale: number; label: string }> = {
    helmet: {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
        scale: 1.2,
        label: "Sci-Fi Helmet",
    },
    avocado: {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb",
        scale: 30,
        label: "Organic Model",
    },
    lantern: {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Lantern/glTF-Binary/Lantern.glb",
        scale: 0.04,
        label: "Lantern Prop",
    },
    duck: {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb",
        scale: 0.02,
        label: "Character Model",
    },
    boom_box: {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoomBox/glTF-Binary/BoomBox.glb",
        scale: 80,
        label: "Detailed Prop",
    },
    toy_car: {
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb",
        scale: 200,
        label: "Vehicle Model",
    },
}

// Map prompt keywords to model
function getModelFromPrompt(prompt: string): string {
    const lower = prompt.toLowerCase()
    if (/sword|weapon|blade|axe|dagger|armor|helmet|shield/.test(lower)) return "helmet"
    if (/car|ship|boat|vehicle|spaceship|plane|truck/.test(lower)) return "toy_car"
    if (/lamp|lantern|light|torch|candle|castle|tower|medieval/.test(lower)) return "lantern"
    if (/tree|plant|flower|bush|forest|fruit|food|organic/.test(lower)) return "avocado"
    if (/character|npc|animal|creature|pet|duck|bird/.test(lower)) return "duck"
    if (/radio|speaker|box|device|tech|gadget|furniture|chair|table/.test(lower)) return "boom_box"
    return "helmet" // Default to the impressive damaged helmet
}

function LoadedModel({ url, scale }: { url: string; scale: number }) {
    const { scene } = useGLTF(url)
    const ref = useRef<THREE.Group>(null)

    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.3
    })

    return (
        <group ref={ref}>
            <Center>
                <primitive object={scene.clone()} scale={scale} />
            </Center>
        </group>
    )
}

function LoadingSpinner() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2">
                <div className="size-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                <span className="text-[11px] text-slate-400 font-medium">Loading model...</span>
            </div>
        </Html>
    )
}

function Scene({ prompt }: { prompt: string }) {
    const modelKey = getModelFromPrompt(prompt)
    const model = MODEL_URLS[modelKey]

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow color="#ffffff" />
            <directionalLight position={[-3, 4, -3]} intensity={0.4} color="#6C63FF" />
            <pointLight position={[0, 3, 0]} intensity={0.5} color="#10B981" />

            {/* Model */}
            <Suspense fallback={<LoadingSpinner />}>
                <LoadedModel url={model.url} scale={model.scale} />
            </Suspense>

            {/* Floor grid */}
            <Grid
                args={[20, 20]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor="#1e293b"
                sectionSize={2}
                sectionThickness={1}
                sectionColor="#334155"
                fadeDistance={15}
                fadeStrength={1}
                followCamera={false}
                infiniteGrid
                position={[0, -1.2, 0]}
            />

            {/* Shadow on floor */}
            <ContactShadows
                position={[0, -1.19, 0]}
                opacity={0.6}
                blur={2.5}
                far={4}
                color="#000000"
            />

            {/* Environment */}
            <Environment preset="city" />

            {/* Controls */}
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={1.5}
                maxDistance={6}
                minPolarAngle={0.3}
                maxPolarAngle={Math.PI / 2}
                autoRotate={false}
            />
        </>
    )
}

interface ModelPreviewProps {
    prompt: string
    style: string
}

export function ModelPreview({ prompt }: ModelPreviewProps) {
    const [isHovered, setIsHovered] = useState(false)
    const modelKey = getModelFromPrompt(prompt)
    const model = MODEL_URLS[modelKey]

    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])

    return (
        <div
            className="w-full h-[320px] rounded-2xl overflow-hidden relative group"
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Subtle glow effect */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
                }}
            />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [2, 1.5, 2.5], fov: 40 }}
                shadows
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Scene prompt={prompt} />
            </Canvas>

            {/* Top-left: Model info badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                    <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-300 font-medium">
                        {model.label}
                    </span>
                </div>
            </div>

            {/* Top-right: Poly count badge */}
            <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">GLB</span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] text-slate-300">Real-time</span>
                </div>
            </div>

            {/* Bottom controls bar */}
            <div
                className={`absolute bottom-0 left-0 right-0 py-2.5 px-3 flex items-center justify-between transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-70"
                    }`}
                style={{
                    background: "linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 100%)",
                }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">
                        🖱️ Drag to rotate · Scroll to zoom
                    </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span>Powered by</span>
                    <span className="text-emerald-400 font-semibold">Three.js</span>
                </div>
            </div>
        </div>
    )
}
