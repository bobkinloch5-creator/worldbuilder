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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <div className="flex items-center justify-center size-8 rounded-md bg-primary text-primary-foreground font-mono text-sm font-bold">
              SL
            </div>
            <span className="hidden font-bold sm:inline-block">
              SL Builder
            </span>
          </a>
          <nav className="flex items-center gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
              >
                <item.icon className="size-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search or other controls could go here */}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
