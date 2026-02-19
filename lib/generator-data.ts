export type Category = "scripts" | "prefabs" | "textures" | "npcs" | "worlds" | "modules" | "models"

export interface GeneratorField {
  id: string
  label: string
  type: "text" | "select" | "textarea" | "number" | "checkbox"
  placeholder?: string
  options?: { value: string; label: string }[]
  required?: boolean
}

export interface CategoryConfig {
  id: Category
  label: string
  description: string
  icon: string
  fields: GeneratorField[]
}

export const categories: CategoryConfig[] = [
  {
    id: "models",
    label: "AI 3D Model Generator",
    description: "Generate 3D mesh models from text or image references",
    icon: "Box", // Using Box as placeholder, will import Box if needed, or leave as string if it's dynamic
    fields: [
      {
        id: "inputMethod",
        label: "Generation Method",
        type: "select",
        required: true,
        options: [
          { value: "text-to-3d", label: "Text to 3D Model" },
          { value: "image-to-3d", label: "Image to 3D Model" },
        ],
      },
      {
        id: "prompt",
        label: "Description or Image URL",
        type: "textarea",
        placeholder: "Describe the 3D model you want to generate...",
        required: true,
      },
      {
        id: "style",
        label: "Art Style",
        type: "select",
        options: [
          { value: "realistic", label: "Realistic" },
          { value: "cartoon", label: "Cartoon / Low Poly" },
          { value: "sculpture", label: "Statue / Sculpture" },
        ],
      },
      {
        id: "format",
        label: "File Format",
        type: "select",
        options: [
          { value: "glb", label: ".GLB (Binary glTF)" },
          { value: "obj", label: ".OBJ (Wavefront)" },
          { value: "usdz", label: ".USDZ (AR Ready)" },
        ],
      },
    ],
  },
  {
    id: "scripts",
    label: "LSL Scripts",
    description: "Generate clean, optimized LSL scripts ready to paste into your virtual world",
    icon: "Code",
    fields: [
      {
        id: "scriptType",
        label: "Script Type",
        type: "select",
        required: true,
        options: [
          { value: "touch", label: "Touch Interaction" },
          { value: "timer", label: "Timer / Repeating Action" },
          { value: "dialog", label: "Dialog Menu System" },
          { value: "sensor", label: "Sensor / Detection" },
          { value: "movement", label: "Movement / Rotation" },
          { value: "communication", label: "Chat / Communication" },
          { value: "door", label: "Door / Gate" },
          { value: "teleport", label: "Teleporter" },
          { value: "particle", label: "Particle Effects" },
          { value: "vendor", label: "Vendor / Payment" },
        ],
      },
      {
        id: "objectName",
        label: "Object Name",
        type: "text",
        placeholder: "e.g., Magic Portal, Security Door",
        required: true,
      },
      {
        id: "description",
        label: "Behavior Description",
        type: "textarea",
        placeholder: "Describe what the script should do when triggered...",
        required: true,
      },
      {
        id: "channel",
        label: "Chat Channel",
        type: "number",
        placeholder: "0",
      },
      {
        id: "extras",
        label: "Extra Features",
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "sound", label: "Sound Effects" },
          { value: "particles", label: "Particle Effects" },
          { value: "animation", label: "Avatar Animations" },
          { value: "notecard", label: "Notecard Reader" },
          { value: "permissions", label: "Permission System" },
        ],
      },
    ],
  },
  {
    id: "prefabs",
    label: "Prefabs & Objects",
    description: "Generate building instructions with prim counts and exact dimensions",
    icon: "Box",
    fields: [
      {
        id: "prefabType",
        label: "Object Type",
        type: "select",
        required: true,
        options: [
          { value: "building", label: "Building / Structure" },
          { value: "furniture", label: "Furniture" },
          { value: "vehicle", label: "Vehicle" },
          { value: "landscape", label: "Landscape Element" },
          { value: "decoration", label: "Decoration / Prop" },
          { value: "lighting", label: "Lighting System" },
          { value: "wall_system", label: "Modular Wall System" },
          { value: "floor_system", label: "Modular Floor System" },
        ],
      },
      {
        id: "objectName",
        label: "Object Name",
        type: "text",
        placeholder: "e.g., Medieval Tavern, Sci-Fi Console",
        required: true,
      },
      {
        id: "style",
        label: "Style",
        type: "select",
        required: true,
        options: [
          { value: "modern", label: "Modern / Minimalist" },
          { value: "medieval", label: "Medieval / Fantasy" },
          { value: "scifi", label: "Sci-Fi / Futuristic" },
          { value: "nature", label: "Nature / Organic" },
          { value: "steampunk", label: "Steampunk" },
          { value: "japanese", label: "Japanese / Zen" },
          { value: "industrial", label: "Industrial" },
          { value: "victorian", label: "Victorian" },
        ],
      },
      {
        id: "dimensions",
        label: "Approximate Size (meters)",
        type: "text",
        placeholder: "e.g., 10x10x4 or 2x1x1",
        required: true,
      },
      {
        id: "maxPrims",
        label: "Max Prim Count",
        type: "number",
        placeholder: "32",
      },
      {
        id: "details",
        label: "Additional Details",
        type: "textarea",
        placeholder: "Describe any specific features, rooms, or requirements...",
      },
    ],
  },
  {
    id: "textures",
    label: "Textures & Mesh",
    description: "Get detailed descriptions for 3D artists with SL optimization tips",
    icon: "Paintbrush",
    fields: [
      {
        id: "assetType",
        label: "Asset Type",
        type: "select",
        required: true,
        options: [
          { value: "texture", label: "Texture (2D)" },
          { value: "mesh", label: "Mesh (3D Model)" },
          { value: "sculpt", label: "Sculpt Map" },
          { value: "animation", label: "Animation" },
          { value: "terrain", label: "Terrain Texture" },
        ],
      },
      {
        id: "assetName",
        label: "Asset Name",
        type: "text",
        placeholder: "e.g., Stone Wall Texture, Crystal Lamp Mesh",
        required: true,
      },
      {
        id: "style",
        label: "Visual Style",
        type: "select",
        required: true,
        options: [
          { value: "realistic", label: "Realistic / Photographic" },
          { value: "stylized", label: "Stylized / Painted" },
          { value: "cartoon", label: "Cartoon / Toon" },
          { value: "pixel", label: "Pixel Art" },
          { value: "handpainted", label: "Hand-Painted" },
          { value: "pbr", label: "PBR / Physically Based" },
        ],
      },
      {
        id: "resolution",
        label: "Resolution",
        type: "select",
        options: [
          { value: "256", label: "256x256 (Low)" },
          { value: "512", label: "512x512 (Medium)" },
          { value: "1024", label: "1024x1024 (High)" },
          { value: "2048", label: "2048x2048 (Very High)" },
        ],
      },
      {
        id: "colorScheme",
        label: "Color Palette",
        type: "text",
        placeholder: "e.g., earthy browns, cool blues, warm orange",
      },
      {
        id: "details",
        label: "Description & Purpose",
        type: "textarea",
        placeholder: "Describe the intended look, material properties, and where it will be used...",
        required: true,
      },
    ],
  },
  {
    id: "npcs",
    label: "NPCs & Systems",
    description: "Create interactive NPC behaviors, menus, and pathfinding systems",
    icon: "Users",
    fields: [
      {
        id: "npcType",
        label: "NPC / System Type",
        type: "select",
        required: true,
        options: [
          { value: "greeter", label: "Greeter / Welcome Bot" },
          { value: "shopkeeper", label: "Shopkeeper / Vendor" },
          { value: "guard", label: "Guard / Patrol" },
          { value: "quest", label: "Quest Giver" },
          { value: "companion", label: "Companion / Follower" },
          { value: "ambient", label: "Ambient NPC" },
          { value: "combat", label: "Combat NPC" },
          { value: "menu_system", label: "Interactive Menu System" },
        ],
      },
      {
        id: "npcName",
        label: "NPC / System Name",
        type: "text",
        placeholder: "e.g., Innkeeper, Town Guard, Quest Board",
        required: true,
      },
      {
        id: "personality",
        label: "Personality / Tone",
        type: "select",
        options: [
          { value: "friendly", label: "Friendly & Helpful" },
          { value: "formal", label: "Formal & Professional" },
          { value: "mysterious", label: "Mysterious & Cryptic" },
          { value: "humorous", label: "Humorous & Playful" },
          { value: "aggressive", label: "Aggressive & Hostile" },
          { value: "neutral", label: "Neutral / Robotic" },
        ],
      },
      {
        id: "features",
        label: "Features",
        type: "select",
        options: [
          { value: "dialog", label: "Dialog Menus" },
          { value: "pathfinding", label: "Pathfinding / Patrol" },
          { value: "animation", label: "Animation Triggers" },
          { value: "inventory", label: "Inventory / Give Items" },
          { value: "combat", label: "Combat System" },
          { value: "all", label: "All Features" },
        ],
      },
      {
        id: "behavior",
        label: "Behavior Description",
        type: "textarea",
        placeholder: "Describe how this NPC should act, what they say, and what they respond to...",
        required: true,
      },
    ],
  },
  {
    id: "worlds",
    label: "World Layouts",
    description: "Generate full region layout plans with zones, pathways, and landmark placement",
    icon: "Globe",
    fields: [
      {
        id: "layoutType",
        label: "Layout Type",
        type: "select",
        required: true,
        options: [
          { value: "full_region", label: "Full Region (256x256m)" },
          { value: "half_region", label: "Half Region (128x256m)" },
          { value: "quarter", label: "Quarter Region (128x128m)" },
          { value: "parcel_large", label: "Large Parcel (64x64m)" },
          { value: "parcel_medium", label: "Medium Parcel (32x32m)" },
          { value: "skybox", label: "Skybox Layout" },
        ],
      },
      {
        id: "regionName",
        label: "Region / Parcel Name",
        type: "text",
        placeholder: "e.g., Dragon's Keep, Neon District",
        required: true,
      },
      {
        id: "theme",
        label: "Theme",
        type: "select",
        required: true,
        options: [
          { value: "fantasy", label: "Fantasy / Medieval" },
          { value: "scifi", label: "Sci-Fi / Cyberpunk" },
          { value: "nature", label: "Nature / Wilderness" },
          { value: "urban", label: "Urban / City" },
          { value: "horror", label: "Horror / Gothic" },
          { value: "tropical", label: "Tropical / Beach" },
          { value: "steampunk", label: "Steampunk" },
          { value: "abstract", label: "Abstract / Surreal" },
        ],
      },
      {
        id: "zoneCount",
        label: "Number of Zones",
        type: "number",
        placeholder: "4",
        required: true,
      },
      {
        id: "features",
        label: "Features to Include",
        type: "checkbox",
        options: [
          { value: "spawn_point", label: "Landing / Spawn Point" },
          { value: "pathways", label: "Pathways & Roads" },
          { value: "water", label: "Water Features" },
          { value: "terrain", label: "Terrain Sculpting" },
          { value: "lighting", label: "Custom Lighting / Windlight" },
          { value: "music", label: "Ambient Music Zones" },
          { value: "teleporters", label: "Teleporter Network" },
          { value: "security", label: "Security / Access Control" },
        ],
      },
      {
        id: "details",
        label: "Special Requirements",
        type: "textarea",
        placeholder: "Describe specific zones, events, or functional requirements...",
      },
    ],
  },
  {
    id: "modules",
    label: "Modular Systems",
    description: "Generate reusable building system configs — wall kits, floor kits, lighting rigs",
    icon: "Puzzle",
    fields: [
      {
        id: "systemType",
        label: "System Type",
        type: "select",
        required: true,
        options: [
          { value: "wall_kit", label: "Wall Kit System" },
          { value: "floor_kit", label: "Floor Kit System" },
          { value: "lighting_rig", label: "Lighting Rig" },
          { value: "furniture_set", label: "Furniture Set" },
          { value: "room_template", label: "Modular Room Template" },
          { value: "landscape_kit", label: "Landscape Kit" },
          { value: "signage", label: "Signage / Display System" },
        ],
      },
      {
        id: "systemName",
        label: "System Name",
        type: "text",
        placeholder: "e.g., Gothic Wall Set, Neon Light Rig",
        required: true,
      },
      {
        id: "moduleCount",
        label: "Number of Modules",
        type: "number",
        placeholder: "6",
      },
      {
        id: "style",
        label: "Style",
        type: "select",
        required: true,
        options: [
          { value: "modern", label: "Modern / Minimalist" },
          { value: "medieval", label: "Medieval / Fantasy" },
          { value: "scifi", label: "Sci-Fi / Futuristic" },
          { value: "industrial", label: "Industrial / Warehouse" },
          { value: "nature", label: "Nature / Organic" },
          { value: "victorian", label: "Victorian / Ornate" },
        ],
      },
      {
        id: "features",
        label: "System Features",
        type: "checkbox",
        options: [
          { value: "snap_grid", label: "Snap-to-Grid Alignment" },
          { value: "color_change", label: "Color Change Script" },
          { value: "resize", label: "Resize / Scale Script" },
          { value: "linked_comm", label: "Inter-Module Communication" },
          { value: "texture_swap", label: "Texture Swap Menu" },
          { value: "auto_align", label: "Auto-Alignment Script" },
        ],
      },
      {
        id: "details",
        label: "Additional Details",
        type: "textarea",
        placeholder: "Describe specific modules, dimensions, or special requirements...",
        required: true,
      },
    ],
  },
]

