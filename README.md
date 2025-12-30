# Soyuz Website

Documentation and landing page for the Soyuz project.

## Tech Stack

- SvelteKit
- Tailwind CSS v4
- Bun

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Notes

- The cookbook page imports `SOYUZ_COOKBOOK.md` directly from the parent `soyuz/` directory (SSOT)
- Requires the `soyuz` repo to be present at `../soyuz` for the cookbook import to work
