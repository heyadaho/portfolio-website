# Portfolio Website PRD
Ed Lake — Principal Product Designer
Version 1.0 | April 2026

---

## 1. Purpose and Goals

A personal portfolio site to host case studies and share with recruiters and hiring managers. The primary job: make someone who receives the link feel immediately confident in Ed's craft, taste, and commercial thinking.

**Success looks like:**

- Recruiter opens the link and shares it internally without being asked
- Site holds up to scrutiny on mobile and desktop equally
- Each case study feels considered, not assembled
- Adding a new case study takes under an hour

---

## 2. Audience

**Primary:** Recruiters, hiring managers, design leads at product companies
**Secondary:** Peers, collaborators, conference organisers

**Implication:** The site needs to work as a cold introduction. No assumed context. First impression is everything. Needs to load fast and communicate seniority without stating it.

---

## 3. Scope for V1

| Feature | In scope | Out of scope |
|---|---|---|
| Landing / hero page | Yes | |
| Short bio and positioning | Yes | |
| Case study list (scalable) | Yes | |
| Single case study template | Yes | |
| Contact / email link | Yes | |
| Password protection per case study | | No — V2 |
| Blog | | No — V2 |
| Filterable case studies | | No — V2 |
| Analytics | Basic (Fathom or Plausible) | V2 |
| Dark/light mode toggle | Yes — V1 | |
| 3D interactive hero visual | Yes — V1 | |
| "Open to work" signal | Yes — V1 | |

---

## 4. Tech Stack