// ---- Template generators ----

function generateScriptOutput(values: Record<string, string>): string {
  const { scriptType, objectName, description, channel, extras } = values
  const ch = channel || "0"

  const templates: Record<string, string> = {
    touch: `// ============================================
// ${objectName || "Touch Script"}
// Type: Touch Interaction
// Description: ${description || "Touch-activated script"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME  = "${objectName || "My Object"}";
integer CHAT_CHANNEL = ${ch};
${extras === "sound" ? 'key     SOUND_UUID   = "00000000-0000-0000-0000-000000000000"; // Replace with your sound UUID\nfloat   SOUND_VOL    = 1.0;\n' : ""}${extras === "particles" ? "integer PARTICLES_ON = TRUE;\n" : ""}
default
{
    state_entry()
    {
        llSetText(OBJECT_NAME, <1.0, 1.0, 1.0>, 1.0);
        llSay(0, OBJECT_NAME + " is ready.");
    }

    touch_start(integer total_number)
    {
        key toucher = llDetectedKey(0);
        string name = llDetectedName(0);
        llSay(CHAT_CHANNEL, name + " touched " + OBJECT_NAME);
${extras === "sound" ? "        llTriggerSound(SOUND_UUID, SOUND_VOL);\n" : ""}${extras === "animation" ? '        llRequestPermissions(toucher, PERMISSION_TRIGGER_ANIMATION);\n' : ""}${extras === "particles" ? "        // Toggle particles\n        if (PARTICLES_ON)\n        {\n            llParticleSystem([\n                PSYS_PART_FLAGS, PSYS_PART_EMISSIVE_MASK | PSYS_PART_INTERP_COLOR_MASK,\n                PSYS_SRC_PATTERN, PSYS_SRC_PATTERN_EXPLODE,\n                PSYS_PART_START_COLOR, <1.0, 1.0, 1.0>,\n                PSYS_PART_END_COLOR, <0.0, 0.5, 1.0>,\n                PSYS_PART_START_ALPHA, 1.0,\n                PSYS_PART_END_ALPHA, 0.0,\n                PSYS_PART_START_SCALE, <0.1, 0.1, 0.0>,\n                PSYS_PART_END_SCALE, <0.5, 0.5, 0.0>,\n                PSYS_PART_MAX_AGE, 2.0,\n                PSYS_SRC_MAX_AGE, 0.0,\n                PSYS_SRC_BURST_RATE, 0.1,\n                PSYS_SRC_BURST_PART_COUNT, 10\n            ]);\n        }\n" : ""}    }
${extras === "animation" ? '\n    run_time_permissions(integer perm)\n    {\n        if (perm & PERMISSION_TRIGGER_ANIMATION)\n        {\n            llStartAnimation("sit"); // Replace with your animation name\n        }\n    }\n' : ""}}`,

    timer: `// ============================================
// ${objectName || "Timer Script"}
// Type: Timer / Repeating Action
// Description: ${description || "Timer-based repeating script"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME  = "${objectName || "My Timer Object"}";
float   TIMER_INTERVAL = 5.0; // Seconds between each tick
integer CHAT_CHANNEL = ${ch};
integer tick_count = 0;

default
{
    state_entry()
    {
        llSetText(OBJECT_NAME + "\\nTimer Active", <0.0, 1.0, 0.5>, 1.0);
        llSetTimerEvent(TIMER_INTERVAL);
        llSay(CHAT_CHANNEL, OBJECT_NAME + " timer started (" + (string)TIMER_INTERVAL + "s interval).");
    }

    timer()
    {
        tick_count++;
        // --- Your repeating action here ---
        llSetText(OBJECT_NAME + "\\nTick: " + (string)tick_count, <0.0, 1.0, 0.5>, 1.0);
${extras === "sound" ? '        llTriggerSound("00000000-0000-0000-0000-000000000000", 0.5);\n' : ""}    }

    touch_start(integer total_number)
    {
        // Toggle timer on touch
        if (TIMER_INTERVAL > 0.0)
        {
            llSetTimerEvent(0.0);
            TIMER_INTERVAL = 0.0;
            llSetText(OBJECT_NAME + "\\nTimer Paused", <1.0, 0.5, 0.0>, 1.0);
        }
        else
        {
            TIMER_INTERVAL = 5.0;
            llSetTimerEvent(TIMER_INTERVAL);
            llSetText(OBJECT_NAME + "\\nTimer Active", <0.0, 1.0, 0.5>, 1.0);
        }
    }
}`,

    dialog: `// ============================================
// ${objectName || "Dialog Menu Script"}
// Type: Dialog Menu System
// Description: ${description || "Interactive menu system with llDialog"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME  = "${objectName || "Menu Object"}";
integer MENU_CHANNEL;
integer menu_handler;
list    MAIN_MENU = ["Option 1", "Option 2", "Option 3", "Info", "Help", "Close"];

default
{
    state_entry()
    {
        MENU_CHANNEL = (integer)(llFrand(1000000) + 1000);
        llSetText(OBJECT_NAME + "\\nTouch for Menu", <1.0, 1.0, 1.0>, 1.0);
    }

    touch_start(integer total_number)
    {
        key toucher = llDetectedKey(0);
        llListenRemove(menu_handler);
        menu_handler = llListen(MENU_CHANNEL, "", toucher, "");
        llDialog(toucher, "\\n" + OBJECT_NAME + "\\n\\nSelect an option:", MAIN_MENU, MENU_CHANNEL);
        llSetTimerEvent(30.0); // Menu timeout
    }

    listen(integer channel, string name, key id, string message)
    {
        llListenRemove(menu_handler);
        llSetTimerEvent(0.0);

        if (message == "Option 1")
        {
            llSay(0, name + " selected Option 1");
            // --- Add your Option 1 logic here ---
        }
        else if (message == "Option 2")
        {
            llSay(0, name + " selected Option 2");
            // --- Add your Option 2 logic here ---
        }
        else if (message == "Option 3")
        {
            llSay(0, name + " selected Option 3");
            // --- Add your Option 3 logic here ---
        }
        else if (message == "Info")
        {
            llSay(0, OBJECT_NAME + " - Created with SL Builder");
        }
        else if (message == "Help")
        {
            llInstantMessage(id, "Touch the object and select an option from the menu.");
        }
        // "Close" - do nothing, menu closes
    }

    timer()
    {
        llListenRemove(menu_handler);
        llSetTimerEvent(0.0);
    }
}`,

    sensor: `// ============================================
// ${objectName || "Sensor Script"}
// Type: Sensor / Detection
// Description: ${description || "Detects nearby avatars and objects"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME   = "${objectName || "Sensor Object"}";
float   SCAN_RANGE    = 10.0;  // Range in meters
float   SCAN_ARC      = PI;    // Detection arc (PI = 180 degrees)
float   SCAN_INTERVAL = 5.0;   // Seconds between scans
integer CHAT_CHANNEL  = ${ch};

default
{
    state_entry()
    {
        llSetText(OBJECT_NAME + "\\nScanning...", <0.0, 1.0, 0.5>, 1.0);
        llSensorRepeat("", NULL_KEY, AGENT, SCAN_RANGE, SCAN_ARC, SCAN_INTERVAL);
    }

    sensor(integer num_detected)
    {
        integer i;
        string detected_list = "";
        for (i = 0; i < num_detected; i++)
        {
            detected_list += llDetectedName(i);
            if (i < num_detected - 1) detected_list += ", ";
        }
        llSetText(OBJECT_NAME + "\\nDetected: " + (string)num_detected, <0.0, 1.0, 0.5>, 1.0);
        llSay(CHAT_CHANNEL, "Detected " + (string)num_detected + " avatar(s): " + detected_list);
${extras === "sound" ? '        llTriggerSound("00000000-0000-0000-0000-000000000000", 0.5);\n' : ""}    }

    no_sensor()
    {
        llSetText(OBJECT_NAME + "\\nNo avatars in range", <1.0, 0.5, 0.0>, 1.0);
    }

    touch_start(integer total_number)
    {
        llSensor("", NULL_KEY, AGENT, SCAN_RANGE, SCAN_ARC);
    }
}`,

    movement: `// ============================================
// ${objectName || "Movement Script"}
// Type: Movement / Rotation
// Description: ${description || "Object movement and rotation"}
// ============================================

// --- Configuration ---
string    OBJECT_NAME  = "${objectName || "Moving Object"}";
vector    MOVE_OFFSET  = <0.0, 0.0, 2.0>;  // Movement offset in meters
float     MOVE_TIME    = 2.0;               // Movement duration
float     ROT_SPEED    = 1.0;               // Rotation speed (radians/sec)
integer   is_moved     = FALSE;
vector    home_pos;

default
{
    state_entry()
    {
        home_pos = llGetPos();
        llSetText(OBJECT_NAME + "\\nTouch to move", <1.0, 1.0, 1.0>, 1.0);
    }

    touch_start(integer total_number)
    {
        if (!is_moved)
        {
            llSetKeyframedMotion([MOVE_OFFSET, MOVE_TIME], [KFM_DATA, KFM_TRANSLATION]);
            is_moved = TRUE;
            llSetText(OBJECT_NAME + "\\nTouch to return", <0.0, 1.0, 0.5>, 1.0);
${extras === "sound" ? '            llTriggerSound("00000000-0000-0000-0000-000000000000", 1.0);\n' : ""}        }
        else
        {
            llSetKeyframedMotion([-MOVE_OFFSET, MOVE_TIME], [KFM_DATA, KFM_TRANSLATION]);
            is_moved = FALSE;
            llSetText(OBJECT_NAME + "\\nTouch to move", <1.0, 1.0, 1.0>, 1.0);
${extras === "sound" ? '            llTriggerSound("00000000-0000-0000-0000-000000000000", 1.0);\n' : ""}        }
    }
}`,

    communication: `// ============================================
// ${objectName || "Communication Script"}
// Type: Chat / Communication
// Description: ${description || "Chat relay and messaging system"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME    = "${objectName || "Comm Relay"}";
integer LISTEN_CHANNEL = ${ch};
integer BROADCAST_CH   = 0;
integer listen_handler;

default
{
    state_entry()
    {
        listen_handler = llListen(LISTEN_CHANNEL, "", NULL_KEY, "");
        llSetText(OBJECT_NAME + "\\nListening on ch " + (string)LISTEN_CHANNEL, <0.0, 1.0, 0.5>, 1.0);
        llSay(0, OBJECT_NAME + " active. Send messages on channel " + (string)LISTEN_CHANNEL);
    }

    listen(integer channel, string name, key id, string message)
    {
        if (channel == LISTEN_CHANNEL)
        {
            llSay(BROADCAST_CH, "[" + OBJECT_NAME + "] " + name + ": " + message);
${extras === "sound" ? '            llTriggerSound("00000000-0000-0000-0000-000000000000", 0.3);\n' : ""}        }
    }

    touch_start(integer total_number)
    {
        key toucher = llDetectedKey(0);
        llInstantMessage(toucher, OBJECT_NAME + " is listening on channel " + (string)LISTEN_CHANNEL + ". Use: /" + (string)LISTEN_CHANNEL + " your message");
    }
}`,

    door: `// ============================================
// ${objectName || "Door Script"}
// Type: Door / Gate
// Description: ${description || "Automatic swinging door"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME = "${objectName || "Door"}";
float   OPEN_TIME   = 5.0;   // Seconds to stay open
float   SWING_ANGLE = 90.0;  // Degrees to swing open
integer is_open     = FALSE;
rotation closed_rot;

default
{
    state_entry()
    {
        closed_rot = llGetRot();
        llSetText("", ZERO_VECTOR, 0.0);
    }

    touch_start(integer total_number)
    {
        if (!is_open)
        {
            // Open the door
            rotation openRot = llEuler2Rot(<0.0, 0.0, SWING_ANGLE * DEG_TO_RAD>);
            llSetRot(closed_rot * openRot);
            is_open = TRUE;
            llSetTimerEvent(OPEN_TIME);
${extras === "sound" ? '            llTriggerSound("00000000-0000-0000-0000-000000000000", 1.0); // Door open sound\n' : ""}        }
        else
        {
            // Close the door
            llSetRot(closed_rot);
            is_open = FALSE;
            llSetTimerEvent(0.0);
${extras === "sound" ? '            llTriggerSound("00000000-0000-0000-0000-000000000000", 1.0); // Door close sound\n' : ""}        }
    }

    timer()
    {
        // Auto-close
        llSetRot(closed_rot);
        is_open = FALSE;
        llSetTimerEvent(0.0);
${extras === "sound" ? '        llTriggerSound("00000000-0000-0000-0000-000000000000", 1.0);\n' : ""}    }
}`,

    teleport: `// ============================================
// ${objectName || "Teleporter Script"}
// Type: Teleporter
// Description: ${description || "Teleport avatar to target location"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME  = "${objectName || "Teleporter"}";
vector  TARGET_POS   = <128.0, 128.0, 30.0>; // Destination coordinates
vector  TARGET_LOOKAT = <0.0, 1.0, 0.0>;      // Look direction at destination
string  DESTINATION  = "";                     // SLurl region name (leave empty for same region)

default
{
    state_entry()
    {
        llSetText(OBJECT_NAME + "\\nTouch to Teleport", <0.0, 1.0, 0.5>, 1.0);
        llSetSitText("Teleport");
    }

    touch_start(integer total_number)
    {
        key toucher = llDetectedKey(0);

        if (DESTINATION != "")
        {
            // Cross-region teleport
            llMapDestination(DESTINATION, TARGET_POS, TARGET_LOOKAT);
            llInstantMessage(toucher, "Opening map to " + DESTINATION + "...");
        }
        else
        {
            // Same-region teleport via sit
            llInstantMessage(toucher, "Sit on the object to teleport, or click the map link.");
            llMapDestination(llGetRegionName(), TARGET_POS, TARGET_LOOKAT);
        }
${extras === "sound" ? '\n        llTriggerSound("00000000-0000-0000-0000-000000000000", 1.0);\n' : ""}${extras === "particles" ? "\n        llParticleSystem([\n            PSYS_PART_FLAGS, PSYS_PART_EMISSIVE_MASK | PSYS_PART_INTERP_COLOR_MASK | PSYS_PART_INTERP_SCALE_MASK,\n            PSYS_SRC_PATTERN, PSYS_SRC_PATTERN_EXPLODE,\n            PSYS_PART_START_COLOR, <0.0, 1.0, 0.5>,\n            PSYS_PART_END_COLOR, <0.0, 0.2, 1.0>,\n            PSYS_PART_START_ALPHA, 1.0,\n            PSYS_PART_END_ALPHA, 0.0,\n            PSYS_PART_START_SCALE, <0.2, 0.2, 0.0>,\n            PSYS_PART_END_SCALE, <1.0, 1.0, 0.0>,\n            PSYS_PART_MAX_AGE, 1.5,\n            PSYS_SRC_MAX_AGE, 2.0,\n            PSYS_SRC_BURST_RATE, 0.05,\n            PSYS_SRC_BURST_PART_COUNT, 20\n        ]);\n" : ""}    }
}`,

    particle: `// ============================================
// ${objectName || "Particle Script"}
// Type: Particle Effects
// Description: ${description || "Customizable particle system"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME  = "${objectName || "Particle Emitter"}";
integer particles_on = TRUE;

// Particle Settings
vector  START_COLOR  = <1.0, 1.0, 1.0>;
vector  END_COLOR    = <0.0, 0.5, 1.0>;
float   START_ALPHA  = 1.0;
float   END_ALPHA    = 0.0;
vector  START_SCALE  = <0.1, 0.1, 0.0>;
vector  END_SCALE    = <0.5, 0.5, 0.0>;
float   MAX_AGE      = 3.0;
float   BURST_RATE   = 0.1;
integer BURST_COUNT  = 5;

startParticles()
{
    llParticleSystem([
        PSYS_PART_FLAGS,
            PSYS_PART_EMISSIVE_MASK |
            PSYS_PART_INTERP_COLOR_MASK |
            PSYS_PART_INTERP_SCALE_MASK |
            PSYS_PART_FOLLOW_SRC_MASK,
        PSYS_SRC_PATTERN, PSYS_SRC_PATTERN_EXPLODE,
        PSYS_PART_START_COLOR, START_COLOR,
        PSYS_PART_END_COLOR, END_COLOR,
        PSYS_PART_START_ALPHA, START_ALPHA,
        PSYS_PART_END_ALPHA, END_ALPHA,
        PSYS_PART_START_SCALE, START_SCALE,
        PSYS_PART_END_SCALE, END_SCALE,
        PSYS_PART_MAX_AGE, MAX_AGE,
        PSYS_SRC_MAX_AGE, 0.0,
        PSYS_SRC_BURST_RATE, BURST_RATE,
        PSYS_SRC_BURST_PART_COUNT, BURST_COUNT,
        PSYS_SRC_BURST_SPEED_MIN, 0.5,
        PSYS_SRC_BURST_SPEED_MAX, 2.0
    ]);
}

stopParticles()
{
    llParticleSystem([]);
}

default
{
    state_entry()
    {
        llSetText(OBJECT_NAME + "\\nTouch to Toggle", <1.0, 1.0, 1.0>, 1.0);
        startParticles();
    }

    touch_start(integer total_number)
    {
        particles_on = !particles_on;
        if (particles_on)
        {
            startParticles();
            llSetText(OBJECT_NAME + "\\nParticles: ON", <0.0, 1.0, 0.5>, 1.0);
${extras === "sound" ? '            llTriggerSound("00000000-0000-0000-0000-000000000000", 0.5);\n' : ""}        }
        else
        {
            stopParticles();
            llSetText(OBJECT_NAME + "\\nParticles: OFF", <1.0, 0.5, 0.0>, 1.0);
        }
    }
}`,

    vendor: `// ============================================
// ${objectName || "Vendor Script"}
// Type: Vendor / Payment
// Description: ${description || "In-world vendor with payment processing"}
// ============================================

// --- Configuration ---
string  OBJECT_NAME  = "${objectName || "Vendor"}";
integer PRICE        = 100;     // Price in L$
string  ITEM_NAME    = "Product"; // Name of item to deliver
integer CHAT_CHANNEL = ${ch};

default
{
    state_entry()
    {
        llSetPayPrice(PRICE, [PRICE, PRICE * 2, PRICE * 5, PRICE * 10]);
        llSetText(OBJECT_NAME + "\\nL$" + (string)PRICE + "\\nTouch for info", <0.0, 1.0, 0.5>, 1.0);
        llSetClickAction(CLICK_ACTION_PAY);
    }

    touch_start(integer total_number)
    {
        key toucher = llDetectedKey(0);
        llInstantMessage(toucher, OBJECT_NAME + " - " + ITEM_NAME + " costs L$" + (string)PRICE + ". Right-click and Pay to purchase.");
    }

    money(key id, integer amount)
    {
        if (amount >= PRICE)
        {
            llSay(0, "Thank you, " + llKey2Name(id) + "! Delivering " + ITEM_NAME + "...");
            llGiveInventory(id, ITEM_NAME);
${extras === "sound" ? '            llTriggerSound("00000000-0000-0000-0000-000000000000", 1.0);\n' : ""}
            // Refund overpayment
            integer change = amount - PRICE;
            if (change > 0)
            {
                llGiveMoney(id, change);
                llInstantMessage(id, "Refunded L$" + (string)change + " overpayment.");
            }
        }
        else
        {
            llGiveMoney(id, amount);
            llInstantMessage(id, "Insufficient payment. The price is L$" + (string)PRICE + ". Your L$" + (string)amount + " has been refunded.");
        }
    }
}`,
  }

  return templates[scriptType] || templates["touch"]
}

