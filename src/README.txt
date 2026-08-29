AURORA FEED REDESIGN

Replace these files in your project:

1. src/App.tsx <- App.tsx
2. src/data/outfits.ts <- outfits.ts
3. src/components/feed/Hero.tsx <- src/components/feed/Hero.tsx
4. src/components/feed/Nav.tsx <- src/components/feed/Nav.tsx
5. src/components/feed/GridHeader.tsx <- src/components/feed/GridHeader.tsx
6. src/components/feed/OutfitGrid.tsx <- src/components/feed/OutfitGrid.tsx
7. src/components/feed/OutfitCard.tsx <- src/components/feed/OutfitCard.tsx
8. Your current global CSS file <- index.css additions / replacement

IMPORTANT:
- Keep UploadModal.tsx, DetailDrawer.tsx, Avatar.tsx and ColorDial.tsx unchanged.
- Keep your onboarding and colour-analysis files unchanged.
- The catalogue now uses remote Unsplash image URLs. If you want zero dependency on remote images, download the images into public/catalog later and change the image fields to local paths.
- OutfitCard includes an inline SVG fallback so an unavailable remote image does not show a broken-image icon.

The redesign adds:
- Editorial Aurora hero
- Profile/colour-signature panel
- Cleaner navigation
- Featured first look
- Larger responsive cards
- Better saved/match UI
- 20 catalogue entries
- Category/source filtering remains functional
- Existing deterministic colour matching remains untouched
- Existing upload/detail/onboarding flows remain connected
