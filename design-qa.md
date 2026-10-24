> Historical QA record. The typography and palette below describe the earlier release. The current, scoped proposal 4 verification is appended at the end of this file.

# Warm Editorial implementation QA

**Findings**

No actionable P0, P1 or P2 findings remain. This pass applies proposal 1 to the existing PIE website, with a near-white warm palette between proposals 1 and 4.

## Comparison targets and evidence

- Source visual truth: `/Users/eelco/.codex/visualizations/2026/10/22/01a1641b-0026-7d72-bca2-4939b7c858f7/pie-website-refresh/style-review/selected-warm-editorial.png`.
- Production implementation: `http://127.0.0.1:5176/`.
- Final implementation screenshot: `/Users/eelco/.codex/visualizations/2026/10/22/01a1641b-0026-7d72-bca2-4939b7c858f7/pie-website-refresh/editorial-home-final.png`.
- Source and final implementation both measure **1006 × 1563 pixels**. Implementation CSS viewport: **1006 × 1563**, screenshot density **1×**. No density normalization was necessary for the final comparison.
- Matched state: homepage, light site theme, default learner palette, reading example, Student view, split-pane layout, empty learner responses.
- Full-view comparison: source and final capture were displayed together in the same browser comparison board. Evidence: `editorial-comparison-full.png` in the artifact directory above.
- Focused comparison: native-scale crops of the Example selector, Student/Instructor controls, handwritten hint and architecture diagram were displayed together. Evidence: `editorial-comparison-details.png`.
- Reproducible comparison board: `style-review/editorial-comparison.html` in the artifact directory above, served at `http://127.0.0.1:5180/editorial-comparison.html`.

## Required fidelity surfaces

| Surface | Review and result |
| --- | --- |
| Fonts and typography | Newsreader supplies the editorial display headings, with Inter for navigation, body text and controls. Computed browser styles confirm the intended fonts. Caveat is limited to the instructor hint and fraction link. Desktop title wrapping follows the selected two-line composition; mobile retains a readable two-line title at 390px. Learner content keeps the player typography. |
| Spacing and layout rhythm | The page follows the target's headline, introduction and paired actions, live demo, then asymmetric ownership explanation and sketch. Navigation, article headings, link groups and footer share the same spacing and palette. Redundant information below the homepage demo was removed. The actual player has its own toolbar and larger answer rows; the demo height accommodates the first complete question and its scrolling affordance. |
| Colors and tokens | Page `#fcfbf8`, white learner panels, working surface `#f1f1ed`, ink `#252a27`, secondary text `#626761`, muted sage active controls. PIE orange `#ee4923` stays in the brand and main desktop action. Small links and buttons use a deeper orange for readable contrast. The dark scheme uses deep neutral green, pale ink and softer orange. Diagrams retain white paper and their semantic colors. |
| Image quality and asset fidelity | Existing PIE and sponsor logos and real element captures were retained. The original homepage Excalidraw diagram was recolored, including its embedded editable source. Three missing diagrams use the requested slightly hand-drawn style. The annotation arrow and fraction preview are actual image assets, and new interface icons use Phosphor regular SVG assets with their MIT license. No screenshot replaces the working demo. Mobile diagrams expose a visible full-size link. |
| Copy and content | The established short, neutral copy and audience-led information architecture remain. The site continues to prioritize player integration, then interaction development. QTI remains a related project with independent playback. Existing documentation, element pages and examples remain reachable. Mock-generated distractor text was not substituted for the existing real demo content. |

## Comparison history

1. **Initial comparison — blocked.** Evidence: `editorial-home-candidate.png` beside the selected source, opened together. This preliminary capture was 1003 × 1568 rather than the source's 1006 × 1563, so it was used for broad layout findings only.
   - [P2] The gap after the hero and the demo heading rhythm pushed the architecture section substantially farther down than the target.
   - Fix: tightened hero and section gaps, reduced the demo heading's excess line space, and removed the redundant explanatory row under the homepage demo.
   - An earlier runtime preflight also exposed the theme element's inline `display: contents` defeating the intended stage height. Explicit block display fixes that boundary. This runtime repair is separate from the visual-comparison iteration.