function generatePrefabOutput(values: Record<string, string>): string {
  const { prefabType, objectName, style, dimensions, maxPrims, details } = values
  const prims = maxPrims || "32"

  return `=====================================
PREFAB: ${objectName || "Unnamed Object"}
=====================================

1. OVERVIEW
-----------
Type:       ${prefabType ? prefabType.replace("_", " ").toUpperCase() : "BUILDING"}
Style:      ${style ? style.charAt(0).toUpperCase() + style.slice(1) : "Modern"}
Dimensions: ${dimensions || "10x10x4"} meters (W x D x H)
Max Prims:  ${prims}
${details ? `Notes:      ${details}` : ""}

2. FEATURES
-----------
- Modular construction using standard prims
- ${style === "modern" ? "Clean lines, glass panels, and smooth surfaces" : style === "medieval" ? "Rough stone textures, wooden beams, and iron fixtures" : style === "scifi" ? "Glowing panels, metallic surfaces, and holographic displays" : style === "nature" ? "Organic shapes, natural materials, and living elements" : style === "steampunk" ? "Brass fittings, gears, pipes, and Victorian elements" : style === "japanese" ? "Paper screens, bamboo, tatami mats, and zen aesthetics" : style === "industrial" ? "Exposed brick, metal beams, concrete, and raw finishes" : "Ornate molding, rich fabrics, and detailed craftsmanship"}
- Optimized for ${prims} prim limit
- Easy to modify and customize

3. BUILDING INSTRUCTIONS
------------------------

Step 1: Create the Base
  - Rez a box prim
  - Set size to <${dimensions ? dimensions.split("x")[0] : "10"}.0, ${dimensions ? dimensions.split("x")[1] : "10"}.0, 0.25>
  - Position at ground level
  - Apply floor texture (${style === "medieval" ? "stone/wood planks" : style === "scifi" ? "metallic grid" : style === "nature" ? "grass/dirt" : "smooth concrete"})

Step 2: Build Walls
  - Create 4 wall prims (box type)
  - Front wall:  <${dimensions ? dimensions.split("x")[0] : "10"}.0, 0.25, ${dimensions ? (dimensions.split("x")[2] || "4") : "4"}.0>
  - Back wall:   <${dimensions ? dimensions.split("x")[0] : "10"}.0, 0.25, ${dimensions ? (dimensions.split("x")[2] || "4") : "4"}.0>
  - Left wall:   <0.25, ${dimensions ? dimensions.split("x")[1] : "10"}.0, ${dimensions ? (dimensions.split("x")[2] || "4") : "4"}.0>
  - Right wall:  <0.25, ${dimensions ? dimensions.split("x")[1] : "10"}.0, ${dimensions ? (dimensions.split("x")[2] || "4") : "4"}.0>
  - Cut front wall for doorway: path cut 0.0 to 0.3 and 0.7 to 1.0

Step 3: Add Ceiling/Roof
  - Duplicate base prim
  - Position at top of walls
  - ${style === "medieval" ? "Use prism shape for peaked roof" : style === "japanese" ? "Use slight curve with tapered edges" : "Keep flat or add slight slope"}

Step 4: Add Details
  - ${prefabType === "building" ? "Add window cutouts (hollow + path cut)" : prefabType === "furniture" ? "Add cushions/surfaces using cylinder and box prims" : "Add decorative elements using sculpts or tortured prims"}
  - Apply textures per style guide
  - Set phantom on decorative-only prims

Step 5: Link & Finalize
  - Select all prims (Edit > Select linked)
  - Link together (Ctrl+L)
  - Set root prim to base
  - Name object: "${objectName || "Unnamed Object"}"

4. TEXTURE GUIDE
----------------
Primary surface:   ${style === "modern" ? "White/gray smooth concrete" : style === "medieval" ? "Rough stone or dark wood" : style === "scifi" ? "Brushed metal with glow" : style === "nature" ? "Bark, moss, or leaf patterns" : "Material-appropriate texture"}
Accent surfaces:   ${style === "modern" ? "Glass (50% transparent)" : style === "medieval" ? "Iron/copper metalwork" : style === "scifi" ? "Holographic blue/cyan panels" : style === "nature" ? "Flower/vine overlays" : "Contrasting accent material"}
Floor:             ${style === "modern" ? "Polished concrete or hardwood" : style === "medieval" ? "Flagstone or rough planks" : style === "scifi" ? "Grid pattern with glow strips" : style === "nature" ? "Grass, sand, or packed earth" : "Style-appropriate flooring"}

5. OPTIONAL ENHANCEMENTS
-------------------------
- Add scripts for interactive doors (see LSL Scripts tab)
- Add ambient lighting prims (50% glow, phantom)
- Create a security system with sensor scripts
- Add a visitor counter with touch scripts
- ${style === "scifi" ? "Add animated holographic displays" : style === "medieval" ? "Add flickering torch particles" : style === "nature" ? "Add ambient nature particle effects" : "Add atmospheric lighting effects"}`
}

