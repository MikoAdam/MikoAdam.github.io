/**
 * Pillars of Creation Maps - Script Parser
 * Parses animation scripts into executable commands
 */

class ScriptParser {
    /**
     * Parse script text into array of commands
     */
    parse(script) {
        return script
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('#'))
            .map(line => this.parseLine(line))
            .filter(Boolean);
    }

    /**
     * Parse a single line into a command object
     */
    parseLine(line) {
        let match;

        // region: Name, Country, color, animation
        if ((match = line.match(/^region:\s*(.+?),\s*(.+?),\s*(\S+)(?:,\s*(\w+))?$/i))) {
            return { 
                type: 'region', 
                name: match[1], 
                country: match[2], 
                color: match[3], 
                animation: match[4] || 'none' 
            };
        }

        // line: Country1, Country2, color
        if ((match = line.match(/^line:\s*(.+?),\s*(.+?),\s*(\S+)$/i))) {
            return { 
                type: 'line', 
                from: match[1], 
                to: match[2], 
                color: match[3] 
            };
        }

        // bubble: lat, lng, "text", color
        if ((match = line.match(/^bubble:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(\w+))?$/i))) {
            return { 
                type: 'bubble', 
                lat: +match[1], 
                lng: +match[2], 
                text: match[3], 
                color: match[4] || 'blue' 
            };
        }

        // arrow: lat, lng, "text", direction, color
        if ((match = line.match(/^arrow:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(\w+))?(?:,\s*(\w+))?$/i))) {
            return { 
                type: 'arrow', 
                lat: +match[1], 
                lng: +match[2], 
                text: match[3], 
                direction: match[4] || 'right', 
                color: match[5] 
            };
        }

        // year: lat, lng, "text", highlight
        if ((match = line.match(/^year:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(highlight))?$/i))) {
            return { 
                type: 'year', 
                lat: +match[1], 
                lng: +match[2], 
                text: match[3], 
                highlight: !!match[4] 
            };
        }

        // label: lat, lng, "text", size, color
        if ((match = line.match(/^label:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(\d+))?(?:,\s*(\S+))?$/i))) {
            return { 
                type: 'label', 
                lat: +match[1], 
                lng: +match[2], 
                text: match[3], 
                size: +(match[4] || 14), 
                color: match[5] 
            };
        }

        // remove: last
        if (line.match(/^remove:\s*last$/i)) {
            return { type: 'remove' };
        }

        // zoom: target
        if ((match = line.match(/^zoom:\s*(.+)$/i))) {
            return { 
                type: 'zoom', 
                target: match[1].trim() 
            };
        }

        // cinematic: lat, lng, zoom, pitch, bearing
        if ((match = line.match(/^cinematic:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*(\d+)(?:,\s*(\d+))?(?:,\s*(\d+))?$/i))) {
            return { 
                type: 'cinematic', 
                lat: +match[1], 
                lng: +match[2], 
                zoom: +match[3], 
                pitch: +(match[4] || 45), 
                bearing: +(match[5] || 0) 
            };
        }

        // fly: lat, lng, zoom
        if ((match = line.match(/^fly:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*(\d+)$/i))) {
            return { 
                type: 'fly', 
                lat: +match[1], 
                lng: +match[2], 
                zoom: +match[3] 
            };
        }

        // wait: Ns or Nms
        if ((match = line.match(/^wait:\s*(\d+)(ms|s)?$/i))) {
            const value = +match[1];
            const unit = (match[2] || 's').toLowerCase();
            return { 
                type: 'wait', 
                ms: unit === 's' ? value * 1000 : value 
            };
        }

        // country: color, animation (default pattern)
        if ((match = line.match(/^([\w\s-]+):\s*(\S+)(?:,\s*(\w+))?$/i))) {
            return { 
                type: 'country', 
                name: match[1].trim(), 
                color: match[2], 
                animation: match[3] || 'none' 
            };
        }

        return null;
    }
}