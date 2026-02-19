"use client"

import { useRef, Suspense, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
    OrbitControls,
    Environment,
    ContactShadows,
    Float,
    SpotLight,
    Box,
    Sphere,
    Cylinder,
    Torus,
    Cone,
    TorusKnot,
} from "@react-three/drei"
import * as THREE from "three"
import { Loader2, Maximize2, Minimize2, Box as BoxIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

// -- Procedural Assets (Guaranteed to work) --
// We build abstract representations of the categories using primitives
// to ensure 100% reliability while maintaining a premium look.

function AbstractCar({ scale = 1, color = "#ef4444" }: { scale?: number; color?: string }) {
    return (
        <group scale={scale}>
            {/* Body */}
            <Box args={[2, 0.5, 4]} position={[0, 0.5, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
            </Box>
            {/* Cabin */}
            <Box args={[1.5, 0.4, 2]} position={[0, 0.95, -0.2]}>
                <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.8} />
            </Box>
            {/* Wheels */}
            <Cylinder args={[0.4, 0.4, 0.2, 32]} rotation={[0, 0, Math.PI / 2]} position={[1.1, 0.4, 1.2]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
            <Cylinder args={[0.4, 0.4, 0.2, 32]} rotation={[0, 0, Math.PI / 2]} position={[-1.1, 0.4, 1.2]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
            <Cylinder args={[0.4, 0.4, 0.2, 32]} rotation={[0, 0, Math.PI / 2]} position={[1.1, 0.4, -1.2]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
            <Cylinder args={[0.4, 0.4, 0.2, 32]} rotation={[0, 0, Math.PI / 2]} position={[-1.1, 0.4, -1.2]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
        </group>
    )
}

function AbstractChair({ scale = 1, color = "#d97706" }: { scale?: number; color?: string }) {
    return (
        <group scale={scale}>
            {/* Seat */}
            <Box args={[1.5, 0.2, 1.5]} position={[0, 1, 0]} castShadow>
                <meshStandardMaterial color={color} roughness={0.8} />
            </Box>
            {/* Back */}
            <Box args={[1.5, 1.5, 0.2]} position={[0, 1.85, -0.65]} castShadow>
                <meshStandardMaterial color={color} roughness={0.8} />
            </Box>
            {/* Legs */}
            <Box args={[0.2, 1, 0.2]} position={[0.6, 0.5, 0.6]}><meshStandardMaterial color="#4b5563" /></Box>
            <Box args={[0.2, 1, 0.2]} position={[-0.6, 0.5, 0.6]}><meshStandardMaterial color="#4b5563" /></Box>
            <Box args={[0.2, 1, 0.2]} position={[0.6, 0.5, -0.6]}><meshStandardMaterial color="#4b5563" /></Box>
            <Box args={[0.2, 1, 0.2]} position={[-0.6, 0.5, -0.6]}><meshStandardMaterial color="#4b5563" /></Box>
        </group>
    )
}

function AbstractRobot({ scale = 1, color = "#3b82f6" }: { scale?: number; color?: string }) {
    return (
        <group scale={scale}>
            {/* Head */}
            <Sphere args={[0.6, 32, 32]} position={[0, 2.2, 0]}>
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Sphere>
            {/* Eyes */}
            <Sphere args={[0.15, 16, 16]} position={[0.2, 2.3, 0.5]}><meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} /></Sphere>
            <Sphere args={[0.15, 16, 16]} position={[-0.2, 2.3, 0.5]}><meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} /></Sphere>
            {/* Body */}
            <Box args={[1.2, 1.5, 0.8]} position={[0, 1.2, 0]}>
                <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.4} />
            </Box>
            {/* Arms */}
            <Cylinder args={[0.15, 0.15, 1.2]} position={[0.8, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}><meshStandardMaterial color="#4b5563" /></Cylinder>
            <Cylinder args={[0.15, 0.15, 1.2]} position={[-0.8, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}><meshStandardMaterial color="#4b5563" /></Cylinder>
        </group>
    )
}

function AbstractTree({ scale = 1, color = "#22c55e" }: { scale?: number; color?: string }) {
    return (
        <group scale={scale}>
            {/* Trunk */}
            <Cylinder args={[0.3, 0.5, 1]} position={[0, 0.5, 0]} castShadow>
                <meshStandardMaterial color="#78350f" />
            </Cylinder>
            {/* Leaves */}
            <Cone args={[1.5, 2, 32]} position={[0, 2, 0]} castShadow>
                <meshStandardMaterial color={color} roughness={0.8} />
            </Cone>
            <Cone args={[1.2, 1.8, 32]} position={[0, 3, 0]} castShadow>
                <meshStandardMaterial color={color} roughness={0.8} />
            </Cone>
        </group>
    )
}

function AbstractHouse({ scale = 1, color = "#fcd34d" }: { scale?: number; color?: string }) {
    return (
        <group scale={scale}>
            <Box args={[2, 1.5, 2]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color="#fff" />
            </Box>
            <Cone args={[1.8, 1.2, 4]} rotation={[0, Math.PI / 4, 0]} position={[0, 2.1, 0]}>
                <meshStandardMaterial color={color} />
            </Cone>
            {/* Door */}
            <Box args={[0.6, 1, 0.1]} position={[0, 0.5, 1.01]}>
                <meshStandardMaterial color="#78350f" />
            </Box>
        </group>
    )
}

function AbstractDuck({ scale = 1 }: { scale?: number }) {
    return (
        <group scale={scale}>
            {/* Body */}
            <Sphere args={[0.9, 32, 32]} scale={[1, 0.7, 1.3]} position={[0, 0.6, 0]}>
                <meshStandardMaterial color="#facc15" />
            </Sphere>
            {/* Head */}
            <Sphere args={[0.5, 32, 32]} position={[0, 1.3, 0.6]}>
                <meshStandardMaterial color="#facc15" />
            </Sphere>
            {/* Beak */}
            <Cone args={[0.2, 0.4, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.3, 1.1]}>
                <meshStandardMaterial color="#f97316" />
            </Cone>
        </group>
    )
}


function DefaultShape({ scale = 1, color = "#8b5cf6" }: { scale?: number; color?: string }) {
    return (
        <TorusKnot args={[0.8, 0.25, 100, 16]} scale={scale} position={[0, 1.2, 0]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </TorusKnot>
    )
}


const ASSET_TYPES = {
    car: { component: AbstractCar, label: "Vehicle Concept", color: "#ef4444" },
    truck: { component: AbstractCar, label: "Truck Concept", color: "#3b82f6" }, // Re-use car for now, maybe tweak later
    chair: { component: AbstractChair, label: "Furniture Asset", color: "#d97706" },
    sofa: { component: AbstractChair, label: "Lounge Seat", color: "#b45309" },
    robot: { component: AbstractRobot, label: "Bipedal Mech", color: "#60a5fa" },
    helmet: { component: AbstractRobot, label: "Helmet Accessory", color: "#94a3b8" }, // Placeholder
    tree: { component: AbstractTree, label: "Nature Asset", color: "#22c55e" },
    house: { component: AbstractHouse, label: "Structure", color: "#fcd34d" },
    building: { component: AbstractHouse, label: "Building", color: "#fcd34d" },
    duck: { component: AbstractDuck, label: "Rubber Duck", color: "#facc15" },
}

function getAssetFromPrompt(prompt: string) {
    if (!prompt) return { ...ASSET_TYPES.car, key: "default" };

    const p = prompt.toLowerCase();

    if (p.includes("car") || p.includes("vehicle") || p.includes("auto")) return { ...ASSET_TYPES.car, key: "car" };
    if (p.includes("chair") || p.includes("audit") || p.includes("stool")) return { ...ASSET_TYPES.chair, key: "chair" };
    if (p.includes("robot") || p.includes("mech") || p.includes("android")) return { ...ASSET_TYPES.robot, key: "robot" };
    if (p.includes("tree") || p.includes("plant") || p.includes("forest")) return { ...ASSET_TYPES.tree, key: "tree" };
    if (p.includes("house") || p.includes("home") || p.includes("building")) return { ...ASSET_TYPES.house, key: "house" };
    if (p.includes("duck") || p.includes("bird")) return { ...ASSET_TYPES.duck, key: "duck" };

    // Default fallback
    return { component: DefaultShape, label: "Generated Asset", color: "#a78bfa", key: "default" };
}

function Scene({ prompt }: { prompt: string }) {
    const asset = useMemo(() => getAssetFromPrompt(prompt), [prompt]);
    const Component = asset.component;

    // Rotate the model slowly using a ref instead of state to avoid re-renders
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <SpotLight
                position={[10, 10, 10]}
                angle={0.25}
                penumbra={1}
                intensity={1.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-10, 5, -10]} intensity={0.5} color="#4f46e5" />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={groupRef}>
                    <Suspense fallback={null}>
                        <Component scale={1.2} color={asset.color} />
                    </Suspense>
                </group>
            </Float>

            {/* Stylish Grid Floor */}
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
                position={[0, -0.05, 0]}
            />

            <ContactShadows resolution={1024} scale={50} blur={2.5} opacity={0.5} far={10} color="#000000" />
            <Environment preset="city" blur={0.8} background={false} />

            <OrbitControls
                makeDefault
                enableZoom={true}
                maxPolarAngle={Math.PI / 2}
                minDistance={3}
                maxDistance={12}
            />
        </>
    )
}

interface ModelPreviewProps {
    prompt: string
    style?: string
}

export function ModelPreview({ prompt }: ModelPreviewProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const asset = useMemo(() => getAssetFromPrompt(prompt), [prompt]);

    return (
        <div
            className={`relative transition-all duration-500 ease-in-out group ${isExpanded
                    ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] rounded-3xl shadow-2xl ring-1 ring-white/10"
                    : "w-full h-[500px] mb-12 rounded-3xl"
                }`}
            style={{
                background: "radial-gradient(circle at center, #1e293b 0%, #020617 100%)",
            }}
        >
            {/* 3D Canvas */}
            <Canvas
                shadows
                camera={{ position: [4, 3, 6], fov: 35 }}
                gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                className="!absolute inset-0 z-10 rounded-3xl"
            >
                <Scene prompt={prompt} />
            </Canvas>

            {/* Floating Info Overlay */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                    <BoxIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
                        {asset.label}
                    </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono px-1">
                    Procedural Preview • Low Poly
                </div>
            </div>

            {/* Expand/Minimize Toggle */}
            <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full backdrop-blur-md"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/5 bg-[radial-gradient(transparent_50%,rgba(2,6,23,0.6)_100%)]" />
        </div>
    )
}