2. **Second comparison — blocked.** Evidence: `editorial-home-round-2.png`, now at the exact source dimensions.
   - [P2] The shortened stage partially clipped the final answer row and placed the scrolling affordance over its text.
   - Fix: restored the homepage stage to 29rem while retaining the compact inspector and section spacing.
   - [P2] Mobile diagram text scaled down without a visible cue to open a larger version.
   - Fix: added a full-size image link, exposed as a 44px action on mobile, while preserving descriptive alternative text and captions.
   - Supporting page review found existing width utilities being overridden and a bright blue QTI banner outside the chosen palette. The container rule now respects page width utilities; the banner uses the neutral surface and ink tokens.
3. **Final comparison — passed.** Evidence: `editorial-home-final.png`, `editorial-comparison-full.png`, `editorial-comparison-details.png` and the mobile captures. Earlier spacing and clipping findings are resolved. No new actionable P0/P1/P2 differences were found.

## Expected differences from the mockup

- The embedded demo is the real published PIE player. Its section tools, answer spacing, pane resizing and scrolling remain functional. The mockup draws a condensed two-question view; the implementation retains the actual components and their interaction sizes.
- The original architecture diagram contains more detail and has a taller aspect ratio than the generated mockup. It was preserved and recolored as requested. Its full-size source is available from the image link.
- The site's additional integration guides, element previews, QTI note and sponsor/footer content continue below the selected mockup's short composition.
- The small heading burst was omitted to keep the flourishes restrained. The instructor annotation, fraction preview and hand-drawn diagrams provide the educational character.

## Responsive and interaction evidence

Additional saved captures in the same artifact directory:

- `editorial-home-mobile.png`: 390 × 1000, homepage, light theme.
- `editorial-guide-mobile.png`: 390 × 1000, Save and resume, including the mobile full-size diagram action.
- `editorial-home-dark.png`: dark palette with a learner response preserved in the independently light demo.
- `editorial-guide-desktop.png`: guide hierarchy, sidebar and lifecycle diagram.
- `editorial-first-interaction.png`: interaction lifecycle diagram and article styling.
- `editorial-home-lower.png`: architecture, fraction link, editorial navigation groups and element previews.
- `editorial-qti-final.png`: final neutral QTI banner and a verified 1024px content container at a 1440px viewport.

Verified behavior:

- Select an answer, switch Student → Instructor → Student, and retain the response.
- Change split-pane → vertical → split-pane without losing the answer.
- Change the homepage Example selector to the working authoring view.
- Toggle the site theme without changing the learner's palette.
- Select White on Black in the learner theme tool. The mount inherits `#1a1a1a`; the default brand overrides no longer apply. Restore Default successfully.
- Open mobile navigation and dismiss it with Escape; focus returns to Menu.
- Check horizontal overflow at 390px and 320px: document width equals viewport width and persistent controls remain visible.
- Open the sessions, first-interaction and QTI pages in the production preview. Diagram files render and supporting content remains readable.
- Production browser console: no errors in the final verification window. Earlier development-only manifest-access errors were resolved by allowing the exact package manifest read by `versions.ts`.

## Validation

- `bun run check`: 0 errors, 0 warnings.
- `bun run build`: passed. Existing generated-CSS `@property` and large editor bundle notices remain.
- `bun run verify:site`: 101 passed, 0 failed; 303 assertions. Covers static page content, canonical URLs, legacy destinations and local media references.
- `git diff --check`: passed.

**Open Questions**

None blocking the selected direction.

**Implementation Checklist**

- [x] Apply the selected typography, palette and homepage composition.
- [x] Carry shared styling through guides, navigation, link groups and footer.
- [x] Replace all three diagram placeholders and retain existing diagram/demo assets.
- [x] Preserve primary demo interactions, theme separation and response continuity.
- [x] Complete desktop, mobile, dark-theme and focused visual comparisons.
- [x] Run static checks, production build and existing site verification.

