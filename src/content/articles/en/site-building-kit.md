---
title: "One source per layer: components, type, colour and imagery for a new site"
date: 2026-10-07
summary: "Sources for the parts every site needs, grouped by layer, with prices marked and one default pick per layer."
---

A new site needs five layers before layout work starts: components, colour, type and spacing, icons, and imagery. The risk is not picking a bad source. It is mixing three good ones that were never designed to sit together.

The rule here: one source per layer. Add a second only when the first has a real gap.

Price tags: <span class="price">Free</span> fully free. <span class="price paid">Free + paid</span> usable for free, with a paid tier that adds more. Prices as of October 2026.

## Components

Pick one base library. Two in one codebase means two definitions of a button.

- ![shadcn/ui homepage](../../../assets/articles/shadcn.jpg)
  **[shadcn/ui](https://ui.shadcn.com/)** <span class="price">Free</span>\
  Copies component source into the project. Built on Radix and Tailwind.\
  **Use when:** you want to own and edit every component.
- ![daisyUI homepage](../../../assets/articles/daisyui.jpg)
  **[daisyUI](https://daisyui.com/)** <span class="price">Free</span>\
  Tailwind plugin with class-based components. Pure CSS, works with any framework.\
  **Use when:** you want components without React.
- ![Flowbite homepage](../../../assets/articles/flowbite.jpg)
  **[Flowbite](https://flowbite.com/)** <span class="price paid">Free + paid</span>\
  600+ Tailwind components with a matching Figma kit. Pro adds more blocks.\
  **Use when:** design and code need the same kit.

**Pick:** shadcn/ui for React projects.

## Blocks and effects

Ready-made sections save the most time on marketing pages. Effects work for one or two moments per page, not as the base layer.

- ![shadcnblocks homepage](../../../assets/articles/shadcnblocks.jpg)
  **[shadcnblocks](https://www.shadcnblocks.com/)** <span class="price paid">Free + paid</span>\
  Headers, pricing tables, FAQs built on shadcn/ui. Most of the library is paid.\
  **Use when:** you need a full section fast.
- ![Originkit component library](../../../assets/articles/originkit.jpg)
  **[Originkit](https://www.originkit.dev/)** <span class="price paid">Free + paid</span>\
  Animated sections and backgrounds. Free tier caps daily copies.\
  **Use when:** a section needs motion built in.
- ![21st.dev homepage](../../../assets/articles/21st.jpg)
  **[21st.dev](https://21st.dev/)** <span class="price paid">Free + paid</span>\
  Community components, each with a prompt for AI coding tools.\
  **Use when:** you build with Cursor, Claude or similar.
- ![React Bits homepage](../../../assets/articles/reactbits.jpg)
  **[React Bits](https://reactbits.dev/)** <span class="price paid">Free + paid</span>\
  Animated text, backgrounds and components for React.\
  **Use when:** a hero needs one striking effect.
- ![Aceternity UI homepage](../../../assets/articles/aceternity.jpg)
  **[Aceternity UI](https://ui.aceternity.com/)** <span class="price paid">Free + paid</span>\
  Cards, backgrounds and landing page blocks with Motion.\
  **Use when:** a landing page needs polish quickly.
- ![Magic UI homepage](../../../assets/articles/magicui.jpg)
  **[Magic UI](https://magicui.design/)** <span class="price paid">Free + paid</span>\
  150+ animated components, designed to sit next to shadcn/ui.\
  **Use when:** you already use shadcn/ui.
- ![react-loading-skeleton on GitHub](../../../assets/articles/skeleton.jpg)
  **[react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton)** <span class="price">Free</span>\
  Placeholder shapes while data loads, so the page does not jump.\
  **Use when:** you are not on shadcn/ui, which has its own Skeleton.

**Pick:** shadcnblocks for sections, one effects library at most.

## Colour

Explore with a generator. Ship with a scale.

- **[Coolors](https://coolors.co/)** <span class="price paid">Free + paid</span>\
  Generate and lock palettes one colour at a time.\
  **Use when:** exploring brand colours.
- ![Realtime Colors homepage](../../../assets/articles/realtimecolors.jpg)
  **[Realtime Colors](https://www.realtimecolors.com/)** <span class="price">Free</span>\
  Previews a palette and fonts on a real page layout.\
  **Use when:** checking contrast and balance before committing.
- ![Radix Colors scales](../../../assets/articles/radix-colors.jpg)
  **[Radix Colors](https://www.radix-ui.com/colors)** <span class="price">Free</span>\
  12-step scales where each step has a job, with matching dark scales.\
  **Use when:** building tokens for production.

**Pick:** Radix Colors. Semantic tokens point at steps, not hex values, which survives a rebrand.

## Fonts

- ![Google Fonts share image](../../../assets/articles/google-fonts.jpg)
  **[Google Fonts](https://fonts.google.com/)** <span class="price">Free</span>\
  The largest free library, hosted.\
  **Use when:** you need range and reliability.
- ![Fontshare font list](../../../assets/articles/fontshare.jpg)
  **[Fontshare](https://www.fontshare.com/)** <span class="price">Free</span>\
  A smaller set of free, more distinctive faces.\
  **Use when:** Google Fonts feels generic.
- **[Typewolf](https://www.typewolf.com/)** <span class="price">Free</span>\
  Which fonts real sites use, and which pairings hold up.\
  **Use when:** choosing a pairing.

## Type scale and spacing

Six to eight sizes cover most sites. More usually means one-off fixes.

- ![Typescale share image](../../../assets/articles/typescale.jpg)
  **[Typescale](https://typescale.com/)** <span class="price">Free</span>\
  Fixed scale from a base size and a ratio.\
  **Use when:** a fixed scale is enough.
- ![Utopia share image](../../../assets/articles/utopia.jpg)
  **[Utopia](https://utopia.fyi/)** <span class="price">Free</span>\
  Fluid type and spacing with CSS `clamp()`. No breakpoint jumps.\
  **Use when:** the site must scale smoothly across viewports.
- ![Modular Scale share image](../../../assets/articles/modularscale.jpg)
  **[Modular Scale](https://www.modularscale.com/)** <span class="price">Free</span>\
  The original ratio-based scale calculator.\
  **Use when:** you want to compare ratios side by side.

**Pick:** Utopia.

## Theme for shadcn/ui

shadcn/ui reads its theme from CSS variables. Any of these outputs that block; edit by hand afterwards.

- ![tweakcn share image](../../../assets/articles/tweakcn.jpg)
  **[tweakcn](https://tweakcn.com/editor/theme)** <span class="price paid">Free + paid</span>\
  Visual editor with live previews and a contrast checker. Pro ($8/month) adds unlimited AI themes.\
  **Use when:** you want to see every component while tuning.
- ![ZippyStarter theme generator](../../../assets/articles/zippystarter.jpg)
  **[ZippyStarter generator](https://zippystarter.com/tools/shadcn-ui-theme-generator)** <span class="price">Free</span>\
  Generates a full theme from a starting colour.\
  **Use when:** you have one brand colour and nothing else.
- ![shadcn.io theme generator](../../../assets/articles/shadcnio.jpg)
  **[shadcn.io generator](https://www.shadcn.io/theme-generator)** <span class="price">Free</span>\
  Community theme generator with component previews.\
  **Use when:** you want to start from someone else's theme.

**Pick:** tweakcn on the free tier.

## Icons

One icon set per product. Mixing shows in stroke width and corner radius.

- ![Lucide share image](../../../assets/articles/lucide.jpg)
  **[Lucide](https://lucide.dev/icons/)** <span class="price">Free</span>\
  Default icon set for shadcn/ui.\
  **Use when:** you are on shadcn/ui.
- **[Phosphor](https://phosphoricons.com/)** <span class="price">Free</span>\
  Six weights per icon, from thin to fill.\
  **Use when:** one set must serve dense tables and large headers.
- ![Heroicons share image](../../../assets/articles/heroicons.jpg)
  **[Heroicons](https://heroicons.com/)** <span class="price">Free</span>\
  Smaller set from the Tailwind team.\
  **Use when:** you need the basics and nothing more.

**Pick:** Lucide.

## Illustrations and backgrounds

- ![unDraw share image](../../../assets/articles/undraw.jpg)
  **[unDraw](https://undraw.co/illustrations)** <span class="price">Free</span>\
  Set an accent colour before download.\
  **Use when:** illustrations must match the palette.
- ![Storyset homepage](../../../assets/articles/storyset.jpg)
  **[Storyset](https://storyset.com/)** <span class="price">Free</span>\
  Several styles per scene, can be animated. Free use needs attribution.\
  **Use when:** you want motion in illustrations.
- ![Humaaans share image](../../../assets/articles/humaaans.jpg)
  **[Humaaans](https://www.humaaans.com/)** <span class="price">Free</span>\
  Mix-and-match people.\
  **Use when:** you need people in many poses.
- ![Haikei share image](../../../assets/articles/haikei.jpg)
  **[Haikei](https://haikei.app/)** <span class="price">Free</span>\
  Generates SVG waves, blobs and layered shapes.\
  **Use when:** a section needs a background shape.
- **[SVGBackgrounds](https://www.svgbackgrounds.com/)** <span class="price paid">Free + paid</span>\
  Ready-made SVG patterns.\
  **Use when:** you want a pattern without generating one.
- ![fffuel share image](../../../assets/articles/fffuel.jpg)
  **[fffuel](https://www.fffuel.co/)** <span class="price">Free</span>\
  Small generators for gradients, noise, grain and patterns.\
  **Use when:** you need texture.

## Photos and video

Free to use under each site's own licence. Read it once per source, especially for recognisable people or brands.

- ![Unsplash homepage](../../../assets/articles/unsplash.jpg)
  **[Unsplash](https://unsplash.com/)** <span class="price paid">Free + paid</span>\
  High-quality photos. Unsplash+ adds a premium library.
- ![Pexels homepage](../../../assets/articles/pexels.jpg)
  **[Pexels](https://www.pexels.com/)** <span class="price">Free</span>\
  Photos and a strong video library.
- ![Pixabay homepage](../../../assets/articles/pixabay.jpg)
  **[Pixabay](https://pixabay.com/)** <span class="price">Free</span>\
  Photos, vectors, video, music and sound effects.

## Device mockups

- ![Shots share image](../../../assets/articles/shots.jpg)
  **[Shots](https://shots.so/)** <span class="price paid">Free + paid</span>\
  Device frames with backgrounds and shadows.\
  **Use when:** a screenshot needs to look finished.
- ![MockupBro share image](../../../assets/articles/mockupbro.jpg)
  **[MockupBro](https://mockupbro.com/)** <span class="price">Free</span>\
  Product mockups beyond devices, no watermark.\
  **Use when:** you need print or packaging mockups.
- ![MockUPhone homepage](../../../assets/articles/mockuphone.jpg)
  **[MockUPhone](https://mockuphone.com/)** <span class="price">Free</span>\
  Plain phone, tablet and laptop frames.\
  **Use when:** you just need a frame.

## Image processing

Compress every image before it ships. A stock hero photo is often several megabytes.

- ![Squoosh app](../../../assets/articles/squoosh.jpg)
  **[Squoosh](https://squoosh.app/)** <span class="price">Free</span>\
  Compress and convert in the browser. Exports AVIF and WebP.\
  **Use when:** optimising single images.
- ![iLoveIMG share image](../../../assets/articles/iloveimg.jpg)
  **[iLoveIMG](https://www.iloveimg.com/)** <span class="price paid">Free + paid</span>\
  Batch resize, crop and compress.\
  **Use when:** processing many images at once.
- ![Photopea homepage](../../../assets/articles/photopea.jpg)
  **[Photopea](https://www.photopea.com/)** <span class="price paid">Free + paid</span>\
  Browser photo editor that opens PSD files. Premium removes ads.\
  **Use when:** you receive a PSD and have no Photoshop.

## The short version

| Layer | Default | Price | Add when |
|---|---|---|---|
| Components | shadcn/ui | Free | A section is needed fast: shadcnblocks |
| Colour | Radix Colors | Free | Exploring brand colours: Realtime Colors |
| Type scale | Utopia | Free | A fixed scale is enough: Typescale |
| Theme | tweakcn | Free tier | |
| Icons | Lucide | Free | Multiple weights are needed: Phosphor |
| Images | Unsplash + Squoosh | Free | |

Five layers, five decisions, one source each.
