# Claude Code Project Instructions

## Communication Style

**Direct and Technical**: Skip all project management overhead. No planning phases, time estimates, effort calculations, or "Week 1/Week 2" implementation plans. Go straight to technical solutions and code.

**What to Skip**:
- ❌ Time estimates ("2-3 hours", "next sprint", "Week 1/2/3/4")
- ❌ Effort calculations ("estimated effort", "total estimated effort")
- ❌ Project planning sections ("Quick Implementation Plan", "Success Metrics")
- ❌ Priority frameworks with timing ("Priority 1: High Impact, Quick Wins")
- ❌ Gantt charts, roadmaps, or any timeline visualizations
- ❌ Resource allocation or capacity planning

**What to Include**:
- ✅ Technical recommendations prioritized by impact
- ✅ Direct implementation steps
- ✅ Code examples and solutions
- ✅ Trade-offs and technical considerations
- ✅ "Which would you like me to implement?" (let me decide when)

## Response Format

When asked for improvements, recommendations, or analysis:

```markdown
# Technical Recommendations

## High Impact
1. Feature X - [why it matters technically]
2. Fix Y - [what it solves]

## Medium Impact
3. Improvement Z - [technical benefit]

## Implementation Notes
- Technical considerations
- Trade-offs
- Dependencies

Which would you like me to implement?
```

**NOT**:
```markdown
❌ Week 1: Foundation (16-20 hours)
❌ Estimated effort: 4-6 hours
❌ Total: 76-92 hours (≈2-3 weeks)
```

## Code Changes

- Implement directly when asked
- Explain what you're doing while doing it
- Show results immediately
- Ask clarifying questions only when genuinely ambiguous

## Philosophy

I'm a solo developer leveraged by AI. Time estimates are meaningless because:
- AI assistance makes traditional estimates obsolete
- I decide scope and timing based on current priorities
- Estimates create false expectations and planning overhead

Focus on **what** can be done and **how**, not **when** or **how long**.

## Skills

### Available Plugin Skills

#### Frontend Design (`/frontend-design`)

Available via the `frontend-design` plugin. Creates distinctive, production-grade frontend interfaces with high design quality.

**When to use**: Building web components, pages, or applications that need polished UI.

**What it provides**:

- Creative, non-generic design aesthetics
- Production-ready code
- Avoids typical AI-generated look
- Integrated with Tailwind/DaisyUI

**Example usage**:

```text
User: Create a landing page for PIE Framework
Assistant: [Runs /frontend-design skill]
```

### Custom Skills (Not Yet Implemented)

The following skills are documented but need to be created in `.claude/skills/[skill-name]/SKILL.md`:

#### PIE Element Demo (`/pie-demo`)

Creates an interactive PIE element demonstration for documentation pages.

**When to use**: Adding examples of PIE interactions to documentation or guides.

**What it does**:

1. Asks which PIE element type to demonstrate
2. Creates a sample configuration for that element
3. Generates the HTML with `<pie-player>` setup
4. Adds interactive controls (if applicable)
5. Includes code snippets showing the JSON config

**Example usage**:

```text
User: I need to add a multiple choice demo to the getting started guide
Assistant: [Runs /pie-demo skill]
```

**Output**: Complete demo component with:

- Player initialization
- Sample PIE config
- Interactive example
- Code snippets for copy-paste

### Playground Sample (`/playground-sample`)

Adds a new interactive sample to the PIE playground.

**When to use**: Creating pre-configured PIE element examples for users to experiment with in the playground.

**What it does**:

1. Asks for element type and sample details
2. Creates the JSON configuration following PIE element spec
3. Adds entry to `playground-samples.ts`
4. Ensures proper categorization
5. Validates config structure

**Example usage**:

```text
User: Add a drag-and-drop geography example to the playground
Assistant: [Runs /playground-sample skill]
```

**Output**: New sample added to playground with:

- Proper category assignment
- Valid PIE config
- Description and metadata
- Element definitions

### Blog Post (`/blog-post`)

Creates a new blog post with frontmatter and proper structure.

**When to use**: Adding announcements, tutorials, or PIE Framework articles.

**What it does**:

1. Asks for post title, description, and category
2. Creates folder structure: `/blog/[slug]/+page.md`
3. Adds frontmatter (title, date, author, tags, description)
4. Sets up blog post template with sections
5. Updates blog index if needed

**Example usage**:

```text
User: Write a blog post about PIE best practices
Assistant: [Runs /blog-post skill]
```

**Output**: New blog post at `/blog/[slug]/+page.md` with:

- Frontmatter metadata
- Structured sections
- Markdown formatting
- Blog layout inheritance
