const stats = [
  { value: "10x", label: "Faster script creation" },
  { value: "100%", label: "Copy-paste ready code" },
  { value: "8", label: "Asset types supported" },
  { value: "0", label: "Lag-inducing patterns" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-secondary/30 px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-primary lg:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
