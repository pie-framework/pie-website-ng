# PIE Framework vs. Khan Academy Perseus: Comprehensive Analysis

**Date**: 2026-01-25
**Author**: Comparative Technical Analysis
**Version**: 1.0

---

## Executive Summary

Both **PIE** (Portable Interactive Elements) and **Perseus** (Khan Academy's exercise system) are mature, production-proven frameworks for rendering interactive assessment questions. However, they differ fundamentally in **philosophy, architecture, openness, and interoperability goals**.

**Key Distinction**: PIE is an **open framework for rich interactive assessments** designed for broad ecosystem adoption, with QTI interoperability as a complementary feature. Perseus is **open source (MIT license)** but operates with a **read-only contribution model** - the code is publicly available for use and forking, but Khan Academy doesn't accept external contributions (PRs or issues). Perseus is optimized specifically for Khan Academy's internal use case.

---

## Table of Contents

1. [Technology Architecture Comparison](#1-technology-architecture-comparison)
2. [Question Types / Widgets Comparison](#2-question-types--widgets-comparison)
3. [Content Format & Data Model](#3-content-format--data-model)
4. [Authoring Experience](#4-authoring-experience)
5. [Rendering & Player Capabilities](#5-rendering--player-capabilities)
6. [Interoperability & Standards](#6-interoperability--standards)
7. [Production Readiness & Scale](#7-production-readiness--scale)
8. [Pros and Cons Summary](#8-pros-and-cons-summary)
9. [Opportunities for Interoperability & Compatibility](#9-opportunities-for-interoperability--compatibility)
10. [Strategic Recommendations](#10-strategic-recommendations)
11. [Conclusion](#conclusion)

---

## 1. Technology Architecture Comparison

### Core Technology Stack

| Aspect | PIE Framework | Perseus |
|--------|---------------|---------|
| **Primary Language** | TypeScript/JavaScript | TypeScript (94.8%) |
| **Runtime** | Bun (modern) + Node.js | Node.js v20 |
| **Package Manager** | Bun/npm | pnpm (monorepo) |
| **Build Tools** | Vite + Turbo | Vite + SWC |
| **UI Framework** | React + Svelte 5 (dual support) | React + Wonder Blocks |
| **Component Model** | **Web Components (Custom Elements)** | React components |
| **Bundle Format** | **IIFE, ESM, Fixed (pre-bundled)** | Monolithic bundles |
| **Styling** | CSS-in-JS, Tailwind, DaisyUI | Aphrodite (CSS-in-JS) |
| **Testing** | Jest + Cypress | Jest + Cypress |

**Critical Difference**: PIE uses **Web Components** as its fundamental architecture, making it **framework-agnostic**. Perseus is tightly coupled to **React** and Khan Academy's Wonder Blocks UI library.

---

### Player Architecture

#### PIE Players (3 Types)

PIE offers **multiple player implementations** for different use cases:

1. **IIFE Player** (`<pie-iife-player>`)
   - Dynamic loading from PIE build service
   - Legacy IIFE bundles
   - Backwards compatible with existing deployments
   - CDN support with bundle hashing

2. **ESM Player** (`<pie-esm-player>`)
   - Modern ESM packages from npm/CDN
   - ~85% smaller bundle size vs IIFE
   - Import maps for dependency resolution
   - Modern browsers only (Chrome 89+, Firefox 108+, Safari 16.4+)

3. **Fixed Player** (`<pie-fixed-player>`)
   - Pre-bundled elements at build time
   - Zero runtime bundle loading
   - Optimized for performance-critical deployments
   - Hash-based versioning for deterministic builds

**Architecture Flow**:
```
PIE Item Config → Player (IIFE/ESM/Fixed) → Dynamic Element Loading →
Controller (Model/Outcome) → Render Web Component → User Interaction
```

#### Perseus Renderer

Perseus uses a **single monolithic renderer** approach:

```
Perseus Item JSON → Perseus Renderer Component (React) →
Widget Registry → Render Widget Components → User Interaction
```

- All widgets bundled together in `@khanacademy/perseus` package
- No dynamic loading (everything compiled into bundle)
- React-based rendering throughout
- Tight coupling to Wonder Blocks UI components

**Key Differences**: PIE offers multiple player types (IIFE/ESM/Fixed) for different deployment scenarios, uses Web Components for framework independence, and has native ESM support. Perseus uses a single React-based renderer tightly integrated with Wonder Blocks. The choice depends on whether you need framework flexibility and multiple deployment options (PIE) or a mature React-based solution (Perseus).

---

## 2. Question Types / Widgets Comparison

### Perseus Widgets (36 total)

**Basic Widgets (4)**:
- Radio (multiple choice)
- InputNumber
- NumericInput
- Expression (math expressions)

**Extra Widgets (32)**:
- Categorizer, CSProgram, Definition, Dropdown
- Explanation, FreeResponse, GradedGroup, GradedGroupSet
- Grapher, Group, Iframe, Image
- Interactive, InteractiveGraph, LabelImage
- Matcher, Matrix, Measurer, Molecule
- NumberLine, Orderer, PhetSimulation, Plotter
- PythonProgram, Sorter, Table, Video
- DeprecatedStandin (legacy support)

**Special Features**:
- Computer science widgets (CSProgram, PythonProgram)
- PhET simulation embedding
- Interactive graphing with Mafs library
- Molecule visualization

### PIE Elements (28+ elements)

**React Elements**:
- boilerplate-item-type, categorize, charting
- complex-rubric, drag-in-the-blank, drawing-response
- ebsr, explicit-constructed-response, extended-text-entry
- fraction-model, graphing, graphing-solution-set
- hotspot, image-cloze-association, inline-dropdown
- likert, match, match-list
- math-inline, math-templated, matrix
- multi-trait-rubric, multiple-choice, number-line
- passage, placement-ordering, rubric, select-text

**Svelte Elements** (additional option):
- Svelte 5 implementations available alongside React elements
- Provides choice of UI framework for element development

**Special Features**:
- Evidence-Based Selected Response (EBSR)
- Multi-trait rubrics for complex assessment
- Charting interactions
- TEI (Technology Enhanced Items) alignment

### Comparison Analysis

| Category | PIE | Perseus |
|----------|-----|---------|
| **Total Question Types** | 28+ | 36 |
| **Math Support** | Strong (math-inline, math-templated, graphing) | Strong (Expression, NumericInput, InteractiveGraph) |
| **Visual/Drawing** | Strong (drawing-response, hotspot, image-cloze) | Strong (InteractiveGraph, LabelImage, Grapher) |
| **Programming** | Limited | Strong (CSProgram, PythonProgram) |
| **Science** | Limited | Strong (Molecule, PhetSimulation) |
| **Rubrics** | Strong (multi-trait-rubric, complex-rubric) | Basic (GradedGroup) |
| **Text Entry** | Strong (extended-text-entry, explicit-constructed-response) | Basic (FreeResponse) |

**Key Differences**: Perseus provides more STEM-focused widgets (programming, chemistry, physics simulations). PIE provides more assessment-focused widgets (rubrics, EBSR, charting) with TEI alignment. The choice depends on your content needs - STEM education favors Perseus, while comprehensive assessment with standards alignment favors PIE.

---

## 3. Content Format & Data Model

### PIE Content Model

**Structure** (JSON):
```typescript
{
  id: string,
  element: string,  // e.g., "@pie-element/multiple-choice"
  // Element-specific model properties
}

// Environment
{
  mode: 'gather' | 'view' | 'evaluate',
  role: 'student' | 'instructor'
}

// Session (responses)
{
  id: string,
  // Element-specific session data
}
```

**Controller Pattern** (Server-side):
```typescript
interface PieController {
  model(question, session, env) → ViewModel
  outcome(model, session, env) → OutcomeResult
  createDefaultModel() → PieModel
  validate(model, config) → ValidationErrors
  createCorrectResponseSession() → PieSession
}
```

**Key Principles**:
- **Separation of concerns**: Model (author config) vs Session (student responses) vs Environment (delivery context)
- **Server-side controllers**: Scoring logic runs on server, not client
- **Role-based filtering**: Data filtered by role (student/instructor)
- **Stateless evaluation**: Outcome calculation independent of UI state

### Perseus Content Model

**Structure** (JSON):
```typescript
{
  widgets: {
    [widgetId]: {
      type: string,
      options: WidgetOptions,
      // Widget-specific configuration
    }
  },
  answerArea?: PerseusAnswerArea,
  hints: Hint[],
  // Renderer configuration
}
```

**Scoring Pattern** (Client or Server):
- Widgets implement scoring methods
- `@khanacademy/perseus-score` package for server-side scoring
- Separate validation logic per widget type
- Grading happens via widget's score() method

**Key Principles**:
- **Monolithic structure**: All widget configs in single object
- **Client/server flexibility**: Can score client or server side
- **Widget-centric**: Everything organized around widget instances
- **Integrated hints**: Built into content model

### Comparison

| Aspect | PIE | Perseus |
|--------|-----|---------|
| **Model Structure** | Modular (element + session + env) | Monolithic (all-in-one) |
| **Scoring Location** | **Server-required** | Client or server |
| **State Management** | Explicit session objects | Widget state methods |
| **Security** | **Built-in (server-side scoring)** | Depends on implementation |
| **Extensibility** | High (controller pattern) | Medium (widget interface) |
| **Type Safety** | Strong TypeScript interfaces | Strong TypeScript types |

**Key Differences**: PIE enforces server-side scoring with clear separation between model, session, and environment, making it more suitable for high-stakes assessment scenarios. Perseus allows both client and server-side scoring with more flexible implementation options. The choice depends on security requirements and deployment constraints.

---

## 4. Authoring Experience

### PIE Authoring

**Unified Authoring Mode**:
- **New architecture**: Single package for delivery + authoring
- Each element provides authoring UI (Web Component)
- WYSIWYG configuration interfaces
- Real-time preview in authoring mode
- Mode switching: `mode="author"`

**Authoring Flow**:
```html
<pie-iife-player
  mode="author"
  config={itemConfig}
  configuration={configOptions}
  onmodel-updated={(e) => handleModelUpdate(e.detail)}
/>
```

**Features**:
- Visual editors for each question type
- No code required for educators
- Rich text editing with TipTap
- Math equation editors (for math elements)
- Drag-and-drop configuration
- Configuration validation

**Deployment**:
- Embeds anywhere (Web Components)
- Framework-agnostic
- CDN hosting available

### Perseus Authoring

**Storybook Development**:
- Widgets developed in Storybook
- Component-driven development
- Visual testing and documentation
- Developer-focused (not educator-focused)

**Perseus Editor** (`@khanacademy/perseus-editor`):
- Separate editor package
- React-based authoring interface
- Integrated with Khan Academy CMS
- Widget configuration panels
- Preview + JSON editing modes

**Deployment**:
- Tightly coupled to React ecosystem
- Requires Khan Academy infrastructure (implied)
- Not designed for external adoption

### Comparison

| Aspect | PIE | Perseus |
|--------|-----|---------|
| **Authoring UI** | **Built-in WYSIWYG per element** | Storybook + separate editor |
| **Educator-Friendly** | **Yes (visual interfaces)** | Mixed (developer-focused) |
| **Integration** | Embeds anywhere (Web Components) | Requires React integration |
| **Unified Package** | **Yes (delivery + authoring)** | No (separate packages) |
| **External Adoption** | **Designed for it** | Not intended |
| **Documentation** | Comprehensive (public docs) | Internal (some public) |

**Key Differences**: PIE provides unified authoring/delivery in a single package with educator-focused WYSIWYG interfaces that embed via Web Components. Perseus uses separate packages for editing with Storybook-based development primarily focused on developers. The choice depends on whether you need educator-friendly authoring (PIE) or developer-focused tooling (Perseus).

---

## 5. Rendering & Player Capabilities

### PIE Players

**Multiple Player Options**:
- **IIFE Player**: Legacy compatible, dynamic loading
- **ESM Player**: Modern, ~85% smaller bundles
- **Fixed Player**: Pre-bundled, zero runtime loading

**Assessment Toolkit** (separate from players):
- **ToolCoordinator**: Manages calculator, ruler, protractor, etc.
- **HighlightCoordinator**: CSS Custom Highlight API for TTS/annotations
- **TTSService**: Text-to-speech with word highlighting
- **ThemeProvider**: Accessibility themes (high contrast, font scaling)
- **ToolConfigResolver**: IEP/504 accommodation resolution (3-tier hierarchy)

**Key Features**:
- WCAG 2.2 AA compliance
- Modern web standards (CSS Custom Highlight API, Web Speech API)
- Zero DOM mutation (framework-friendly)
- Composable services (use only what you need)
- **Reference implementation**: Not a framework, a toolkit

**Browser Support**:
- Modern evergreen browsers
- ~85% global market (2025)
- Graceful degradation for advanced features

### Perseus Renderer

**Single Renderer Package**:
- `@khanacademy/perseus` core renderer
- React-based rendering
- All widgets bundled together
- Tight Wonder Blocks integration

**Features**:
- Focus management via widget refs
- Serialized state management
- Path-based navigation (FocusPath)
- Device-specific rendering (phone/tablet/desktop)
- Integrated linting (`@khanacademy/perseus-linter`)

**Accessibility**:
- React-based a11y patterns
- Focus management
- Khan Academy specific implementations

**Browser Support**:
- Modern browsers (via React)
- No specific browser requirements documented

### Comparison

| Aspect | PIE | Perseus |
|--------|-----|---------|
| **Player Flexibility** | **3 player types (IIFE/ESM/Fixed)** | Single renderer |
| **Bundle Size** | **Small (ESM: 85% reduction)** | Large (monolithic) |
| **Accessibility** | **WCAG 2.2 AA, toolkit-based** | React patterns, integrated |
| **Web Standards** | **Modern (Custom Highlight API, Web Speech)** | Standard React patterns |
| **Framework Independence** | **Yes (Web Components)** | No (React-only) |
| **Accommodations** | **Full toolkit (IEP/504 support)** | Not documented |
| **Performance** | **Optimized (Fixed player)** | Standard React performance |

**Key Differences**: PIE provides multiple player types, modern web standards (CSS Custom Highlight API, Web Speech API), framework independence via Web Components, and a comprehensive accessibility toolkit. Perseus provides a single React-based renderer with standard React accessibility patterns. The choice depends on whether you need modern web standards and accessibility tooling (PIE) or established React patterns (Perseus).

---

## 6. Interoperability & Standards

### PIE Interoperability

**QTI Integration** (major focus):
- **QTI 2.x and 3.x support** actively developed
- **PIE-QTI tooling**: Bidirectional import/export
- **QTI Assessment Model compatibility**: High degree of alignment
- PIE can be **exchanged directly** OR **via QTI**
- Dedicated project: [https://qti.pie-framework.org](https://qti.pie-framework.org)

**Philosophy**:
> "QTI (Question and Test Interoperability) is the industry standard for exchanging assessment content between systems. PIE complements QTI by providing rich interactive experiences and predictable rendering beyond QTI's specification."

**Standards Alignment**:
- **Web Components** (W3C standard)
- **TEI coverage** (Technology Enhanced Items)
- **Accessibility**: WCAG 2.2 AA
- **Open formats**: JSON-based, well-documented schemas

**Ecosystem**:
- NPM packages (`@pie-framework/*`)
- CDN distribution (jsDelivr, esm.sh)
- Open source (ISC/MIT licenses)
- External contributions welcome

### Perseus Interoperability

**Read-Only Open Source Model**:
- **Open source** (MIT License) - you can fork, modify, use freely
- "Perseus format" (Khan Academy specific, not a formal standard)
- No external integrations documented
- No QTI support mentioned
- **Not accepting external contributions** (no PRs or issues)
- Code released "for others to refer to and learn from"

**Standards**:
- React (JavaScript ecosystem standard)
- TypeScript
- NPM packages (`@khanacademy/*`)
- MIT License (fully permissive - can fork and modify)

**Philosophy**:
> "The Perseus project is not accepting external contributions. We're releasing the code for others to refer to and learn from, but we are not open to pull requests or issues at this time."

**Ecosystem**:
- Khan Academy specific
- Internal tooling
- No documented external integrations

### Comparison

| Aspect | PIE | Perseus |
|--------|-----|---------|
| **QTI Support** | **Yes (active development)** | None |
| **Standards Compliance** | **High (QTI, TEI, WCAG, Web Standards)** | Basic (Web/React standards) |
| **External Integration** | **Designed for it** | Not intended |
| **Contributions** | **Welcome (open)** | **Not accepted (read-only)** |
| **Documentation** | **Comprehensive public docs** | Basic README, internal docs |
| **Interoperability Goals** | **Ecosystem building** | Khan Academy use only |
| **License** | ISC/MIT (permissive) | MIT (permissive - fork freely) |
| **Philosophy** | Open collaborative ecosystem | Open source, internal development |
| **Fork-ability** | Encouraged | Allowed (MIT) but unsupported |

**Key Differences**: PIE is designed for ecosystem collaboration with active QTI interoperability development, external contributions welcome, and multi-organization support. Perseus is open source (MIT) but operates with a read-only contribution model, designed specifically for Khan Academy's internal use with no external collaboration. The choice depends on whether you need standards-based interoperability and community collaboration (PIE) or want to study/fork a proven internal implementation (Perseus).

---

## 7. Production Readiness & Scale

### PIE Production Use

**Battle-Tested**:
- **Renaissance**: Millions of learners in production
- **Enterprise scale**: Production-proven at scale
- Real-world usage in K-12 education systems

**Maturity**:
- Active development (modern architecture: pie-elements-ng, pie-players)
- Modern stack: ESM, Vite, dual React/Svelte 5 support
- Long-term investment from sponsors
- Continuous improvement

**Support**:
- Renaissance (primary sponsor and production user)
- MCRO (contracted development partner for Renaissance since 2017)
- Open community contributions
- Public GitHub issues/discussions

### Perseus Production Use

**Battle-Tested**:
- **Khan Academy**: Millions of learners globally
- Production-proven at Khan Academy scale
- Years of refinement in production
- Extensive real-world usage

**Maturity**:
- Stable, mature codebase
- Active internal development
- Khan Academy engineering team support
- Continuous internal improvement

**Support**:
- Khan Academy internal team
- No external support (not accepting contributions)
- Public GitHub for reference only

### Comparison

| Aspect | PIE | Perseus |
|--------|-----|---------|
| **Production Scale** | Millions of learners (Renaissance) | Millions of learners (Khan Academy) |
| **Organizations Using** | **Renaissance (primary)** | **Khan Academy only** |
| **External Support** | Renaissance + community | Khan Academy internal only |
| **Public Issues** | Yes (GitHub) | No (reference only) |
| **Long-term Viability** | **High (open ecosystem)** | Medium (Khan-dependent) |
| **Community** | **Active and growing** | Read-only reference |

**Key Differences**: Both are production-proven at scale serving millions of learners with single-organization primary usage. PIE is used by Renaissance with open community contributions welcomed. Perseus is used by Khan Academy with read-only external access. The choice depends on whether you need an open ecosystem with community contributions (PIE) or want to study/fork a proven closed-development implementation (Perseus).

---

## 8. Pros and Cons Summary

### PIE Framework

#### Pros
1. **Open Ecosystem**: Designed for external adoption, QTI interoperability
2. **Web Components**: Framework-agnostic, future-proof architecture
3. **Multiple Players**: IIFE/ESM/Fixed for different deployment scenarios
4. **Modern Stack**: Bun, Vite, React + Svelte 5, TypeScript
5. **Server-Side Scoring**: Built-in security for high-stakes assessment
6. **Accessibility Toolkit**: Comprehensive WCAG 2.2 AA support with IEP/504 accommodations
7. **Unified Authoring**: Single package for delivery + authoring modes
8. **QTI Integration**: Active development of bidirectional QTI tooling
9. **Permissive License**: ISC/MIT, zero costs
10. **Production Proven**: Renaissance scale (millions of learners)
11. **Active Community**: Open contributions, responsive maintainers

#### Cons
1. **Smaller Widget Library**: 28+ elements vs Perseus's 36
2. **Less STEM Focus**: Limited programming/science widgets compared to Perseus
3. **Documentation Gaps**: Some areas still being documented (migration in progress)
4. **Learning Curve**: Controller pattern, Web Components require understanding
5. **Smaller Community**: Less established than Khan Academy ecosystem
6. **Multi-Framework Support**: Supporting both React and Svelte adds some complexity but provides flexibility

---

### Perseus

#### Pros
1. **Larger Widget Library**: 36 widgets covering diverse use cases
2. **Strong STEM Support**: Excellent programming (Python, CS), chemistry, physics widgets
3. **Khan Academy Polish**: Years of refinement, proven UX patterns
4. **React Ecosystem**: Leverages mature React tooling and patterns
5. **Wonder Blocks Integration**: Cohesive UI library integration
6. **Monolithic Simplicity**: Everything bundled together (easier initial setup)
7. **Mature Codebase**: Stable, battle-tested production system
8. **TypeScript Throughout**: Strong type safety

#### Cons
1. **Closed to Contributions**: Not accepting external PRs or issues (though MIT licensed - you can fork)
2. **No QTI Support**: Khan-specific format only (not a formal standard)
3. **React Lock-In**: Cannot use with other frameworks
4. **Khan-Specific**: Designed for Khan Academy, not general adoption
5. **No Interoperability Goals**: Not designed to work with other systems
6. **Monolithic Bundle**: Large bundle size, no dynamic loading options
7. **Limited Documentation**: Basic README, mostly internal docs
8. **No External Support**: Reference-only, no community
9. **Single Rendering Approach**: No player flexibility
10. **Client-Side Scoring Risk**: Can score on client (security concern for high-stakes)
11. **No Accessibility Toolkit**: Standard React a11y, no comprehensive accommodation system

---

## 9. Opportunities for Interoperability & Compatibility

### Viable Integration Paths

#### 1. **Content Migration Layer** (Most Feasible)

**Concept**: Build translation layer between Perseus format and PIE format

**Approach**:
```
Perseus JSON → Translator Service → PIE JSON
```

**Implementation**:
- Map Perseus widget types to PIE elements
- Transform Perseus options to PIE model properties
- Handle widget-specific edge cases
- Preserve content fidelity where possible

**Challenges**:
- **Widget gaps**: Some Perseus widgets (CSProgram, PhetSimulation, Molecule) have no PIE equivalents
- **Hint systems**: Different hint implementations
- **Graded groups**: Perseus has GradedGroup/GradedGroupSet not directly matching PIE patterns
- **Interactive graphs**: Different graphing implementations (Mafs vs PIE graphing)

**Value**: Enable migration of Khan Academy content to PIE-compatible systems

**Implementation Roadmap**:

1. **Phase 1: Common Widgets** (High Success Rate)
   - Radio → multiple-choice
   - InputNumber/NumericInput → math-inline
   - Dropdown → inline-dropdown
   - Image → image element
   - Video → video element
   - Matcher → match
   - Sorter → placement-ordering
   - Table → matrix

2. **Phase 2: Complex Widgets** (Medium Success Rate)
   - InteractiveGraph → graphing
   - NumberLine → number-line
   - LabelImage → hotspot
   - Expression → math-inline (with limitations)
   - FreeResponse → extended-text-entry
   - Categorizer → categorize

3. **Phase 3: Specialized Widgets** (Low/No Coverage)
   - CSProgram → **No PIE equivalent** (implement new PIE element)
   - PythonProgram → **No PIE equivalent** (implement new PIE element)
   - Molecule → **No PIE equivalent** (implement new PIE element)
   - PhetSimulation → **No PIE equivalent** (iframe wrapper possible)
   - GradedGroup/GradedGroupSet → **Architectural difference**

---

#### 2. **QTI as Bridge Format** (Strategic)

**Concept**: Use QTI as common interchange format

**Approach**:
```
Perseus → QTI 3.0 → PIE
PIE → QTI 3.0 → Perseus
```

**Implementation**:
- Develop Perseus-to-QTI exporter (doesn't exist)
- Leverage PIE's existing QTI tooling
- QTI becomes neutral interchange format

**Challenges**:
- **Perseus has no QTI support** (major blocker)
- QTI may not support all Perseus-specific widgets
- Lossy conversion likely for advanced widgets
- Khan Academy may not prioritize this

**Value**: Standards-based interoperability, industry-wide compatibility

**Action Items**:
1. Advocate to Khan Academy for QTI export capability
2. Document QTI mappings for both systems
3. Build Perseus widget → QTI translator (community project)
4. Leverage PIE's QTI tooling for import

---

#### 3. **Web Component Wrapper** (Technical Experiment)

**Concept**: Wrap Perseus React components as Web Components

**Approach**:
```typescript
class PerseusWidget extends HTMLElement {
  connectedCallback() {
    // Mount Perseus React widget
    ReactDOM.render(<PerseusWidgetComponent />, this);
  }
}
```

**Implementation**:
- Wrap Perseus widgets in Web Component shells
- Bridge React lifecycle to Web Component lifecycle
- Expose common PIE-compatible interfaces

**Challenges**:
- **Heavy approach**: Bundling React + Perseus per widget
- **State management complexity**: React state vs Web Component state
- **Performance overhead**: Double rendering layer
- **Maintenance burden**: Keeping wrapper updated with Perseus changes
- **Not officially supported**: Perseus not designed for this

**Value**: Technical feasibility demonstration, hybrid deployments

**Verdict**: **Not Recommended** - Too complex, limited ROI, maintenance burden too high

---

#### 4. **Shared Scoring Logic** (Limited Utility)

**Concept**: Extract and share scoring algorithms

**Approach**:
- Identify common scoring patterns (multiple choice, numeric input)
- Extract scoring logic to shared utility library
- Implement in both ecosystems

**Challenges**:
- Perseus scoring in `@khanacademy/perseus-score`
- PIE controllers server-side
- Different scoring philosophies (client vs server)
- Limited ROI (scoring is small part of system)

**Value**: Algorithm consistency, educational research

**Use Cases**:
- Research: Compare scoring algorithms
- Validation: Ensure consistent grading across systems
- Migration: Verify converted content scores identically

---

#### 5. **Widget Functional Parity** (Long-term)

**Concept**: Implement equivalent widgets in both systems

**Approach**:
- Identify high-value Perseus widgets missing in PIE
- Implement PIE equivalents (CSProgram, PhetSimulation, Molecule)
- Document functional mappings

**Implementation Priority**:

1. **CSProgram / PythonProgram**: Code execution widgets
   - **Effort**: High (requires code execution sandbox)
   - **Value**: High (programming education)
   - **Approach**: Use web-based code execution (Pyodide, web workers)

2. **PhetSimulation**: Embedded PhET simulations
   - **Effort**: Medium (iframe wrapper + API integration)
   - **Value**: High (physics/science education)
   - **Approach**: iframe element with PhET API bindings

3. **Molecule**: Chemistry molecule visualization
   - **Effort**: Medium (3D visualization library integration)
   - **Value**: Medium (chemistry education)
   - **Approach**: ChemDoodle or similar library wrapper

4. **Advanced Interactive Graphs**: Mafs-style graphing
   - **Effort**: Medium (PIE has graphing, enhance to match Mafs)
   - **Value**: Medium (better math visualization)
   - **Approach**: Enhance existing PIE graphing element

**Challenges**:
- Significant development effort
- Different UI libraries (Wonder Blocks vs PIE components)
- Ongoing maintenance
- Licensing considerations (PhET, libraries, etc.)

**Value**: Feature parity enables migration, reduces vendor lock-in

---

### Widget Mapping Matrix

| Perseus Widget | PIE Equivalent | Mapping Quality | Notes |
|----------------|----------------|-----------------|-------|
| Radio | multiple-choice | ✅ Excellent | Direct mapping |
| InputNumber | math-inline | ✅ Excellent | Direct mapping |
| NumericInput | math-inline | ✅ Excellent | Direct mapping |
| Expression | math-inline | ⚠️ Good | May lose some complexity |
| Dropdown | inline-dropdown | ✅ Excellent | Direct mapping |
| Categorizer | categorize | ✅ Excellent | Direct mapping |
| FreeResponse | extended-text-entry | ✅ Excellent | Direct mapping |
| Matcher | match | ✅ Excellent | Direct mapping |
| Sorter | placement-ordering | ✅ Excellent | Direct mapping |
| InteractiveGraph | graphing | ⚠️ Good | Different implementations |
| NumberLine | number-line | ✅ Excellent | Direct mapping |
| LabelImage | hotspot | ⚠️ Good | Similar functionality |
| Matrix | matrix | ✅ Excellent | Direct mapping |
| Table | matrix | ⚠️ Good | Can adapt |
| Image | image | ✅ Excellent | Direct mapping |
| Video | video/passage | ✅ Excellent | Direct mapping |
| Orderer | placement-ordering | ✅ Excellent | Direct mapping |
| Group | N/A | ⚠️ Layout | Architectural difference |
| GradedGroup | N/A | ❌ None | Architectural difference |
| GradedGroupSet | N/A | ❌ None | Architectural difference |
| CSProgram | **Missing** | ❌ None | **Need to implement** |
| PythonProgram | **Missing** | ❌ None | **Need to implement** |
| Molecule | **Missing** | ❌ None | **Need to implement** |
| PhetSimulation | **Missing** | ❌ None | **Need to implement** |
| Grapher | graphing | ⚠️ Good | Different implementations |
| Plotter | graphing | ⚠️ Good | Can adapt |
| Measurer | N/A | ❌ None | Niche widget |
| Iframe | passage (iframe) | ⚠️ Good | Can embed |
| Definition | passage | ⚠️ Good | Can adapt |
| Explanation | passage | ⚠️ Good | Can adapt |

**Legend**:
- ✅ Excellent: Direct 1:1 mapping, high fidelity
- ⚠️ Good: Possible with some adaptation or loss of features
- ❌ None: No equivalent, requires new development

**Coverage**: ~70% of Perseus widgets can map to PIE with good-to-excellent fidelity

---

### Recommended Strategy

**Priority 1: Content Migration Layer** (High Value, Medium Effort)
- Build Perseus → PIE translator for common widget types
- Handle 70% of use cases with good fidelity
- Document unsupported widgets clearly
- Provide migration guidance and manual conversion templates
- **Timeline**: 3-6 months for comprehensive tool

**Priority 2: Widget Parity Development** (High Value, High Effort)
- Implement high-value Perseus widgets in PIE:
  1. CSProgram (code execution)
  2. PythonProgram (Python execution)
  3. PhetSimulation (science simulations)
  4. Molecule (chemistry visualization)
- Community contributions encouraged
- **Timeline**: 6-12 months per major widget

**Priority 3: QTI Advocacy** (Strategic, Long-term)
- Advocate for Perseus QTI export (Khan Academy feature request)
- Document ideal QTI mappings for both systems
- Build community Perseus → QTI translator
- Position QTI as neutral standard
- **Timeline**: 12-24 months (dependent on Khan Academy)

**Priority 4: Migration Documentation** (Medium Value, Low Effort)
- Widget mapping guide
- Content conversion best practices
- Known limitations and workarounds
- Case studies and examples
- **Timeline**: 1-2 months

**Not Recommended**:
- ❌ Web Component Wrapper (too complex, limited ROI)
- ❌ Shared Scoring Library (minimal value, different philosophies)

---

## 10. Strategic Recommendations

### For Organizations Evaluating PIE and Perseus

#### PIE is well-suited for:
- ✅ You need QTI interoperability
- ✅ You want framework flexibility (not locked to React)
- ✅ You require server-side scoring security
- ✅ You need comprehensive accessibility toolkit
- ✅ You want external support and community
- ✅ You plan long-term ecosystem investment
- ✅ You need open ecosystem for content sharing
- ✅ You value open-source collaboration
- ✅ You want modern web standards (Web Components, ESM)
- ✅ You need multiple player deployment options

#### Perseus is well-suited for:
- ✅ You are Khan Academy (internal use)
- ✅ You need specific STEM widgets (CS, chemistry, physics)
- ✅ You have React expertise already
- ✅ You want reference implementation to study
- ✅ You don't need external integration
- ✅ You're comfortable with read-only open source (can fork but no upstream contributions)
- ✅ You need mature, stable codebase today
- ⚠️ You can accept React framework lock-in

#### Migration Path (Perseus → PIE):
1. **Audit Content**: Inventory Perseus widgets used
2. **Assess Coverage**: Use widget mapping matrix
3. **Plan Gaps**: Identify widgets needing custom development
4. **Pilot Conversion**: Start with simple widget types
5. **Build Tooling**: Automate conversion where possible
6. **Manual Conversion**: Handle complex/unsupported widgets
7. **Validate**: Test converted content thoroughly
8. **Deploy**: Roll out PIE-based system

---

### For PIE Framework Development

**Recommendations**:

1. **Continue QTI Focus** ⭐⭐⭐ (Critical)
   - Major differentiator vs Perseus
   - Strategic advantage in market
   - Industry standard alignment
   - **Action**: Prioritize QTI 3.0 support completion

2. **Expand STEM Widgets** ⭐⭐⭐ (High Priority)
   - Address Perseus's competitive strength
   - Enable migration from Perseus
   - Key widgets: CSProgram, PythonProgram, Molecule, PhetSimulation
   - **Action**: Roadmap for STEM widget development

3. **Complete Documentation** ⭐⭐ (Medium Priority)
   - pie-elements-ng migration docs
   - Comprehensive widget authoring guides
   - Integration tutorials
   - **Action**: Documentation sprint

4. **Community Building** ⭐⭐ (Medium Priority)
   - Encourage contributions
   - Grow ecosystem
   - Developer advocacy
   - **Action**: Community engagement program

5. **Standards Advocacy** ⭐ (Long-term)
   - Lead educational assessment standards discussions
   - Collaborate with IMS Global, IEEE
   - Present at conferences
   - **Action**: Standards participation

6. **Performance Optimization** ⭐⭐ (Medium Priority)
   - Optimize ESM player loading
   - Reduce bundle sizes further
   - Improve initial render performance
   - **Action**: Performance audit and optimization

---

### For Potential Interoperability Projects

**Recommendations**:

1. **Build Perseus → PIE Migration Tool** ⭐⭐⭐ (Immediate)
   - Command-line tool for content conversion
   - Support 70% widget coverage initially
   - Clear error messages for unsupported widgets
   - **Effort**: 3-6 months
   - **Impact**: Enable content migration

2. **Document Widget Mappings** ⭐⭐⭐ (Immediate)
   - Comprehensive mapping matrix
   - Conversion examples for each widget
   - Known limitations and workarounds
   - **Effort**: 1-2 months
   - **Impact**: Guide migration efforts

3. **Implement Priority STEM Widgets** ⭐⭐ (Short-term)
   - CSProgram as PIE element
   - PythonProgram as PIE element
   - Community contributions welcome
   - **Effort**: 6-12 months
   - **Impact**: Close feature gap

4. **QTI Advocacy Campaign** ⭐ (Long-term)
   - Engage Khan Academy on QTI export
   - Build community Perseus → QTI translator
   - Document ideal QTI mappings
   - **Effort**: 12-24 months
   - **Impact**: Industry-wide interoperability

5. **Migration Case Studies** ⭐⭐ (Medium-term)
   - Document successful Perseus → PIE migrations
   - Share lessons learned
   - Provide reference implementations
   - **Effort**: Ongoing
   - **Impact**: Demonstrate viability

---

### Technical Debt and Future-Proofing

**PIE Considerations**:
- ✅ Web Components: Future-proof, standard-based
- ✅ ESM: Modern module system
- ✅ Dual React/Svelte support: Framework choice and flexibility
- ✅ Server-side controllers: Secure, scalable
- ✅ QTI alignment: Interoperability option

**Perseus Considerations**:
- ⚠️ React lock-in: Framework dependency
- ⚠️ Monolithic bundles: Performance concerns
- ⚠️ Closed contributions: Limited community growth
- ⚠️ No QTI support: Interoperability limited
- ✅ Mature codebase: Battle-tested stability

**Long-term Viability**:
- **PIE**: High (open collaborative ecosystem, Renaissance sponsorship, community contributions)
- **Perseus**: Medium (Khan Academy dependent, no external collaboration) - but MIT license allows forking

---

## 11. Conclusion

**PIE** and **Perseus** represent two fundamentally different approaches to interactive assessment:

### PIE Framework
- **Philosophy**: Open, standards-driven, ecosystem-focused
- **Architecture**: Web Components, multiple players, framework-agnostic
- **Interoperability**: QTI integration, broad ecosystem adoption
- **Security**: Server-required scoring, role-based filtering
- **Accessibility**: Comprehensive toolkit (WCAG 2.2 AA, IEP/504)
- **Community**: Open contributions, active external community
- **Best For**: Organizations seeking open, collaborative ecosystem for rich interactive assessments

### Perseus
- **Philosophy**: Open source (MIT), Khan-specific development, read-only contributions
- **Architecture**: React monolith, single renderer, Wonder Blocks
- **Interoperability**: None (Khan-specific, no QTI)
- **Strength**: Excellent STEM widgets (programming, science)
- **Community**: Read-only (MIT licensed but no contributions accepted)
- **Best For**: Khan Academy internal use, reference implementation study, or fork for custom use

---

### Interoperability: The Path Forward

The most viable approaches for Perseus-PIE interoperability:

1. **Content Migration Layer** (Recommended)
   - Build Perseus → PIE translator
   - Cover 70% of widgets with good fidelity
   - Document gaps and manual conversion paths
   - **Feasibility**: High
   - **Impact**: Enable content migration

2. **Widget Parity Development** (Long-term)
   - Implement missing STEM widgets in PIE
   - CSProgram, PythonProgram, Molecule, PhetSimulation
   - Close feature gap
   - **Feasibility**: Medium
   - **Impact**: High for STEM content

3. **QTI as Bridge** (Strategic)
   - Advocate for Perseus QTI export
   - Build community translators
   - Standards-based interoperability
   - **Feasibility**: Low (Perseus not interested)
   - **Impact**: High if achieved

**Not Recommended**:
- ❌ Web Component wrappers (too complex)
- ❌ Shared scoring libraries (different philosophies)

---

### Technical Summary

The frameworks serve different purposes and architectural philosophies:

**PIE Characteristics**:

- Open collaborative ecosystem with Renaissance as primary production user
- Focus on rich, interactive assessment experiences
- Web Components for framework flexibility
- Modern web standards (ESM, Custom Highlight API, Web Speech API)
- Server-side security by design
- QTI interoperability support (complementary feature, not primary goal)
- Active external community and contributions

**Perseus Characteristics**:

- Open source (MIT) with read-only contribution model
- Khan Academy internal development and optimization
- React-based architecture with Wonder Blocks integration
- Excellent STEM widget coverage (programming, science)
- Battle-tested UX patterns from years of Khan Academy usage
- Can be studied, forked, and adapted for custom use

The frameworks are **complementary rather than directly compatible**. PIE is designed as an open collaborative ecosystem for rich interactive assessments with modern web technologies. Perseus is an open source implementation optimized for Khan Academy's specific needs - valuable as a reference implementation and learning resource, with the freedom to fork and adapt under MIT license.

---

## Appendix: Resources

### PIE Framework
- **Website**: [https://pie.org](https://pie.org)
- **Documentation**: [https://pie-framework.github.io/pie-players/](https://pie-framework.github.io/pie-players/)
- **GitHub**: [https://github.com/pie-framework](https://github.com/pie-framework)
- **QTI Tooling**: [https://pie-framework.github.io/pie-qti](https://pie-framework.github.io/pie-qti)
- **Elements**: [https://github.com/pie-framework/pie-elements](https://github.com/pie-framework/pie-elements)
- **Elements (Next Gen)**: Local: `../pie-elements-ng` (modern architecture with React + Svelte support)
- **Players**: Local: `../pie-players`

### Perseus
- **GitHub**: [https://github.com/Khan/perseus](https://github.com/Khan/perseus)
- **Demo**: [https://khan.github.io/perseus](https://khan.github.io/perseus)
- **NPM**: [@khanacademy/perseus](https://www.npmjs.com/package/@khanacademy/perseus)

### Standards
- **QTI**: [http://www.imsglobal.org/question/index.html](http://www.imsglobal.org/question/index.html)
- **WCAG 2.2**: [https://www.w3.org/WAI/WCAG22/quickref/](https://www.w3.org/WAI/WCAG22/quickref/)
- **Web Components**: [https://developer.mozilla.org/en-US/docs/Web/API/Web_components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

---

**Document Version**: 1.0
**Last Updated**: 2026-01-25
**Author**: Comparative Technical Analysis
**License**: Same as PIE Framework (ISC/MIT)
