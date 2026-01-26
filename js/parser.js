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

        // remove: last or remove: arrows
        if ((match = line.match(/^remove:\s*(last|arrows)$/i))) {
            return match[1].toLowerCase() === 'arrows' 
                ? { type: 'removeArrows' } 
                : { type: 'remove' };
        }

        // zoom: target
        if ((match = line.match(/^zoom:\s*(.+)$/i))) {
            return { type: 'zoom', target: match[1].trim() };
        }

        // fly: lat, lng, zoom
        if ((match = line.match(/^fly:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*(\d+)$/i))) {
            return { 
                type: 'fly', 
                lat: parseFloat(match[1]), 
                lng: parseFloat(match[2]), 
                zoom: parseInt(match[3]) 
            };
        }

        // wait: Ns or Nms
        if ((match = line.match(/^wait:\s*(\d+)(ms|s)?$/i))) {
            const value = parseInt(match[1]);
            const unit = (match[2] || 's').toLowerCase();
            return { 
                type: 'wait', 
                ms: unit === 's' ? value * 1000 : value 
            };
        }

        // attack: From, To, color
        if ((match = line.match(/^attack:\s*(.+?),\s*(.+?),\s*(\S+)$/i))) {
            return { 
                type: 'attack', 
                from: match[1].trim(), 
                to: match[2].trim(), 
                color: match[3] 
            };
        }

        // country: color, animation
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
}