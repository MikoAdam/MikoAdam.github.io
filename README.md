# GGMaps - Animated Map Editor

Create animated geopolitical map visualizations with a simple scripting language. Perfect for YouTube explainers, educational content, and presentations.

🌍 **[Live Demo](https://mikoadam.github.io/ggmaps/)**

![NATO Expansion Demo](demo.gif)

## Features

- 🎬 Script-based animations
- 🌍 Color countries and regions
- 💬 Add text bubbles and year badges
- 📹 Record to WebM video
- 🛰️ Satellite and vector map styles
- ✨ No watermarks, 100% free for commercial use

## Quick Start

```
# Color countries
germany: blue
france: orange

# Add labels
bubble: 52, 13, "Berlin"
year: "2024", highlight

# Animate
fly: 50, 10, 4
wait: 2s
zoom: Germany
```

## Script Commands

| Command | Example | Description |
|---------|---------|-------------|
| `country: color` | `germany: blue` | Color a country |
| `region: Name, Country, color` | `region: Bavaria, Germany, orange` | Color a region |
| `bubble: lat, lng, "text"` | `bubble: 52, 13, "Berlin"` | Add text bubble |
| `year: "text"` | `year: "2024", highlight` | Show year badge |
| `fly: lat, lng, zoom` | `fly: 50, 10, 4` | Fly to location |
| `zoom: Country` | `zoom: Germany` | Zoom to country |
| `wait: time` | `wait: 2s` | Pause animation |
| `remove: last` | `remove: last` | Remove last label |

## Available Colors

red, orange, yellow, gold, green, blue, cyan, purple, pink, magenta, white, maroon, coral, salmon, navy, lime

## License

100% free for commercial use.

### Data Sources (all free/open):
- **OpenFreeMap** (MIT) - Vector map tiles
- **NASA Blue Marble** (Public Domain) - Satellite imagery
- **Natural Earth** (Public Domain) - Country/region boundaries
- **MapLibre GL JS** (BSD) - Map rendering

### Disputed Territories
- ✅ Crimea shown as part of Ukraine
- Other disputed areas show de facto control per Natural Earth data

## Development

```bash
# Clone
git clone https://github.com/MikoAdam/ggmaps.git

# Serve locally (any static server)
npx serve .

# Or just open index.html in browser
```

## Credits

Created for [Global Glasnost](https://github.com/MikoAdam) geopolitical content.

---

Made with ❤️ for the open source community