# METU Website Findings

## User Requirements
- Brand: METU.
- Chinese company name: 广东美途复合材料有限公司.
- Audience: overseas brands, traders, wholesalers, cross-border sellers, travel product companies, plus domestic customers.
- Positioning: newly established factory backed by a deeply experienced luggage manufacturing team.
- Main products: PC luggage, PP luggage, aluminum frame luggage, other trolley cases. PC luggage is primary.
- Required sections/pages: Home, About Us, Products, OEM/ODM Customization, Factory Capability, Quality Control, Contact Us.
- Technical stack: Vue + Vite + Tailwind CSS.
- Static front-end only, responsive desktop/mobile, bilingual EN/ZH, English primary.

## Assets
- Existing text files under `company/` and `contact/` are empty.
- Existing product photos under `图片/`:
  - `红正.jpg`, `红侧.jpg`, `红侧2.jpg`, `红底.jpg`, `红开.jpg`, `红开2.jpg`, `红拉杆.jpg`, `红锁.jpg`, `内装.jpg`.
- Logo file is an empty placeholder, so text logo will be used until a real logo is provided.

## Design System Notes
- `ui-ux-pro-max` recommended:
  - Pattern: Storytelling + feature-rich landing page.
  - Palette: premium black, stone gray, gold CTA, light background.
  - Typography: multilingual sans pairing.
  - Avoid cheap visuals and fast animations.
- Adaptation for METU:
  - More industrial-luxury and metal-silver than liquid-glass.
  - White/black/deep gray base with small champagne/gold accents.
  - Editorial manufacturing layout with strong product photography and restrained motion.

## Implementation Notes
- Vue stack guideline: use semantic elements and proper buttons/nav/main for accessibility.
- No backend: contact form uses placeholder fields only.

## Binhao Reference Notes
- Reference site: https://www.binhao.com/
- Useful structure to adapt, without copying assets: strong hero, manufacturer positioning, product categories, services/process, factory capability, quality/control trust signals, and inquiry conversion.
- Design direction after reference: more mature factory website rhythm, less abstract design showcase.
- Keep METU differentiated with premium black/white/champagne palette, larger product imagery, bilingual content, and explicit "new factory + experienced team" positioning.
- Dynamic effects implemented in METU style: hero image carousel with fade/slide transitions, animated slide controls, scroll reveal, count-up metrics, product hover overlay, and OEM/ODM process hover activation.
- Header expansion behavior added to match the reference interaction pattern: desktop navigation labels open a full-width mega menu on hover, while mobile navigation uses accordion-style expanded sublinks.
- Current product assets are PNG files in `图片/`; previous JPG references were replaced after the image set changed.
- Current formal site assets have been moved from `图片/` into `src/assets/` with English names: logo, MT1007 product images, factory environment, and machine equipment photos.

## Clarified Strategy
- Website first goal: show the factory, create customer interest, and build initial trust through products and manufacturing capability.
- Main customers: both domestic and overseas buyers.
- Desired memory keywords / 希望客户记住的关键词：PC 行李箱、OEM/ODM 代工与定制、经验丰富的制造团队、中国工厂、质量控制。
- Real factory photos are available.
- Product parameters are not available yet, so the site should avoid detailed parameter tables until data is ready.
- Recommended style direction: premium + mature foreign trade factory website, leaning toward factory credibility.
- Recommended site mode for now: one-page website structured as if it can later become multi-page.
- Asset mapping: `logo.png` -> `src/assets/logo/metu-logo.png`; MT1007 product detail images -> `src/assets/products/mt1007/`; factory environment -> `src/assets/factory/environment/`; machine images -> `src/assets/factory/machines/`.
- Product page routing: `/PC-Luggage` lists PC luggage products; `/PC-Luggage/mt1007-pc-luggage.html` shows the MT1007 product detail page. Header, METU logo and navigation remain consistent across pages.
