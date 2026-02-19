import { Blocks } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Blocks className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">SL Builder</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#guide" className="hover:text-foreground transition-colors">
              Guide
            </a>
            <a href="#generator" className="hover:text-foreground transition-colors">
              Generator
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SL Builder. Free and open-source virtual world asset generator.
            Not affiliated with Linden Lab or any virtual world platform.
          </p>
        </div>
      </div>
    </footer>
  )
}
