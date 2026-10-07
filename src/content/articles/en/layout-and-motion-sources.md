---
title: "Where layouts and motion come from: AI prompts, reference galleries and animation tools"
date: 2026-10-07
summary: "Sources for deciding what a page looks like and how it moves, from AI prompt libraries to galleries of real product screens and the libraries that animate them."
---

Components answer what a page is made of. Layout and motion answer something harder: what goes where, and what changes when someone interacts. These are decisions, and the fastest way to make them well is to look at how others already made them.

This list covers three kinds of source. AI templates and prompts give a starting draft. Reference galleries show what real sites and products do. Motion libraries and examples handle the movement.

## AI templates and prompts

A new category of source sells prompts rather than code. The prompt is pasted into an AI coding tool, which generates the page in the project's own stack.

- [Layers](https://www.getlayers.ai/) groups prompts into templates, sections, 3D scenes, backgrounds and gradients. Some are free; commercial use needs a paid plan.
- [MotionSites](https://motionsites.ai/) focuses on full landing pages with motion, written for tools such as Lovable, Bolt, Cursor and Claude. Free and paid tiers.
- [Aura templates](https://www.aura.build/templates) are pages built in Aura, an AI website builder, which can be opened and remixed with further prompts.

The output is a draft, not a finished page. The generated code still needs the project's own tokens, components and copy applied. Treat a prompt as a faster way to reach a first layout, then replace what it invented with what the product actually needs.

## Reference galleries for landing pages

Galleries are most useful with a specific question in mind ("how do other products lay out a pricing table for three tiers"), and least useful as open browsing.

- [Land-book](https://land-book.com/) and [Lapa Ninja](https://www.lapa.ninja/) are large collections of landing pages, filterable by industry, colour and section type.
- [Curated](https://www.curated.design/) is a smaller, hand-picked set of live sites sorted by industry and style.
- [siteInspire](https://www.siteinspire.com/) leans toward editorial and studio sites, filterable by style and subject.
- [Dark Design](https://www.dark.design/) collects sites with dark backgrounds, useful when a dark theme needs reference for contrast and depth.
- [Hoverstat.es](https://www.hoverstat.es/) features sites with unusual interaction. Good for ideas, rarely for direct reuse.

## Reference for product screens and flows

Landing pages and product UI are different problems. For the product itself, the reference should be real apps, not marketing sites.

[Mobbin](https://mobbin.com/) is a library of screens and complete user flows from shipped iOS, Android and web apps. Searching for a flow (onboarding, checkout, account deletion) shows the full sequence across many products, which is more useful than a single screen.

Two design system pages are worth keeping open for states that are often skipped:

- [PatternFly empty state](https://www.patternfly.org/components/empty-state/) covers what a screen shows when there is no data yet, with variants for first use, no search results and errors.
- [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/) shows how to report form errors: a summary at the top of the page that links to each field, plus a message next to the field itself. The pattern is backed by research on a large public service.

Empty and error states are part of the layout, not an afterthought. A page that only has a happy-path design is a third of a design.

## Motion libraries

Three libraries cover almost every case. Pick one per project.

- [Motion](https://motion.dev/) (formerly Framer Motion) is the natural choice for React. Animations are declared on components, and layout and exit animations come built in.
- [GSAP](https://gsap.com/) is framework-agnostic and strongest at timelines and scroll-driven sequences through ScrollTrigger. It is now free, including the plugins that used to be paid.
- [Anime.js](https://animejs.com/) is a lighter option for animating DOM, CSS and SVG properties without a framework.

Before any of these, check whether CSS covers it. Transitions, keyframes and scroll-driven animations in modern CSS handle hover states, fades and simple reveals with no JavaScript. Respect `prefers-reduced-motion` either way.

## Animated icons and illustrations

- [lucide-animated](https://lucide-animated.com/) is a set of 350+ animated Lucide icons for React, built on Motion and installed through the shadcn CLI. It fits directly into a shadcn/ui project.
- [Lordicon](https://lordicon.com/) offers a large library of animated icons with several trigger types (hover, click, loop).
- The [Rive marketplace](https://rive.app/marketplace/) has interactive animations made in Rive, which run with a small runtime and respond to state, not just play on loop.

Animated icons work best where they confirm an action (copied, saved, sent). An icon that moves for no reason pulls attention from the content next to it.

## Examples and tutorials

[CodePen](https://codepen.io/) is the place to search for a specific effect and read working code. [Codrops](https://tympanus.net/codrops/) publishes detailed tutorials and demos, often for scroll, WebGL and typography effects, with the source on GitHub.

## The short version

| Need | Start with |
|---|---|
| First draft of a landing page | An AI prompt from Layers or MotionSites |
| Section reference | Land-book, Lapa Ninja |
| Product flow reference | Mobbin |
| Empty and error states | PatternFly, GOV.UK Design System |
| Motion in React | Motion |
| Scroll sequences | GSAP |
| Animated icons | lucide-animated |

Reference first, then a draft, then motion only where it explains what changed.