**Follow-up Polish**

- [P3] The hand-drawn annotation can receive a few pixels of optical adjustment if desired. It already identifies the Instructor control without overlapping other controls.

## About and partner credits follow-up

- About keeps Why PIE as its first content section and now includes section links, dedicated sponsor/partner credits, and separate history/licensing content. The existing `#sponsors` anchor still resolves to the credits.
- Shared partner data supplies About, the homepage row, footer links, and search keywords, in the order Renaissance, Primoko, MCRO, Chillenious LLC. Primoko uses its official site logo; Chillenious uses its approved 08F wordmark with a transparent background.
- Partner credits now contain only linked logos, with individual widths chosen to balance their visible lettering and artwork. Roles and descriptions have been removed. The light theme has no logo cards; dark mode retains light surfaces for the three logos with dark lettering, while Chillenious remains transparent.
- The four-logo row was verified at 1006px and the two-column layout at 390px, with no horizontal overflow. All four logos load. Evidence: `partners-balanced-desktop.png`, `partners-balanced-mobile.png`, `partners-balanced-homepage.png`, and `partners-balanced-dark.png` in the artifact directory above. Footer order and partner search results remain unchanged.
- Desktop and 390px layouts were inspected; no horizontal overflow was found. Searching for Chillenious returns About. The footer company link resolves to `https://chillenious.com/`.
- Evidence: `partners-about-desktop.png`, `partners-about-mobile.png`, and `partners-homepage.png` in the same artifact directory used above.
- Validation: type checks report zero errors/warnings, the production build passes, all 101 site checks pass, and `git diff --check` passes.

## SEO follow-up

- The generated sitemap contains the 90 indexable canonical content URLs. Search is crawlable with `noindex, follow` and is absent from the sitemap; `robots.txt` advertises the sitemap.
- Every current page supplies its existing title and description to the shared SEO component. Search metadata, Open Graph/Twitter tags and sharing images use the same copy. The build generates 91 distinct 1200×630 PNGs, including the search page's card, using the checked-in Inter and Newsreader fonts.
- Home has WebSite and Organization JSON-LD. Content pages have WebPage/AboutPage and breadcrumb data. Search and legacy redirect pages omit structured data. Structured JSON is escaped for safe HTML embedding.
- Legacy pages contain an immediate meta refresh and a parser-executed fragment/query resolver. Browser checks confirmed `/docs/players/?utm_source=seo-check#section-player` reaches the section guide, and `/docs/integration/?ref=seo-check#item-player-with-toolkit` reaches the toolkit's replacement heading with the query intact.
- A separate static preview with `Content-Security-Policy: script-src 'none'` confirmed `/docs/players/` still redirects to `/integrate/`. GitHub Pages serves these HTML redirects rather than custom HTTP 301 responses; the hosting limit and production rollout checks are documented in the existing README.
- Client navigation from a guide to search sets one `noindex, follow` tag and removes structured data. Returning through a search result restores one `index, follow` tag, the guide's social metadata and its structured data.
- The generated sitemap, robots file and sharing PNG return HTTP 200 in the production preview. Sharing assets are included in both the deployable directory and Kit's client staging directory used by Vite preview.
- Validation: the production build passes, type checks report zero errors/warnings, all 106 site checks pass (3,239 assertions), and `git diff --check` passes. Saved evidence: `seo-no-script-redirect.png` and `seo-sharing-preview.png` in the artifact directory above. Live indexing, Search Console submission and field Core Web Vitals remain post-deployment checks.

final result: passed


## Accessibility pass — 22 October 2026

Target: WCAG 2.2 Level AA. This pass fixes and verifies site-owned issues; it
**does not establish full conformance**, because published demo components have
confirmed findings and manual assistive-technology coverage remains incomplete.

### Changes

- Increased contrast for secondary copy, active links, table headings, status
  colors, form boundaries and inactive demo tabs in both themes. Removed button
  noise textures so their contrast can be evaluated against a solid surface.
