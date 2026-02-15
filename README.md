# Pillars of Creation Maps

**Create animated geopolitical map visualizations with simple text commands.**

Built for history storytellers, educators, journalists, and anyone who needs to explain the world through maps. Visualize wars, territorial changes, alliances, and historical events with professional military-grade symbology.

**[Live Demo](https://mikoadam.github.io)** | **[Examples](#-examples)**

---

## Features

- **Animated Country Coloring** — Pulse, fade, radial, sweep animations for countries and regions
- **Occupied Territory Stripes** — Diagonal stripe pattern for disputed/occupied areas
- **Attack Arrows** — Curved arrows with independent shaft width and head size, fully draggable with PowerPoint-style handles
- **NATO APP-6 Map Effects** — 19 professional military symbols: explosions, battles, tanks, troops, nukes, and more
- **Draggable Everything** — Effects, bubbles, labels, and arrows are all drag-and-drop repositionable
- **Connection Lines** — Dashed lines between any two countries or coordinates
- **Text Bubbles & Labels** — Rich text annotations with customizable colors and sizes
- **Year Badge** — Prominent date overlay for timeline storytelling
- **Legend** — Auto-generated or manual legend entries
- **Cinematic Camera** — 3D tilted views with smooth pitch, bearing, and zoom transitions
- **Smart Context Menu** — Right-click anywhere for quick access to all features; draggable so it never blocks your work
- **Map Styles** — Switch between Liberty (vector) and NASA Satellite imagery
- **Country coloring persists** across style switches
- **Screenshot Export** — Composite screenshot including arrows, labels, year badge, and legend
- **Video Recording** — Record animations directly to WebM
- **Script Validation** — Warns about invalid color names and duplicate country colorings
- **Middle Mouse Rotation** — Hold middle mouse button to tilt and rotate the map
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

### Map Effects (NATO APP-6 Symbology)

Place professional military symbols on the map:

```
# Basic effect
effect: 52.5, 13.4, explosion, red

# With custom size
effect: 48.8, 2.3, tank, green, 2.0
```

**Combat symbols:** `explosion`, `battle`, `bombing`, `fire`, `skull`, `nuke`

**Military units:** `tank`, `troops`, `plane`, `naval`

**Resources:** `oil`, `factory`, `port`

**Political:** `flag`, `capital`, `shield`, `treaty`, `uprising`, `occupation`

All effects are draggable — click to select, drag to reposition, right-click to edit type/color/size.

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

## Complete Example: WWII European Theater

```
# World War II - European Theater
cinematic: 50, 10, 4, 20, 0
wait: 1s

year: "1939"
germany: red, radial
wait: 1s

# Invasion of Poland
attack: Germany, Poland, red, 0.20, 1.5
effect: 52.2, 21.0, explosion, red, 1.5
wait: 2s
poland: red, sweep

year: "1940"
wait: 1s

# Western Front
attack: Germany, France, red, 0.15, 1.5
attack: Germany, Netherlands, red, 0.10
attack: Germany, Belgium, red, 0.10
effect: 48.8, 2.3, battle, red
wait: 2s
france: red, sweep
netherlands: red, fade
belgium: red, fade

bubble: 48.8, 2.3, "Fall of France", red
wait: 2s

year: "1941"
wait: 1s

# Operation Barbarossa
attack: Germany, Russia, red, 0.20, 2
effect: 55.7, 37.6, explosion, red, 2
bubble: 55.7, 37.6, "Operation Barbarossa", red
wait: 2s

year: "1944"
wait: 1s

# D-Day
effect: 49.3, -0.8, battle, blue, 2
attack: 49.3 -0.8, 48.8 2.3, blue, 0.15, 1.5
bubble: 49.3, -0.8, "D-Day: June 6, 1944", blue

legend: "Axis Powers", red
legend: "Allied Forces", blue
```

---

## Right-Click Context Menu

Right-click anywhere on the map for quick access to:

| Action | Shortcut | Description |
|--------|----------|-------------|
| Color country | `Enter` | Color the country under cursor |
| Color region | — | Color the specific region |
| Attack arrow | `A` | Start a two-click attack arrow |
| Connection line | `L` | Start a two-click connection line |
| Text bubble | `B` | Add text annotation |
| Arrow label | — | Add directional label |
| Text label | — | Add plain text |
| Fly here | `F` | Camera pan to location |
| Cinematic | `C` | 3D camera to location |
| Zoom to country | `Z` | Fit country in view |
| Effects | click | Place military symbol |

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
| **Click effect** | Select for editing |
| **Drag marker** | Reposition any placed element |
| **Delete/Backspace** | Remove selected arrow or effect |
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
| Effect | `effect: lat, lng, name, color, size` | `effect: 52, 13, explosion, red, 1.5` |
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
