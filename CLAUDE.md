# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the PIE (Portable Interactions and Elements) Framework documentation website rebuild project. PIE is an open-source framework for creating, sharing, and delivering interactive assessment items in learning environments.

### What is PIE?

PIE provides:
- A framework for developing reusable assessment interactions and UI elements
- An open-source Player for rendering assessments
- A format and tools for sharing assessments in distributable bundles
- Question types, UI libraries, and authoring components

### Technology Stack (PIE Framework)

PIE is built on web standards:
- **Custom Elements (Web Components)** - defines reusable UI elements
- **JSON** - configures questions/interactions
- **JavaScript Modules** - ES6 preferred, CommonJS supported
- **NPM packages** - for PIE definitions and dependency resolution
- **Module bundling** - creates optimized shareable bundles

### Key PIE Concepts

**Items vs Elements**: An item is a complete assessment question (potentially combining multiple elements). An element is a reusable piece of code implementing a specific question type (multiple choice, constructed response, etc.).

**PIE Element Interface**: Elements have two property setters:
- `set configuration` - client-level settings and rules
- `set model` - content definition from the author

**PIE Element Controllers**: Each element exports `model()` and `outcome()` functions:
- `model(question, session, env)` - builds the UI model, respecting role/mode to hide correct answers
- `outcome(question, session, env)` - calculates score (0.0-1.0) and completion status

### PIE Player & Author Components

**Player**: Orchestrates loading PIE elements and handles inter-element communication. Load via:
```html
<script type="module" src="https://unpkg.com/@pie-framework/pie-player-components@latest/dist/pie-player-components/pie-player-components.esm.js"></script>
```

**Author**: Provides graphical editing of PIE element models. Uses `pie-author` custom element with `config` and `configSettings` attributes.

### Environment Modes

- `env.mode`: `gather` (collecting responses), `view` (read-only), `evaluate` (showing results)
- `env.role`: `student`, `instructor`

## Reference Documents

The `/reference` directory contains Confluence exports and planning documents detailing PIE architecture, design decisions, authoring, and the open source player.
