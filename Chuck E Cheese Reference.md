# Chuck E. Cheese Photobooth - Project Documentation & Alignment Guide

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Features List](#-features-list)
3. [Application Workflow](#-application-workflow)
4. [Architecture](#-architecture)
5. [File Structure & Functionality](#-file-structure--functionality)
6. [Technical Stack](#-technical-stack)
7. [Character & Era Configurations](#-character--era-configurations)
8. [API Integrations](#-api-integrations)
9. [Build & Deployment](#-build--deployment)
10. [Performance Considerations](#-performance-considerations)
11. [Known Issues & Limitations](#-known-issues--limitations)
12. [Security & Privacy](#-security--privacy)
13. [🔄 Theme Customization & Alignment Guide (For Event Cloning)](#-theme-customization--alignment-guide-for-event-cloning)
14. [Support & Maintenance](#-support--maintenance)
15. [License & Credits](#-license--credits)

---

## 🎯 Project Overview

**Chuck E. Cheese Photobooth** is a custom, AI-powered photobooth application developed specifically for the **US Embassy in Egypt** to celebrate the **4th of July** with themed AI photobooths. The application transforms user photos into high-end cinematic portraits featuring Chuck E. Cheese and his iconic companion characters. Using Google's Gemini AI, it generates beautiful, highly stylized 3D CGI-quality portraits that place users shoulder-to-shoulder with the characters, blending landmark features from Egypt and the USA in a unified, festive celebration setting.

### Purpose
- **US Embassy 4th of July Celebration**: Serve as a high-tech interactive entertainment feature at the US Embassy in Egypt's Independence Day event.
- **Cultural Fusion**: Commemorate friendship and bilateral ties by beautifully blending iconic landmarks (e.g., Pyramids of Giza and the Statue of Liberty) under a unified, spectacular golden hour sunset and fireworks sky.
- **Interactive Souvenirs**: Provide guests with premium, instant printable physical portraits and mobile QR code sharing to remember the celebration.

### 🎨 UI Design Cues & Event Context
To align the visual design with this prestigious embassy celebration, future UI iterations should incorporate:
1. **Diplomatic & Festive Aesthetics**: Harmonious use of Presidential Blue, Bright Festive Gold, and patriotic Red/White/Blue accents alongside the fun, energetic greens and purples of the Chuck E. Cheese palette.
2. **Subtle Embassy Branding**: Elegant placeholders or layouts for the US Embassy seals, bilateral friendship emblems, and "4th of July Celebration" typography.
3. **Festive Micro-Animations**: Soft, ambient background elements representing floating star particles, glowing fireworks, and warm lighting to capture the celebratory atmosphere.

### Target Platform
- **Primary**: Electron desktop application (Windows Portable EXE)
- **Secondary**: Web browser (PWA-enabled)
- **Display**: Portrait orientation (9:16 aspect ratio)

---

## ✨ Features List

### Core Features

#### 1. **Chuck E. Cheese & Companion Characters Integration**
- **Chuck E. Cheese**: High-detail grey mouse wearing his classic purple crewneck jersey t-shirt with a green collar, green sleeve bands, and an embroidered yellow-green "C" logo.
- **Companion Characters**: 
  - **Helen Henny**: Layered fluffy white chicken with light blue eyeshadow, glossy blue eyes, and black/white fluffy hair tied with purple bows, wearing a black bodice top with high purple collar and a metallic purple pleated skirt.
  - **Mr. Munch**: Bulky shaggy purple monster with spiky blonde hair, wearing an orange short-sleeved t-shirt with yellow trim and a large purple 'M' logo, layered over green sleeves.
  - **Jasper T. Jowls**: Brown hound dog with floppy ears, wearing a white long-sleeved shirt with black spots, blue overalls, a red bandana neckerchief, and holding a straw hat.
  - **Pasqually**: Peach-skinned human chef with thick black eyebrows and curly mustache, wearing a classic white chef's hat, light blue shirt, and white chef's apron.
  - **Bella Bunny**: Light-brown bunny with soft pink inner ears, wearing a pink dress and matching pink hair bow.

#### 2. **Embassy Celebration Era Configuration**
- Blends landmarks from Egypt and the USA in an epic, horizontal side-by-side transition.
- **Egyptian Landmarks**: Randomized selection (Great Pyramids of Giza, Great Sphinx, Luxor Temple, Karnak Temple, Abu Simbel Temples) on the left side.
- **USA Landmarks**: Randomized selection (Statue of Liberty & Manhattan skyline, Golden Gate Bridge, Hollywood Sign, Empire State Building, Mount Rushmore) on the right side.
- **Environment**: Unified golden hour sunset sky with warm orange, pink, and amber clouds, featuring a classic Chuck E. Cheese restaurant with a glowing neon sign, waving flags (Egypt strictly on the left, USA strictly on the right), and a sleek metallic zipline separator.

#### 3. **Intelligent Face Detection**
- **Technology**: TensorFlow.js + face-api.js
- **Capabilities**:
  - Detects multiple faces in a single photo.
  - Gender classification (male/female) to customize wardrobe prompts.
  - Age estimation (child detection for age < 15).
  - Group composition analysis.
- **Models Used**:
  - SSD MobileNet V1 (primary face detection)
  - Age-Gender Net (demographic analysis)
  - Face Landmark 68 Net (facial alignment)

#### 4. **AI Image Generation**
- **Engine**: Google Gemini 3.1 Flash Image Preview (`gemini-3.1-flash-image-preview`)
- **Features**:
  - **Identity Preservation**: Flawlessly translates human faces into CGI style without losing their true identity or cartoonishly distorting them.
  - **Custom Wardrobe**: Equips users in their original clothes preserved exactly as-is from the reference image to ensure immediate recognizable branding and visual integrity, while placing characters in custom premium uniforms.
  - **Anti-Repetition Logic**: Tracks selected landmark configurations across sessions in `localStorage` to avoid repeating the same scene.
  - **Automatic Retry**: Up to 3 attempts with a 500ms fallback.

#### 5. **Image Composition System**
- **Layered Canvas Approach (1080x1920px)**:
  - **Layer 1 (Base)**: High-resolution background or AI-generated portrait.
  - **Layer 2 (Middle overlay)**: Automated script bakes custom branding overlay (Frame) on top of the original portrait before showing it.
- **Export Format**: PNG/JPEG (high quality, 0.95 quality)

#### 6. **Camera & Upload Capabilities**
- **Live Feed**: Web camera with real-time video stream.
- **Countdown Timer**: 3-second visual countdown.
- **Preview System**: CapturePreview screen allows users to inspect the captured photo, retake it, or proceed to AI generation.
- **File Upload**: Native file selector fallback for JPG/PNG images.

#### 7. **Printing Integration**
- **Electron IPC**: Direct, silent background printer communication.
- **Printer Selection**: UI selector retrieves active system printers, saving user preferences to `localStorage`.
- **Safe Zone Layout**: Applies asymmetrical vertical margins/padding (e.g. 4% top padding, 3.2% bottom padding on black background canvas) to prevent important content from being cut off by borders.
- **Specifications**: 100mm x 148mm (4x6 inches) photo paper compatibility.

#### 8. **QR Code Sharing & Export**
- **Upload API**: `https://qr-web-api.vercel.app/upload`
- **Features**:
  - Uploads the final composed image with custom metadata (e.g. folder `chuck-e-cheese-photobooth`).
  - Automatically fetches a short-url QR code for immediate mobile scanning.
  - Robust retry loop with exponential backoff on network failures.

---

## 🔄 Application Workflow

### User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        1. SPLASH SCREEN                         │
│  • Plays Intro.mp4 videos (Chuck_01.mp4 to Chuck_06.mp4) in loop│
│  • Increments video index on ended for variety                  │
│  • Tap anywhere to trigger screen transition                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      2. CAMERA CAPTURE                          │
│  • Initialize webcam stream                                     │
│  • Load face detection models (SSD MobileNet V1)                │
│  • Live feed with real-time overlay                             │
│  • Options: Capture Photo | Upload File | Go Back              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      3. CAPTURE PREVIEW                         │
│  • Review captured/uploaded photo before sending to AI          │
│  • Run demographics detection (gender, age, group sizing)       │
│  • Options: Retake Photo | Proceed & Transform                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    4. PROCESSING PHASE                          │
│  • Display elegant loading spinner overlay                      │
│  • Select random scenery landmarks (anti-repetition check)      │
│  • Compile high-fidelity prompt with strict identity locks      │
│  • Send request to Gemini 3.1 Flash Image API                   │
│  • Auto-retry up to 3 times on network/safety blocks            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   5. IMAGE COMPOSITION                          │
│  • Load raw generated portrait and target frame asset           │
│  • Instantiate a rendering canvas matching image dimensions     │
│  • Bake custom thematic Frame (Frame.png) on top of the image   │
│  • Export final composite as a high-fidelity PNG URL            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     6. RESULT SCREEN                            │
│  • Present beautiful final composed image                       │
│  • Background upload to QR sharing API starts automatically     │
│  • Action buttons:                                              │
│    - Download: Save locally as PNG                              │
│    - Print: Direct printer dispatch with Safe-Zone margins      │
│    - Scan QR Code: Scan code to save image on mobile devices     │
│    - New Adventure: Reset state, increment key, restart journey  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architecture

### Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  React 19.2.1          │  UI Framework                      │
│  TypeScript 5.8.2      │  Type Safety                       │
│  Lucide React          │  Icon Library                      │
│  TailwindCSS (CDN)     │  Styling & Layout                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    AI/ML LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  Google Gemini API     │  Image Generation (3.1 Flash)      │
│  TensorFlow.js 1.7.4   │  ML Runtime                        │
│  face-api.js 0.22.2    │  Face Detection                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   BUILD & RUNTIME LAYER                     │
├─────────────────────────────────────────────────────────────┤
│  Vite 6.2.0            │  Build Tool & Dev Server           │
│  Electron 39.2.7       │  Desktop App Wrapper               │
│  Electron Builder      │  Windows Portable EXE Compiler     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure & Functionality

### Key Components

- `App.tsx`: Main root component orchestrating screen flow, global states, session triggers, and the AI processing retry wrapper.
- `constants.ts`: Houses character specifications (attire, pose, descriptive fur/eye features), lighting variants, randomized landmarks lists, and the identity locks.
- `types.ts`: Strongly typed interfaces and enums (`AppScreen`, `EraId`, `EraData`, `FaceDetectionResult`, `Character`).
- `index.html`: Base template preloading assets, configuring viewports, importing fonts (Inter, Fredoka, KyivTypeSerif), and implementing a global prevention of image dragging.

### Specialized Components

- `components/Splash.tsx`: Playback screen for `Chuck_0X.mp4`, dismissing on video completion or touch to boot camera.
- `components/CameraCapture.tsx`: Manages video streaming, model lazy-loading, countdown intervals, and file fallback selections.
- `components/CapturePreview.tsx`: Intermediate screen allowing quick retakes or validation of face data.
- `components/ResultScreen.tsx`: Controls download flows, asynchronous QR code uploads, and the Electron silent print IPC call with safe padding calculations. Handles automatic canvas blending of `Frame.png`.

### Services

- `services/faceService.ts`: Configures the SSD MobileNet, Age-Gender, and Landmark weights fallback. Aggregates demographic tallies into a structured result.
- `services/geminiService.ts`: Compiles character descriptions, enforces the identity preservation lock, calls `gemini-3.1-flash-image-preview` with aspect ratio locked at `2:3` and low temperature (`0.3`), and notifies the analytics dashboard on success.

---

## 🎨 Character & Era Configurations

### Embassy Celebration (Selected Era)

- **Description**: A cinematic 4th of July celebration at the US Embassy in Egypt, blending the Pyramids of Giza and the Statue of Liberty under fireworks.
- **Characters**: Chuck E. Cheese, Helen Henny, Mr. Munch, Jasper T. Jowls, Pasqually, Bella Bunny.
- **Human Outfits**: The user's original clothing is preserved perfectly as-is to ensure visual authenticity and instant personal recognition.
- **Lighting**: Cinematic Blockbuster "Teal and Orange" high-contrast lighting, casting deep moody shadows and intense cool blue rim highlights.

---

## 🔌 API Integrations

### 1. Google Gemini API
- **Model**: `gemini-3.1-flash-image-preview`
- **Config**: 2:3 aspect ratio, temperature 0.3, and safety settings set to `BLOCK_NONE` to guarantee uninterrupted generation of historical and landmark scenery without false-positive moderation flags.

### 2. QR Code Upload API
- **Endpoint**: `https://qr-web-api.vercel.app/upload`
- **Payload**: Form-data with PNG Blob, folder tag `chuck-e-cheese-photobooth`, and metadata JSON mapping era and prompt specifications.

### 3. Analytics Dashboard
- **Endpoint**: `https://ai-photobooth-dashboard.vercel.app/api/projects/0f71cbcd-ef2d-4213-a3db-94fe7da6a805/generate`
- **Purpose**: Increments count metrics to log usage statistics in real-time.

---

## 🚀 Build & Deployment

### Commands
- Dev Server: `npm run dev`
- Electron Dev Mode: `npm run electron:dev`
- Electron Build (Windows Portable): `npm run electron:build`

### Output Files
- Web Build: `dist/`
- Windows App: `release/Chuck E. Cheese Photobooth.exe` (Portable)

---

## 📊 Performance Considerations
- **Memory Footprint**: Face-api models are lazy-loaded only when transitioning to the Camera screen to keep startup memory low.
- **Framerate Optimization**: Video overlays and face-api checks are throttled to prevent CPU spikes in long-running sessions.
- **Print Lag Mitigation**: Safely pads images on-the-fly inside offscreen canvases, minimizing printer lag.

---

## 🔒 Security & Privacy
- **Client-Side Face API**: Demographic scanning operates completely locally, with no biometric data ever transmitted externally.
- **Optional Cloud Upload**: Images are only uploaded to the cloud if the user decides to scan the QR code.
- **Session Cleanup**: Fully purges cached frames and canvas memory buffers when clicking "New Adventure".

---

## 🔄 Theme Customization & Alignment Guide (For Event Cloning)

When cloning this project to build another booth for the **same event but with a different theme** (e.g., a "Vintage Cartoon", "Space Adventure", "Retro Futuristic", or "Egyptian Pharaohs" theme), use this step-by-step alignment guide. 

The codebase has been designed with a clean separation between **System Infrastructure** (webcam interface, face api detection, Gemini wrapper, printing module) and **Thematic Assets & Prompting**.

### 1. High-Level Theme Blueprint

To deploy a new theme, you must swap out specific assets and configuration files. Below is the mapping of components that define the theme:

| Feature / Element | Current Theme Implementation | Target Customization file | Description |
| :--- | :--- | :--- | :--- |
| **Intro/Outro Loop** | Chuck E. Cheese Videos | `public/Chuck-E-Cheese-Videos/` | Swap out MP4 video loops played on the Splash Screen. |
| **Foreground Frame** | Chuck E. Cheese Themed Frame | `public/Frames/Frame.png` | 1080x1920 PNG transparent graphic overlay baked on final prints. |
| **Characters & Attires** | Chuck E. and Friends in jerseys | `constants.ts` (`CHUCK_E_CHEESE`, `COMPANION_CHARACTERS`) | Modify names, visual descriptions, outfits, and poses. |
| **Scenic Backgrounds** | Pyramids + Statue of Liberty | `constants.ts` (`EGYPT_LANDMARKS`, `USA_LANDMARKS`, `ERAS`) | Update randomized landmark strings and background scenery prompt. |
| **Color Scheme & Fonts** | CEC Purple & Green / KyivType font | `index.html`, `ResultScreen.tsx` | Replace UI hex colors, CSS gradients, import custom Google Fonts. |
| **Analytics Bucket** | Chuck E. Cheese Dashboard ID | `services/geminiService.ts` (`DASHBOARD_API_URL`) | Swap UUID inside endpoint to split logs. |
| **QR Cloud Folder** | `chuck-e-cheese-photobooth` | `components/ResultScreen.tsx` (`folder` field) | Swap folder name to store files separately in the CDN. |

---

### 2. Step-by-Step Re-Theming & Alignment Workflow

Follow these 6 steps to align your newly cloned repository with the new theme:

#### Step 1: Replace Media Assets
- **Splash Screen Videos**: Locate `public/Chuck-E-Cheese-Videos/` and replace the MP4 loops. Ensure the names match (`Chuck_01.mp4` to `Chuck_06.mp4`) or update the indexing logic inside [Splash.tsx](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/components/Splash.tsx).
- **Print Overlay Frame**: Locate `public/Frames/Frame.png`. Replace it with a new 1080x1920px PNG file with a transparent middle section. Keep the dimensions exact to preserve printer alignments.
- **App Icons**: Replace `public/icon.png` (app icon) and `public/favicon.ico` for browser targets.

#### Step 2: Customize Scene & Prompting in `constants.ts`
Open [constants.ts](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/constants.ts). This is the core configuration hub of the theme. Modify:

1. **Character Visual Descriptions**:
   ```typescript
   export const CHUCK_E_CHEESE: Character = {
     name: "Character Name",
     description: "Extremely detailed description of the character in CGI style (hair texture, eyes, attire, material details)...",
     pose: "Instructions on where the character stands relative to the user (e.g. 'stands on the left, smiling with a hand on the user's shoulder').",
     attire: "Brief attire prompt identifier."
   };
   ```
   > [!TIP]
   > For the highest quality output with Gemini 3.1 Flash, describe textures meticulously: mention "individually-rendered hair strands", "subsurface scattering on skin/ears", "PBR textile patterns", and "specular reflections".

2. **Scenery & Landmark Randomization**:
   Change lists to represent the new theme's environment (e.g., Space Nebulas, Cyberpunk cities, Pharaoh temples):
   ```typescript
   export const THEME_A_LANDMARKS = [ "Space Station Alpha", "Nebula dust clouds", ... ];
   export const THEME_B_LANDMARKS = [ "Martian canyons", "Red dunes", ... ];
   ```

3. **Era/Theme Prompt Instructions**:
   Update `ERAS` with the main composition prompt instruction for the background. This will replace placeholders dynamically at runtime:
   ```typescript
   export const ERAS: EraData[] = [
     {
       id: EraId.GUARDIAN, 
       name: 'My New Event Theme',
       description: 'Brief description shown in logs',
       promptInstructions: 'The scene is an epic transition blending [THEME_A_LANDMARK] on the left with [THEME_B_LANDMARK] on the right, under a cosmic starry sky...'
     }
   ];
   ```

#### Step 3: Align Gemini Prompt Template
Open [geminiService.ts](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/services/geminiService.ts) and verify the Prompt Generator:
- If the new theme requires a different global aesthetic style (e.g., watercolor, sketch, 80s retro photos instead of **cinematic 3D CGI**), modify the style definitions in the core prompt structure (around line 89 onwards).
- Ensure the negative rules list matches the new style:
  ```typescript
  * no flat cartoon, no 2D illustration, no low-poly rendering...
  ```
- **Identity Preservation**: Keep the `- CRITICAL EXPRESSION & IDENTITY LOCK` and `- PORTRAIT WARDROBE INTEGRATION` untouched. This ensures that no matter what the theme, the user's facial features and clothing are locked in and not distorted.

#### Step 4: UI Aesthetics Alignment
1. **Change App Title & Window Meta**:
   Open [index.html](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/index.html) and update:
   - `<title>New Theme Photobooth</title>`
   - Link tags for specialized fonts if your new branding uses a different typography.
2. **Result Screen Particle System**:
   Open [ResultScreen.tsx](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/components/ResultScreen.tsx) and change the floating particle colors:
   ```typescript
   const brandColors = [
     '#HEX1', // Primary Theme Color
     '#HEX2', // Secondary Theme Color
     '#HEX3', // Accent color
   ];
   ```
3. **Tailwind Styling Colors**:
   Search and replace buttons or background gradient configurations in the UI screens (`ResultScreen.tsx`, `Splash.tsx`, `CameraCapture.tsx`) to match the new color scheme (e.g. replacing red/green gradients with space-blue/gold gradients).

#### Step 5: Separate Cloud Bucket & Tracking
To prevent user photos from the new theme from mixing with the original event photos, update these two variables:
1. **CDN Folder**: In [ResultScreen.tsx](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/components/ResultScreen.tsx) (line 244), change `folder` to a unique theme name:
   ```typescript
   formData.append('folder', 'my-new-photobooth-theme');
   ```
2. **Analytics UUID**: In [geminiService.ts](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/services/geminiService.ts) (line 16), update the dashboard project UUID to log counts into a separate analytics dashboard:
   ```typescript
   const DASHBOARD_API_URL = "https://ai-photobooth-dashboard.vercel.app/api/projects/YOUR-NEW-UUID-HERE/generate";
   ```

#### Step 6: Print Padding Calibration (If necessary)
If the new `Frame.png` has thicker borders or elements near the margins, you might need to adjust the asymmetrical printer margins to avoid printer paper cutting.
In [ResultScreen.tsx](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/components/ResultScreen.tsx)'s `preparePrintImage` function:
```typescript
const paddingPercent = 0.04; // Adjust top padding (currently 4%)
const padTop = canvas.height * paddingPercent;
const padBottom = padTop * 0.8; // Adjust bottom padding ratio
```

---

### 3. Verification & Build
After making modifications, perform the following validation commands to ensure the new theme is compiled correctly:

1. **Launch Local Server**:
   ```powershell
   npm run dev
   ```
   Check the camera preview, capture, face detection counts, and the new visual layout in the browser.

2. **Run in Electron Development Sandbox**:
   ```powershell
   npm run electron:dev
   ```
   Verify print triggers, system printer fetches, and overall application full-screen transition behavior locally.

3. **Compile the Final Executable**:
   Run the builder script to compile a portable, self-contained Windows application for your event laptops/kiosks:
   ```powershell
   npm run electron:build
   ```
   The portable executable will compile in the `release/` directory.

---

## 🛠️ Support & Maintenance
For event updates, prompt modifications, or hardware driver configurations (e.g., Canon SELPHY or DNP DP-QW410 print calibration), please refer to the internal **workflows** folder:
- Canon Selphy Setup: [.agent/workflows/selphy-print-integration.md](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/.agent/workflows/selphy-print-integration.md)
- DNP Borderless Setup: [.agent/workflows/professional-photo-printing.md](file:///d:/5DVR/Projects/Chuck-E-Cheese-Photobooth/Chuck-E-Cheese-Photobooth/.agent/workflows/professional-photo-printing.md)

**Project**: Chuck E. Cheese Photobooth Framework  
**Author**: 5DVR Team  
**AI Generation Engine**: Google Gemini 3.1 Flash Image Preview  
**Last Updated**: June 1, 2026  
**Version**: 0.1.0  
