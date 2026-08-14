# 🚗 Rolls-Royce Spectre — 3D Interactive Atelier & Digital Twin Showcase

An ultra-luxury, high-performance interactive React 18 web application designed for the premier electric super-coupé, the **Rolls-Royce Spectre**. 

This application combines high-fps HTML5 Canvas 2D image-sequence rendering, spatial engineering hotspots, celestial cabin simulators, live commission pricing estimation, and Web Audio synthesizers to deliver a digital twin experience.

---

## ✨ Key Features

- **🔄 360° Studio Canvas Engine**: 240 high-definition frames scrubbed seamlessly via sticky scroll tracking, mouse/touch dragging, angle presets (Front 0°, Profile 90°, Rear 180°, 3/4 Quarter 270°), or auto-spin mode.
- **🔬 X-Ray Structural Blueprint View**: Toggle an inline glowing schematic matrix displaying the 102 kWh lithium-ion acoustic shield battery, dual electric motor placements, and spaceframe chassis architecture.
- **🌌 Starlight Headliner & Celestial Sanctuary**: Interactive cabin simulator featuring **4,796 optical stars**, customizable color temperatures (Warm Gold, Diamond White, Cosmic Violet, Ice Blue), brightness controls, and animated shooting stars.
- **💵 Bespoke Customizer & Price Estimator**: Real-time exterior finish selector (Magma Red, English White, Obsidian Black, Tempest Grey, Twilight Purple, Emerald Green) with heritage swatches, wheel geometry choices, and live commission MSRP calculation with printable PDF/JPG dossiers.
- **📊 Portfolio Lineup Matrix**: Compare Spectre side-by-side with Rolls-Royce flagships (Phantom VIII, Ghost II, Cullinan II) across horsepower, torque, acceleration, drag coefficient (0.25 Cd), sound isolation decibels, and pricing.
- **🎥 Power Coach Doors Video Feature**: Integrated player for signature rear-hinged coach door closing mechanics with playback speed controls (0.5x to 2.0x) and G-sensor telemetry breakdowns.
- **🔊 Web Audio API Acoustic Soundscape**: Synthesized luxury metallic tactile click feedback and velocity-pitched low-frequency EV acceleration hum.
- **📍 Floating Section Progress Dock**: Right-hand vertical navigation pill providing real-time scroll position tracking and 1-click smooth section jumps.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling & Design Tokens**: [Tailwind CSS v4](https://tailwindcss.com/) with Custom Glassmorphism, Google Fonts (`Cormorant Garamond`, `Montserrat`, `Cinzel`), and HSL color variables.
- **Rendering Engine**: HTML5 Canvas 2D with `requestIdleCallback` chunked preloading for 60fps frame interpolation.
- **Icons & UI Components**: [Lucide React](https://lucide.dev/) + Custom luxury cursor rings.
- **Audio Engine**: Native Web Audio API synthesizer (`AudioContext`, `OscillatorNode`, `GainNode`).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/rolls-royce-spectre-3d.git
   cd rolls-royce-spectre-3d
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000/`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production bundle will be output to the `dist/` directory.

---

## 📂 Project Structure

```text
├── public/
│   ├── rolls_set/         # 240-frame sequence JPEG images (ezgif-frame-001.jpg to 240.jpg)
│   └── videos/            # Power Coach doors video footage
├── src/
│   ├── components/
│   │   ├── AppDescriptionModal.jsx   # Digital twin overview & architecture modal
│   │   ├── BespokeConfigurator.jsx   # Customizer studio & live price estimator
│   │   ├── CustomCursor.jsx          # Luxury mouse cursor ring & dot
│   │   ├── FloatingNavDock.jsx       # Right-side vertical section indicator
│   │   ├── HeroCanvasViewer.jsx      # 360° Canvas engine with X-Ray blueprint mode
│   │   ├── ModelComparisonModal.jsx  # Flagship comparative matrix (Spectre vs Phantom vs Ghost)
│   │   ├── ModelDetails.jsx          # Detailed vehicle engineering & spec switcher
│   │   ├── Navbar.jsx                # Glass header with animated audio equalizer
│   │   ├── StarlightCabin.jsx        # Interactive 4,796 star headliner simulator
│   │   └── VideoSection.jsx          # Coach doors video showcase
│   ├── utils/
│   │   └── audioEngine.js            # Web Audio API synthesizer for sound effects
│   ├── App.jsx                       # Main shell & scroll section observer
│   ├── index.css                     # Tailwind CSS v4 entry & luxury design system
│   └── main.jsx                      # React 18 DOM mount point
├── package.json
├── vite.config.js
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

© Rolls-Royce Motor Cars Limited. Designed for interactive digital twin demonstration.
