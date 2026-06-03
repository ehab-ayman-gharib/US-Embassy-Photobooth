# Canon SELPHY Borderless Photo Printing Configuration

This document records the exact calibrated setup for borderless 4x6 photo printing on the **Canon SELPHY CP910/1300/1500** from the Electron photobooth application.

---

## 1. Resolution & Layout Specifications

* **Digital Copies (On-Screen & QR API Upload)**: Sized at exactly **1200 x 1800 pixels** (2:3 aspect ratio).
* **Printable Canvas Sizing**: Sized at exactly **1200 x 1800 pixels** inside the print handler.

---

## 2. Printer Bleed & Margin Calibration

Professional photo printers like the Canon SELPHY scale the image up slightly (by ~2%) on all sides to perform borderless printing. If logos or borders are placed right at the edges of the image file, they get physically cut off by the printer. 

To prevent both cropping and black margins on the final paper, we use a calibrated margin safe-zone.

### Safe-Zone Margins (on the 1200 x 1800 canvas):
* **Top Margin (`padTop`)**: `70` pixels
* **Bottom Margin (`padBottom`)**: `40` pixels (asymmetric vertical shift)
* **Left/Right Margin (`padLeft` / `padRight`)**: `24` pixels (exactly 2% safe-zone padding)

### Canvas Draw Logic:
```typescript
const padTop = 70;
const padBottom = 40;
const padLeft = 24;
const padRight = 24;

ctx.drawImage(
  img,
  padLeft, padTop,
  canvas.width - (padLeft + padRight), // 1152 pixels wide
  canvas.height - (padTop + padBottom) // 1690 pixels tall
);
```

### How it Works:
1. The **24px horizontal padding** acts as a buffer.
2. The printer's **2% borderless expansion** scales the print job up, pushing the 24px black borders off the edges of the paper.
3. The logos and borders (shifted 24px inward) print right at the physical edge of the paper, fully visible and complete.

---

## 3. Windows Shell Print Engine

The main process `electron/main.cjs` executes native Windows Shell Printing using the `shimgvw.dll` engine. This is verified to work flawlessly on Windows without interfering with system-wide user printing preferences.

### Execution Command:
```javascript
printCommand = `rundll32.exe C:\\WINDOWS\\system32\\shimgvw.dll,ImageView_PrintTo /pt "${tempImagePath}" "${printerName}"`;
```

---

## 4. Printer Troubleshooting & Prerequisites

1. **Printer Settings (Windows Device Preferences)**:
   * Open **Settings > Bluetooth & devices > Printers & scanners**.
   * Select your **Canon SELPHY** printer.
   * Go to **Printing Preferences** and ensure **Borderless** mode is set to **On** (Default).
   * Ensure default paper size is set to **Postcard (4x6)**.
2. **Paper Tray**:
   * Ensure the paper cassette is loaded with standard **Postcard (P)** size paper (100x148mm).