- Replaced obsolete code-editor theme variables and syntax colors. Read-only
  examples are named, focusable, and show a visible keyboard focus indicator.
- Made the skip link visibly appear on focus and transfer focus to its target.
  On guide pages it bypasses the repeated sidebar too. The sticky header's
  measured height controls scroll padding and sidebar positioning.
- Made overflowing code and table regions keyboard-scrollable. Their focus
  targets update after content changes, details expansion and viewport resizing.
- Added the theme toggle's announced pressed state and unique search-landmark
  names. Mobile navigation scrolls within the viewport, closes when focus leaves,
  and returns focus to Menu on Escape.
- Kept focus during Student/Instructor changes and moved focus into manually
  started examples. Added Home/End to the demo tab keyboard controls.
- Corrected heading levels, static Markdown checklist semantics and an empty
  comparison-table heading. Fixed invalid MathML in the graphing-solution-set
  fixture and retained the correction in the example sync script.
- Let the header wrap under enlarged text and fixed decorative hint overflow.
  Added a public website accessibility status and a footer link to it.

### Evidence

The local audit command is documented in README. It instruments the actual
static build with axe-core 4.14.0, using `wcag2a`, `wcag2aa`, `wcag21a`,
`wcag21aa`, `wcag22aa` and `best-practice`. The audit UI is excluded from scans
and is never included in the deployment artifact. No rule is disabled and no
demo subtree is excluded.

- 91 current pages in both light and dark themes: **182 page/theme scans**.
  No site-owned automated violations remain. The homepage reports the three
  published section-player landmark findings described below.
- All 31 live element examples loaded and were scanned in their initial delivery
  state (rubrics start in instructor view). This is not coverage of every
  role, mode, configuration or authoring view. After correcting the MathML,
  the remaining baseline finding is EBSR's repeated region name, a best-practice
  rule rather than a rule tagged with a WCAG success criterion.
- All nine curated live experiences were scanned. The item-delivery and
  standalone-toolkit baselines are clear. The authoring and section findings
  are listed below. The open learner-theme tool was scanned separately.
- All 91 pages fit a 320px viewport without page-level horizontal scrolling in
  their initial state. Tables and code retain their own scroll regions.
- Text-spacing overrides (1.5 line height, .12em letter spacing, .16em word
  spacing, 2em paragraph spacing) were checked at 320px on home, API reference,
  accessibility, element library and populated search pages. These pages also
  fit with doubled text at 1280px. The harness doubles computed fonts; this is
  a text-resizing check, not evidence from a browser's native zoom control.
- Keyboard checks covered visible skip links and destination focus, bypassing
  guide navigation, arrow-key code scrolling (scrollLeft 0 → 80), read-only
  editor focus, mobile Menu/Enter/Escape and focus exit, player tab arrows,
  demo Home/End, answering a question, and Student/Instructor focus and response
  continuity. Escape from within the floating theme tool returned focus to its
  trigger. Evidence was collected in the in-app Chromium browser.
- Manual shell contrast review covered the SVG select chevrons, transparent
  instructor-arrow bounds and static checklist symbols that axe cannot resolve.
  Light muted copy is at least 5.11:1 on the checked surfaces; the active-link
  color is 4.88:1 on the muted surface; control borders are at least 3.49:1.
  The bright hero orange retains 3.74:1 with its large, bold label. Small orange
  labels use the deeper AA text color.
- Production build and type checks pass. The existing 106 static-site tests pass
  (3,239 assertions). Automated SEO checks remain intact.

Raw reports and screenshots are in:
`/Users/eelco/.codex/visualizations/2026/10/22/01a1641b-0026-7d72-bca2-4939b7c858f7/pie-website-refresh/`.
Reports include `a11y-light-pages.json`, `a11y-dark-pages.json`,
`a11y-live-elements.json`, `a11y-live-experiences.json`,
`a11y-320px-reflow.json` and `a11y-text-resizing-spacing.json`.

