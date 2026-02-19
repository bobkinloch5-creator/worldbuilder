import { Code, Box, Paintbrush, Users, Globe, Puzzle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { icon: Code, label: "LSL Scripts" },
  { icon: Box, label: "Prefabs" },
  { icon: Paintbrush, label: "Textures" },
  { icon: Users, label: "NPCs" },
  { icon: Globe, label: "Worlds" },
  { icon: Puzzle, label: "Modules" },
]

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-8 rounded-md bg-primary text-primary-foreground font-mono text-sm font-bold">
          SL
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground tracking-tight">
            SL Builder
          </h1>
          <p className="text-xs text-muted-foreground">
            LSL Asset Generator
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <nav className="hidden md:flex items-center gap-1" aria-label="Asset categories">
          {navItems.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground"
            >
              <item.icon className="size-3.5" />
              {item.label}
            </span>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
