"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

const ModelPreview = dynamic(() => import("@/components/model-preview").then(m => m.ModelPreview), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[280px] rounded-xl border border-border bg-secondary/50 flex items-center justify-center">
      <span className="text-xs text-muted-foreground animate-pulse">Loading 3D Preview...</span>
    </div>
  ),
})
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Stats } from "@/components/landing/stats"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Guide } from "@/components/landing/guide"
import { FreeTools } from "@/components/landing/free-tools"
import { CanvaStudio } from "@/components/landing/canva-studio"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"
import { SiteHeader } from "@/components/site-header"
import { GeneratorForm } from "@/components/generator-form"
import { OutputPanel } from "@/components/output-panel"
import { EmptyOutput } from "@/components/empty-output"
import { AiPromptPanel } from "@/components/ai-prompt-panel"
import { categories, generateOutput, type Category } from "@/lib/generator-data"
import { Code, Box, Paintbrush, Users, Globe, Puzzle, Cuboid } from "lucide-react"

const categoryIcons: Record<Category, typeof Code> = {
  models: Cuboid,
  scripts: Code,
  prefabs: Box,
  textures: Paintbrush,
  npcs: Users,
  worlds: Globe,
  modules: Puzzle,
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("scripts")
  const [values, setValues] = useState<Record<string, string>>({})
  const [output, setOutput] = useState("")

  const config = categories.find((c) => c.id === activeCategory)!

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category)
    setValues({})
    setOutput("")
  }

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleGenerate = () => {
    const result = generateOutput(activeCategory, values)
    setOutput(result)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Landing sections */}
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Guide />
      <FreeTools />
      <CanvaStudio />

      {/* Generator Section */}
      <section id="generator" className="px-6 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Generator
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start creating your assets
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Choose a category, describe what you need, and generate production-ready output.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id]
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground border border-border"
                    }`}
                >
                  <Icon className="size-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* 3D Preview for models */}
          {activeCategory === "models" && (
            <div className="mb-6">
              <ModelPreview prompt={values.prompt || ""} style={values.style || "realistic"} />
            </div>
          )}

          {/* Generator grid */}
          <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
            {/* Form */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <GeneratorForm
                config={config}
                values={values}
                onChange={handleChange}
                onGenerate={handleGenerate}
              />
            </div>

            {/* Output */}
            <div className="min-h-[500px] rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              {output ? (
                <OutputPanel
                  output={output}
                  category={activeCategory}
                  prompt={values.prompt} // correct prompt prop passed here!
                  onReset={() => setOutput("")}
                />
              ) : (
                <EmptyOutput category={activeCategory} />
              )}
            </div>
          </div>

          {/* AI Assistant */}
          <div className="mt-8">
            <AiPromptPanel category={activeCategory} />
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  )
}