function generateTextureOutput(values: Record<string, string>): string {
  const { assetType, assetName, style, resolution, colorScheme, details } = values

  return `=====================================
ASSET: ${assetName || "Unnamed Asset"}
=====================================

1. OVERVIEW
-----------
Type:       ${assetType ? assetType.toUpperCase() : "TEXTURE"}
Name:       ${assetName || "Unnamed Asset"}
Style:      ${style ? style.charAt(0).toUpperCase() + style.slice(1) : "Realistic"}
Resolution: ${resolution || "1024"}x${resolution || "1024"} px
Colors:     ${colorScheme || "Neutral palette"}
${details ? `Purpose:    ${details}` : ""}

2. ASSET DESCRIPTION (FOR 3D ARTIST)
-------------------------------------
${assetType === "texture" ? `Create a seamless, tileable texture for virtual world environments.

Visual Style: ${style === "realistic" ? "Photo-realistic with subtle noise and natural imperfections" : style === "stylized" ? "Hand-crafted look with visible brushstrokes and simplified details" : style === "cartoon" ? "Bold outlines, flat colors, and exaggerated features" : style === "pixel" ? "Low-resolution pixel art with clean edges and limited palette" : style === "handpainted" ? "Traditional painted look with blended colors and soft edges" : "Physically based rendering with full material maps"}

Color Palette: ${colorScheme || "Neutral earth tones"}
Surface: ${details || "Standard surface material"}

Required Maps:
- Diffuse/Albedo map (${resolution || "1024"}x${resolution || "1024"})
- Normal map (for surface detail)
- Specular map (for shine/roughness)
${style === "pbr" ? "- Metallic map\n- Roughness map\n- AO (Ambient Occlusion) map" : ""}

Tiling: Must be seamless in both X and Y directions
Edge Treatment: Ensure no visible seams when tiled` : assetType === "mesh" ? `Create a 3D mesh model optimized for virtual world upload.

Visual Style: ${style ? style.charAt(0).toUpperCase() + style.slice(1) : "Realistic"}
Color Palette: ${colorScheme || "Neutral palette"}

Mesh Requirements:
- LOD Levels: 4 (High, Medium, Low, Lowest)
  - High:   Full detail (max ~5000 triangles)
  - Medium: 50% reduction
  - Low:    75% reduction
  - Lowest: 90% reduction (bounding box shape)
- UV Mapping: Single UV channel, efficient island layout
- Materials: Max 8 material faces
- Scale: Model in meters (1 Blender unit = 1 SL meter)

Export Settings:
- Format: COLLADA (.dae)
- Include materials and textures
- Y-up coordinate system` : assetType === "animation" ? `Create an avatar animation for virtual worlds.

Style: ${style ? style.charAt(0).toUpperCase() + style.slice(1) : "Natural"}
Description: ${details || "Standard avatar animation"}

Animation Requirements:
- Format: BVH (Biovision Hierarchy)
- Frame Rate: 30 fps
- Duration: 2-10 seconds (loop-friendly)
- Priority: 4 (overrides default anims)
- Joints: Use SL-compatible bone names
- Loop: Ensure first and last frames blend smoothly

Recommended Software: Blender with Avastar/Animare plugin` : `Create a ${assetType} asset for virtual worlds.

Description: ${details || "General virtual world asset"}
Style: ${style ? style.charAt(0).toUpperCase() + style.slice(1) : "Realistic"}
Colors: ${colorScheme || "Neutral palette"}`}

3. SL OPTIMIZATION TIPS
------------------------
${assetType === "texture" ? `- Use power-of-2 resolutions (256, 512, 1024, 2048)
- Keep textures as small as possible while maintaining quality
- Use ${resolution || "1024"}x${resolution || "1024"} max for detail textures
- Use 256x256 for small/distant objects
- Compress as JPEG2000 (SL's internal format)
- Combine related textures into atlas sheets where possible
- Use alpha channels sparingly (alpha sorting is expensive)
- Test at multiple zoom levels in SL viewer` : assetType === "mesh" ? `- Keep triangle count under 5000 for high LOD
- Use LOD levels to reduce rendering cost at distance
- Minimize material/face count (max 8 per mesh)
- Avoid overlapping UV islands
- Use 1024x1024 textures max per material
- Test physics shape separately (use simplified hull)
- Land Impact is calculated from: download weight + physics weight + server weight
- Use Analyze in upload window to check Land Impact before uploading` : `- Test all assets in-world before finalizing
- Consider viewer rendering cost
- Follow SL content creation best practices
- Optimize for the target viewer (Firestorm, official SL viewer)`}

4. IMPLEMENTATION IN SECOND LIFE
----------------------------------
${assetType === "texture" ? `1. Save as PNG or TGA (with alpha if needed)
2. In SL: Build > Upload > Image (L$10 per upload)
3. Apply to object face via Edit > Texture tab
4. Adjust repeats: Horizontal ${resolution === "256" ? "1-2" : resolution === "2048" ? "0.5-1" : "1"}, Vertical ${resolution === "256" ? "1-2" : resolution === "2048" ? "0.5-1" : "1"}
5. Set mapping to "Default" for flat surfaces, "Planar" for curved` : assetType === "mesh" ? `1. Export from Blender as .dae (COLLADA)
2. In SL: Build > Upload > Model
3. Configure LOD levels in upload window
4. Set physics to "Analyze" or use simplified shape
5. Check Land Impact before uploading
6. Upload (L$11+ depending on complexity)` : assetType === "animation" ? `1. Export as .bvh from Blender/animation software
2. In SL: Build > Upload > Animation (L$10)
3. Set priority, loop settings in upload dialog
4. Test on your avatar before distributing
5. Trigger via LSL: llStartAnimation("anim_name")` : `1. Prepare asset following SL guidelines
2. Upload via Build > Upload menu
3. Test in-world at multiple distances
4. Optimize if needed based on performance`}

5. OPTIONAL ENHANCEMENTS
-------------------------
- Create multiple color variants
- Add seasonal/weather variations
- ${assetType === "texture" ? "Create matching normal maps for added depth" : assetType === "mesh" ? "Add rigging for avatar attachment" : "Add complementary assets for a complete set"}
- Package as a complete asset kit for distribution`
}

function generateNPCOutput(values: Record<string, string>): string {
  const { npcType, npcName, personality, features, behavior } = values

  const personalityDialogs: Record<string, string[]> = {
    friendly: ["Hello there, friend!", "Welcome! How can I help you today?", "Great to see you around!"],
    formal: ["Greetings. How may I assist you?", "Welcome. Please state your business.", "I am at your service."],
    mysterious: ["Ah... another wanderer...", "The shadows have whispered of your arrival...", "Seek and you shall find..."],
    humorous: ["Well well well, look what the cat dragged in!", "Another adventurer? The last one ran away screaming!", "I would offer you a seat, but I am made of prims."],
    aggressive: ["What do you want?!", "State your business or leave!", "You dare approach me?"],
    neutral: ["Processing... Welcome, user.", "Standing by for interaction.", "Awaiting input."],
  }

  const greetings = personalityDialogs[personality || "friendly"] || personalityDialogs["friendly"]

  return `// ============================================
// NPC: ${npcName || "NPC"}
// Type: ${npcType ? npcType.replace("_", " ").charAt(0).toUpperCase() + npcType.replace("_", " ").slice(1) : "Greeter"}
// Personality: ${personality ? personality.charAt(0).toUpperCase() + personality.slice(1) : "Friendly"}
// Description: ${behavior || "Interactive NPC system"}
// ============================================

// --- Configuration ---
string  NPC_NAME     = "${npcName || "NPC"}";
integer MENU_CHANNEL;
integer menu_handler;
string  GREETING_1   = "${greetings[0]}";
string  GREETING_2   = "${greetings[1]}";
string  GREETING_3   = "${greetings[2]}";
float   SCAN_RANGE   = 10.0;
float   SCAN_INTERVAL = 5.0;

// Menu options
list MAIN_MENU = ["Talk", "Info", "Trade", "Quest", "Help", "Leave"];

// State tracking
integer greeted_recently = FALSE;

default
{
    state_entry()
    {
        MENU_CHANNEL = (integer)(llFrand(1000000) + 1000);
        llSetText(NPC_NAME, <1.0, 1.0, 1.0>, 1.0);
${features === "pathfinding" || features === "all" ? "        // Start patrol behavior\n        llSetTimerEvent(10.0);\n" : ""}${features === "animation" || features === "all" ? '        // Play idle animation\n        llStartAnimation("stand"); // Replace with custom idle anim\n' : ""}${npcType === "greeter" || npcType === "ambient" ? "        // Start sensor for nearby avatars\n        llSensorRepeat(\"\", NULL_KEY, AGENT, SCAN_RANGE, PI, SCAN_INTERVAL);\n" : ""}    }
${npcType === "greeter" || npcType === "ambient" ? `
    sensor(integer num_detected)
    {
        if (!greeted_recently)
        {
            integer random = (integer)llFrand(3.0);
            string greeting;
            if (random == 0) greeting = GREETING_1;
            else if (random == 1) greeting = GREETING_2;
            else greeting = GREETING_3;

            llSay(0, greeting);
            greeted_recently = TRUE;
            llSetTimerEvent(30.0); // Cooldown before greeting again
        }
    }

    no_sensor()
    {
        greeted_recently = FALSE;
    }
` : ""}
    touch_start(integer total_number)
    {
        key toucher = llDetectedKey(0);
        llListenRemove(menu_handler);
        menu_handler = llListen(MENU_CHANNEL, "", toucher, "");
${features === "animation" || features === "all" ? '        // Play greeting animation\n        llStartAnimation("bow"); // Replace with custom greeting anim\n' : ""}
        llDialog(toucher, "\\n" + NPC_NAME + "\\n\\n" + GREETING_1 + "\\n\\nWhat would you like to do?", MAIN_MENU, MENU_CHANNEL);
        llSetTimerEvent(30.0); // Menu timeout
    }

    listen(integer channel, string name, key id, string message)
    {
        llListenRemove(menu_handler);

        if (message == "Talk")
        {
            integer random = (integer)llFrand(3.0);
            if (random == 0) llSay(0, GREETING_1);
            else if (random == 1) llSay(0, GREETING_2);
            else llSay(0, GREETING_3);
            // Re-show menu
            menu_handler = llListen(MENU_CHANNEL, "", id, "");
            llDialog(id, "\\n" + NPC_NAME + "\\n\\nAnything else?", MAIN_MENU, MENU_CHANNEL);
        }
        else if (message == "Info")
        {
            llInstantMessage(id, NPC_NAME + " | ${npcType ? npcType.replace("_", " ").charAt(0).toUpperCase() + npcType.replace("_", " ").slice(1) : "NPC"} | Created with SL Builder");
        }
        else if (message == "Trade")
        {
${npcType === "shopkeeper" ? `            // Show trade menu
            list TRADE_MENU = ["Buy Item 1", "Buy Item 2", "Buy Item 3", "Sell", "Back"];
            menu_handler = llListen(MENU_CHANNEL, "", id, "");
            llDialog(id, "\\n" + NPC_NAME + " - Shop\\n\\nWhat would you like to trade?", TRADE_MENU, MENU_CHANNEL);` : `            llSay(0, "I do not have anything to trade right now.");
            menu_handler = llListen(MENU_CHANNEL, "", id, "");
            llDialog(id, "\\n" + NPC_NAME + "\\n\\nAnything else?", MAIN_MENU, MENU_CHANNEL);`}
        }
        else if (message == "Quest")
        {
${npcType === "quest" ? `            llSay(0, "I have a task for you, adventurer...");
            // --- Add your quest logic here ---
            llInstantMessage(id, "Quest: Retrieve the Ancient Artifact from the ruins to the north. Return to me when you have it.");` : `            llSay(0, "I do not have any quests right now. Check back later!");`}
            menu_handler = llListen(MENU_CHANNEL, "", id, "");
            llDialog(id, "\\n" + NPC_NAME + "\\n\\nAnything else?", MAIN_MENU, MENU_CHANNEL);
        }
        else if (message == "Help")
        {
            llInstantMessage(id, "I am " + NPC_NAME + ". Touch me to interact. Use the menu to talk, get info, trade, or receive quests.");
        }
${npcType === "shopkeeper" ? `        else if (llSubStringIndex(message, "Buy") == 0)
        {
            llSay(0, "Sold! Thank you for your purchase, " + name + ".");
            // Add llGiveInventory or payment logic here
        }
        else if (message == "Sell")
        {
            llSay(0, "Let me see what you have...");
        }
        else if (message == "Back")
        {
            menu_handler = llListen(MENU_CHANNEL, "", id, "");
            llDialog(id, "\\n" + NPC_NAME + "\\n\\nAnything else?", MAIN_MENU, MENU_CHANNEL);
        }` : ""}
        // "Leave" - do nothing, menu closes
    }

    timer()
    {
${features === "pathfinding" || features === "all" ? `        // Simple patrol: rotate randomly and move forward
        float random_angle = llFrand(PI) - PI / 2.0;
        llSetRot(llGetRot() * llEuler2Rot(<0.0, 0.0, random_angle>));
        // Optional: move using keyframed motion
        // llSetKeyframedMotion([llGetRot() * <2.0, 0.0, 0.0>, 2.0], [KFM_DATA, KFM_TRANSLATION]);
` : ""}        // Reset greeting cooldown
        greeted_recently = FALSE;
        llSetTimerEvent(0.0);
    }
}

// ============================================
// IMPLEMENTATION STEPS
// ============================================
//
// 1. Create a prim or rez a mesh avatar
// 2. Name the object "${npcName || "NPC"}"
// 3. Open the Content tab and add this script
// 4. ${features === "inventory" || features === "all" ? "Add items to the object inventory for trading/giving" : "Add any notecard or items needed"}
// 5. ${features === "animation" || features === "all" ? 'Replace animation names ("stand", "bow") with your custom animation names' : "Customize the greeting messages and menu options"}
// 6. Test by touching the NPC and using the menu
//
// OPTIONAL ENHANCEMENTS:
// - Add more dialog branches for deeper conversations
// - Implement a memory system using description or notecard storage
// - Add timed behaviors (wander, idle animations)
// - Connect to a central NPC management system via llMessageLinked
// ============================================`
}

function generateWorldOutput(values: Record<string, string>): string {
  const { layoutType, regionName, theme, zoneCount, features, details } = values
  const zones = parseInt(zoneCount) || 4
  const featureList = features ? features.split(",") : []

  const sizeMap: Record<string, { w: number; d: number; label: string }> = {
    full_region: { w: 256, d: 256, label: "Full Region" },
    half_region: { w: 128, d: 256, label: "Half Region" },
    quarter: { w: 128, d: 128, label: "Quarter Region" },
    parcel_large: { w: 64, d: 64, label: "Large Parcel" },
    parcel_medium: { w: 32, d: 32, label: "Medium Parcel" },
    skybox: { w: 64, d: 64, label: "Skybox" },
  }

  const size = sizeMap[layoutType] || sizeMap["full_region"]
  const themeLabel = theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Fantasy"

  const zoneW = Math.floor(size.w / Math.ceil(Math.sqrt(zones)))
  const zoneD = Math.floor(size.d / Math.ceil(zones / Math.ceil(Math.sqrt(zones))))

  let zoneList = ""
  for (let i = 0; i < zones; i++) {
    const col = i % Math.ceil(Math.sqrt(zones))
    const row = Math.floor(i / Math.ceil(Math.sqrt(zones)))
    const x1 = col * zoneW
    const y1 = row * zoneD
    const x2 = x1 + zoneW
    const y2 = y1 + zoneD
    const zoneNames: Record<string, string[]> = {
      fantasy: ["Enchanted Forest", "Castle Grounds", "Village Square", "Dragon's Lair", "Wizard's Tower", "Sacred Grove", "Market District", "Dungeon Entrance"],
      scifi: ["Command Center", "Hangar Bay", "Research Lab", "Residential Deck", "Engineering", "Cargo Hold", "Medical Bay", "Observation Deck"],
      nature: ["Meadow", "Dense Forest", "River Crossing", "Mountain Base", "Lakeside", "Cave System", "Hilltop Vista", "Marsh Wetlands"],
      urban: ["Downtown", "Residential Block", "Park", "Shopping District", "Industrial Zone", "Waterfront", "Entertainment District", "Office Quarter"],
      horror: ["Graveyard", "Abandoned Mansion", "Dark Forest", "Ritual Site", "Crypt", "Haunted Chapel", "Swamp", "Asylum Ruins"],
      tropical: ["Beach Cove", "Palm Grove", "Lagoon", "Tiki Village", "Coral Reef View", "Waterfall", "Jungle Trail", "Volcano Base"],
      steampunk: ["Clocktower Plaza", "Airship Dock", "Foundry", "Market Arcade", "Steam Gardens", "Observatory", "Workshop Row", "Grand Station"],
      abstract: ["Prism Gallery", "Void Garden", "Fractal Chamber", "Mirror Hall", "Color Field", "Sound Scape", "Gravity Well", "Dream Corridor"],
    }
    const names = zoneNames[theme || "fantasy"] || zoneNames["fantasy"]
    const zoneName = names[i % names.length]
    const primsPerZone = Math.floor((layoutType === "skybox" ? 3000 : 15000) / zones)
    zoneList += `
  Zone ${i + 1}: ${zoneName}
    Coordinates: <${x1}, ${y1}, 0> to <${x2}, ${y2}, ${layoutType === "skybox" ? "varies" : "max terrain"}>
    Size: ${zoneW}x${zoneD}m
    Prim Budget: ~${primsPerZone} prims
    Purpose: ${theme === "fantasy" ? "Themed exploration area" : theme === "scifi" ? "Functional station section" : theme === "urban" ? "City district zone" : "Themed area"}
`
  }

  let pathways = ""
  if (featureList.includes("pathways") && zones > 1) {
    pathways = `
4. PATHWAY CONNECTIONS
-----------------------
`
    for (let i = 0; i < zones - 1; i++) {
      const names = (theme ? (theme === "fantasy" ? ["Enchanted Forest", "Castle Grounds", "Village Square", "Dragon's Lair"] : ["Zone A", "Zone B", "Zone C", "Zone D"]) : ["Zone A", "Zone B", "Zone C", "Zone D"])
      pathways += `  ${names[i % names.length]} → ${names[(i + 1) % names.length]}: ${theme === "scifi" ? "Corridor with sliding doors" : theme === "nature" ? "Dirt trail with stone markers" : theme === "urban" ? "Paved sidewalk with street lights" : "Cobblestone path with lanterns"} (width: 3m)\n`
    }
  }

  return `=====================================
WORLD LAYOUT: ${regionName || "Unnamed Region"}
=====================================

1. REGION OVERVIEW
-------------------
Name:       ${regionName || "Unnamed Region"}
Type:       ${size.label}
Theme:      ${themeLabel}
Dimensions: ${size.w}x${size.d}m
Zone Count: ${zones}
${layoutType === "skybox" ? "Altitude:   500m+ (above ground level)" : "Ground:     Standard terrain"}
${details ? `Notes:      ${details}` : ""}

2. FEATURES
------------
${featureList.includes("spawn_point") ? "✓ Landing / Spawn Point — Central arrival area with welcome sign\n" : ""}${featureList.includes("pathways") ? "✓ Pathways & Roads — Connecting all zones with themed walkways\n" : ""}${featureList.includes("water") ? "✓ Water Features — Rivers, ponds, or fountains per theme\n" : ""}${featureList.includes("terrain") ? "✓ Terrain Sculpting — Height variations for visual interest\n" : ""}${featureList.includes("lighting") ? "✓ Custom Lighting — Region windlight/EEP settings\n" : ""}${featureList.includes("music") ? "✓ Ambient Music — Parcel music streams per zone\n" : ""}${featureList.includes("teleporters") ? "✓ Teleporter Network — Quick travel between zones\n" : ""}${featureList.includes("security") ? "✓ Security System — Access control and visitor management\n" : ""}

3. ZONE BREAKDOWN
-------------------
${zoneList}
${pathways}
5. LANDMARK / POI LISTINGS
----------------------------
${featureList.includes("spawn_point") ? `  ★ Landing Point: <${Math.floor(size.w / 2)}, ${Math.floor(size.d / 2)}, ${layoutType === "skybox" ? "501" : "25"}> — Main arrival area\n` : ""}  ★ Central Hub: <${Math.floor(size.w / 2)}, ${Math.floor(size.d / 2)}, ${layoutType === "skybox" ? "501" : "25"}> — Information board and map
${featureList.includes("teleporters") ? `  ★ Teleport Hub: <${Math.floor(size.w / 4)}, ${Math.floor(size.d / 4)}, ${layoutType === "skybox" ? "501" : "25"}> — Zone selection menu\n` : ""}

6. LAND SETTINGS
-----------------
Terrain:     ${theme === "nature" ? "Varied height (0-40m), grass/dirt blend" : theme === "tropical" ? "Low hills (0-10m), sand to grass transition" : theme === "urban" ? "Flat terrain, paved surfaces" : theme === "scifi" ? "Flat metallic platform" : "Moderate terrain (0-20m), mixed surfaces"}
Water:       ${featureList.includes("water") ? `Enabled — Height: ${theme === "tropical" ? "18" : "20"}m` : "Default or disabled"}
Windlight:   ${theme === "horror" ? "Midnight, fog density 0.8, dark clouds" : theme === "scifi" ? "Neon Night, high contrast, cyan ambient" : theme === "fantasy" ? "Golden Hour, warm tones, light mist" : theme === "tropical" ? "Bright Day, vivid colors, clear sky" : "Region default with custom EEP"}
Music:       ${featureList.includes("music") ? "Per-parcel streaming URLs" : "None"}

7. PRIM BUDGET ALLOCATION
---------------------------
Total Available: ~${layoutType === "skybox" ? "3,000" : "15,000"} prims
${featureList.includes("spawn_point") ? "Landing Area:    ~200 prims\n" : ""}${featureList.includes("pathways") ? `Pathways:        ~${Math.floor((layoutType === "skybox" ? 3000 : 15000) * 0.1)} prims\n` : ""}Zone Content:    ~${Math.floor((layoutType === "skybox" ? 3000 : 15000) * 0.7 / zones)} prims per zone
Decorations:     ~${Math.floor((layoutType === "skybox" ? 3000 : 15000) * 0.15)} prims
Scripts/Systems: ~${Math.floor((layoutType === "skybox" ? 3000 : 15000) * 0.05)} prims`
}

function generateModuleOutput(values: Record<string, string>): string {
  const { systemType, systemName, moduleCount, style, features, details } = values
  const count = parseInt(moduleCount) || 6
  const featureList = features ? features.split(",") : []
  const styleLabel = style ? style.charAt(0).toUpperCase() + style.slice(1) : "Modern"

  const moduleTemplates: Record<string, string[]> = {
    wall_kit: ["Straight Wall (4m)", "Straight Wall (2m)", "Corner Piece (90°)", "T-Junction", "Doorway Frame", "Window Wall", "Half Wall (1m)", "Archway"],
    floor_kit: ["Floor Tile (4x4m)", "Floor Tile (2x2m)", "Edge Trim", "Corner Piece", "Stair Ramp", "Platform (4x4m)", "Circular Platform", "Grate/Vent Tile"],
    lighting_rig: ["Ceiling Spot", "Wall Sconce", "Floor Lamp", "Pendant Light", "Strip Light (4m)", "Ambient Orb", "Chandelier", "Track Light"],
    furniture_set: ["Chair", "Table", "Sofa", "Shelf Unit", "Desk", "Bed Frame", "Storage Crate", "Bar Counter"],
    room_template: ["Living Area (8x8m)", "Bedroom (6x6m)", "Kitchen (4x6m)", "Bathroom (3x4m)", "Hallway (2x8m)", "Balcony (6x3m)", "Storage Room (3x3m)", "Open Plan (10x10m)"],
    landscape_kit: ["Tree (Deciduous)", "Tree (Conifer)", "Bush/Shrub", "Rock (Large)", "Rock (Small)", "Fence Section", "Path Segment", "Flower Bed"],
    signage: ["Wall Sign", "Standing Sign", "Hanging Sign", "Billboard", "Directory Board", "Name Plate", "Arrow Marker", "Info Kiosk"],
  }

  const modules = moduleTemplates[systemType] || moduleTemplates["wall_kit"]
  const activeModules = modules.slice(0, count)

  let moduleList = ""
  activeModules.forEach((mod, i) => {
    moduleList += `
  Module ${i + 1}: ${mod}
    Prim Count: ${systemType === "lighting_rig" ? "1-2" : systemType === "furniture_set" ? "3-8" : "2-4"} prims
    Link Set:   ${i + 1 > 1 ? "Linkable with Module 1" : "Root module"}
    Texture:    ${styleLabel}-themed material
`
  })

  let configScript = ""
  if (featureList.includes("color_change") || featureList.includes("linked_comm")) {
    configScript = `
// ============================================
// ${systemName || "Module"} — Configuration Script
// Place in ROOT prim of each module
// ============================================

integer MODULE_CHANNEL = -${Math.floor(Math.random() * 90000) + 10000};
integer MODULE_ID = 1; // Change per module: 1, 2, 3...
string  MODULE_NAME = "${systemName || "Module"}";

default
{
    state_entry()
    {
        llSetText(MODULE_NAME + " #" + (string)MODULE_ID, <1.0, 1.0, 1.0>, 0.5);
        llListen(MODULE_CHANNEL, "", NULL_KEY, "");
    }
${featureList.includes("color_change") ? `
    touch_start(integer n)
    {
        key toucher = llDetectedKey(0);
        integer menuCh = (integer)(llFrand(100000) + 1000);
        llListen(menuCh, "", toucher, "");
        llDialog(toucher, MODULE_NAME + " — Color Menu", ["Red", "Blue", "Green", "White", "Black", "Wood", "Metal", "Stone", "Reset", "Broadcast"], menuCh);
    }
` : ""}
    listen(integer ch, string name, key id, string msg)
    {
${featureList.includes("color_change") ? `        // Color change handling
        vector color;
        if (msg == "Red") color = <1,0,0>;
        else if (msg == "Blue") color = <0,0,1>;
        else if (msg == "Green") color = <0,1,0>;
        else if (msg == "White") color = <1,1,1>;
        else if (msg == "Black") color = <0.1,0.1,0.1>;
        else if (msg == "Reset") color = <1,1,1>;
        else if (msg == "Broadcast")
        {
            // Send to all modules
            llRegionSay(MODULE_CHANNEL, "COLOR:" + (string)llGetColor(0));
            return;
        }
        else
        {
            // Handle broadcast from other modules
            if (llSubStringIndex(msg, "COLOR:") == 0)
            {
                color = (vector)llGetSubString(msg, 6, -1);
            }
            else return;
        }
        llSetColor(color, ALL_SIDES);
` : ""}${featureList.includes("linked_comm") ? `        // Inter-module communication
        if (llSubStringIndex(msg, "SYNC:") == 0)
        {
            string data = llGetSubString(msg, 5, -1);
            llMessageLinked(LINK_SET, MODULE_ID, data, NULL_KEY);
        }
` : ""}    }
${featureList.includes("linked_comm") ? `
    link_message(integer sender, integer num, string str, key id)
    {
        // Relay module state to other modules
        llRegionSay(MODULE_CHANNEL, "SYNC:" + str);
    }
` : ""}}
`
  }

  return `=====================================
MODULAR SYSTEM: ${systemName || "Unnamed System"}
=====================================

1. SYSTEM OVERVIEW
-------------------
Name:         ${systemName || "Unnamed System"}
Type:         ${systemType ? systemType.replace("_", " ").toUpperCase() : "WALL KIT"}
Style:        ${styleLabel}
Module Count: ${count}
${details ? `Notes:        ${details}` : ""}

2. SYSTEM FEATURES
--------------------
${featureList.includes("snap_grid") ? "✓ Snap-to-Grid — Modules align to 0.5m grid for clean builds\n" : ""}${featureList.includes("color_change") ? "✓ Color Change — Touch menu for material/color selection\n" : ""}${featureList.includes("resize") ? "✓ Resize Script — Scale modules via dialog menu\n" : ""}${featureList.includes("linked_comm") ? "✓ Inter-Module Comms — llMessageLinked + llRegionSay sync\n" : ""}${featureList.includes("texture_swap") ? "✓ Texture Swap — Menu-driven texture replacement\n" : ""}${featureList.includes("auto_align") ? "✓ Auto-Alignment — Script-assisted positioning\n" : ""}

3. COMPONENT INVENTORY
------------------------
${moduleList}

4. ASSEMBLY INSTRUCTIONS
--------------------------

Step 1: Rez Base Module
  - Rez Module 1 at desired position
  - This becomes your reference point
  - ${featureList.includes("snap_grid") ? "Enable grid snap (Ctrl+Shift+G, set to 0.5m)" : "Position manually"}

Step 2: Add Connected Modules
  - Rez each additional module adjacent to existing ones
  - ${featureList.includes("snap_grid") ? "Grid snap ensures clean alignment" : "Use Edit > Position for precise placement"}
  - Leave unlinked until all modules are placed

Step 3: Configure Each Module
  - Drop configuration script into each module's content tab
  - Set unique MODULE_ID for each (1, 2, 3, etc.)
  - Test touch interaction on each module

Step 4: Link (Optional)
  - Select all modules in a logical group
  - Link (Ctrl+L) — root prim determines group behavior
  - Keep groups under 256 prim links for performance

Step 5: Finalize
  - Set permissions (copy/mod/no-transfer for distribution)
  - Name each linked set: "${systemName || "Module"} — Group [N]"
  - Test all interactive features

${configScript ? `5. CONFIGURATION SCRIPT
------------------------
${configScript}` : ""}

6. SCALING GUIDELINES
----------------------
Small Build (1-4 modules):
  - Link all into one set
  - Single script handles all interaction
  - ~${count * 3} prims total

Medium Build (5-20 modules):
  - Group into 2-4 linked sets by function
  - Use llRegionSay for cross-group communication
  - ~${count * 3 * 3} prims total

Large Build (20+ modules):
  - Create zone-based groups
  - Use dedicated communication channel per zone
  - Consider using llMessageLinked for intra-group, llRegionSay for inter-group
  - Monitor script memory with llGetFreeMemory()
  - ~${count * 3 * 8}+ prims total`
}

function generateModelOutput(values: Record<string, string>): string {
  const method = values.inputMethod || "text-to-3d"
  const prompt = values.prompt || "A 3D object"
  const style = values.style || "realistic"
  const format = values.format || "glb"

  return `// ============================================
// 3D Model Generation Brief
// Method: ${method === "text-to-3d" ? "Text to 3D" : "Image to 3D"}
// Style: ${style}
// Export Format: .${format.toUpperCase()}
// ============================================

// --- Description ---
// "${prompt}"

// --- Generation Steps ---
// 1. Open Canva Pro or your preferred 3D tool (Meshy, CSM, Tripo3D)
// 2. Use the following optimized prompt:

// --- AI Prompt (copy this into your 3D generator) ---
/*
${prompt}
Style: ${style}
Output: High quality ${style} 3D mesh
Topology: Clean quad-based mesh, optimized for real-time rendering
Poly count: ${style === "cartoon" ? "500-2000 tris (low poly)" : "2000-8000 tris (medium detail)"}
*/

// --- Post-Processing Checklist ---
// [ ] Check mesh for non-manifold geometry
// [ ] Verify UV mapping is correct
// [ ] Generate LOD levels (High, Medium, Low, Lowest)
// [ ] Export as .${format.toUpperCase()}
// [ ] Verify textures are embedded or exported alongside
${format === "glb" ? "// [ ] Validate with https://gltf-viewer.donmccurdy.com/" : ""}

// --- Second Life Upload Notes ---
// - Max upload size: 64MB per mesh
// - Recommended: Export as .DAE (COLLADA) for SL upload
// - Include physics shape (simplified convex hull)
// - LOD levels: High (original), Medium (50%), Low (25%), Lowest (10%)
// - Land Impact depends on mesh complexity and physics shape

// --- Texture Requirements ---
// Diffuse Map:  1024x1024 (PNG or TGA)
// Normal Map:   1024x1024 (optional, improves detail)
// Specular Map: 512x512 (optional, for shininess)

// --- Recommended Free Tools ---
// Meshy.ai     — Text/Image to 3D (free tier available)
// Tripo3D      — Fast text-to-3D generation
// CSM (3DFy)   — Image to 3D mesh
// Blender      — Post-processing and export to .DAE`
}

export function generateOutput(
  category: Category,
  values: Record<string, string>
): string {
  switch (category) {
    case "models":
      return generateModelOutput(values)
    case "scripts":
      return generateScriptOutput(values)
    case "prefabs":
      return generatePrefabOutput(values)
    case "textures":
      return generateTextureOutput(values)
    case "npcs":
      return generateNPCOutput(values)
    case "worlds":
      return generateWorldOutput(values)
    case "modules":
      return generateModuleOutput(values)
    default:
      return "// Select a category and fill in the fields to generate output."
  }
}

