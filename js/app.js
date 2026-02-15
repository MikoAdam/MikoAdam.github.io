/**
 * App - Main application controller
 */
class App {
    constructor() {
        this.geoData = new GeoData();
        this.renderer = null;
        this.parser = new ScriptParser();
        this.executor = null;
        this.editor = new Editor('editor');
        this.menu = null;
        this.isRunning = false;
        this.isPaused = false;
        this.commands = [];
        this.currentIndex = 0;
        this.scriptLines = [];
        this.highlightTimeout = null;
    }

    async init() {
        // Show welcome modal — load map in parallel while user reads it
        const modal = document.getElementById('welcomeModal');
        modal.classList.remove('hidden');
        const welcomePromise = new Promise(resolve => { this._dismissResolve = resolve; });

        // Start loading immediately in background
        this.setStatus('Loading map data...');
        try {
            await this.geoData.load();
        } catch (err) {
            this.setStatus('Failed to load map data. Please refresh.');
            console.error(err);
            return;
        }

        this.setStatus('Initializing map...');
        this.renderer = new MapRenderer('map', this.geoData);
        await this.renderer.init();
        this.executor = new ScriptExecutor(this.renderer, this.geoData);
        this.menu = new ContextMenu(this.editor, () => this.renderer.getZoom(), this);
        this.setupEventHandlers();
        this.loadExamples();

        // Wait for user to click "Get Started" (may already be done)
        await welcomePromise;
        this.setStatus('Ready');
    }

    dismissWelcome() {
        const modal = document.getElementById('welcomeModal');
        if (modal) {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '0';
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
        if (this._dismissResolve) {
            this._dismissResolve();
            this._dismissResolve = null;
        }
    }

    setupEventHandlers() {
        document.getElementById('styleSelect').addEventListener('change', e => {
            this.renderer.setStyle(e.target.value);
        });
        document.getElementById('showBorders').addEventListener('change', e => {
            this.renderer.toggleBorders(e.target.checked);
        });
        document.getElementById('showLabels').addEventListener('change', e => {
            this.renderer.toggleLabels(e.target.checked);
        });
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        this.renderer.on('contextmenu', e => {
            e.originalEvent.preventDefault();
            const arrowHit = this.renderer.hitTestArrow(e.point);
            const feature = this.renderer.queryFeatures(e.point);
            const effectMarker = e._effectMarker || null;
            this.menu.show(e.originalEvent, feature, e.lngLat, arrowHit, effectMarker);
        });

        // Click on map deselects effects
        this.renderer.on('click', () => {
            this.renderer.deselectEffect();
        });

        // Delete/Backspace removes selected effect, Escape cancels flows
        document.addEventListener('keydown', (e) => {
            if (e.target.matches('input, textarea, select')) return;
            if ((e.key === 'Delete' || e.key === 'Backspace') && this.renderer._selectedEffectMarker) {
                e.preventDefault();
                this.renderer.removeSelectedEffect();
            }
            if (e.key === 'Escape') {
                if (this.renderer._selectedEffectMarker) {
                    this.renderer.deselectEffect();
                }
                // Cancel attack arrow / connection line flow
                if (this.menu && this.menu._flowType) {
                    this.menu.cancelFlow();
                }
            }
        });
    }

    toggleFullscreen() {
        const mapContainer = document.querySelector('.map-container');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            mapContainer.requestFullscreen();
        }
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById('tab-' + tabName).classList.add('active');
    }

