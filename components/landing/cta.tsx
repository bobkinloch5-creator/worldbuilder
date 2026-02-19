import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-10 text-center lg:p-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-primary/3" />
        <div className="pointer-events-none absolute top-0 right-0 -z-10 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to build your next world?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Stop writing boilerplate LSL by hand. Let AI handle the heavy lifting
          while you focus on designing unforgettable experiences.
        </p>
        <Button
          size="lg"
          className="mt-8 gap-2 px-8 text-base font-semibold"
          asChild
        >
          <a href="#generator">
            Launch the Generator
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}
