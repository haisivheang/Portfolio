       let currentPalette = [];
        let savedPalettes = JSON.parse(localStorage.getItem('colorPalettes')) || [];

        // Enhanced color names with more variety
        const colorNames = [
            'Crimson Sunset', 'Ocean Coral', 'Salmon Dream', 'Tangerine Burst', 'Golden Hour', 'Sunshine Yellow', 
            'Electric Lime', 'Forest Green', 'Teal Waves', 'Cyan Sky', 'Azure Blue', 'Royal Blue', 
            'Deep Indigo', 'Mystic Purple', 'Hot Magenta', 'Rose Quartz', 'Ruby Red', 'Amber Glow', 
            'Emerald Forest', 'Sapphire Ocean', 'Violet Storm', 'Lavender Fields', 'Mint Fresh', 'Peach Blossom'
        ];

        function generateRandomColor() {
            const hue = Math.floor(Math.random() * 360);
            const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
            const lightness = Math.floor(Math.random() * 35) + 35;  // 35-70%
            
            const hex = hslToHex(hue, saturation, lightness);
            const name = colorNames[Math.floor(Math.random() * colorNames.length)];
            
            return { hex, name, hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)` };
        }

        function hslToHex(h, s, l) {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        }

        function generatePalette() {
            currentPalette = [];
            const container = document.getElementById('paletteContainer');
            container.innerHTML = '';

            for (let i = 0; i < 5; i++) {
                const color = generateRandomColor();
                currentPalette.push(color);
                
                const colorCard = document.createElement('div');
                colorCard.className = 'color-card';
                colorCard.innerHTML = `
                    <div class="color-display" style="background: ${color.hex}"></div>
                    <div class="color-info">
                        <div class="hex-code">${color.hex}</div>
                        <div class="color-name">${color.name}</div>
                        <button class="copy-btn" onclick="copyToClipboard('${color.hex}')">📋 Copy Hex</button>
                    </div>
                `;
                
                container.appendChild(colorCard);
            }
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`<i class="fas fa-check"></i> Copied ${text} to clipboard!`);
            });
        }

        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.innerHTML = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3500);
        }

        function savePalette() {
            if (currentPalette.length === 0) {
                showNotification('<i class="fas fa-exclamation-triangle"></i> Generate a palette first!');
                return;
            }

            const paletteId = Date.now();
            const palette = {
                id: paletteId,
                colors: currentPalette,
                createdAt: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            };

            savedPalettes.push(palette);
            localStorage.setItem('colorPalettes', JSON.stringify(savedPalettes));
            
            showNotification('<i class="fas fa-gift"></i> Palette saved successfully!');
            renderSavedPalettes();
        }

        function loadPalette(paletteId) {
            const palette = savedPalettes.find(p => p.id === paletteId);
            if (palette) {
                currentPalette = palette.colors;
                renderCurrentPalette();
                showNotification('<i class="fas fa-rocket"></i> Palette loaded successfully!');
            }
        }

        function deletePalette(paletteId) {
            if (confirm('Are you sure you want to delete this palette?')) {
                savedPalettes = savedPalettes.filter(p => p.id !== paletteId);
                localStorage.setItem('colorPalettes', JSON.stringify(savedPalettes));
                renderSavedPalettes();
                showNotification('<i class="fas fa-trash"></i> Palette deleted!');
            }
        }

        function renderCurrentPalette() {
            const container = document.getElementById('paletteContainer');
            container.innerHTML = '';

            currentPalette.forEach((color, index) => {
                const colorCard = document.createElement('div');
                colorCard.className = 'color-card';
                colorCard.style.animationDelay = `${index * 0.1}s`;
                colorCard.innerHTML = `
                    <div class="color-display" style="background: ${color.hex}"></div>
                    <div class="color-info">
                        <div class="hex-code">${color.hex}</div>
                        <div class="color-name">${color.name}</div>
                        <button class="copy-btn" onclick="copyToClipboard('${color.hex}')"><i class="fas fa-clipboard" style="color: #4A90E2; font-size: 24px;"></i> Copy Hex</button>
                    </div>
                `;
                container.appendChild(colorCard);
            });
        }

        function renderSavedPalettes() {
            const container = document.getElementById('savedPalettesContainer');
            
            if (savedPalettes.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7); font-size: 1.2rem;">No saved palettes yet</p>';
                return;
            }

            container.innerHTML = '';
            
            savedPalettes.forEach(palette => {
                const paletteDiv = document.createElement('div');
                paletteDiv.className = 'saved-palette';
                
                const previewDiv = document.createElement('div');
                previewDiv.className = 'palette-preview';
                
                palette.colors.forEach(color => {
                    const colorDiv = document.createElement('div');
                    colorDiv.className = 'preview-color';
                    colorDiv.style.backgroundColor = color.hex;
                    colorDiv.title = color.hex;
                    previewDiv.appendChild(colorDiv);
                });
                
                const dateSpan = document.createElement('span');
                dateSpan.className = 'palette-date';
                dateSpan.textContent = palette.createdAt;
                
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'palette-actions';
                actionsDiv.innerHTML = `
                    <button class="small-btn load-btn" onclick="loadPalette(${palette.id})"><i class="fas fa-sync"></i> Load</button>
                    <button class="small-btn delete-btn" onclick="deletePalette(${palette.id})"><i class="fas fa-trash"></i> Delete</button>
                `;
                
                paletteDiv.appendChild(previewDiv);
                paletteDiv.appendChild(dateSpan);
                paletteDiv.appendChild(actionsDiv);
                container.appendChild(paletteDiv);
            });
        }

        function exportPalette() {
            if (currentPalette.length === 0) {
                showNotification('<i class="fas fa-exclamation-triangle"></i> Generate a palette first!');
                return;
            }

            const exportData = {
                palette: currentPalette,
                exportedAt: new Date().toISOString(),
                metadata: {
                    generator: 'Color Palette Generator',
                    version: '2.0'
                }
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `color-palette-${Date.now()}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            showNotification('<i class="fas fa-folder" style="color: #f39c12; font-size: 24px;"></i> Palette exported successfully!');
        }

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            generatePalette();
            renderSavedPalettes();
        });

        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                generatePalette();
            }
            if (e.key === 's' && e.ctrlKey) {
                e.preventDefault();
                savePalette();
            }
            if (e.key === 'e' && e.ctrlKey) {
                e.preventDefault();
                exportPalette();
            }
        });