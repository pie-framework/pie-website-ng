# PIE Website (Next Generation)

This is the PIE (Portable Interactions and Elements) Framework documentation website rebuild project. PIE is an open-source framework for creating, sharing, and delivering interactive assessment items in learning environments.

## Monorepo Structure

This project is organized as a monorepo using Bun workspaces:

```
pie-website-ng/
├── packages/
│   └── pie-website-app/     # Main website SvelteKit application
├── reference/               # Reference documentation and planning
├── package.json            # Root workspace configuration
└── README.md              # This file
```

## Prerequisites

- [Bun](https://bun.sh/) (latest version recommended)

## Getting Started

### Install Dependencies

From the root directory:

```bash
bun install
```

### Development

Run the development server:

```bash
bun dev
```

This will start the pie-website-app development server.

### Build

Build all packages:

```bash
bun build
```

### Type Checking

Run type checking:

```bash
bun check
```

## Packages

### pie-website-app

The main PIE Framework documentation website built with SvelteKit, Tailwind v4, and DaisyUI v5.

See [packages/pie-website-app/README.md](packages/pie-website-app/README.md) for more details.

## Project Guidelines

See [CLAUDE.md](CLAUDE.md) for development guidelines and project context.

## License

This project is open source under the MIT License.
