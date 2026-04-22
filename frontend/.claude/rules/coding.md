# Coding Style Rules

## Naming (JS/TS)

- Variables/functions: `camelCase`
- Components/types/classes: `PascalCase`
- True constants: `UPPER_SNAKE_CASE`
- Booleans: prefix with `is`, `has`, `can`, `should`
- Event handlers: prefix with `on` or `handle`
- Files: `kebab-case.ts` for modules, `PascalCase.tsx` for React components

## File Organization

- One primary export per file; split if multiple unrelated exports
- Keep files under 300 lines; extract sub-modules when longer
- Import order: stdlib → external packages → internal absolute → relative → type-only (blank line between groups)

## Code Discipline

- No comments unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant)
- No abstractions for hypothetical reuse — three similar lines beats a premature helper
- No error handling for impossible scenarios; trust internal guarantees
- No `any`, no commented-out code, no unused imports
- Keep functions ≤ 40 lines; ≤ 3 parameters (use an options object for more)
- No nested ternaries — use `if/else` or extract a helper
