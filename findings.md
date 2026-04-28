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
