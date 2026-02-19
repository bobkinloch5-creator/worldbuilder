import {
  Code2,
  Box,
  Palette,
  Users,
  Layers,
  Zap,
  Globe,
  Puzzle,
} from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "LSL Script Generation",
    description:
      "Clean, optimized Linden Scripting Language code with proper comments, configuration variables, and beginner-friendly structure.",
  },
  {
    icon: Box,
    title: "Prefab & Object Layouts",
    description:
      "Exact prim counts, dimensions in meters, step-by-step building instructions, and optional variations for every object.",
  },
  {
    icon: Palette,
    title: "Texture & Mesh Concepts",
    description:
      "Detailed descriptions for 3D artists with style, color, materials, and SL-friendly optimization tips ready for Blender.",
  },
  {
    icon: Users,
    title: "NPC & Interactive Systems",
    description:
      "Pathfinding, animation triggers, dialog menus via llDialog, and full NPC behavior scripts following SL best practices.",
  },
  {
    icon: Globe,
    title: "World Layout Planning",
    description:
      "Full region and parcel layout plans with zone divisions, pathway connections, landmark placement, and prim budget allocation.",
  },
  {
    icon: Puzzle,
    title: "Modular Building Systems",
    description:
      "Reusable wall kits, floor kits, lighting rigs, and furniture sets with inter-module communication scripts.",
  },
  {
    icon: Layers,
    title: "Modular Component Design",
    description:
      "Walls, floors, lighting, furniture, and interactive objects designed as reusable modular components.",
  },
  {
    icon: Zap,
    title: "Instant Implementation",
    description:
      "Every output includes clear implementation steps so you can paste, build, and deploy in your virtual world immediately.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Capabilities
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to build virtual worlds
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            From simple scripts to complex interactive systems, generate
            production-ready assets with a single prompt.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-secondary/50"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
