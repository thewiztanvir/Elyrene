---
name: Elyrène Haute Couture
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#6b5c4d'
  on-secondary: '#ffffff'
  secondary-container: '#f1dcc9'
  on-secondary-container: '#6f6051'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#261900'
  on-tertiary-container: '#9c8049'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#f4dfcc'
  secondary-fixed-dim: '#d7c3b1'
  on-secondary-fixed: '#24190e'
  on-secondary-fixed-variant: '#524436'
  tertiary-fixed: '#ffdea4'
  tertiary-fixed-dim: '#e4c285'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5a4312'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: ebGaramond
    fontSize: 80px
    fontWeight: '300'
    lineHeight: 96px
    letterSpacing: -0.02em
  display-md:
    fontFamily: ebGaramond
    fontSize: 64px
    fontWeight: '300'
    lineHeight: 72px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '300'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '300'
    lineHeight: 40px
  headline-md:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '300'
    lineHeight: 40px
  body-lg:
    fontFamily: raleway
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: raleway
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: raleway
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  button:
    fontFamily: raleway
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1em
spacing:
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style

The design system embodies the "Quiet Luxury" aesthetic—a philosophy of understated elegance, timelessness, and uncompromising quality. It is designed for a discerning, high-net-worth audience that values editorial storytelling and tactile minimalism.

The visual style is **Minimalist and Magazine-inspired**. It prioritizes vast white space (Ivory), allowing high-fashion photography to serve as the primary visual driver. The interface acts as a silent gallery frame: thin lines, exquisite serif typography, and a restricted color palette create an atmosphere of exclusivity and calm. The emotional response is one of sophistication, heritage, and "slow fashion" intentionality.

## Colors

The palette is rooted in classic luxury neutrals to ensure the UI remains timeless.

- **Noir (#0E0E0E):** Used for all primary typography, iconography, and high-contrast structural elements. It provides the "ink" on the page.
- **Ivory (#FFFFFF):** The expansive background color. It is a pure white that provides maximum breathing room for images.
- **Gold (#C9A96E):** Reserved exclusively for high-priority calls to action, premium indicators, and active states. It should be used sparingly to maintain its perceived value.
- **Mink (#8C7B6B):** A sophisticated taupe used for hair-line borders, secondary labels, and subtle UI dividers. It softens the transition between Ivory and Noir.

## Typography

The typographic hierarchy relies on the tension between the classicism of **Cormorant Garamond** (using *ebGaramond* as the closest stylistic token) and the modern, architectural clarity of **Raleway**.

- **Headlines:** Use Light (300) weights to maintain a delicate, editorial feel. High-fashion layouts should leverage "Display" sizes for impact, ensuring generous line heights to prevent crowding.
- **Body:** Raleway is utilized for readability. Paragraphs should be kept to narrow measures (max 65 characters) to mimic magazine columns.
- **Labels:** Small-cap styling with increased letter spacing (tracking) is the signature look for navigation, categories, and overlines.

## Layout & Spacing

This design system uses a **Fixed Grid** philosophy to maintain the rigorous structure of a luxury publication. 

- **The 12-Column Grid:** On desktop, use a 12-column grid with a maximum container width of 1440px. Gutters are generous (32px) to prevent visual clutter.
- **Editorial Whitespace:** Section vertical spacing is intentionally aggressive (160px+). This "luxury gap" signifies that the brand is not rushed and values the presentation as much as the product.
- **Mobile Reflow:** On mobile, the grid collapses to 4 columns. Imagery typically goes full-bleed or maintains a consistent 20px margin to preserve the "frame" effect.

## Elevation & Depth

To maintain a flat, editorial aesthetic, this design system avoids traditional drop shadows. Depth is communicated through **Tonal Layering** and **High-Contrast Overlays**.

- **Flat Planes:** All surfaces reside on the same Z-index logically. Hierarchy is created by Noir text on Ivory backgrounds, or Ivory text on Noir image-overlays.
- **Hairline Outlines:** When separation is required (e.g., input fields, card borders), use 1px solid lines in **Mink**.
- **Imagery Depth:** Depth is provided by the photography itself. UI elements often "float" over full-bleed images using high-contrast Noir/Ivory colors without any blur or shadow effects.

## Shapes

The shape language is **Sharp (0px)**. 

Curves are avoided to maintain a rigorous, architectural, and high-fashion feel. All buttons, image containers, input fields, and UI cards feature crisp 90-degree angles. This severity reinforces the "Premium" positioning and distinguishes the brand from friendlier, mass-market consumer apps.

## Components

### Buttons
- **Primary:** Noir background with Ivory text. No border. Sharp corners. Hover state: Gold background.
- **Secondary/CTA:** Gold background with Noir text. Used for "Buy Now" or "Book Appointment."
- **Ghost:** Noir 1px border, transparent background, Noir text.

### Input Fields
- Underline style only: 1px Mink border at the bottom. No side or top borders. Floating labels in Raleway Caps.

### Navigation
- Top-tier navigation uses Label-Caps. Active states are indicated by a simple 1px Noir underline or a shift to Gold.

### Cards & Imagery
- **Product Cards:** No borders or shadows. The image occupies 100% of the card width. Text (Product Name & Price) is center-aligned below the image in ebGaramond.
- **Editorial Cards:** Feature large-scale typography overlapping the image.

### Lists & Dividers
- Use 1px Mink horizontal lines to separate list items. Ensure generous padding (24px - 32px) between the text and the divider.