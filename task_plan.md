# METU Website Task Plan

## Goal
Build the first static front-end version of the METU OEM/ODM luggage factory website using Vue, Vite, and Tailwind CSS. English is primary with Chinese language switching. Visual direction: premium, clean, international, manufacturing-capable, not a generic factory directory.

## Phases

| Phase | Status | Notes |
|---|---|---|
| 1. Requirements and assets review | complete | User supplied positioning, copy, page list, categories, and product photos exist in `图片/`. Company/contact text files are empty. |
| 2. Design system synthesis | complete | `ui-ux-pro-max` recommended premium black/gold palette, multilingual typography, storytelling + feature-rich landing pattern. Adapt to black/white/metal silver with restrained gold accent. |
| 3. Scaffold Vue/Vite/Tailwind app | complete | Created package/config/source files in project root. |
| 4. Implement bilingual homepage | complete | Built sections: Home, About, Products, OEM/ODM, Factory, Quality, Contact. |
| 5. Verify build and responsive basics | complete | Dependencies installed, production build passed, dev server started at `http://localhost:5173/`, and HTTP check returned 200. |
| 6. Binhao-inspired visual optimization | complete | Reworked homepage into a more mature manufacturer structure: stronger hero, metrics, product range, OEM/ODM process, capability, factory, quality, and contact CTA. |
| 7. Header expansion menu | complete | Added hover-triggered desktop mega menu under navigation labels, plus mobile accordion behavior. |
| 8. Requirements and architecture documentation | complete | Added long-term docs for requirements, page structure, homepage plan, project architecture, and iteration roadmap. |
| 9. Asset directory organization | complete | Moved logo, MT1007 product images, factory environment image, and machine images into `src/assets/` with English filenames; updated page imports and docs. |
| 10. Fullscreen homepage carousel | complete | Replaced hero with a 5-slide fullscreen carousel: factory environment first, then four machine images, with slide buttons and delayed two-line Chinese copy on each transition. |
| 11. Carousel refinement | complete | Replaced large carousel buttons with dot controls, changed image display to full-view contain mode, reduced hero copy size, and added direction-aware slide transitions. |
| 12. PC product pages | complete | Added lightweight routes for `/PC-Luggage` and `/PC-Luggage/mt1007-pc-luggage.html`, keeping the same header/navigation and linking MT1007 from the product area. |
| 13. Development workflow documentation | complete | Added `docs/METU官网开发工作流.md` with skill usage rules, feature workflows, asset rules, routing notes, and verification checklist. |
| 14. Requirements pool process | complete | Added demand pool, prioritization, version planning rules, and initial backlog into the main requirements document. |
| 15. PC category preview implementation | complete | Implemented a preview version of R014 for `/PC-Luggage` with category banner, breadcrumb, display image, product card, coming-soon placeholder, OEM/ODM strip, and inquiry CTA. |
| 16. About page preview implementation | complete | Implemented a preview version of R015 for `/about` and `/about#company` with Binhao-inspired inner-page structure, anchor navigation, factory environment image, experience modules, values, and inquiry CTA. |
| 17. About page Binhao-style refinement | complete | Reworked `/about` into company profile, corporate culture, development history, honor placeholder, and a black-white footer with navigation, product links, contact placeholders, social icons, and WeChat QR hover. |
| 18. About page screenshot-matched modules | complete | Rebuilt About company profile, culture, history, and honor sections to follow the four local Binhao reference screenshots in `图片/`, while using METU assets and placeholder data. |
| 19. About footer screenshot match | complete | Rebuilt the bottom footer to match the provided Binhao screenshot with a left brand/contact/social block and right 2x3 expanded link groups. |
| 20. About fixed footer reveal | complete | Converted the About footer into a desktop fixed reveal effect so the honor section scrolls upward and exposes the black footer from behind, while mobile keeps a normal flow footer. |

## Decisions
- Use one polished static landing page with anchor navigation for the first version, matching the request to build the homepage while including all listed content areas.
- Use available suitcase photos as replaceable product placeholders.
- Use no backend; contact form is a front-end placeholder.

## Errors Encountered

| Error | Attempt | Resolution |
|---|---|---|
| `session-catchup.py` failed from `$env:USERPROFILE` path due username quoting | Ran planning catchup from default home path | Re-ran script via project-local skill path. |
| `npm install` EPERM in npm cache | Ran in workspace sandbox | Re-ran with approved escalation for npm cache access. |
| `npm install` dependency resolution failed because `postcss` version was invalid | Used `^8.5.49` by mistake | Changed to stable `^8.4.49`. |
| `git status` failed with dubious ownership | Ran plain `git status --short` from sandbox user | Used one-off `git -c safe.directory=E:/desktop/metu-website status --short` without changing global Git config. |
