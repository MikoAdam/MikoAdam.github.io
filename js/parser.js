/**
 * ScriptParser - Parses animation script into commands
 */

class ScriptParser {
    parse(script) {
        return script
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('#'))
            .map(line => this.parseLine(line))
            .filter(Boolean);
    }

    parseLine(line) {
        let match;

        // region: Name, Country, color, occupied
        if ((match = line.match(/^region:\s*(.+?),\s*(.+?),\s*(\S+)(?:,\s*(occupied))?$/i))) {
            return {
                type: 'region',
                name: match[1].trim(),
                country: match[2].trim(),
                color: match[3],
                occupied: !!match[4]
            };
        }

        // bubble: lat, lng, "text", color
        if ((match = line.match(/^bubble:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(\w+))?$/i))) {
            return {
                type: 'bubble',
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2]),
                text: match[3],
                color: match[4] || 'blue'
            };
        }

        // arrow: lat, lng, "text", direction, color
        if ((match = line.match(/^arrow:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(\w+))?(?:,\s*(\w+))?$/i))) {
            return {
                type: 'arrow',
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2]),
                text: match[3],
                direction: match[4] || 'right',
                color: match[5]
            };
        }

        // year: "text", highlight
        if ((match = line.match(/^year:\s*"([^"]+)"(?:,\s*(highlight))?$/i))) {
            return {
                type: 'year',
                text: match[1],
                highlight: !!match[2]
            };
        }

        // label: lat, lng, "text", size, color
        if ((match = line.match(/^label:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(\d+))?(?:,\s*(\S+))?$/i))) {
            return {
                type: 'label',
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2]),
                text: match[3],
                size: parseInt(match[4]) || 14,
                color: match[5]
            };
        }

        // legend: "Label", color
        if ((match = line.match(/^legend:\s*"([^"]+)"(?:,\s*(\S+))?$/i))) {
            return { type: 'legend', label: match[1], color: match[2] || 'blue' };
        }

        // legend: auto
        if ((match = line.match(/^legend:\s*auto$/i))) {
            return { type: 'legendAuto' };
        }

        // legend: hide
        if ((match = line.match(/^legend:\s*hide$/i))) {
            return { type: 'legendHide' };
        }

        // effect: lat, lng, effectName[, color[, size]]
        if ((match = line.match(/^effect:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*(\w+)(?:,\s*(\S+))?(?:,\s*([\d.]+))?$/i))) {
            return {
                type: 'effect',
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2]),
                effect: match[3].toLowerCase(),
                color: match[4] || 'red',
                size: parseFloat(match[5]) || 1
            };
        }

        // remove: last or remove: arrows or remove: effects
        if ((match = line.match(/^remove:\s*(last|arrows|effects)$/i))) {
            const val = match[1].toLowerCase();
            if (val === 'arrows') return { type: 'removeArrows' };
            if (val === 'effects') return { type: 'removeEffects' };
            return { type: 'remove' };
        }

        // zoom: target
        if ((match = line.match(/^zoom:\s*(.+)$/i))) {
            return { type: 'zoom', target: match[1].trim() };
        }

        // cinematic: lat, lng, zoom, pitch, bearing
        if ((match = line.match(/^cinematic:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*([\d.]+)(?:,\s*(-?[\d.]+))?(?:,\s*(-?[\d.]+))?$/i))) {
            return {
                type: 'cinematic',
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2]),
                zoom: parseFloat(match[3]),
                pitch: parseFloat(match[4]) || 30,
                bearing: parseFloat(match[5]) || 0
            };
        }

        // fly: lat, lng, zoom
        if ((match = line.match(/^fly:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*([\d.]+)$/i))) {
            return {
                type: 'fly',
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2]),
                zoom: parseFloat(match[3])
            };
        }

        // wait: Ns or Nms
        if ((match = line.match(/^wait:\s*([\d.]+)(ms|s)?$/i))) {
            const value = parseFloat(match[1]);
            const unit = (match[2] || 's').toLowerCase();
            return {
                type: 'wait',
                ms: unit === 's' ? Math.round(value * 1000) : Math.round(value)
            };
        }

        // attack: From, To, color[, curve[, width]]
        // From/To can be country names or "lat lng" coordinates
        if ((match = line.match(/^attack:\s*/i))) {
            const cmd = this._parseArrowLine(line.slice(match[0].length), 'attack');
            if (cmd) return cmd;
        }

        // line: From, To, color
        if ((match = line.match(/^line:\s*/i))) {
            const cmd = this._parseArrowLine(line.slice(match[0].length), 'line');
            if (cmd) return cmd;
        }

        // country: color, animation (catch-all — must be last)
        if ((match = line.match(/^([\w\s-]+):\s*(\S+)(?:,\s*(\w+))?$/i))) {
            return {
                type: 'country',
                name: match[1].trim(),
                color: match[2],
                animation: match[3]
            };
        }

        return null;
    }

    /**
     * Parse "From, To, color[, curve[, width]]" where From/To can be:
     *   - Country name: Germany
     *   - Coordinates:  52.5 13.4   (space-separated lat lng)
     */
    _parseArrowLine(rest, type) {
        // Split on commas, but coordinates use spaces not commas
        const parts = rest.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length < 3) return null;

        const parseEndpoint = (s) => {
            // Check if it's space-separated coordinates: "52.5 13.4"
            const coords = s.match(/^(-?[\d.]+)\s+(-?[\d.]+)$/);
            if (coords) {
                return { lat: parseFloat(coords[1]), lng: parseFloat(coords[2]) };
            }
            return s; // country name string
        };

        const from = parseEndpoint(parts[0]);
        const to = parseEndpoint(parts[1]);
        const color = parts[2];

        if (!color) return null;

        const cmd = { type, from, to, color };
        if (parts[3] !== undefined) cmd.curve = parseFloat(parts[3]);
        if (parts[4] !== undefined) cmd.width = parseFloat(parts[4]);
        if (parts[5] !== undefined) cmd.headSize = parseFloat(parts[5]);
        return cmd;
    }
}
