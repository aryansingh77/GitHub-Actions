# Production-Grade CI/CD System (GitHub Actions)

This project implements a multi-environment CI/CD pipeline using GitHub Actions.

## Repository Structure
- `src/`: Source code.
- `tests/`: Unit tests (Jest).
- `Dockerfile`: Production image.
- `.github/workflows/`:
    - `ci.yml`: CI on feature/* and PR to main.
    - `cd.yml`: CD to staging on develop.
    - `release.yml`: Release to main with semantic versioning and tag creation.
    - `rollback.yml`: Manual/Auto rollback to previous tag.
- `.github/actions/`: Reusable composite actions.

## Pipeline Flow
1. **CI**: Triggered on push to `feature/*`. Runs lint, tests, coverage check (>80%), and uploads build artifact.
2. **Staging**: Triggered on push to `develop`. Downloads build artifact, builds Docker image, and runs smoke tests.
3. **Release**: Triggered on push/merge to `main`. Automatically determines next version based on commit messages, updates `version.txt`, creates Git tag, and GitHub Release.
4. **Rollback**: Manual rollback to the previous tag if health check fails.

## Requirements
- GitHub account
- Secret: `GITHUB_TOKEN` for release creation.
- GitHub Environment: `production` with required reviewers (Manual Approval).