    loadExamples() {
        const container = document.getElementById('examplesList');
        container.innerHTML = Object.entries(EXAMPLES).map(([key, example]) => `
            <div class="example-card" data-key="${key}">
                <h4>${example.title}</h4>
                <p>${example.description}</p>
            </div>
        `).join('');
        container.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', () => this.loadExample(card.dataset.key));
        });
    }

    loadExample(key) {
        this.editor.setValue(EXAMPLES[key].script);
        this.switchTab('editor');
    }

    highlightLine(lineIndex) {
        const editor = document.getElementById('editor');
        if (!editor) return;

        const lines = editor.value.split('\n');
        const beforeCursor = lines.slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0);
        const lineLength = lines[lineIndex] ? lines[lineIndex].length : 0;

        editor.focus();
        editor.setSelectionRange(beforeCursor, beforeCursor + lineLength);
        editor.scrollTop = Math.max(0, (lineIndex - 5) * 20);
    }

    clearHighlight() {
        const editor = document.getElementById('editor');
        if (editor) {
            editor.setSelectionRange(0, 0);
            editor.blur();
        }
    }

    updateTimeline() {
        const total = this.commands.length;
        const current = this.currentIndex;
        const progress = total > 0 ? (current / total) * 100 : 0;
        const progressBar = document.getElementById('timelineProgress');
        const position = document.getElementById('timelinePosition');
        if (progressBar) progressBar.style.width = progress + '%';
        if (position) position.textContent = `${current} / ${total}`;

        if (this.scriptLines[this.currentIndex] !== undefined) {
            this.highlightLine(this.scriptLines[this.currentIndex]);
        } else {
            this.clearHighlight();
        }
    }

    showControls(running) {
        const runBtn = document.getElementById('runBtn');
        const dvdControls = document.getElementById('dvdControls');
        const dvdControls2 = document.getElementById('dvdControls2');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const stopBtn = document.getElementById('stopBtn');
        const playBtn = document.getElementById('playBtn');

        if (this.commands.length === 0) {
            if (runBtn) runBtn.style.display = 'block';
            if (dvdControls) dvdControls.style.display = 'none';
            if (dvdControls2) dvdControls2.style.display = 'none';
        } else {
            if (runBtn) runBtn.style.display = 'none';
            if (dvdControls) dvdControls.style.display = 'flex';
            if (dvdControls2) dvdControls2.style.display = 'flex';

            if (prevBtn) prevBtn.disabled = (this.currentIndex === 0);
            if (nextBtn) nextBtn.disabled = (this.currentIndex >= this.commands.length);
            if (stopBtn) stopBtn.disabled = !running;
            if (playBtn) playBtn.disabled = running || (this.currentIndex >= this.commands.length);
        }
    }

    stop() {
        this.isPaused = false;
        this.isRunning = false;
        this.showControls(false);
        this.setStatus('Stopped');
    }

    async run() {
        if (this.isRunning) return;

        const script = this.editor.getValue();
        const allLines = script.split('\n');

        if (this.commands.length === 0 || this.currentIndex === 0) {
            this.commands = [];
            this.scriptLines = [];

            allLines.forEach((line, index) => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const cmd = this.parser.parseLine(trimmed);
                    if (cmd) {
                        this.commands.push(cmd);
                        this.scriptLines.push(index);
                    }
                }
            });

            if (!this.commands.length) {
                this.setStatus('No commands to run');
                return;
            }

            // Validate color names and show warnings
            const warnings = this._validateColors(this.commands);
            if (warnings.length > 0) {
                this._showScriptWarnings(warnings);
            }

            // Pass commands to executor for legendAuto
            this.executor.allCommands = this.commands;

            this.renderer.clearAll();
            this.currentIndex = 0;
        }

        this.isRunning = true;
        this.showControls(true);
        this.updateTimeline();
        this.setStatus('Running...');

        while (this.currentIndex < this.commands.length && this.isRunning) {
            await this.executor.executeCommand(this.commands[this.currentIndex]);
            this.currentIndex++;
            this.updateTimeline();
        }

        this.isRunning = false;
        this.showControls(false);
        if (this.currentIndex >= this.commands.length) {
            this.setStatus('Done');
        }
    }

    async stepForward() {
        if (!this.commands.length) {
            await this.prepareCommands();
        }

        if (this.currentIndex < this.commands.length) {
            this.isRunning = false;
            await this.executor.executeCommand(this.commands[this.currentIndex]);
            this.currentIndex++;
            this.updateTimeline();
            this.showControls(false);
            this.setStatus(`Step ${this.currentIndex} / ${this.commands.length}`);
        } else {
            this.setStatus('End');
        }
    }

    async stepBackward() {
        if (this.currentIndex > 0) {
            this.isRunning = false;
            this.currentIndex--;

            this.renderer.clearAll();
            for (let i = 0; i < this.currentIndex; i++) {
                const cmd = this.commands[i];
                if (cmd.type !== 'wait') {
                    await this.executor.executeCommand(cmd);
                }
            }

            this.updateTimeline();
            this.showControls(false);
            this.setStatus(`Step ${this.currentIndex} / ${this.commands.length}`);
        } else {
            this.setStatus('Start');
        }
    }

    async prepareCommands() {
        const script = this.editor.getValue();
        const allLines = script.split('\n');
        this.commands = [];
        this.scriptLines = [];

        allLines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const cmd = this.parser.parseLine(trimmed);
                if (cmd) {
                    this.commands.push(cmd);
                    this.scriptLines.push(index);
                }
            }
        });

        if (!this.commands.length) return;
        this.executor.allCommands = this.commands;
        this.renderer.clearAll();
        this.currentIndex = 0;
        this.showControls(false);
        this.updateTimeline();
    }

    restart() {
        this.isRunning = false;
        this.isPaused = false;
        this.renderer.clearAll();
        this.commands = [];
        this.scriptLines = [];
        this.currentIndex = 0;
        this.updateTimeline();
        this.clearHighlight();
        this.showControls(false);
        this.setStatus('Ready to run');
    }

    clearAll() {
        this.renderer.clearAll();
        this.commands = [];
        this.scriptLines = [];
        this.currentIndex = 0;
        this.clearHighlight();
        this.setStatus('Cleared');
    }

    insertCommand(cmd) {
        this.editor.insert(cmd);
    }

    setStatus(message) {
        const el = document.getElementById('status');
        if (el) el.textContent = message;
    }

    // ─── Screenshot (composite) ───

    takeScreenshot() {
        const mapCanvas = this.renderer.map.getCanvas();
        const width = mapCanvas.width;
        const height = mapCanvas.height;
        const dpr = window.devicePixelRatio || 1;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // 1. Map (includes borders since those are MapLibre layers)
        ctx.drawImage(mapCanvas, 0, 0);

        // 1b. Attack arrows (canvas overlay)
        if (this.renderer.arrowCanvas) {
            ctx.drawImage(this.renderer.arrowCanvas, 0, 0, width, height);
        }

        // 2. Country name labels — use map.project() for accurate positioning
        const mapRect = mapCanvas.getBoundingClientRect();
        this.renderer.labelMarkers.forEach(marker => {
            const lngLat = marker.getLngLat();
            const screenPt = this.renderer.map.project([lngLat.lng, lngLat.lat]);
            const x = screenPt.x * dpr;
            const y = screenPt.y * dpr;
            const label = marker.getElement();
            const fontSize = parseFloat(getComputedStyle(label).fontSize) * dpr;

            ctx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text shadow for readability
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            for (let ox = -2; ox <= 2; ox++) {
                for (let oy = -2; oy <= 2; oy++) {
                    ctx.fillText(label.textContent, x + ox * dpr, y + oy * dpr);
                }
            }
            ctx.fillStyle = '#ffffff';
            ctx.fillText(label.textContent, x, y);
        });
        ctx.textAlign = 'left';

        // 3. Bubbles (DOM markers)
        document.querySelectorAll('.map-bubble').forEach(bubble => {
            const rect = bubble.getBoundingClientRect();
            const bx = (rect.left - mapRect.left) * dpr;
            const by = (rect.top - mapRect.top) * dpr;
            const bw = rect.width * dpr;
            const bh = rect.height * dpr;
            const r = 10 * dpr;

            // Background
            const bgColor = getComputedStyle(bubble).backgroundColor || 'rgba(0,0,0,0.85)';
            ctx.fillStyle = bgColor;
            ctx.beginPath();
            ctx.roundRect(bx, by, bw, bh, r);
            ctx.fill();

            // Border
            const borderColor = getComputedStyle(bubble).borderColor || 'rgba(255,255,255,0.2)';
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 1 * dpr;
            ctx.stroke();

            // Text
            const textEl = bubble.querySelector('.bubble-text') || bubble;
            const text = textEl.textContent;
            const bubbleFontSize = 13 * dpr;
            ctx.font = `${bubbleFontSize}px "Space Grotesk", sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, bx + 14 * dpr, by + bh / 2);
        });

        // 4. Year overlay
        const yearOverlay = document.getElementById('yearOverlay');
        if (yearOverlay && yearOverlay.classList.contains('visible')) {
            const text = yearOverlay.textContent;
            const fontSize = 28 * dpr;
            ctx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
            const metrics = ctx.measureText(text);
            const pad = 14 * dpr;
            const px = 24 * dpr;
            const py = 24 * dpr;
            const pillW = metrics.width + pad * 2;
            const pillH = fontSize + pad * 2;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
            ctx.beginPath();
            ctx.roundRect(px, py, pillW, pillH, 50 * dpr);
            ctx.fill();

            ctx.strokeStyle = '#4cd964';
            ctx.lineWidth = 2 * dpr;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, px + pad, py + pillH / 2);
        }

        // 5. Legend
        const entries = this.renderer.legendEntries;
        if (entries.length > 0) {
            const rowH = 24 * dpr;
            const padX = 14 * dpr;
            const padY = 10 * dpr;
            const swatchSize = 14 * dpr;
            const gap = 8 * dpr;
            const fontSize = 12 * dpr;

            ctx.font = `${fontSize}px "Space Grotesk", sans-serif`;
            const maxLabelW = Math.max(...entries.map(e => ctx.measureText(e.label).width));
            const boxW = padX + swatchSize + gap + maxLabelW + padX;
            const boxH = padY + entries.length * rowH + padY;
            const lx = width - boxW - 14 * dpr;
            const ly = height - boxH - 50 * dpr;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.beginPath();
            ctx.roundRect(lx, ly, boxW, boxH, 8 * dpr);
            ctx.fill();

            ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            entries.forEach((entry, i) => {
                const y = ly + padY + i * rowH;
                ctx.fillStyle = entry.color;
                ctx.fillRect(lx + padX, y + (rowH - swatchSize) / 2, swatchSize, swatchSize);
                ctx.fillStyle = '#ddd';
                ctx.font = `${fontSize}px "Space Grotesk", sans-serif`;
                ctx.textBaseline = 'middle';
                ctx.fillText(entry.label, lx + padX + swatchSize + gap, y + rowH / 2);
            });
        }

        // 6. Attribution
        const isSatellite = document.getElementById('styleSelect').value === 'satellite';
        const attrText = isSatellite ? '(c) NASA GIBS' : '(c) OpenFreeMap · Natural Earth';
        const attrFontSize = 11 * dpr;
        ctx.font = `${attrFontSize}px sans-serif`;
        const attrW = ctx.measureText(attrText).width + 20 * dpr;
        const attrX = width - attrW - 14 * dpr;
        const attrY = height - 14 * dpr;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.roundRect(attrX, attrY - 18 * dpr, attrW, 22 * dpr, 4 * dpr);
        ctx.fill();
        ctx.fillStyle = '#aaa';
        ctx.textBaseline = 'middle';
        ctx.fillText(attrText, attrX + 10 * dpr, attrY - 7 * dpr);

        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'poc-maps-screenshot.png';
            a.click();
            URL.revokeObjectURL(url);
            this.setStatus('Screenshot saved!');
        });
    }

    // ─── Video recording ───

    startVideoRecording() {
        const mapCanvas = this.renderer.map.getCanvas();
        this.recordingCanvas = document.createElement('canvas');
        this.recordingCanvas.width = mapCanvas.width;
        this.recordingCanvas.height = mapCanvas.height;
        this.recordingCtx = this.recordingCanvas.getContext('2d');
        this.isRecording = true;
        this.drawRecordingFrame();

        const stream = this.recordingCanvas.captureStream(30);
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
        this.recordedChunks = [];

        this.mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) this.recordedChunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
            this.isRecording = false;
            const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'poc-maps.webm';
            a.click();
            URL.revokeObjectURL(url);
            this.setStatus('Video saved!');
        };

        this.mediaRecorder.start();
        document.getElementById('recordBtn').style.display = 'none';
        document.getElementById('stopRecordBtn').style.display = 'inline-block';
        this.setStatus('Recording...');
    }

    drawRecordingFrame() {
        if (!this.isRecording) return;
        const mapCanvas = this.renderer.map.getCanvas();
        const ctx = this.recordingCtx;
        ctx.drawImage(mapCanvas, 0, 0);

        // Attack arrows (canvas overlay)
        if (this.renderer.arrowCanvas) {
            ctx.drawImage(this.renderer.arrowCanvas, 0, 0, this.recordingCanvas.width, this.recordingCanvas.height);
        }

        const isSatellite = document.getElementById('styleSelect').value === 'satellite';
        const text = isSatellite ? '(c) NASA GIBS' : '(c) OpenFreeMap · Natural Earth';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        const textWidth = ctx.measureText(text).width;
        const padding = 8;
        const x = this.recordingCanvas.width - textWidth - padding - 12;
        const y = this.recordingCanvas.height - 12;

        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.beginPath();
        ctx.roundRect(x - padding, y - 14, textWidth + padding * 2, 20, 4);
        ctx.fill();

        ctx.fillStyle = '#aaa';
        ctx.fillText(text, x, y);

        requestAnimationFrame(() => this.drawRecordingFrame());
    }

    stopVideoRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            document.getElementById('recordBtn').style.display = 'inline-block';
            document.getElementById('stopRecordBtn').style.display = 'none';
            this.setStatus('Saving video...');
        }
    }

    // ─── Script validation ───

    _validateColors(commands) {
        const warnings = [];
        const validColors = Object.keys(CONFIG.colors);
        const countryColors = {}; // Track: each country can only be one color

        commands.forEach((cmd, i) => {
            // Check if color is valid (skip hex colors starting with #)
            if (cmd.color && !cmd.color.startsWith('#') && !validColors.includes(cmd.color)) {
                warnings.push({
                    line: this.scriptLines[i],
                    msg: `"${cmd.color}" is not a valid color. Available: ${validColors.slice(0, 8).join(', ')}...`
                });
            }

            // Check duplicate country coloring
            if (cmd.type === 'country') {
                const name = cmd.name.toLowerCase();
                if (countryColors[name] && countryColors[name] !== cmd.color) {
                    warnings.push({
                        line: this.scriptLines[i],
                        msg: `"${cmd.name}" is already colored "${countryColors[name]}". A country can only show one color at a time.`
                    });
                }
                countryColors[name] = cmd.color;
            }
        });

        return warnings;
    }

    _showScriptWarnings(warnings) {
        // Insert warnings as comments into the editor above the offending lines
        const editor = document.getElementById('editor');
        if (!editor) return;

        const lines = editor.value.split('\n');
        // Process from bottom to top so line numbers don't shift
        const sorted = [...warnings].sort((a, b) => b.line - a.line);
        for (const w of sorted) {
            if (w.line >= 0 && w.line < lines.length) {
                lines.splice(w.line, 0, `# ⚠ WARNING: ${w.msg}`);
            }
        }
        editor.value = lines.join('\n');

        this.setStatus(`${warnings.length} warning(s) found — see editor`);
    }
}

// Initialize
const app = new App();
app.init().catch(err => {
    console.error('Failed to initialize:', err);
    const el = document.getElementById('status');
    if (el) el.textContent = 'Error: ' + err.message;
});
window.app = app;
