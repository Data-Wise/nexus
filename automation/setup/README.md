# Setup & Automation Scripts

**Status:** 📋 Planned (Phase P3)
**Estimated Effort:** 4-6 hours

---

## Overview

This directory will contain automation scripts for vault setup, validation, and maintenance.

---

## Planned Scripts

### Setup Scripts
- `init-vault.sh` - Create new vault from template
- `validate-vault.sh` - Check vault structure and configuration
- `install-plugins.sh` - Guide user through plugin installation

### Maintenance Scripts
- `refresh-dashboards.sh` - Regenerate dashboard queries
- `check-version.sh` - Check for vault template updates
- `migrate-vault.sh` - Migrate from older vault structure

### Validation Scripts
- `validate-frontmatter.sh` - Check YAML frontmatter validity
- `validate-links.sh` - Check for broken links
- `validate-structure.sh` - Verify PARA folder organization

---

## Future Structure

```
setup/
├── init-vault.sh
├── validate-vault.sh
├── install-plugins.sh
├── refresh-dashboards.sh
├── check-version.sh
├── migrate-vault.sh
└── lib/
    ├── vault-utils.sh
    └── validation-utils.sh
```

---

**Created:** 2025-12-21
**Next Steps:** Complete Phase P2 first
