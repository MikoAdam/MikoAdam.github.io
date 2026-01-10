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
        this.isRecording = false;
    }

    async init() {
        this.setStatus('Loading map...');

        await this.geoData.load();

        this.renderer = new MapRenderer('map', this.geoData);
        await this.renderer.init();

        this.executor = new ScriptExecutor(this.renderer, this.geoData);

        this.menu = new ContextMenu(this.editor, () => this.renderer.getZoom());

        this.setupEventHandlers();
        this.loadExamples();

        this.setStatus('Ready');
    }

    setupEventHandlers() {
        document.getElementById('styleSelect').addEventListener('change', e => {
            this.renderer.setStyle(e.target.value);
            this.updateSatelliteControls(e.target.value === 'satellite');
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
            e.preventDefault();
            const feature = this.renderer.queryFeatures(e.point);
            this.menu.show(e.originalEvent, feature, e.lngLat);
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

    startVideoRecording() {
        const mapCanvas = this.renderer.map.getCanvas();

        this.recordingCanvas = document.createElement('canvas');
        this.recordingCanvas.width = mapCanvas.width;
        this.recordingCanvas.height = mapCanvas.height;
        this.recordingCtx = this.recordingCanvas.getContext('2d');

        this.isRecording = true;
        this.drawRecordingFrame();

        const stream = this.recordingCanvas.captureStream(30);

        this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });

        this.recordedChunks = [];

        this.mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) {
                this.recordedChunks.push(e.data);
            }
        };

        this.mediaRecorder.onstop = () => {
            this.isRecording = false;
            const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ggmaps.webm';
            a.click();
            URL.revokeObjectURL(url);
            this.setStatus('Video saved!');
        };

        this.mediaRecorder.start();
        document.getElementById('recordBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'inline-block';
        this.setStatus('⏺ Recording...');
    }

    drawRecordingFrame() {
        if (!this.isRecording) return;

        const mapCanvas = this.renderer.map.getCanvas();
        const ctx = this.recordingCtx;

        // Draw the map canvas
        ctx.drawImage(mapCanvas, 0, 0);

        // Draw country labels if visible (satellite mode)
        // We need to get fresh projected coordinates each frame
        if (this.renderer.showLabels && this.renderer.labelMarkers.length > 0) {
            ctx.font = '600 11px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = 6;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            
            // Get all country features and project their centers
            this.renderer.geoData.countries.features.forEach(f => {
                const name = f.properties.NAME || f.properties.ADMIN;
                const center = this.renderer.geoData.getCenter(f.geometry, name);
                
                // Project to screen coordinates
                const point = this.renderer.map.project(center);
                
                // Only draw if on screen
                if (point.x >= -50 && point.x <= this.recordingCanvas.width + 50 &&
                    point.y >= -20 && point.y <= this.recordingCanvas.height + 20) {
                    ctx.fillText(name, point.x, point.y);
                }
            });
            
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        // Draw fixed year badge if visible
        const yearEl = document.getElementById('fixedYear');
        if (yearEl.classList.contains('visible')) {
            const isHighlight = yearEl.classList.contains('highlight');
            const textEl = yearEl.querySelector('.fixed-year-text');
            const text = textEl ? textEl.textContent : '';

            ctx.font = '700 36px Georgia, Times New Roman, serif';
            ctx.textAlign = 'left';
            
            const textWidth = ctx.measureText(text).width;
            const paddingX = 28;
            const paddingY = 16;
            const x = 24;
            const y = 50;
            const boxWidth = textWidth + paddingX * 2;
            const boxHeight = 36 + paddingY * 2;

            // SOLID background
            ctx.fillStyle = isHighlight ? '#fbbf24' : '#0f0f14';
            ctx.fillRect(x, y, boxWidth, boxHeight);

            // Left accent bar (only when not highlight)
            if (!isHighlight) {
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(x, y, 4, boxHeight);
            }

            // Text
            ctx.fillStyle = isHighlight ? '#000' : '#fff';
            ctx.fillText(text, x + paddingX, y + paddingY + 28);
        }

        // Draw bubbles
        this.renderer.markers.forEach(marker => {
            const el = marker.getElement();
            if (el.classList.contains('map-bubble')) {
                const lngLat = marker.getLngLat();
                const point = this.renderer.map.project([lngLat.lng, lngLat.lat]);
                const text = el.textContent;
                
                ctx.font = '400 15px Georgia, Times New Roman, serif';
                ctx.textAlign = 'left';
                
                // Text wrapping
                const maxWidth = 280;
                const words = text.split(' ');
                let lines = [];
                let currentLine = '';
                
                words.forEach(word => {
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    if (ctx.measureText(testLine).width > maxWidth) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                });
                lines.push(currentLine);
                
                const lineHeight = 24;
                const paddingX = 22;
                const paddingY = 14;
                const boxWidth = Math.min(Math.max(...lines.map(l => ctx.measureText(l).width)) + paddingX * 2 + 4, 320);
                const boxHeight = lines.length * lineHeight + paddingY * 2;
                
                const boxX = point.x;
                const boxY = point.y - boxHeight / 2;

                // SOLID background
                ctx.fillStyle = '#0f0f14';
                ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

                // Left accent bar
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(boxX, boxY, 4, boxHeight);

                // Text
                ctx.fillStyle = '#fff';
                lines.forEach((line, i) => {
                    ctx.fillText(line, boxX + paddingX + 4, boxY + paddingY + 12 + i * lineHeight);
                });
            }
        });

        // Attribution
        const isSatellite = document.getElementById('styleSelect').value === 'satellite';
        const attrText = isSatellite
            ? '© NASA Blue Marble · Natural Earth'
            : '© OpenFreeMap · Natural Earth';

        ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'left';
        const attrWidth = ctx.measureText(attrText).width;
        const attrPadding = 10;
        const attrX = this.recordingCanvas.width - attrWidth - attrPadding - 16;
        const attrY = this.recordingCanvas.height - 14;

        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(attrX - attrPadding, attrY - 12, attrWidth + attrPadding * 2, 20);

        ctx.fillStyle = '#777';
        ctx.fillText(attrText, attrX, attrY);

        requestAnimationFrame(() => this.drawRecordingFrame());
    }

    stopVideoRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            document.getElementById('recordBtn').style.display = 'inline-block';
            document.getElementById('stopBtn').style.display = 'none';
            this.setStatus('Saving video...');
        }
    }

    updateSatelliteControls(isSatellite) {
        document.querySelectorAll('.satellite-only').forEach(el => {
            el.style.display = isSatellite ? 'flex' : 'none';
        });
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

    async run() {
        const script = this.editor.getValue();
        const commands = this.parser.parse(script);

        if (!commands.length) {
            this.setStatus('No commands to run');
            return;
        }

        this.isRunning = false;
        await new Promise(r => setTimeout(r, 50));

        this.renderer.clearAll();
        document.getElementById('fixedYear').className = 'fixed-year';

        this.isRunning = true;
        this.setStatus('Running...');

        for (const cmd of commands) {
            if (!this.isRunning) break;
            await this.executor.executeCommand(cmd);
        }

        if (this.isRunning) {
            this.setStatus('Done');
        }
        this.isRunning = false;
    }

    clearAll() {
        this.isRunning = false;
        document.getElementById('fixedYear').className = 'fixed-year';
        this.renderer.clearAll();
        this.setStatus('Cleared');
    }

    insertCommand(cmd) {
        this.editor.insert(cmd);
    }

    setStatus(message) {
        document.getElementById('status').textContent = message;
    }
}