# Pillars of Creation Maps

**Create animated geopolitical map visualizations with simple text commands.**

Built for history storytellers, educators, journalists, and anyone who needs to explain the world through maps. Visualize wars, territorial changes, alliances, and historical events with professional military-grade symbology.

**[Live Demo](https://mikoadam.github.io)** | **[Examples](#-examples)**

---

## Features

- **Animated Country Coloring** — Pulse, fade, radial, sweep animations for countries and regions
- **Occupied Territory Stripes** — Diagonal stripe pattern for disputed/occupied areas
- **Attack Arrows** — Curved arrows with independent shaft width and head size, fully draggable with PowerPoint-style handles
- **Map Symbols** — 19 professional symbols: explosions, battles, tanks, troops, nukes, oil, flags, and more
- **Draggable Everything** — Symbols, bubbles, labels, and arrows are all drag-and-drop repositionable
- **Connection Lines** — Dashed lines between any two countries or coordinates
- **Text Bubbles & Labels** — Rich text annotations with customizable colors and sizes
- **Year Badge** — Prominent date overlay for timeline storytelling
- **Legend** — Auto-generated or manual legend entries
- **Cinematic Camera** — 3D tilted views with smooth pitch, bearing, and zoom transitions
- **Smart Context Menu** — Right-click anywhere for quick access to all features; draggable so it never blocks your work
- **Map Styles** — Switch between Liberty (vector) and NASA Satellite imagery
- **Country coloring persists** across style switches
- **Screenshot Export** — Composite screenshot including arrows, labels, symbols, year badge, and legend
- **Video Recording** — Record animations directly to WebM
- **Script Validation** — Warns about invalid color names and duplicate country colorings
- **Middle Mouse Rotation** — Hold middle mouse button to tilt and rotate the map
- **Zoom-Compensated Symbols** — Symbols scale appropriately when zooming in/out
- **Keyboard Shortcuts** — Full keyboard support in the context menu

---

## Quick Start

### Option 1: Use Online
Visit the [live demo](https://mikoadam.github.io) — no installation needed.

### Option 2: Self-Host

```bash
# Clone the repo
git clone https://github.com/MikoAdam/MikoAdam.github.io.git
cd MikoAdam.github.io

# Build geographic data files (first time only)
npm install -g mapshaper
./build.ps1

# Serve locally or deploy to GitHub Pages
```

---

## Built-in Examples

The app ships with four showcase examples:

| Example | Description |
|---------|-------------|
| **Yugoslav Wars (1991-1999)** | The breakup of Yugoslavia — independence wars, Srebrenica, NATO intervention, Kosovo |
| **WWII Eastern Front (1941-1945)** | Operation Barbarossa to the Fall of Berlin with tanks, troops, and battle symbols |
| **European Union Expansion** | From the Treaty of Rome (1957) through 7 enlargements to Brexit |
| **Nagorno-Karabakh (1988-2023)** | 35 years of war over a mountainous enclave with occupied territory stripes |

The **Yugoslav Wars** and **WWII Eastern Front** examples demonstrate the full symbol library, attack arrows, cinematic camera, and legend system.

---

## Usage

### Writing Scripts

Write commands in the editor panel (left side). Each line is one command. Lines starting with `#` are comments.

### Coloring Countries

```
germany: blue, pulse
france: green, sweep
ukraine: yellow, radial
russia: red, fade
```

Animation types: `pulse`, `fade`, `radial`, `sweep`, `none`

### Occupied Territories (Diagonal Stripes)

```
region: Crimea, Ukraine, red, occupied
```

### Coloring Regions

```
region: Bavaria, Germany, blue
region: Crimea, Ukraine, red, occupied
```

### Attack Arrows

```
# Basic arrow
attack: Germany, France, red

# With curve and width
attack: Germany, France, red, 0.30, 2

# With separate head size (6th parameter)
attack: Germany, France, red, 0.15, 1, 2.5

# Coordinate-based (for ocean locations)
attack: 52.5 13.4, 48.8 2.3, red
```

After placing an arrow, **click it** to select it. Drag the green (start), red (end), or yellow (curve) handles to reshape. Right-click a selected arrow to edit color, width, or delete it. Press `Delete` to remove.

### Connection Lines

```
line: Germany, France, blue
line: 52.5 13.4, 48.8 2.3, green
```

### Text Bubbles

```
bubble: 52.5, 13.4, "Berlin falls", red
```

### Arrow Labels

```
arrow: 52.5, 13.4, "Advance", right
arrow: 48.8, 2.3, "Retreat", left
```

### Text Labels

```
label: 52.5, 13.4, "Eastern Front", 18, white
```

### Year Badge

```
year: "1939"
year: "September 1, 1939", highlight
```

### Map Symbols

Place professional symbols on the map:

```
# Basic symbol
effect: 52.5, 13.4, explosion, red

# With custom size
effect: 48.8, 2.3, tank, green, 2.0
```

**Combat:** `explosion`, `battle`, `bombing` (crosshair), `fire`, `skull` (casualties), `nuke` (radiation trefoil)

**Military Units:** `tank` (armor silhouette), `troops` (infantry), `plane` (air force), `naval` (navy with waves)

**Resources:** `oil` (derrick), `factory` (smokestacks), `port` (anchor with waves)

**Political:** `flag`, `capital` (star), `shield` (defense), `treaty` (handshake), `uprising` (raised fist), `occupation` (globe with bars)

All symbols are draggable — click to select, drag to reposition, right-click to edit type/color/size. Symbols automatically scale with zoom level.

### Camera Commands

```
fly: 52.5, 13.4, 6
cinematic: 52.5, 13.4, 6, 30, 45
zoom: Germany
```

- `fly` — smooth pan to lat, lng, zoom
- `cinematic` — dramatic 3D camera with pitch and bearing
- `zoom` — auto-fit to country bounds

### Timing

```
wait: 2s
wait: 500ms
```

### Legend

```
legend: "NATO Members", blue
legend: "Warsaw Pact", red
legend: auto
legend: hide
```

### Cleanup

```
remove: last
remove: arrows
remove: effects
```

---

## Complete Example: Yugoslav Wars

```
# THE YUGOSLAV WARS (1991-1999)

fly: 44, 18, 5
wait: 1s

year: "1991"
wait: 1s

# Slovenia breaks free
slovenia: green, pulse
effect: 46.1, 14.5, flag, green
wait: 500ms

# Serbia opposes
serbia: red, pulse
effect: 44.8, 20.5, troops, red
wait: 1s

# War in Croatia
croatia: blue, pulse
attack: Serbia, Croatia, red, 0.20, 1.5
effect: 45.3, 18.7, battle, red
wait: 2s

legend: "Serbia", red
legend: "Croatia", blue
legend: "Slovenia", green

year: "1995", highlight
wait: 1s

# Srebrenica
effect: 44.1, 19.3, skull, red, 2
bubble: 45.5, 13, "Srebrenica massacre: 8,000 Bosniaks killed", red
wait: 3s

# NATO intervention
effect: 43.9, 18.4, bombing, blue, 1.5
effect: 43.9, 18.4, treaty, purple, 1.5
remove: arrows
```

---

## Right-Click Context Menu

Right-click anywhere on the map for quick access to:

| Action | Shortcut | Description |
|--------|----------|-------------|
| Color country | `Enter` | Color the country under cursor |
| Color region | `Enter` | Color the specific region (shows when available) |
| Attack arrow | `A` | Start a two-click attack arrow |
| Connection line | `L` | Start a two-click connection line |
| Text bubble | `B` | Add text annotation |
| Arrow label | — | Add directional label |
| Text label | — | Add plain text |
| Fly here | `F` | Camera pan to location |
| Cinematic | `C` | 3D camera to location |
| Zoom to country | `Z` | Fit country in view |
| Symbols | click | Place map symbol from picker |

The context menu is **draggable** — grab the header to move it out of the way.

---

## Controls

| Control | Action |
|---------|--------|
| **Right-click** | Open context menu |
| **Middle mouse drag** | Tilt and rotate the map |
| **Scroll wheel** | Zoom in/out |
| **Left drag** | Pan the map |
| **Click arrow** | Select for editing |
| **Click symbol** | Select for editing |
| **Drag marker** | Reposition any placed element |
| **Delete/Backspace** | Remove selected arrow or symbol |
| **Escape** | Deselect / cancel flow |

---

## Available Colors

**Primary:** `red`, `orange`, `yellow`, `gold`, `green`, `blue`, `cyan`, `purple`, `pink`, `magenta`

**NATO Theme:** `founding`, `southern`, `coldwar`, `expansion99`, `bigbang`, `balkans`, `nordic`

**Utilities:** `white`, `maroon`, `coral`, `salmon`, `tan`, `brown`, `navy`, `lime`

---

## Full Command Reference

| Command | Syntax | Example |
|---------|--------|---------|
| Country | `name: color, anim` | `germany: blue, pulse` |
| Region | `region: Name, Country, color, occupied` | `region: Crimea, Ukraine, red, occupied` |
| Attack | `attack: From, To, color, curve, width, headSize` | `attack: Germany, France, red, 0.15, 1, 2` |
| Line | `line: From, To, color` | `line: Germany, France, blue` |
| Bubble | `bubble: lat, lng, "text", color` | `bubble: 52, 13, "Berlin", blue` |
| Arrow | `arrow: lat, lng, "text", dir` | `arrow: 52, 13, "East", right` |
| Label | `label: lat, lng, "text", size, color` | `label: 52, 13, "Front", 18, white` |
| Symbol | `effect: lat, lng, name, color, size` | `effect: 52, 13, explosion, red, 1.5` |
| Year | `year: "text", highlight` | `year: "1945", highlight` |
| Legend | `legend: "label", color` | `legend: "NATO", blue` |
| Fly | `fly: lat, lng, zoom` | `fly: 52, 13, 6` |
| Cinematic | `cinematic: lat, lng, zoom, pitch, bearing` | `cinematic: 52, 13, 6, 30, 45` |
| Zoom | `zoom: Country` | `zoom: Germany` |
| Wait | `wait: duration` | `wait: 2s` |
| Remove | `remove: last/arrows/effects` | `remove: arrows` |

---

## Tech Stack

- **[MapLibre GL JS](https://maplibre.org)** — Map rendering engine
- **[Natural Earth](https://naturalearthdata.com)** — Geographic boundary data (public domain)
- **[OpenFreeMap](https://openfreemap.org)** — Vector tile hosting (MIT)
- **[NASA GIBS](https://earthdata.nasa.gov/gibs)** — Satellite imagery (public domain)

---

## Performance

- **First load:** 2-3 seconds (optimized GeoJSON)
- **Subsequent loads:** <100ms (localStorage cache)
- **File sizes:** ~5MB total (simplified from 50MB raw Natural Earth)
- **Offline capable:** Works after first visit

---

## Disputed Territories

- Crimea shown as part of Ukraine (corrected from source data)
- Other disputed areas reflect de facto control per Natural Earth data
- Kosovo, Northern Cyprus, Western Sahara shown as per source

---

## Contributing

Found a bug? Have a feature request? [Open an issue](https://github.com/MikoAdam/MikoAdam.github.io/issues)!

Want to add more examples? Submit a PR!

---

## License

**100% Free for Commercial Use**

- MapLibre GL JS (BSD-3)
- Natural Earth (Public Domain)
- OpenFreeMap (MIT)
- NASA GIBS (Public Domain)

Attribution: *Maps powered by Pillars of Creation Maps, OpenFreeMap, Natural Earth*

---

## Made With This Tool

Check out [Global Glasnost on YouTube](https://youtube.com) to see Pillars of Creation Maps in action!

---

**Built for history storytellers everywhere.**
