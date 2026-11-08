# Service collage artwork

Square 1080px exports from EBAQ DESIGN 26 in Figma, section 1044:349.

| Service | Figma frame | Original photo |
| --- | --- | --- |
| Brand Strategy | 1044:31 | User-prepared workshop cutout |
| Logo Design | 1044:270 | User-refined logo-review cutout |
| Brand Design | 1052:2 | public/images/services/arek-researching2-p-1080.jpg |
| Web Design | 1052:81 | public/images/about/process/65c3f16cfc26eeb7887a41f0_Arek_web_design.jpg |
| Web Development | 1052:160 | public/images/about/process/arek-studio-desk-setup.webp |
| Motion Graphics | 1052:239 | public/images/blog/logo-design-cost/arek-workstation.webp |

The four new images use the original photos with transparency masks from Apple Vision, manually refined to retain papers, monitors, and desk equipment. No generative image editing was used. Monochrome/contrast and halftone are editable Figma settings copied from the user's Logo Design frame; the grid remains separate editable layers.

Motion Graphics uses a real general workstation photo as an interim visual, pending user review. It is not evidence of a particular motion project.

Website exports live in public/images/services/collages/{service-slug}.png. Original photo files remain unchanged.

## Layered website version

Cards now use transparent PNG exports under `public/images/services/cutouts/`, preserving the Figma photo treatment without baking in the blue grid. All six exports contain alpha transparency. Logo, Brand Design, and Web Development cutouts are optimized 810px square exports; the other three are 1080px square. Original flat collage exports remain available for comparison.

The CSS grid reuses the homepage background: 1px white lines at 50% opacity and a shared 24px cell token. The stepped boundary uses the same 24px cells and inherits the card's normal/hover surface color. Source photo pixels and approved Figma artwork remain unchanged; temporary export copies were removed.
