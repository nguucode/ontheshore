---
title: "3D on a website, in three levels of effort"
date: 2026-10-07
summary: "Pre-rendered images, interactive scenes, or raw assets for building a scene from scratch: which level a page needs, and the sources for each."
---

Most pages that use 3D only need a picture of something 3D. Fewer need an object that rotates. Very few need a full scene built from models, textures and lighting. Each step up costs more in production time, file size and performance.

The sources below are grouped by those three levels. Start at the lowest level that does the job.

## Level 1: pre-rendered 3D images

A 3D render exported as PNG or WebP loads like any other image. No runtime, no extra JavaScript, no performance cost beyond the file size.

- [Shapefest](https://shapefest.com/) is a large library of ray-traced abstract shapes and objects. Free downloads are 512×512 px; paid tiers offer high resolution.
- [Icons8 illustrations](https://icons8.com/illustrations) includes many 3D styles alongside flat ones, with consistent sets for building a whole page in one style.
- [3dicons](https://old.3dicons.co/) is an open-source set of 120 icons, each rendered in four colour styles and three camera angles. Released under CC0, so no attribution is required.

This level covers feature illustrations, hero images and decorative accents. Compress the files before shipping: 3D renders with soft shadows and gradients compress well to WebP or AVIF.

## Level 2: interactive 3D

When the user should rotate, zoom or trigger something, the page needs a 3D runtime.

- [Spline](https://spline.design/) is a browser-based 3D design tool. Scenes can include states, events and animation, and export as an embed, a React component or a code snippet. It is the shortest path from a design idea to an interactive object on a page.
- [`<model-viewer>`](https://modelviewer.dev/) is a web component from Google that displays a glTF or GLB model with orbit controls, lighting and AR on supported phones. One HTML tag and a model file are enough. It suits product views where the model already exists.
- [Vectary](https://www.vectary.com/) is another browser 3D tool, with a focus on product visualisation, configurators and AR.

Interactive 3D has a real cost. Check load size on a mid-range phone, provide a static fallback image, and avoid placing a heavy scene above the fold where it delays the first meaningful paint.

## Level 3: assets for building a scene

When a scene is built in Blender, Three.js or a game engine, it needs raw materials.

- [Poly Haven](https://polyhaven.com/) offers HDRIs, textures and models, all CC0. HDRIs alone fix most lighting problems: one good environment map gives realistic reflections without placing lights by hand.
- [ambientCG](https://ambientcg.com/) is a large library of CC0 PBR materials (wood, metal, fabric, stone) with the full set of maps for each.
- [Kenney](https://kenney.nl/assets) publishes thousands of CC0 game assets: low-poly models, sprites, UI elements and sound. Useful for prototypes and stylised scenes.

All three use CC0, which removes licensing questions for commercial work.

## Choosing the level

| The page needs | Level | Start with |
|---|---|---|
| A 3D look, nothing moves | 1 | Shapefest, 3dicons |
| An object the user can rotate | 2 | `<model-viewer>` with an existing model |
| An interactive designed scene | 2 | Spline |
| A custom scene in Three.js or Blender | 3 | Poly Haven, ambientCG |
| A stylised prototype or game | 3 | Kenney |

The question for each page is the same: what does the user get from interacting with this object that a still image would not give them. If the answer is nothing specific, level 1 is the right level.
