# DesignSync – AI-Ready Design System Infrastructure
**loveholidays · 2026 · Principal Designer**

---

## Snapshot

**The problem:** loveholidays' design system hadn't received meaningful technical investment in four years. Documentation was scattered across Figma, Storybook, and Google Docs. No single source of truth. No ownership. As AI-assisted development accelerated across the company, this became a structural liability. AI tools don't interpret undocumented knowledge. They default to generic patterns and ignore brand conventions. The result: 12+ internal AI prototypes that looked like they came from different companies. A 10-minute idea required two days of manual engineering correction.

**The goal:** Build machine-readable design system infrastructure that makes brand-aligned AI output the default, not the exception. Prove it with working code, not a proposal.

**My scope:** Two designers. No dedicated engineering headcount. No formal coding background on either side. Built in approximately three months using Claude Code.

**Why I was was needed:** This required someone who could translate the business risk of inaction into an investable programme, shape a loose OKR directive into scoped technical work, and build credibility with engineering by shipping real infrastructure rather than a deck.

**Results:**
- One build command generates 9,200+ lines of brand-specific CSS across three brands and two market variants
- Icon pipeline equivalent to ~450 hours of manual work per year, now fully automated
- AI illustration generation at $0.03–$0.13 per asset, with human approval gates built into the workflow
- Prototype benchmarked at 7.6 / 10 against practices described as aspirational by Adobe, Miro, and WhatsApp practitioners at Into Design Systems 2026
- Q3 engineering investment secured to move from prototype to production programme

---

## Context and Stakes

loveholidays was scaling fast. AI prototyping had accelerated across product and engineering teams, but the design system couldn't keep up. Every AI tool hitting the codebase defaulted to its own interpretation of the brand because no machine-readable source of truth existed.

The director of design created OKR space to improve the AI foundation. No defined scope. No solution specified. I partnered with a technical lead designer to define and build the solution ourselves, with support from a web infrastructure engineer to stay within the existing tech stack.

AI adoption wasn't slowing down. Every month without a solid foundation raised the cost of fixing it later. I structured the project around seven testable hypotheses, from brand-aligned AI output through to market scalability and governance. The most important: the cost of inaction compounds.

---

## Approach and Key Decisions

### Structured the brief before touching any tooling

Before writing a line of code, I mapped what "better" meant: brand-aligned AI output, scalable multi-brand tokens, machine-readable component intent, human oversight baked into AI workflows, and a clear path to engineering adoption. This gave us a testable framework rather than an open-ended build.

### Built infrastructure, not documentation

The core insight was that the problem wasn't missing docs. It was missing structure. Documentation in Figma or a Google Doc is invisible to AI tools. The design system needed to be queryable.

The output: a four-tier W3C DTCG token pipeline (Primitives → Palette → Semantic → Component), a 2,646-line machine-readable JSON registry defining intent, usage rules, and structural anti-patterns for every component, and an MCP server layer exposing the registry to any AI coding tool.

Adding a new market now requires a 50-line JSON file. Onboarding a B2B partner requires no component code changes.

### Trade-off: governance baked in vs bolt-on

I chose to embed governance into the tools rather than write policy documents. Proto Studio, our AI prototyping sandbox, runs 11 discovery steps before generating a single line of code. It queries the registry, validates output, self-heals errors, and uses only components the design system actually supports. Teams can explore freely with DS primitives. Anything outside the system surfaces a transparent approval request before entering the codebase.

This was a slower build. Direct code generation would have been faster. But a tool that produces inconsistent output with no oversight doesn't solve the original problem.

### Used AI to build AI infrastructure

Both the AI illustration tool and the competitive analysis agent were specified, designed, and built by designers using Claude Code, with no engineering hire. Proof that designers can contribute directly to production codebases when the tooling is right.

The illustration tool encodes six specific skin tones, enforces a four-colour brand palette, and includes a scored approval workflow ($0.009 for concept drafts, $0.13 for hero banners). Generation costs are tracked per asset by default, not as an afterthought.

---

## Outcomes

**Infrastructure delivered:**
- Token pipeline: one build command generates CSS, a Tailwind theme, and a JavaScript runtime object across three brands
- Component library: six fully token-driven components following a strict nine-rule contract that AI tools cannot break accidentally
- Machine-readable registry: intent, usage rules, and failure modes encoded for every component
- Proto Studio: brand-aligned AI prototyping from text, image, or Figma URL input
- AI illustration generation with human approval gates and per-generation cost tracking
- Competitive analysis agent: full funnel capture (desktop and mobile) with CSS token extraction and structured UX gap analysis
- Claude Code skills: reusable commands that load the full design system into any AI tool's working memory

**Commercial signal:**
Industry benchmarks frame the investment case. Miro's equivalent infrastructure let a team of six serve 40+ product teams and cut design support queries by 70–80%. Enara Health dropped design system monitoring costs from $169/month to $0.20 using a comparable AI-ready foundation. DesignSync is built on the same principles. Those efficiency gains are the baseline expectation, not the stretch goal.

**Internal validation:**
After a live prototype walkthrough, stakeholder feedback confirmed the tool was usable in its current state. The follow-up question from the room: "When can I use it?" Engineering investment backed for Q3 to move from prototype to production programme.

---

## Retrospective

Leading with a working prototype rather than a proposal was the right call. It shifted the conversation from "is this worth investing in?" to "when can we productise this?" That's a better place to be.

What I'd do differently: instrument usage earlier. I have strong proxy metrics (token coverage, automation hours, benchmark score) but no direct evidence yet on time-to-prototype reduction or design-to-dev error rates. Those baselines need to be captured from day one of the Q3 build, before adoption scales.

The next 12 months: get the token pipeline and registry into daily use across all product teams, and measure the reduction in AI prototype correction time against the pre-system baseline. The commercial case becomes significantly stronger once those numbers exist.

The broader lesson: design systems become strategic assets when they're infrastructure, not documentation. The question isn't whether AI will write more of the product. It's whether the design system is ready to govern it.

---

*Active build. Last updated April 2026. Stack: Claude Code, Figma Token Studio, Style Dictionary v5, Tailwind CSS v4, Python FastAPI, Supabase, MCP.*