### Remaining findings and evidence gaps

| Surface | Finding | Ownership / next verification |
| --- | --- | --- |
| Multiple-choice authoring | The pinned bundle has eight unnamed rich-text textboxes and three unlabelled correct-answer radios (`aria-input-field-name`, `label`). | Fixed in `pie-elements-ng` authoring callers and shared config controls; patch changesets added. Release and verify the site's pinned bundle. |
| Learner theme selector | The pinned bundle's trigger omits part of its visible text from its accessible name (`label-content-name-mismatch`, WCAG 2.5.3). | Fixed in `pie-players` theme-tool source for the trigger, options and decorative preview; patch changeset added. Release and verify the site's pinned bundle. |
| Split-pane section demos | Nested/duplicate `main` landmarks and repeated multiple-choice region names. | Published player/element markup. Axe classifies these as best-practice findings. |
| EBSR delivery | Two part regions share a name (`landmark-unique`). | Published element markup; best-practice finding. |
| Floating theme-tool title | Content outside a landmark (`region`). | Published tool-shell markup; best-practice finding. |
| Graphical interactions, rich editing, math, feedback and media | Complete non-pointer workflows and assistive-technology announcements have not been established by these scans. Some graphical contrast checks remain manual. | Test complete tasks and configurations with VoiceOver, NVDA and JAWS; use the player and element tracking documents linked from the site's status page. |

Reduced-motion and forced-colors support were reviewed in source; native OS
high-contrast mode, browser zoom, other browser engines and real touch devices
were not exercised in this pass. The existing player-suite pin remains unchanged;
no upstream packages were published. The site makes no certification claim.

### Upstream source follow-up — 22 October 2026

The current local element and player builds were checked separately from the
website's pinned packages. Multiple-choice authoring passed scoped axe-core
4.14.0 name/label checks in both checkbox and radio modes. The open theme menu
passed the label-in-name check. Keyboard checks confirmed correct-answer
selection, theme selection, the updated current-theme name, and Escape focus
restoration. The checks cover the reported naming defects, not full component
conformance or screen-reader workflows.

The raw reports in the artifact directory above are
`upstream-authoring-checkbox-axe.json`, `upstream-authoring-radio-axe.json`, and
`upstream-theme-menu-axe.json`. The website's dependency pins remain unchanged.

The authoring follow-up also names 80 additional rich-text editor sites across
22 more React elements, including styled wrappers and the inline-dropdown
template's forwarded props. A source inventory accounts for all 83 authoring
editor sites: 82 explicitly named and one named by its caller. Rendered-editor
regressions cover passage labels, formatted rationale labels, response templates,
match rows/columns and correct-answer controls, and repeated rubric scales.
Shared settings dropdowns now reference their visible labels.

The element dependency-integrity check and player resolution-boundary check now
reject installed `workspace:` dependencies that resolve outside their declared
workspace directories. Filesystem fixtures cover direct and hoisted links,
forwarding directories, links into another checkout, missing or broken links,
and packages without build output. The 19 video-stimulus failures traced to stale
local forwarding modules; restoring normal workspace links fixed them without a
video component change. These installation checks help prevent a recurrence.

