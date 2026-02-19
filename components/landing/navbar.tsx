"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Blocks } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Guide", href: "#guide" },
  { label: "Free Tools", href: "#tools" },
  { label: "Canva Studio", href: "#canva-studio" },
  { label: "Generator", href: "#generator" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-2 text-foreground">
          <Blocks className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">SL Builder</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <Button size="sm" asChild>
            <a href="#generator">Get Started</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="w-full" asChild>
              <a href="#generator" onClick={() => setOpen(false)}>
                Get Started
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
