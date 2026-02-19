"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Sparkles, Info } from "lucide-react"
import type { CategoryConfig } from "@/lib/generator-data"

interface GeneratorFormProps {
  config: CategoryConfig
  values: Record<string, string>
  onChange: (id: string, value: string) => void
  onGenerate: () => void
}

const fieldHints: Record<string, string> = {
  scriptType: "Choose the type of interaction your script will handle",
  objectName: "Give your object a descriptive name — it appears in the script header",
  description: "The more detail you provide, the better the generated output",
  channel: "Use 0 for public chat, or a private channel for inter-object communication",
  extras: "Add optional features like sound, particles, or animations",
  prefabType: "Select what kind of object you're building",
  style: "Visual theme affects texture recommendations and building techniques",
  dimensions: "Use WxDxH format in meters, e.g. 10x10x4",
  maxPrims: "Lower prim counts are more Land Impact friendly",
  assetType: "Choose the type of art asset you need described",
  assetName: "Name your asset for easy reference in output",
  resolution: "Higher resolution = more detail but higher upload cost",
  colorScheme: "Describe your desired colors — used in the art brief",
  npcType: "Determines the NPC's core behavior template",
  npcName: "The display name shown above the NPC",
  personality: "Affects dialog text style and greeting messages",
  features: "Select capabilities to include in the generated output",
  behavior: "Describe specific actions, dialog, and responses",
  layoutType: "Determines the total area and prim budget",
  regionName: "Used as the region/parcel display name",
  theme: "Affects zone names, terrain, and windlight recommendations",
  zoneCount: "More zones = more varied areas but less prims per zone",
  systemType: "Choose what kind of modular building system to generate",
  systemName: "Name for the system — used in scripts and labels",
  moduleCount: "Number of unique module pieces in the set",
  details: "Any special requirements or specific features you need",
}

export function GeneratorForm({
  config,
  values,
  onChange,
  onGenerate,
}: GeneratorFormProps) {
  const allRequiredFilled = config.fields
    .filter((f) => f.required)
    .every((f) => values[f.id]?.trim())

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {config.label}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {config.description}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {config.fields.map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Label
                  htmlFor={field.id}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-primary ml-1" aria-label="required">
                      *
                    </span>
                  )}
                </Label>
                {fieldHints[field.id] && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="size-3 text-muted-foreground/60 cursor-help shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px] text-xs">
                      {fieldHints[field.id]}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              {field.type === "select" && field.options ? (
                <Select
                  value={values[field.id] || ""}
                  onValueChange={(v) => onChange(field.id, v)}
                >
                  <SelectTrigger
                    id={field.id}
                    className="w-full bg-secondary border-border text-foreground"
                  >
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "checkbox" && field.options ? (
                <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/50 p-3">
                  {field.options.map((opt) => {
                    const currentValues = values[field.id] ? values[field.id].split(",") : []
                    const isChecked = currentValues.includes(opt.value)

                    return (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2 cursor-pointer text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            let next: string[]
                            if (checked) {
                              next = [...currentValues, opt.value]
                            } else {
                              next = currentValues.filter((v) => v !== opt.value)
                            }
                            onChange(field.id, next.filter(Boolean).join(","))
                          }}
                        />
                        <span className="text-xs">{opt.label}</span>
                      </label>
                    )
                  })}
                </div>
              ) : field.type === "textarea" ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="min-h-20 bg-secondary border-border text-foreground resize-none"
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type === "number" ? "number" : "text"}
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="bg-secondary border-border text-foreground"
                />
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={onGenerate}
          disabled={!allRequiredFilled}
          className="w-full mt-2"
          size="lg"
        >
          <Sparkles className="size-4" />
          Generate
        </Button>
      </div>
    </TooltipProvider>
  )
}
