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
| 5. Verify build and responsive basics | pending | Install dependencies if needed, run build, and start dev server if feasible. |

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