Draft source PRs: [element authoring names and workspace checks](https://github.com/pie-framework/pie-elements-ng/pull/539)
and [player theme names and workspace checks](https://github.com/pie-framework/pie-players/pull/852).
These source changes still require release, website dependency updates and
verification of the published demos. They do not close the manual evidence gaps.

final result: site-owned fixes verified; full WCAG 2.2 AA conformance remains open

---

# Proposal 4 typography and palette

Date: October 24, 2026

Scope: apply proposal 4's typography and colors to the existing website. Keep the current layout, copy, diagrams, logos and interactions. The proposal's split hero and different section arrangement are outside this change.

## Evidence

- Source visual: `/var/folders/fx/9l2pldb54hgcl6qr5wcny4c80000gn/T/codex-clipboard-3fe218b2-51fc-4670-abaa-d9494791b12b.png`
- Proposal metadata: `Technical Clarity`, proposal 4; white, navy `#172b3a`, cool gray `#f5f7f8`, PIE orange `#ee4923`; humanist technical sans.
- Implementation: `http://127.0.0.1:5176/`, light theme, default reading example, Student view, no answers selected.
- Artifact directory: `/Users/eelco/.codex/visualizations/2026/10/22/01a1641b-0026-7d72-bca2-4939b7c858f7/pie-website-refresh/proposal-four/`.
- Full comparison: `comparison.png`, source on the left and implementation on the right.
- Focused comparison: `typography-comparison.png`, header and hero typography, source on the left.
- Source pixels: 1003 × 1568. Browser viewport requested at 1003 × 1568; native content capture was 1003 × 1546. Compared at 1:1 pixel scale, with 22 blank pixels below the implementation; no stretching or density rescaling.
- Additional captures: `home-dark.png`, `home-mobile.png`, `guide-mobile.png`, `guide-desktop.png`, `preview.png`.
- Responsive evidence: 1280px, 1003px, 998px and 320px widths; no document horizontal overflow observed on the checked homepage and guide states. Temporary viewport overrides were reset.

## Findings

No actionable P0/P1/P2 findings within the requested scope.

- **Fonts and typography:** Inter replaces Newsreader on page, section, guide and homepage headings. The hero uses weight 800; other display headings use 700. Inter was confirmed loaded in the browser. The two-line desktop headline and three-line narrow headline fit their existing containers. Body text remains Inter. Caveat and the supplied hand-drawn diagrams retain their existing handwritten character. The reference is a generated mockup, without an exact font specification; Inter is the matching sans-serif implementation.
- **Spacing and layout rhythm:** existing grids, section order, control spacing and responsive navigation remain in place. Heading size, tracking and line height were adjusted for the wider sans-serif letterforms. Differences from the reference's split hero are intentional under the user's typography-and-colors scope.
- **Colors and tokens:** white surfaces, navy text, cool gray panels and slate controls replace cream, green-gray and sage UI colors. The dark theme uses navy surfaces. PIE brand orange remains `#ee4923`; small links and white-label buttons use `#c43b1b` for contrast. Measured token ratios: primary/white 5.27:1, muted/cool panel 5.21:1, navy/white 14.55:1, control border/white 3.50:1, dark muted/panel 7.05:1. Brand orange/white is 3.74:1 and remains limited to the large bold desktop hero action. Selected learner accessibility schemes retain their own colors.
- **Images and assets:** existing hand-drawn diagrams, partner logos, element previews and icons are preserved. Their illustration palettes are not recolored. Sharing images now use the same white/navy palette and bold sans-serif headings; the generated homepage card was visually inspected at 1200 × 630.
- **Copy and content:** unchanged. Current integration and documentation content from develop is retained.

## Verification

- `bun run check`: zero errors and zero warnings.
- `bun run build`: passed; 91 sharing images generated.
- `bun run verify:site`: 106 passed, zero failed, 3,239 assertions.
- Browser: homepage demo loaded; Instructor enabled answer-review controls and disabled learner inputs; returning to Student restored learner input. Site light/dark switch changed the surrounding palette. Mobile menu opened and a guide link navigated correctly. No warning/error console entries were captured on the checked pages.
- This is a focused style check, not a new full accessibility conformance audit.

## Comparison history

First visual comparison: full and focused source/implementation composites inspected. No P0/P1/P2 fixes were required after that comparison. Narrow-screen, dark-theme, guide and interaction checks then confirmed the same result.

## Implementation checklist

- [x] Apply fonts and palette through shared tokens.
- [x] Update the default embedded-demo palette without replacing learner schemes.
- [x] Update social previews.
- [x] Check reference-sized, narrow and dark views and primary interactions.
- [x] Run existing checks and reset temporary browser viewport overrides.

## Follow-up polish

None required for this scoped change. Local verification is complete; production verification belongs to the deployment PR and workflow.

final result: passed
