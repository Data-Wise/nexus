# Git Workflow for Nexus

**Branch Strategy:** Development workflow with main and dev branches

---

## Branch Structure

```
main    ← Production-ready releases (Phase completions)
  │
  └─ dev  ← Active development (current work)
```

### Branch Purposes

| Branch | Purpose | Updates |
|--------|---------|---------|
| **main** | Stable, production-ready code | Phase completions only |
| **dev** | Active development | Daily commits, work in progress |

---

## Workflow

### Daily Development (on dev)

```bash
# Make sure you're on dev
git checkout dev

# Work on your changes
# ... edit files ...

# Commit regularly
git add -A
git commit -m "feat: add feature X

Detailed description of changes.

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to remote (when ready)
git push origin dev
```

### Phase Completion (merge to main)

When a phase is complete (like P1, P2, etc.):

```bash
# Make sure dev is clean and committed
git checkout dev
git status

# Switch to main
git checkout main

# Merge dev with merge commit
git merge dev --no-ff -m "chore: merge Phase PX completion from dev

Phase PX: [Phase Name] Complete ✅
- [Key accomplishment 1]
- [Key accomplishment 2]

Next: Phase PX+1 development continues on dev"

# Tag the release
git tag -a v0.X.0 -m "Phase PX: [Phase Name] Complete"

# Push main and tags
git push origin main
git push origin --tags

# Return to dev for next phase
git checkout dev
```

---

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

**Feature:**
```
feat(vault-template): create PARA folder structure

Created the base folder structure for the Obsidian vault template:
- 00-INBOX/ for quick capture
- 10-PROJECTS/ for active work
- 20-AREAS/ for ongoing domains
- 30-RESOURCES/ for reference
- 40-ARCHIVE/ for completed work
- 50-DAILY/ for daily notes
- 60-TASKS/ for task management
- _SYSTEM/ for configuration

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Documentation:**
```
docs: update QUICK-START with vault structure

Updated the quick start guide to reference the new vault-template/
directory structure. Added installation instructions.
```

**Chore:**
```
chore: merge Phase P2 completion from dev

Phase P2: Template Vault Creation Complete ✅
- Created vault-template/ with PARA structure
- Added all template files
- Configured Obsidian settings

Next: Phase P3 (Example Content) on dev branch
```

---

## Current Repository Status

**Current Branch:** `dev` (for ongoing Phase P2 work)

**Branches:**
- `main` - Phase P1 complete (commit bfd7040)
- `dev` - Phase P1 complete, ready for P2 development

**Tags:** None yet (will tag after Phase P2)

**Next Steps:**
1. Continue Phase P2 development on `dev` branch
2. When P2 complete, merge `dev` → `main`
3. Tag `main` as `v0.2.0` (Phase P2 complete)

---

## Versioning

**Semantic Versioning for Phases:**

- `v0.1.0` - Phase P1: Standards Implementation ✅
- `v0.2.0` - Phase P2: Template Vault Creation (in progress)
- `v0.3.0` - Phase P3: Example Content (future)
- `v0.4.0` - Phase P4: Distribution & Testing (future)
- `v1.0.0` - Public release (all phases complete)

---

## Remote Repository (Future)

When ready to push to GitHub:

```bash
# Add remote
git remote add origin https://github.com/data-wise/nexus.git

# Push both branches
git push -u origin main
git push -u origin dev

# Set dev as default branch for PRs
gh repo edit --default-branch dev
```

**Branch Protection (recommended):**
- Require PR for merges to `main`
- Require at least 1 review
- Require status checks to pass
- Allow force pushes on `dev` only

---

## Quick Reference

| Task | Command |
|------|---------|
| **Check current branch** | `git branch --show-current` |
| **Switch to dev** | `git checkout dev` |
| **Switch to main** | `git checkout main` |
| **See branch graph** | `git log --oneline --graph --all` |
| **See changes** | `git status` |
| **Stage all** | `git add -A` |
| **Commit** | `git commit -m "type: message"` |
| **Merge dev to main** | `git checkout main && git merge dev --no-ff` |
| **Create tag** | `git tag -a v0.X.0 -m "message"` |

---

## ADHD-Friendly Tips

**Daily Routine:**
1. Always start: `git checkout dev`
2. Commit often (every 30-60 min of work)
3. Use descriptive commit messages
4. Push to remote daily (when set up)

**End of Day:**
```bash
git add -A
git commit -m "wip: [what you worked on]

Current state: [brief status]
Next: [what to do tomorrow]"
git push origin dev
```

**Phase Completion:**
- Review all changes
- Merge to main with ceremony (it's a win!)
- Tag the release
- Celebrate the milestone 🎉

---

**Created:** 2025-12-21
**Last Updated:** 2025-12-21
**Status:** Active workflow for Nexus development
