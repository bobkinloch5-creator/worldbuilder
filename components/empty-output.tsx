import { Code, Box, Paintbrush, Users, Globe, Puzzle, Cuboid } from "lucide-react"
import type { Category } from "@/lib/generator-data"

const icons: Record<Category, typeof Code> = {
  models: Cuboid,
  scripts: Code,
  prefabs: Box,
  textures: Paintbrush,
  npcs: Users,
  worlds: Globe,
  modules: Puzzle,
}

const hints: Record<Category, { title: string; description: string }> = {
  models: {
    title: "No output yet",
    description: "Describe what you want to create and get a ready-to-use 3D modeling guide.",
  },
  scripts: {
    title: "No output yet",
    description: "Choose a script type, name your object, and describe what it should do.",
  },
  prefabs: {
    title: "No output yet",
    description: "Select an object type, set dimensions, and get step-by-step building plans.",
  },
  textures: {
    title: "No output yet",
    description: "Pick an asset type and style to get a detailed brief for your 3D artist.",
  },
  npcs: {
    title: "No output yet",
    description: "Choose an NPC type and personality to generate interactive behavior scripts.",
  },
  worlds: {
    title: "No output yet",
    description: "Select a layout size and theme to generate a full region plan with zones.",
  },
  modules: {
    title: "No output yet",
    description: "Pick a system type and style to get modular building configs with scripts.",
  },
}

interface EmptyOutputProps {
  category: Category
}

export function EmptyOutput({ category }: EmptyOutputProps) {
  const Icon = icons[category]
  const hint = hints[category]

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
      <div className="flex items-center justify-center size-14 rounded-xl bg-secondary border border-border">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">
          {hint.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1 max-w-[240px] text-balance">
          {hint.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="size-1.5 rounded-full bg-primary/50 animate-pulse" />
        <span className="text-xs text-muted-foreground">Awaiting input</span>
      </div>
    </div>
  )
}
