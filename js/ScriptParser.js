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

        // region: Name, Country, color
        if ((match = line.match(/^region:\s*(.+?),\s*(.+?),\s*(\S+)$/i))) {
            return { type: 'region', name: match[1], country: match[2], color: match[3] };
        }

        // bubble: lat, lng, "text"
        if ((match = line.match(/^bubble:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"$/i))) {
            return { type: 'bubble', lat: +match[1], lng: +match[2], text: match[3] };
        }

        // year: "text" or year: "text", highlight
        if ((match = line.match(/^year:\s*"([^"]+)"(?:,\s*(highlight))?$/i))) {
            return { type: 'year', text: match[1], highlight: !!match[2] };
        }

        // label: lat, lng, "text", size, color
        if ((match = line.match(/^label:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*"([^"]+)"(?:,\s*(\d+))?(?:,\s*(\S+))?$/i))) {
            return { type: 'label', lat: +match[1], lng: +match[2], text: match[3], size: +(match[4] || 14), color: match[5] };
        }

        // remove: last
        if (line.match(/^remove:\s*last$/i)) {
            return { type: 'remove' };
        }

        // zoom: target
        if ((match = line.match(/^zoom:\s*(.+)$/i))) {
            return { type: 'zoom', target: match[1].trim() };
        }

        // fly: lat, lng, zoom
        if ((match = line.match(/^fly:\s*(-?[\d.]+),\s*(-?[\d.]+),\s*(\d+)$/i))) {
            return { type: 'fly', lat: +match[1], lng: +match[2], zoom: +match[3] };
        }

        // wait: Ns or Nms
        if ((match = line.match(/^wait:\s*(\d+)(ms|s)?$/i))) {
            const value = +match[1];
            const unit = (match[2] || 's').toLowerCase();
            return { type: 'wait', ms: unit === 's' ? value * 1000 : value };
        }

        // country: color (default pattern)
        if ((match = line.match(/^([\w\s-]+):\s*(\S+)$/i))) {
            return { type: 'country', name: match[1].trim(), color: match[2] };
        }

        return null;
    }
}