const steps = [
  {
    step: "01",
    title: "Choose Your Asset Type",
    description:
      "Select from LSL scripts, prefab objects, textures, NPCs, world layouts, or modular building systems.",
  },
  {
    step: "02",
    title: "Describe What You Need",
    description:
      "Use natural language to describe your vision. The more detail, the better the output.",
  },
  {
    step: "03",
    title: "Generate & Customize",
    description:
      "Get structured, production-ready output with overview, features, code, and implementation steps.",
  },
  {
    step: "04",
    title: "Deploy to Your World",
    description: "Copy scripts directly, follow building instructions, and bring your world to life.",
    link: { label: "See the full guide →", href: "#guide" },
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From idea to in-world in four steps
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.step} className="relative">
              <span className="font-mono text-5xl font-bold text-border">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              {step.link && (
                <a
                  href={step.link.href}
                  className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                >
                  {step.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
