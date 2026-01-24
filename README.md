# 🌌 Pillars of Creation Maps

**Create stunning animated map visualizations with simple text commands.**

Built for history storytellers, educators, and anyone who needs to explain the world through maps.

🎬 **[Live Demo](#)** | 📖 **[Documentation](#)** | 🌟 **[GitHub](#)**

## ✨ Features

- **🎬 Cinematic Camera** - Epic tilted 3D views with smooth panning
- **🎨 Smart Animations** - Fade, radial, and sweep effects for countries
- **🔗 Connection Lines** - Draw animated lines between countries
- **💬 Rich Labels** - Bubbles, years, arrows with customizable colors
- **🎥 Video Export** - Record animations directly to MP4
- **📱 Dynamic Scaling** - Labels adjust automatically with zoom
- **⚡ Lightning Fast** - LocalStorage caching for instant loads
- **🆓 100% Free** - No limits, no watermarks, no signup

## 🚀 Quick Start

### 1. Build the Data Files

```powershell
# Install mapshaper (first time only)
npm install -g mapshaper

# Run the build script
./build.ps1
```

### 2. Deploy to GitHub Pages

1. Push your repo to GitHub
2. Go to Settings → Pages
3. Source: `main` branch
4. Your site: `https://yourusername.github.io/pillars-of-creation`

## 📖 Usage Examples

### Basic Country Coloring
```
germany: blue, radial
france: green, sweep
wait: 2s
```

### Cinematic Camera Movement
```
cinematic: 52, 13, 8, 45, 90
# lat, lng, zoom, pitch (tilt), bearing (rotation)
```

### Draw Connections Between Countries
```
line: Germany, France, blue
line: USA, UK, red
```

### Complete Animation
```
# Epic NATO Expansion
cinematic: 50, -10, 3, 35, 45
wait: 1s

year: 40, -95, "1949", highlight
usa: founding, radial
uk: founding, radial

wait: 2s
bubble: 55, -15, "12 founding members unite", white
```

## 🎨 Animation Types

- `fade` - Smooth opacity transition
- `radial` - Expand from center
- `sweep` - Circular reveal
- `none` - Instant (default)

## 🎬 Camera Commands

- `fly: lat, lng, zoom` - Standard camera movement
- `cinematic: lat, lng, zoom, pitch, bearing` - 3D tilted view
- `zoom: CountryName` - Auto-fit to country bounds

## 🎯 Right-Click Menu

Right-click anywhere on the map for:
- 🎨 Color this country/region
- 🔗 Draw line from here
- 💬 Add text bubble
- 🎬 Set cinematic camera

## 📊 Performance

- **First load**: 2-3 seconds (optimized GeoJSON)
- **Subsequent loads**: <100ms (localStorage cache)
- **File sizes**: ~5MB total (simplified from 50MB)
- **Offline capable**: Works after first visit

## 🛠️ Tech Stack

- MapLibre GL JS - Map rendering
- Natural Earth - Geographic data
- OpenFreeMap - Vector tiles
- NASA GIBS - Satellite imagery

## 📝 Full Command Reference

### Country/Region Commands
```
country: color, animation
region: Name, Country, color, animation
line: Country1, Country2, color
```

### Label Commands
```
bubble: lat, lng, "text", color
year: lat, lng, "2024", highlight
arrow: lat, lng, "text", direction, color
```

### Camera Commands
```
fly: lat, lng, zoom
cinematic: lat, lng, zoom, pitch, bearing
zoom: CountryName
```

### Animation Commands
```
wait: 2s          # pause
wait: 500ms       # precise timing
remove: last      # remove last label
```

## 🎨 Available Colors

Primary: `red`, `orange`, `yellow`, `green`, `blue`, `cyan`, `purple`, `pink`

NATO Theme: `founding`, `southern`, `coldwar`, `expansion99`, `bigbang`, `balkans`, `nordic`

Utilities: `white`, `gold`, `maroon`, `coral`, `salmon`, `tan`, `brown`, `navy`, `lime`

## 🌍 Examples

Check the "Examples" tab in the app for:
- NATO Expansion 1949-2024 (complete cinematic timeline)
- More examples coming soon!

## 💡 Pro Tips

1. **Use cinematic camera** for epic establishing shots
2. **Combine animations** - radial for countries, sweep for regions
3. **Dynamic labels** scale automatically with zoom
4. **Lines are animated** with dashed patterns
5. **Record in fullscreen** for best video quality

## ⚠️ Disputed Territories

- ✅ Crimea shown as part of Ukraine (corrected from source)
- Other disputed areas show de facto control per Natural Earth data
- Kosovo, Northern Cyprus, Western Sahara, etc. as per source

## 🤝 Contributing

Found a bug? Have a feature request? Open an issue!

Want to add more examples? Submit a PR!

## 📜 License

**100% Free for Commercial Use**

- MapLibre GL JS (BSD-3)
- Natural Earth (Public Domain)
- OpenFreeMap (MIT)
- NASA GIBS (Public Domain)

Attribution: "Maps powered by Pillars of Creation Maps · OpenFreeMap · Natural Earth"

## 🎥 Made With This Tool

Check out [Global Glasnost on YouTube](your-channel-here) to see Pillars of Creation Maps in action!

## 💖 Support

If this tool helps you create awesome content:

- ⭐ Star this repo
- 🐦 Share on social media
- ☕ [Buy me a coffee](https://ko-fi.com/yourusername)
- 💜 [GitHub Sponsors](https://github.com/sponsors/yourusername)

---

**Built with 🌌 by [Your Name](your-site) for history storytellers everywhere**