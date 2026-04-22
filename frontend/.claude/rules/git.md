# Git Workflow Rules

## Commits

- Use Conventional Commits: `type(scope): description`
- Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`
- One logical change per commit — never bundle unrelated changes
- Present tense, imperative mood: "add feature" not "added feature"

## Branches

- Feature: `feat/<short-description>`
- Fix: `fix/<short-description>`
- Chore: `chore/<short-description>`
- Branch from `main`; keep short-lived (merge within days, not weeks)

## Pull Requests

- PR title follows same Conventional Commits format as commits
- Keep PRs small and focused — prefer many small PRs over one large one
- Never force-push to `main`
- Squash or rebase before merging to keep history clean
