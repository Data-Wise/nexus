# Vault Alignment — Spec ↔ Deployed Reality (2026-06-19)

Reconciles the nexus vault-template spec with the **live** Obsidian vaults after a full reorganization.

## What changed

The two deployed vaults (`Research`, `Knowledge_Base`) were reorganized to a consistent convention:

- **Top level:** `NN_snake_case` numbered domains (`00_meta`, `10_*`, `20_*`, … `90_archive`).
- **Subfolders:** `snake_case` (e.g. `04_notes_and_ideas`, `causal_inference_course`, `regression_analysis`).
- **Pinned meta:** leading `_` reserved for pinned stores only (`_PromptLibrary`).

This **supersedes** the older hyphenated `NN-SECTION` example names (`00-INBOX`, `10-PROJECTS`, …) for the deployed vaults. The abstract PARA categories in `vault-spec.yaml` still hold conceptually; only the surface naming differs.

## Decision

**The deployed convention is canonical** (the reorg is live and in use). The spec was updated to record it (`vault-spec.yaml` → `naming_convention` + `deployed_instances`) rather than re-forcing the vaults into the example names. The two vaults intentionally differ in domain folders because they hold different content (research workspace vs. reference knowledge) — both are valid PARA instances.

## Mapping (spec → deployed)

| Spec (abstract) | Research | Knowledge_Base |
|---|---|---|
| `00-INBOX` | `10_incubator/00_inbox` | `10_inbox` |
| `10-PROJECTS` | `20_projects` | — |
| `20-AREAS` | `00_meta` (dashboards) | domain folders (`20_statistics`, …) |
| `30-RESOURCES` | `30_backlog`, `10_incubator/01_literature` | `20_statistics`/`30_math`/`40_programming` |
| `40-ARCHIVE` | `90_archive` | `90_archive` |
| `_SYSTEM/templates` | `00_meta/templates` | `00_meta/templates` |

## Propagated to the product (2026-06-19) ✅

- `vault-template/` folders renamed to the convention: `00_inbox/10_projects/20_areas/30_resources/40_archive/50_daily/60_tasks/_system`, subfolders snake_cased (`fleeting_notes`, `code_snippets`, `claude_prompts`, `dataview_queries`, …). All 238 references (Dataview queries, QuickAdd config, daily-notes config, dashboards) updated; 0 stale section refs remain.
- `vault-spec.yaml` `required_folders` + `standards/vault/{VAULT-STRUCTURE,TEMPLATE-STANDARDS}.md` + `README.md` updated to match.

## Remaining follow-ups (optional)

- `nexus-cli` / `obsidian-cli-ops` validators (if any) should accept `NN_snake_case` + `snake_case`, not only `NN-SECTION`.
- If the `.obsidian/plugins/*/data.json` (e.g. QuickAdd runtime data) hard-codes folder paths, refresh it in Obsidian (the template's documented `_system/quickadd-config.json` is already updated).
