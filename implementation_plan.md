# JNIMUN Council Subpage Redesign to Match Mockup

Implement a high-fidelity, premium Neubrutalist design for all JNIMUN council subpages (`/JNIMUN/[slug]`) to match the mockup image (`media__1779762310669.jpg`) precisely.

## User Review Required

> [!IMPORTANT]
> The new design uses a multi-layered paper aesthetic, transparent chair cutouts, hand-drawn ovals/ellipses around names, custom tape and paperclips, and specific brand-aligned colors (pink, blue, yellow). 
> The navigation bar will be kept on top of all floating stickers by raising its stack visibility while keeping stickers underneath.

## Proposed Changes

### 1. Council Subpage Logic & Data
---
#### [MODIFY] [\[slug\].tsx](file:///c:/Users/Adham/MUNWebsite/src/pages/JNIMUN/%5Bslug%5D.tsx)
- Define a structured title layout in `COMMITTEE_DATA` for each council, breaking titles down into styled parts (Part 1, Part 2, Part 3) to match the multi-color Neubrutalist typographic hierarchy in the mockup.
- Define a list of `highlightWords` to wrap key terms inside the description with a custom highlighter span.
- Implement an inline SVG component to draw a hand-drawn circle/oval outline around chair names.
- Update the layout structure:
  - **Blue Header Section**: Solid blue background with JNIMUN branding, finishing with a white ripped-paper edge overlay at the bottom.
  - **Hero Area**: Display badge, council logo in a white circular badge with a shadow, the three-line multi-colored title, and the ruled paper note description (complete with a red margin line, yellow highlighted terms, and a piece of tape).
  - **Chairs Section**: Features the "THE COUNCIL CHAIRS" blue ripped-paper ribbon, a yellow crown doodle, and Polaroid cards. Cards will display transparent chair portrait cutouts over a radial gradient background, complete with pink paperclips at the top and the hand-drawn oval around names.
  - **Focus Section**: Includes the "COMMITTEE IN FOCUS" pink ripped-paper ribbon, and two Polaroid-style group photos pinned with pink translucent tape.
  - **CTA Section**: A full-width pink/magenta background with a ripped top edge, a large yellow/white header, a magnifying glass sticker on the bottom-left, a lightbulb sticker on the bottom-right, and two Neubrutalist-style buttons.

### 2. Styling System
---
#### [MODIFY] [JNIMUNSubpage.module.scss](file:///c:/Users/Adham/MUNWebsite/src/styles/JNIMUNSubpage.module.scss)
- Import `@import '@/styles/JNIMUN26Brand.scss';` to access official brand color tokens and fonts ('Anton', 'Berlin Sans FB').
- Apply a repeat-tiled paper texture background (`/image/png/JNIMUN'26/Assets/-Paper Texture Pack/Paper Textures 10.jpg`) with low opacity to the entire wrapper.
- Add styles for:
    - Ripped paper edges using `torn-paper-edge.png` as repeatable mask/background overlays.
    - The ruled notebook page description with horizontal lines and red margin line.
    - Polaroid cards with distinct Neubrutalist shadows, margins, and rotations.
    - Inline hand-drawn name circles and decorative stickers (crown, megaphone, heart, stars, hand with magnifying glass, lightbulb).
    - Responsive adjustments for mobile viewports to ensure seamless visual layout.

## Verification Plan

### Automated/Manual Verification
- Navigate to `/JNIMUN/unodc` and compare its layout directly against the provided mockup (`media__1779762310669.jpg`).
- Verify that chair names are enclosed in hand-drawn ovals.
- Verify that the description note resembles lined paper with specific highlighted terms.
- Scroll the page to confirm that all stickers slide under the navigation bar (Navbar z-index higher than stickers).
- Verify the layout on mobile viewports.
