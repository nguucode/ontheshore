---
title: "One source per layer: components, type, colour and imagery for a new site"
date: 2026-10-07
summary: "A short list of sources for the parts every site needs, grouped by layer, with a rule for picking one and moving on."
---

A new site needs five layers before any layout work starts: components, colour, type and spacing, icons, and imagery. Each layer has dozens of good sources. The cost is not in choosing a bad one. The cost is in mixing three good ones that were never designed to sit together.

The rule used here: pick one source per layer, and only add a second when the first has a real gap. Everything below is grouped so that choice is quick.

## Components

**Base layer.** [shadcn/ui](https://ui.shadcn.com/) copies component source into the project instead of installing a package, so the code is yours to change. It is built on Radix primitives and Tailwind. For a Tailwind project that wants class-based components without React, [daisyUI](https://daisyui.com/) and [Flowbite](https://flowbite.com/) cover the same ground with a different trade-off: less code to own, less control over it.

Pick one of the three. They solve the same problem, and two of them in one codebase means two definitions of a button.

**Blocks and sections.** Once the base exists, ready-made sections save the most time on marketing pages. [shadcnblocks](https://www.shadcnblocks.com/) has headers, pricing tables and FAQs built on shadcn/ui. [Originkit](https://www.originkit.dev/) is a free set of animated sections. [21st.dev](https://21st.dev/) collects community components (buttons, cards, menus) and ships a prompt with each one, so an AI coding tool can drop it in.

**Effects.** [React Bits](https://reactbits.dev/), [Aceternity UI](https://ui.aceternity.com/) and [Magic UI](https://magicui.design/) all specialise in animated text, backgrounds and cards. Use them for one or two moments on a page, not as the base layer. An effect that runs on every card stops reading as an effect.

**Loading states.** [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) draws placeholder shapes while data loads. Skeletons that match the final layout prevent the page from jumping when content arrives. If the project already uses shadcn/ui, its own Skeleton component does the same job without another dependency.

## Colour

[Coolors](https://coolors.co/) generates and locks palettes quickly, which is useful for exploration. [Realtime Colors](https://www.realtimecolors.com/) previews a palette on a real page layout, which catches contrast and balance problems that a row of swatches hides.

For production, [Radix Colors](https://www.radix-ui.com/colors) is the safer base. Each hue comes as a 12-step scale where every step has a stated job (backgrounds, borders, solid fills, text), with matching dark-mode scales. Semantic tokens can then point at steps instead of raw hex values, which is what keeps a palette maintainable after the first rebrand.

## Type, size and spacing

**Fonts.** [Google Fonts](https://fonts.google.com/) is the default for range and hosting. [Fontshare](https://www.fontshare.com/) offers a smaller set of free, more distinctive faces. [Typewolf](https://www.typewolf.com/) is not a font source but a reference: which faces real sites use, and which pairings hold up.

**Type scale.** [Typescale](https://typescale.com/) and [Modular Scale](https://www.modularscale.com/) generate a set of sizes from a base size and a ratio. [Utopia](https://utopia.fyi/) goes one step further and generates fluid sizes with CSS `clamp()`, so type and spacing scale smoothly between a minimum and maximum viewport instead of jumping at breakpoints.

A scale of six to eight sizes covers most sites. More than that usually means the scale is being used for one-off fixes.

## Theme for shadcn/ui

shadcn/ui reads its theme from CSS variables, so a theme generator is the fastest way to set colour, radius and font in one pass. [tweakcn](https://tweakcn.com/editor/theme) is a visual editor with live component previews. The [ZippyStarter generator](https://zippystarter.com/tools/shadcn-ui-theme-generator) and the [shadcn.io generator](https://www.shadcn.io/theme-generator) both output the same CSS variable block. Any of the three is enough; the output is a few dozen lines that can be edited by hand afterwards.

## Icons

[Lucide](https://lucide.dev/icons/) is the default icon set for shadcn/ui, so it needs no extra decision there. [Phosphor](https://phosphoricons.com/) offers six weights per icon, from thin to fill, which helps when one set has to serve both dense tables and large marketing headers. [Heroicons](https://heroicons.com/) is a smaller set made by the Tailwind team.

One icon set per product. Mixing sets shows up immediately in stroke width and corner radius.

## Illustrations and backgrounds

**Illustrations.** [unDraw](https://undraw.co/illustrations) lets you set one accent colour before download, so the illustration matches the palette. [Storyset](https://storyset.com/) offers several styles per scene and can animate them. [Humaaans](https://www.humaaans.com/) is a mix-and-match kit of people.

**SVG backgrounds.** [Haikei](https://haikei.app/) generates waves, blobs and layered shapes. [SVGBackgrounds](https://www.svgbackgrounds.com/) has ready patterns. [fffuel](https://www.fffuel.co/) is a collection of small generators for gradients, noise, grain and patterns. SVG keeps file size small and scales without blur.

## Photos, mockups and image processing

**Photos and video.** [Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/) and [Pixabay](https://pixabay.com/) are free to use under their own licences. Read the licence once per source, especially for anything with recognisable people or brands.

**Device mockups.** [Shots](https://shots.so/) places screenshots in device frames with backgrounds and shadows. [MockupBro](https://mockupbro.com/) covers product mockups beyond devices. [MockUPhone](https://mockuphone.com/) is the quickest route to a plain phone or laptop frame.

**Processing.** [Squoosh](https://squoosh.app/) compresses and converts images in the browser, with a side-by-side preview, and exports AVIF and WebP. [iLoveIMG](https://www.iloveimg.com/) handles batch resize and crop. [Photopea](https://www.photopea.com/) is a browser editor that opens PSD files.

Compress every image before it ships. A hero photo straight from a stock site is often several megabytes, and most of that can go without visible loss.

## The short version

| Layer | Default | Add when |
|---|---|---|
| Components | shadcn/ui | A section is needed fast: shadcnblocks |
| Colour | Radix Colors | Exploring a brand palette: Coolors, Realtime Colors |
| Type scale | Utopia | A fixed scale is enough: Typescale |
| Theme | tweakcn | |
| Icons | Lucide | Multiple weights are needed: Phosphor |
| Images | Unsplash + Squoosh | |

Five layers, five decisions, one source each.