**Recommended:** Astro (you're already familiar with it)

**Why:**
- Static output. Fast. No framework overhead
- Component-based. Case studies scale well
- MDX support for writing case studies in Markdown with embedded components
- Easy to deploy on Vercel or Netlify

**Styling:** Tailwind CSS with a custom design token layer (includes dark/light theme tokens)
**Fonts:** Loaded via Fontsource or Google Fonts with display swap
**Images:** Optimised with Astro's built-in image component
**Animation:** GSAP for parallax hero scene and page transitions
**Deployment:** Vercel. Auto-deploys from main branch on GitHub push.

---

## 5. Information Architecture

```
/
├── index (Landing page)
│   ├── Hero: Name, title, one-liner
│   ├── About: Short bio, 3–4 sentences
│   ├── Case studies: List / grid
│   └── Footer: Email, LinkedIn, copyright
│
└── /work/[slug] (Case study)
    ├── Header: Title, role, year, company
    ├── Overview: Challenge, approach, outcome
    ├── Body sections: Flexible layout blocks
    └── Footer: Back to work / next case study
```

---

## 6. Landing Page

### 6.1 Hero

**Content:**
- Full name
- Current title and company (or "open to work" variant)
- One positioning line. Not a tagline. A sentence that says who you are and what you do.
  - *Example: "I lead product design at scale across travel and ecommerce, with a focus on AI-powered discovery and commercial impact."*

**Design intent:**
- Strong typographic moment anchored by a central 3D interactive scene.
- Name treated as the visual anchor. Large. Weighted. Positioned around the 3D visual.
- Subtle motion on load. Text reveal or fade-in stagger.
- The 3D scene replaces a static hero graphic — it *is* the identity moment.

**Hero Visual — Layered Parallax Landscape:**
A painterly, illustrated landscape fusing the rolling hills of Wales with Japanese compositional sensibility. Reference aesthetic: an ancient Hinoki forest — mist rising between the layers; mineral-lit water winding through the valley; dark silhouetted rock formations in the foreground; complete stillness and solitude.

Not 3D. Layered 2D illustration with depth through parallax.

- **Technique:** 5–7 SVG/PNG illustration layers, each moving at a different rate on mouse move
- **Atmosphere:** Soft mist/blur between layers, grain texture overlay for painterly quality
- **Water element:** Glowing, luminescent river or hot spring — source of light in the scene
- **Foreground:** Dark silhouetted hills or rocks that frame the content below
- **Merge behaviour:** Scene dissolves downward into the page — no hard frame or border. Hero text floats over or just below the landscape.
- **Implementation:** CSS/JS parallax or GSAP ScrollTrigger + mousemove. Lightweight — no WebGL required.
- **Mobile:** Parallax disabled, static layered scene at reduced height. Layers still visible, just no interaction.
- **Colour:** Drawn from the site's token palette — muted greens, cool mist greys, warm luminescent accent for the water

### 6.2 About

**Content:**
- 3–4 sentences maximum
- Hit: seniority, domain depth, what you care about
- Optional: one personal line (Japan, design culture) to make it human

**Design intent:**
- Restrained. Generous whitespace.
- Possibly set in a lighter weight to contrast the hero.
- Avoid a photo for now unless you have a strong one.

### 6.3 Case Studies List

This is the most important scalable component. Needs to look good with 1 and with 8.

**Single card structure:**
- Company or project name
- Short description (1 line — what problem, what impact)
- Role and year
- Tags (optional): e.g. "AI", "Discovery", "Mobile"
- Thumbnail or visual treatment (placeholder if no image)

**Layout behaviour:**
- 1 case study: Full-width featured card. Prominent. No awkward grid.
- 2–3 case studies: Large cards, 2 columns
- 4+ case studies: Tighter grid, 2–3 columns

**Design intent:**
- Cards should feel editorial, not like a generic portfolio grid
- Use typographic hierarchy and layout to communicate quality
- Hover state should be meaningful — not just a box shadow

### 6.4 Footer

- Email address (mailto link)
- LinkedIn URL
- "Designed and built by Ed Lake" (positions you as someone who builds)
- Year

---

## 7. Case Study Template

This is where the work gets communicated. Structure needs to be opinionated but flexible.

### 7.1 Page Header

- Project title
- One-sentence summary
- Metadata row: Role | Company | Year | Duration
- Hero image or full-width visual treatment (placeholder block in V1)

### 7.2 Overview Block

Three columns or a clear 3-part structure:

| Problem | Approach | Outcome |
|---|---|---|
| What was the challenge | How you tackled it | What changed as a result |

Keep these short. This is a skim layer for busy recruiters.

### 7.3 Body Sections

Flexible modular blocks. Each section has:
- Section label (small, light weight, uppercase tracking)
- Heading
- Body copy (2–4 short paragraphs max per section)
- Media block (image, image pair, full-width image, video embed)
- Optional: pull quote or callout

**Standard section types to build:**

- `TextBlock` — heading + body
- `MediaBlock` — full-width or contained image placeholder
- `MediaPairBlock` — two images side by side
- `CalloutBlock` — highlighted insight or metric
- `QuoteBlock` — pull quote or attributed quote

All media blocks in V1 will be styled placeholder divs with a label. You'll swap these in when you add your first case study.

### 7.4 Outcomes / Results

Separate section near the bottom. This matters to hiring managers.
- Key metric or result (if shareable)
- What shipped
- Your specific contribution vs team effort

### 7.5 Case Study Footer

- Back to all work (link)
- Next case study (link — shows adjacent card when you have more than one)

---

## 8. Design Direction

### 8.1 Aesthetic

**Reference point:** Editorial precision with a restrained Japanese sensibility. Not minimal for minimalism's sake. Considered. Every element earns its place.

**Tone:**
- Serious but not cold
- Confident but not loud
- Craft-first

**Key characteristics:**
- Strong typographic system — two typefaces max. One display, one text.
- Very limited colour palette. Near-black, near-white, one accent.
- Generous whitespace with intentional density at focal points
- Grid-aware but not grid-rigid. Occasional asymmetry.
- Subtle animations that respect the content, not distract from it

**What to avoid:**
- Purple gradients, glassmorphism, overused "dark mode with neon accents"
- Generic portfolio grid with identical card sizes
- Stock photography or illustration
- Anything that feels like a template

### 8.2 Typography Suggestions

- **Display:** Canela, Editorial New, Freight Display, or Playfair Display (something with character and warmth)
- **Body:** Söhne, DM Sans, or Instrument Sans (clean, contemporary, legible)

### 8.3 Colour Palette Suggestion

```css
--color-base:    #F5F3EF   /* warm off-white, not pure white */
--color-ink:     #1A1A1A   /* near black */
--color-mid:     #6B6B6B   /* metadata, secondary text */
--color-accent:  #C4A882   /* warm sand/amber — connects to Japan/craft */
--color-border:  #E0DDD7   /* subtle separators */
```

Can revisit if you want a dark-first approach.

---

## 9. Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile (<768px) | Single column. Navigation collapses. Case study media stacks. Full-width everything. |
| Tablet (768–1024px) | Two-column grid for case studies. Tighter padding. |
| Desktop (1024px+) | Full layout. Max content width ~1200px. Centred. |

Mobile-first build. Style up, not down.

---

## 10. Component Inventory (V1)

| Component | Notes |
|---|---|
| `<Nav />` | Name left, email/LinkedIn right. No hamburger menu in V1. |
| `<Hero />` | Name, title, positioning line |
| `<About />` | Bio text block |
| `<CaseStudyCard />` | Used in list. Scalable. |
| `<CaseStudyGrid />` | Wraps cards. Handles 1–N layouts. |
| `<Footer />` | Email, LinkedIn, credit |
| `<CaseStudyHeader />` | Title, summary, metadata row |
| `<OverviewBlock />` | 3-column problem/approach/outcome |
| `<TextBlock />` | Section heading + body |
| `<MediaBlock />` | Full or contained image / placeholder |
| `<MediaPairBlock />` | Two images side by side |
| `<CalloutBlock />` | Highlighted stat or insight |
| `<QuoteBlock />` | Pull quote |
| `<CaseStudyFooter />` | Back to work, next case study |

---

## 11. Content Needed from Ed

Before building starts:

- [ ] Name and current title (confirm exact wording)
- [ ] One-line positioning statement
- [ ] Bio copy (3–4 sentences)
- [ ] Email address for contact
- [ ] LinkedIn URL
- [ ] First case study: title, company, year, role, one-line description
- [ ] Preferred aesthetic direction confirmation (dark vs light, any visual references)
- [ ] Domain name (if already owned)

---

## 12. Build Phases

### Phase 1 (now): Skeleton build
- Astro project setup
- Design token file (colours, type scale, spacing)
- All V1 components built with placeholder content
- Landing page fully functional
- Case study template fully functional with one placeholder study
- Deployed to Vercel

### Phase 2: First real case study
- Ed provides content and references
- Media blocks populated
- Copy reviewed and refined

### Phase 3: Polish
- Micro-animations and transitions
- Performance audit
- Cross-browser check
- Share with a handful of people for feedback

### Phase 4 (V2 backlog)
- Password-protected case studies
- Filtered/tagged case study list
- Dark mode toggle
- Second and third case studies

---

## 13. Decisions Log

1. **Dark or light?** → Both. Dark/light toggle in V1. Two full themes required from the start.
2. **Case study list placement?** → On the landing page. Single-page approach to start.
3. **Visual references / hero direction?** → Layered parallax illustration, not 3D. Painterly, stylised landscape: Wales meets Japan. Hinoki forest reference — rolling misty hills, luminescent water, dark silhouetted foreground. SVG layers + GSAP mousemove parallax. Dissolves into the page. Mobile shows static layered scene.
4. **Open to work?** → Yes. Signal it clearly in the hero.
5. **Custom domain?** → To be set up after initial build.
