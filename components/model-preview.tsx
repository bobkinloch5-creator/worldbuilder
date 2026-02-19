"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei"
import * as THREE from "three"

// Map keywords to shapes
function getShapeFromPrompt(prompt: string): "castle" | "sword" | "furniture" | "vehicle" | "tree" | "building" | "box" {
    const lower = prompt.toLowerCase()
    if (/castle|tower|fortress|keep/.test(lower)) return "castle"
    if (/sword|weapon|blade|axe|dagger/.test(lower)) return "sword"
    if (/chair|table|desk|bed|sofa|couch|cabinet|shelf|armchair|cabin/.test(lower)) return "furniture"
    if (/car|ship|boat|vehicle|spaceship|plane/.test(lower)) return "vehicle"
    if (/tree|plant|flower|bush|forest/.test(lower)) return "tree"
    if (/house|building|shop|store|wall/.test(lower)) return "building"
    return "box"
}

function getStyleColor(style: string): string {
    switch (style) {
        case "cartoon": return "#4ECDC4"
        case "sculpture": return "#C9B59C"
        default: return "#6C63FF"
    }
}

// Procedural castle shape
function CastleShape({ color }: { color: string }) {
    return (
        <group>
            {/* Base */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1.2, 0.8, 1.2]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            {/* Tower 1 */}
            <mesh position={[-0.5, 1.1, -0.5]}>
                <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            {/* Tower 2 */}
            <mesh position={[0.5, 1.1, -0.5]}>
                <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            {/* Tower 3 */}
            <mesh position={[-0.5, 1.1, 0.5]}>
                <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            {/* Tower 4 */}
            <mesh position={[0.5, 1.1, 0.5]}>
                <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            {/* Roof cones */}
            {[[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].map(([x, z], i) => (
                <mesh key={i} position={[x, 1.75, z]}>
                    <coneGeometry args={[0.25, 0.4, 8]} />
                    <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
                </mesh>
            ))}
        </group>
    )
}

// Sword shape
function SwordShape({ color }: { color: string }) {
    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            {/* Blade */}
            <mesh position={[0, 0.8, 0]}>
                <boxGeometry args={[0.08, 1.4, 0.02]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Guard */}
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[0.5, 0.08, 0.08]} />
                <meshStandardMaterial color={color} roughness={0.3} />
            </mesh>
            {/* Handle */}
            <mesh position={[0, -0.35, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
                <meshStandardMaterial color="#8B4513" roughness={0.7} />
            </mesh>
            {/* Pommel */}
            <mesh position={[0, -0.65, 0]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color={color} roughness={0.3} />
            </mesh>
        </group>
    )
}

// Furniture shape
function FurnitureShape({ color }: { color: string }) {
    return (
        <group>
            {/* Seat */}
            <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.8, 0.1, 0.8]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            {/* Back */}
            <mesh position={[0, 0.85, -0.35]}>
                <boxGeometry args={[0.8, 0.7, 0.1]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            {/* Legs */}
            {[[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.2, z]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.7} />
                </mesh>
            ))}
        </group>
    )
}

// Vehicle shape
function VehicleShape({ color }: { color: string }) {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[0.6, 0.4, 1.4]} />
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
            </mesh>
            {/* Cockpit */}
            <mesh position={[0, 0.6, -0.1]}>
                <boxGeometry args={[0.5, 0.3, 0.6]} />
                <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.5} opacity={0.7} transparent />
            </mesh>
            {/* Wings */}
            <mesh position={[0, 0.3, 0.2]}>
                <boxGeometry args={[1.8, 0.05, 0.4]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
        </group>
    )
}

// Tree shape
function TreeShape({ color }: { color: string }) {
    return (
        <group>
            {/* Trunk */}
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
                <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            {/* Foliage layers */}
            <mesh position={[0, 1.0, 0]}>
                <coneGeometry args={[0.5, 0.6, 8]} />
                <meshStandardMaterial color="#228B22" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.35, 0]}>
                <coneGeometry args={[0.4, 0.5, 8]} />
                <meshStandardMaterial color="#2E8B2E" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.65, 0]}>
                <coneGeometry args={[0.25, 0.4, 8]} />
                <meshStandardMaterial color="#32CD32" roughness={0.8} />
            </mesh>
        </group>
    )
}

// Building shape
function BuildingShape({ color }: { color: string }) {
    return (
        <group>
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1, 1, 0.8]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            {/* Roof */}
            <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[0.85, 0.5, 4]} />
                <meshStandardMaterial color="#8B4513" roughness={0.6} />
            </mesh>
            {/* Door */}
            <mesh position={[0, 0.25, 0.41]}>
                <boxGeometry args={[0.25, 0.5, 0.02]} />
                <meshStandardMaterial color="#5C3317" roughness={0.8} />
            </mesh>
            {/* Windows */}
            {[[-0.3, 0.6], [0.3, 0.6]].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0.41]}>
                    <boxGeometry args={[0.15, 0.15, 0.02]} />
                    <meshStandardMaterial color="#87CEEB" roughness={0.1} />
                </mesh>
            ))}
        </group>
    )
}

// Default box
function BoxShape({ color }: { color: string }) {
    return (
        <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
        </mesh>
    )
}

function AutoRotate({ children }: { children: React.ReactNode }) {
    const ref = useRef<THREE.Group>(null)
    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.4
    })
    return <group ref={ref}>{children}</group>
}

function Scene({ prompt, style }: { prompt: string; style: string }) {
    const shape = getShapeFromPrompt(prompt)
    const color = getStyleColor(style)

    const ShapeComponent = useMemo(() => {
        switch (shape) {
            case "castle": return CastleShape
            case "sword": return SwordShape
            case "furniture": return FurnitureShape
            case "vehicle": return VehicleShape
            case "tree": return TreeShape
            case "building": return BuildingShape
            default: return BoxShape
        }
    }, [shape])

    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <pointLight position={[-3, 3, -3]} intensity={0.3} color="#6C63FF" />

            <AutoRotate>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                    <ShapeComponent color={color} />
                </Float>
            </AutoRotate>

            <ContactShadows position={[0, -0.01, 0]} opacity={0.4} blur={2} far={4} />
            <Environment preset="city" />
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={2}
                maxDistance={8}
                autoRotate={false}
            />
        </>
    )
}

interface ModelPreviewProps {
    prompt: string
    style: string
}

export function ModelPreview({ prompt, style }: ModelPreviewProps) {
    return (
        <div className="w-full h-[280px] rounded-xl overflow-hidden border border-border bg-gradient-to-b from-secondary/50 to-background relative">
            <Canvas
                camera={{ position: [2.5, 2, 2.5], fov: 45 }}
                shadows
                gl={{ antialias: true }}
            >
                <Scene prompt={prompt} style={style} />
            </Canvas>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border">
                <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-muted-foreground">3D Preview · Drag to rotate</span>
            </div>
        </div>
    )
}
