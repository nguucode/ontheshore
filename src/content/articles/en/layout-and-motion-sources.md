---
title: "Where layouts and motion come from: AI prompts, reference galleries and animation tools"
date: 2026-10-07
summary: "Sources for deciding what a page looks like and how it moves, from AI prompt libraries to real product screens and the libraries that animate them. Prices marked."
---

Components answer what a page is made of. Layout and motion answer what goes where, and what changes when someone interacts. The fastest way to decide well is to look at how others already decided.

Three kinds of source below: AI prompts for a first draft, galleries for reference, and motion tools for movement.

Price tags: <span class="price">Free</span> fully free. <span class="price paid">Free + paid</span> usable for free, with a paid tier that adds more. Prices as of October 2026.

## AI templates and prompts

These sell prompts rather than code. Paste the prompt into an AI coding tool and it generates the page in your own stack. The result is a draft: apply your own tokens, components and copy before shipping.

- ![Layers share image](../../../assets/articles/layers.jpg)
  **[Layers](https://www.getlayers.ai/)** <span class="price paid">Free + paid</span>\
  Prompts for templates, sections, 3D scenes, backgrounds and gradients. Commercial use needs a paid plan.\
  **Use when:** you need one section, not a whole page.
- ![MotionSites share image](../../../assets/articles/motionsites.jpg)
  **[MotionSites](https://motionsites.ai/)** <span class="price paid">Free + paid</span>\
  Full landing page prompts with motion, for Lovable, Bolt, Cursor and Claude.\
  **Use when:** you want a complete page draft.
- ![Aura share image](../../../assets/articles/aura.jpg)
  **[Aura templates](https://www.aura.build/templates)** <span class="price paid">Free + paid</span>\
  Pages built in Aura, an AI site builder. Free plan can remix and export HTML for personal use. AI prompts and commercial use need Pro (from $12.50/month, billed yearly).\
  **Use when:** you want to edit visually, then export.

**Pick:** a prompt for the first layout, then replace whatever it invented.

## Galleries for landing pages

Most useful with a specific question in mind ("how do others lay out a three-tier pricing table"). Least useful for open browsing.

- ![Landbook homepage](../../../assets/articles/landbook.jpg)
  **[Land-book](https://land-book.com/)** <span class="price paid">Free + paid</span>\
  Large collection, filterable by page type and section.\
  **Use when:** looking for a specific section.
- **[Lapa Ninja](https://www.lapa.ninja/)** <span class="price paid">Free + paid</span>\
  7,300+ landing pages with full-page screenshots. Pro removes limits.\
  **Use when:** you want to see a whole page top to bottom.
- ![Curated share image](../../../assets/articles/curated.jpg)
  **[Curated](https://www.curated.design/)** <span class="price">Free</span>\
  Smaller, hand-picked set sorted by industry and style.\
  **Use when:** you want quality over quantity.
- ![Siteinspire homepage](../../../assets/articles/siteinspire.jpg)
  **[siteInspire](https://www.siteinspire.com/)** <span class="price">Free</span>\
  Editorial and studio sites, filterable by style and subject.\
  **Use when:** the site is content-led.
- ![Dark Design share image](../../../assets/articles/darkdesign.jpg)
  **[Dark Design](https://www.dark.design/)** <span class="price">Free</span>\
  Sites with dark backgrounds only.\
  **Use when:** designing a dark theme.
- ![Hoverstat.es homepage](../../../assets/articles/hoverstates.jpg)
  **[Hoverstat.es](https://www.hoverstat.es/)** <span class="price">Free</span>\
  Sites with unusual interaction.\
  **Use when:** looking for ideas, rarely for direct reuse.

## Reference for product screens and states

Landing pages and product UI are different problems. For the product itself, look at real apps.

- ![Mobbin share image](../../../assets/articles/mobbin.jpg)
  **[Mobbin](https://mobbin.com/)** <span class="price paid">Free + paid</span>\
  Screens and complete flows from shipped iOS, Android and web apps. The free tier is limited.\
  **Use when:** designing a flow such as onboarding or checkout.
- ![PatternFly empty state page](../../../assets/articles/patternfly.jpg)
  **[PatternFly empty state](https://www.patternfly.org/components/empty-state/)** <span class="price">Free</span>\
  What a screen shows when there is no data: first use, no results, errors.\
  **Use when:** a screen can be empty.
- ![GOV.UK Design System share image](../../../assets/articles/govuk.jpg)
  **[GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/)** <span class="price">Free</span>\
  A summary at the top that links to each field, plus a message next to the field. Backed by research on a large public service.\
  **Use when:** designing form validation.

A page with only a happy-path design is a third of a design. Empty and error states are part of the layout.

## Motion libraries

Pick one per project. Before any of them, check whether CSS transitions, keyframes or scroll-driven animations already cover it. Respect `prefers-reduced-motion` either way.

- ![Motion share image](../../../assets/articles/motion.jpg)
  **[Motion](https://motion.dev/)** <span class="price paid">Free + paid</span>\
  Formerly Framer Motion. Declarative animation for React, with layout and exit animations. Library is free; Motion+ adds premium examples.\
  **Use when:** the project is React.
- ![GSAP share image](../../../assets/articles/gsap.jpg)
  **[GSAP](https://gsap.com/)** <span class="price">Free</span>\
  Framework-agnostic. Strongest at timelines and scroll sequences via ScrollTrigger. All plugins are now free.\
  **Use when:** motion follows the scroll.
- ![Anime.js share image](../../../assets/articles/animejs.jpg)
  **[Anime.js](https://animejs.com/)** <span class="price">Free</span>\
  Lightweight animation for DOM, CSS and SVG.\
  **Use when:** no framework, small footprint.

## Animated icons and illustrations

Animated icons work best where they confirm an action: copied, saved, sent. An icon that moves for no reason pulls attention from the content next to it.

- ![lucide-animated share image](../../../assets/articles/lucide-animated.jpg)
  **[lucide-animated](https://lucide-animated.com/)** <span class="price">Free</span>\
  350+ animated Lucide icons for React, built on Motion, installed through the shadcn CLI.\
  **Use when:** you already use Lucide and shadcn/ui.
- ![Lordicon share image](../../../assets/articles/lordicon.jpg)
  **[Lordicon](https://lordicon.com/)** <span class="price paid">Free + paid</span>\
  9,700 free animated icons with attribution. Pro unlocks 38,100 and removes attribution.\
  **Use when:** you need hover, click or loop triggers.
- ![Rive marketplace](../../../assets/articles/rive.jpg)
  **[Rive marketplace](https://rive.app/marketplace/)** <span class="price paid">Free + paid</span>\
  Interactive animations that respond to state. Many files are free to remix; the Rive editor has paid plans.\
  **Use when:** an animation must react to user input.

## Examples and tutorials

- **[CodePen](https://codepen.io/)** <span class="price paid">Free + paid</span>\
  Search a specific effect and read working code.\
  **Use when:** you know the effect, not the code.
- ![Codrops homepage](../../../assets/articles/codrops.jpg)
  **[Codrops](https://tympanus.net/codrops/)** <span class="price">Free</span>\
  Detailed tutorials and demos for scroll, WebGL and typography effects, with source on GitHub.\
  **Use when:** you want to understand how an effect is built.

## The short version

| Need | Start with | Price |
|---|---|---|
| First draft of a landing page | MotionSites or Layers | Free + paid |
| Section reference | Land-book | Free + paid |
| Product flow reference | Mobbin | Free + paid |
| Empty and error states | PatternFly, GOV.UK | Free |
| Motion in React | Motion | Free |
| Scroll sequences | GSAP | Free |
| Animated icons | lucide-animated | Free |

Reference first, then a draft, then motion only where it explains what changed.
