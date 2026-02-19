import { Button, Rows, Text, Title, Select, TextInput } from "@canva/app-ui-kit";
import { addElementAtCursor, addElementAtPoint, addNativeElement } from "@canva/design";
import { requestOpenExternalUrl } from "@canva/platform";
import { useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { useFeatureSupport } from "@canva/app-hooks";
import { useState } from "react";

const ASSET_TYPES = [
  { value: "texture", label: "🎨 Texture / Material" },
  { value: "sign", label: "🪧 Signs & Displays" },
  { value: "hud", label: "🖥️ HUD & UI Elements" },
  { value: "skybox", label: "🌌 Skybox & Panoramas" },
  { value: "concept", label: "🎭 Concept Art" },
  { value: "logo", label: "⭐ Brand & Logo" },
];

const PROMPT_IDEAS: Record<string, string[]> = {
  texture: [
    "Weathered stone brick wall with moss cracks",
    "Futuristic metal panel with glowing circuit lines",
    "Hand-painted wooden planks, cartoon style",
    "Marble floor tile, white with grey veins",
    "Rusted iron sheet with rivets and patina",
  ],
  sign: [
    "Medieval tavern sign with ornate lettering",
    "Neon cyberpunk nightclub sign, pink and blue",
    "Fantasy potion shop storefront banner",
    "Elegant real estate 'For Sale' sign, gold trim",
  ],
  hud: [
    "Sci-fi holographic HUD frame with rounded corners",
    "Fantasy RPG inventory slot grid, ornate gold borders",
    "Minimalist health bar and mana bar set",
    "Steampunk gear-themed dialog box background",
  ],
  skybox: [
    "Sunset over alien mountains with two moons",
    "Deep space nebula with stars and asteroids",
    "Enchanted forest canopy view looking upward",
    "Underwater ocean scene with light rays and fish",
  ],
  concept: [
    "Medieval castle courtyard with market stalls, top-down view",
    "Cyberpunk apartment interior, neon lighting",
    "Cozy fantasy tavern with fireplace and wooden beams",
    "Futuristic space station docking bay with ships",
  ],
  logo: [
    "Elegant gold crest for a medieval roleplay group",
    "Minimalist tech logo for a virtual architecture studio",
    "Cute kawaii mascot for a virtual fashion brand",
    "Edgy cyberpunk gang emblem with skull and neon",
  ],
};

const DIMENSIONS: Record<string, { width: number; height: number; label: string }> = {
  texture: { width: 1024, height: 1024, label: "1024×1024" },
  sign: { width: 1920, height: 1080, label: "1920×1080" },
  hud: { width: 1024, height: 1024, label: "1024×1024" },
  skybox: { width: 2048, height: 1024, label: "2048×1024" },
  concept: { width: 1920, height: 1080, label: "1920×1080" },
  logo: { width: 500, height: 500, label: "500×500" },
};

export const App = () => {
  const isSupported = useFeatureSupport();
  const addElement = [addElementAtPoint, addElementAtCursor].find((fn) =>
    isSupported(fn),
  );
  const intl = useIntl();
  const [assetType, setAssetType] = useState("texture");
  const [customPrompt, setCustomPrompt] = useState("");

  const insertPromptAsText = (prompt: string) => {
    if (!addElement) return;
    addElement({
      type: "text",
      children: [prompt],
      fontSize: 14,
    });
  };

  const openBuilder = () => {
    requestOpenExternalUrl({
      url: "https://bobkinloch5-creator.github.io/worldbuilder",
    });
  };

  const dims = DIMENSIONS[assetType];
  const prompts = PROMPT_IDEAS[assetType] || [];

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Title size="medium">
          SL World Builder
        </Title>
        <Text>
          Create virtual world assets with AI. Choose an asset type, pick a
          prompt, and use Magic Media to generate your design.
        </Text>

        <Select
          id="assetType"
          label="Asset Type"
          value={assetType}
          onChange={(value) => setAssetType(value)}
          options={ASSET_TYPES}
        />

        <Text size="small" tone="tertiary">
          Recommended size: {dims.label}
        </Text>

        <Title size="small">AI Prompt Ideas</Title>
        <Text size="small" tone="secondary">
          Click a prompt to insert it as text, then use it with Magic Media.
        </Text>

        {prompts.map((prompt, i) => (
          <Button
            key={i}
            variant="secondary"
            onClick={() => insertPromptAsText(prompt)}
            disabled={!addElement}
            stretch
          >
            {prompt}
          </Button>
        ))}

        <TextInput
          id="customPrompt"
          label="Custom Prompt"
          placeholder="Type your own prompt..."
          value={customPrompt}
          onChange={(value) => setCustomPrompt(value)}
        />
        <Button
          variant="primary"
          onClick={() => {
            if (customPrompt.trim()) {
              insertPromptAsText(customPrompt.trim());
            }
          }}
          disabled={!addElement || !customPrompt.trim()}
          stretch
        >
          Insert Custom Prompt
        </Button>

        <Button variant="secondary" onClick={openBuilder} stretch>
          Open SL World Builder Website
        </Button>
      </Rows>
    </div>
  );
};
