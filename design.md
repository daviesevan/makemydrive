---
version: alpha
name: Film Photography
description: 35mm grain: gelatin silver, kodak yellow, frame number.
colors:
  primary: "#151412"
  secondary: "#777268"
  tertiary: "#F2C94C"
  neutral: "#EEEAE0"
  surface: "#FBF7EC"
  on-primary: "#151412"
typography:
  display:
    fontFamily: Plus Jakarta
    fontSize: 3.5rem
    fontWeight: 700
    letterSpacing: "-0.02em"
  h1:
    fontFamily: Plus Jakarta
    fontSize: 1.8rem
    fontWeight: 700
  body:
    fontFamily: Inter
    fontSize: 0.95rem
    lineHeight: 1.65
  label:
    fontFamily: Plus Jakarta Mono
    fontSize: 0.72rem
    letterSpacing: "0.1em"
rounded:
  sm: 0px
  md: 2px
  lg: 4px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
---
## Overview

This palette: silver gelatin neutral, kodak-yellow accent, mono frame counters.
The overall design style is neobrutalist, with a focus on high contrast and minimalism. The single accent color is reserved for primary actions, ensuring clarity and focus in the user interface.

## Colors

The palette is built around high-contrast neutrals and a single accent that drives interaction.

- **Primary (`#151412`):** Headlines and core text.
- **Secondary (`#777268`):** Borders, captions, and metadata.
- **Tertiary (`#F2C94C`):** The sole driver for interaction. Reserve it.
- **Neutral (`#EEEAE0`):** The page foundation.

## Typography

- **display:** Plus Jakarta 3.5rem
- **h1:** Plus Jakarta 1.8rem
- **body:** Inter 0.95rem
- **label:** Plus Jakarta 0.72rem

## Do's and Don'ts

- **Do** use Tertiary for exactly one action per screen.
- **Do** let Neutral carry the composition — negative space is a feature.
- **Don't** introduce gradients. This system is flat on purpose.
- **Don't** mix Tertiary with alternate accents; the single-accent rule is load-bearing.
