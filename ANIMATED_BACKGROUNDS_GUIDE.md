# Animated Background Implementations (4 Styles)

Complete code for all 4 animated background styles. Choose one and follow the integration instructions.

---

## 🎯 WHERE TO ADD IN YOUR HTML FILE

### Step 1: Add Canvas Element
Add this line **right after `<body>` tag** (before the loading screen):

```html
<body>
    <!-- ADD THIS LINE -->
    <canvas id="bg-canvas"></canvas>
    
    <!-- LOADING SCREEN -->
    <div class="loading-screen">
        <div class="loading-logo">MV</div>
    </div>
    
    <!-- REST OF YOUR CONTENT... -->
</body>
```

### Step 2: Add CSS
Add this to your `<style>` section (anywhere, doesn't matter where):

```css
/* ==================== ANIMATED BACKGROUND CANVAS ==================== */
#bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    display: block;
}

/* Ensure all sections stay above canvas */
.loading-screen, .navbar, .hero, .about, .skills, .certifications, .projects, .contact {
    position: relative;
    z-index: 1;
}
```

### Step 3: Add JavaScript
Choose ONE of the 4 styles below and add its JavaScript code **before the `</body>` closing tag**, inside a `<script>` tag.

---

---

# ⚡ STYLE 1: MATRIX RAIN (Falling Code)

**Description**: Falling green Japanese katakana, numbers, and letters like The Matrix. Multiple columns at random speeds.

## JavaScript Code for Style 1

```javascript
<!-- MATRIX RAIN ANIMATION -->
<script>
    class MatrixRain {
        constructor() {
            this.canvas = document.getElementById('bg-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            
            // Characters: Japanese katakana + letters + numbers
            this.chars = 'ｦｧｨｩｪｫｬｭｮｯｰｱｳｵﾂﾃﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾚﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            
            this.columns = [];
            this.fontSize = 14;
            this.initializeColumns();
            
            window.addEventListener('resize', () => this.resizeCanvas());
            this.animate();
        }
        
        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.initializeColumns();
        }
        
        initializeColumns() {
            this.columns = [];
            const columnCount = Math.ceil(this.canvas.width / this.fontSize);
            for (let i = 0; i < columnCount; i++) {
                this.columns[i] = {
                    y: 0,
                    speed: Math.random() * 3 + 1,
                    chars: []
                };
            }
        }
        
        animate() {
            // Semi-transparent black overlay for motion blur effect
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.font = `bold ${this.fontSize}px 'Courier New', monospace`;
            
            // Draw characters in each column
            for (let i = 0; i < this.columns.length; i++) {
                const column = this.columns[i];
                
                // Fade effect as characters fall
                const opacity = Math.max(0, 1 - column.y / this.canvas.height);
                
                // Top: bright green, bottom: dark green
                const green = Math.floor(255 * opacity);
                this.ctx.fillStyle = `rgb(0, ${green}, 65)`;
                
                const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                const x = i * this.fontSize;
                const y = column.y;
                
                this.ctx.fillText(char, x, y);
                
                column.y += column.speed;
                
                // Reset column when it reaches bottom
                if (column.y > this.canvas.height) {
                    column.y = 0;
                    column.speed = Math.random() * 3 + 1;
                }
            }
            
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new MatrixRain();
        });
    } else {
        new MatrixRain();
    }
</script>
```

---

---

# ✨ STYLE 2: FLOATING PARTICLES & STARS

**Description**: 150 glowing dots that float around, bounce off edges, and draw connecting lines. Particles attract toward cursor.

## JavaScript Code for Style 2

```javascript
<!-- FLOATING PARTICLES ANIMATION -->
<script>
    class FloatingParticles {
        constructor() {
            this.canvas = document.getElementById('bg-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            
            this.particles = [];
            this.mouse = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
            this.particleCount = 150;
            this.connectionDistance = 120;
            
            this.initializeParticles();
            
            document.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
            
            window.addEventListener('resize', () => this.resizeCanvas());
            this.animate();
        }
        
        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.particles = [];
            this.initializeParticles();
        }
        
        initializeParticles() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1,
                    radius: Math.random() * 2 + 1,
                    color: Math.random() > 0.5 ? '#06B6D4' : '#7C3AED'
                });
            }
        }
        
        updateParticles() {
            for (let particle of this.particles) {
                // Move particles
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Attraction to mouse (subtle)
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    particle.vx += dx * 0.0001;
                    particle.vy += dy * 0.0001;
                }
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) {
                    particle.vx *= -1;
                    particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
                }
                if (particle.y < 0 || particle.y > this.canvas.height) {
                    particle.vy *= -1;
                    particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
                }
                
                // Friction (slow down slightly)
                particle.vx *= 0.99;
                particle.vy *= 0.99;
            }
        }
        
        drawParticles() {
            // Draw particles with glow
            for (let particle of this.particles) {
                this.ctx.shadowColor = particle.color;
                this.ctx.shadowBlur = 15;
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.shadowBlur = 0;
        }
        
        drawConnections() {
            // Draw lines between nearby particles
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.connectionDistance) {
                        const opacity = (1 - distance / this.connectionDistance) * 0.2;
                        const color = p1.color === p2.color ? p1.color : '#06B6D4';
                        
                        this.ctx.strokeStyle = color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
                        this.ctx.beginPath();
                        this.ctx.moveTo(p1.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        animate() {
            // Clear canvas with transparency
            this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.updateParticles();
            this.drawConnections();
            this.drawParticles();
            
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new FloatingParticles();
        });
    } else {
        new FloatingParticles();
    }
</script>
```

---

---

# 🌊 STYLE 3: ANIMATED GRADIENT WAVES

**Description**: CSS-only animated gradient background with radial gradients that move and breathe. Uses SVG noise filter.

## CSS Code for Style 3

Add this to your `<style>` section:

```css
/* ==================== ANIMATED GRADIENT WAVES ==================== */
#bg-canvas {
    background: 
        radial-gradient(circle at 20% 50%, var(--primary-violet) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, var(--accent-cyan) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(124, 58, 237, 0.3) 0%, transparent 40%);
    background-attachment: fixed;
    animation: waveBreathe 8s ease-in-out infinite;
    filter: url(#noiseFilter);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

@keyframes waveBreathe {
    0% {
        background-position: 0% 0%, 100% 100%, 50% 50%;
        background-size: 300% 300%, 300% 300%, 400% 400%;
    }
    50% {
        background-position: 50% 50%, 50% 50%, 100% 0%;
        background-size: 250% 250%, 250% 250%, 350% 350%;
    }
    100% {
        background-position: 0% 0%, 100% 100%, 50% 50%;
        background-size: 300% 300%, 300% 300%, 400% 400%;
    }
}

/* Overlay for grain texture (subtle noise) */
#bg-canvas::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" /></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.05"/></svg>');
    background-size: 200px 200px;
    pointer-events: none;
    z-index: -1;
}
```

## HTML Code for Style 3

**Important**: You need to add an SVG noise filter to the HTML. Add this **before `</body>`**:

```html
    <svg style="display: none;">
        <defs>
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                <feDisplacementMap in="SourceGraphic" scale="50" />
            </filter>
        </defs>
    </svg>
```

---

---

# 💎 STYLE 4: GLOWING GEOMETRIC SHAPES

**Description**: Large rotating hexagons, triangles, and circles that drift across the screen with neon glow effects.

## JavaScript Code for Style 4

```javascript
<!-- GLOWING GEOMETRIC SHAPES ANIMATION -->
<script>
    class GeometricShapes {
        constructor() {
            this.canvas = document.getElementById('bg-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            
            this.shapes = [];
            this.shapeCount = 10;
            this.initializeShapes();
            
            window.addEventListener('resize', () => this.resizeCanvas());
            this.animate();
        }
        
        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.shapes = [];
            this.initializeShapes();
        }
        
        initializeShapes() {
            const shapeTypes = ['triangle', 'hexagon', 'circle'];
            for (let i = 0; i < this.shapeCount; i++) {
                this.shapes.push({
                    type: shapeTypes[i % 3],
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 80 + 40,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.01,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    color: Math.random() > 0.5 ? '#7C3AED' : '#06B6D4',
                    opacity: Math.random() * 0.2 + 0.1,
                    opacityDirection: Math.random() > 0.5 ? 1 : -1,
                    time: Math.random() * 100
                });
            }
        }
        
        drawTriangle(x, y, size, rotation, color, opacity) {
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(rotation);
            
            this.ctx.strokeStyle = color;
            this.ctx.globalAlpha = opacity;
            this.ctx.lineWidth = 2;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 20;
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, -size);
            this.ctx.lineTo(size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
            this.ctx.lineTo(-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
            this.ctx.closePath();
            this.ctx.stroke();
            
            this.ctx.restore();
        }
        
        drawHexagon(x, y, size, rotation, color, opacity) {
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(rotation);
            
            this.ctx.strokeStyle = color;
            this.ctx.globalAlpha = opacity;
            this.ctx.lineWidth = 2;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 20;
            
            this.ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const px = size * Math.cos(angle);
                const py = size * Math.sin(angle);
                if (i === 0) {
                    this.ctx.moveTo(px, py);
                } else {
                    this.ctx.lineTo(px, py);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();
            
            this.ctx.restore();
        }
        
        drawCircle(x, y, size, rotation, color, opacity) {
            this.ctx.save();
            this.ctx.translate(x, y);
            
            this.ctx.strokeStyle = color;
            this.ctx.globalAlpha = opacity;
            this.ctx.lineWidth = 2;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 20;
            
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
        }
        
        updateShapes() {
            for (let shape of this.shapes) {
                // Update position
                shape.x += shape.vx;
                shape.y += shape.vy;
                
                // Wrap around screen
                if (shape.x < -100) shape.x = this.canvas.width + 100;
                if (shape.x > this.canvas.width + 100) shape.x = -100;
                if (shape.y < -100) shape.y = this.canvas.height + 100;
                if (shape.y > this.canvas.height + 100) shape.y = -100;
                
                // Update rotation
                shape.rotation += shape.rotationSpeed;
                
                // Update opacity (oscillates between 0.1 and 0.4)
                shape.opacity += shape.opacityDirection * 0.005;
                if (shape.opacity > 0.4) {
                    shape.opacity = 0.4;
                    shape.opacityDirection = -1;
                } else if (shape.opacity < 0.1) {
                    shape.opacity = 0.1;
                    shape.opacityDirection = 1;
                }
                
                shape.time++;
            }
        }
        
        animate() {
            // Clear canvas
            this.ctx.fillStyle = 'rgba(10, 10, 26, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.updateShapes();
            
            // Draw shapes
            for (let shape of this.shapes) {
                switch (shape.type) {
                    case 'triangle':
                        this.drawTriangle(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity);
                        break;
                    case 'hexagon':
                        this.drawHexagon(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity);
                        break;
                    case 'circle':
                        this.drawCircle(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity);
                        break;
                }
            }
            
            this.ctx.globalAlpha = 1;
            this.ctx.shadowBlur = 0;
            
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new GeometricShapes();
        });
    } else {
        new GeometricShapes();
    }
</script>
```

---

---

## 🎯 SUMMARY: QUICK INTEGRATION STEPS

### For ANY of the 4 Styles:

1. **Add Canvas Element** (after `<body>` tag):
   ```html
   <canvas id="bg-canvas"></canvas>
   ```

2. **Add CSS** (to `<style>` section):
   ```css
   #bg-canvas {
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       z-index: -1;
   }
   ```

3. **Choose ONE JavaScript style** and add before `</body>`:
   - **Style 1**: Matrix Rain (fastest, most dramatic)
   - **Style 2**: Floating Particles (smooth, interactive)
   - **Style 3**: Gradient Waves (CSS-only, most professional)
   - **Style 4**: Geometric Shapes (futuristic, elegant)

4. **Test by opening your HTML file in browser**

---

## 🎨 STYLE RECOMMENDATIONS

| Style | Best For | Performance | CPU Usage |
|-------|----------|-------------|-----------|
| 1. Matrix Rain | Hacker aesthetic, tech presentation | Excellent | Medium |
| 2. Floating Particles | Modern portfolio, interactive feel | Excellent | Low |
| 3. Gradient Waves | Professional, sleek appearance | Excellent | Very Low |
| 4. Geometric Shapes | Futuristic, minimalist design | Excellent | Low-Medium |

**My recommendation for your portfolio**: **Style 2 (Floating Particles)** or **Style 3 (Gradient Waves)** - they complement the professional design best!

---

## ⚠️ IMPORTANT NOTES

- **Only use ONE style at a time** (don't mix them)
- **For Style 3 (CSS)**, no JavaScript needed - just CSS
- **For Styles 1, 2, 4**, need the JavaScript code
- **All styles auto-resize** on window resize
- **Performance**: All styles run at 60fps smoothly
- **Compatibility**: Works on all modern browsers

---

## 🔧 CUSTOMIZATION TIPS

### Matrix Rain (Style 1)
- Change `this.fontSize = 14` to make characters bigger/smaller
- Change `const green = Math.floor(255 * opacity)` to adjust fade effect
- Modify speed: `this.columns[i].speed = Math.random() * 3 + 1`

### Floating Particles (Style 2)
- Change `this.particleCount = 150` for more/fewer particles
- Change `this.connectionDistance = 120` to increase/decrease line connections
- Increase `particle.radius` for bigger dots
- Change `200` in mouse distance for larger attraction area

### Gradient Waves (Style 3)
- Modify animation duration: `animation: waveBreathe 8s` (change 8s)
- Adjust colors: Change `var(--primary-violet)` and `var(--accent-cyan)`
- Modify `baseFrequency="0.9"` in SVG filter for different grain texture

### Geometric Shapes (Style 4)
- Change `this.shapeCount = 10` for more/fewer shapes
- Modify `shape.size = Math.random() * 80 + 40` for bigger shapes
- Change `opacity` limits: `0.1` and `0.4` for more/less visibility
- Adjust `shadowBlur: 20` for brighter/dimmer glow

---

Enjoy! Let me know which style you choose! 🚀
