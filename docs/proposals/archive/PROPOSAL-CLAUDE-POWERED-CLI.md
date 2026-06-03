# Claude-Powered CLI: No API Needed

> **Goal**: Use Claude (via Claude Code, Desktop, or Web) to supercharge Nexus CLI - without any API keys or costs beyond your existing subscription.

---

## The Key Insight

**You already have Claude access through multiple interfaces:**

```
┌─────────────────────────────────────────────────────────────────┐
│                 YOUR EXISTING CLAUDE ACCESS                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐                                           │
│  │  CLAUDE CODE    │  ← CLI tool you're using RIGHT NOW        │
│  │  (Terminal)     │    Headless mode: claude -p "query"       │
│  └────────┬────────┘                                           │
│           │                                                     │
│  ┌────────┴────────┐                                           │
│  │  CLAUDE DESKTOP │  ← MCP support, file access               │
│  │  (App)          │    Local MCP servers                      │
│  └────────┬────────┘                                           │
│           │                                                     │
│  ┌────────┴────────┐                                           │
│  │  CLAUDE.AI      │  ← Web UI with MCP (your extension)       │
│  │  (Browser)      │    Multiple parallel sessions             │
│  └─────────────────┘                                           │
│                                                                 │
│  ALL USE YOUR EXISTING PRO/MAX SUBSCRIPTION                    │
│  NO API COSTS • NO RATE LIMITS • ALREADY PAID FOR              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Five Ways to Use Claude with CLI

### 1. Pipe CLI Output TO Claude Code ⭐⭐⭐ SIMPLEST

```bash
# Nexus provides data, Claude Code analyzes it
nexus research zotero search "mediation" --json | claude -p "Summarize these papers and identify key themes"

# Search vault, Claude synthesizes
nexus knowledge vault search "sensitivity" --json | claude -p "Create a literature review outline"

# Extract PDF, Claude explains
nexus research pdf extract paper.pdf | claude -p "Explain the methodology section"
```

**How it works:**
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ nexus search │ ──► │   claude -p  │ ──► │   Response   │
│ (data)       │     │  (analysis)  │     │  (insights)  │
└──────────────┘     └──────────────┘     └──────────────┘
```

**Implementation**: No extra code! Just pipe output.

---

### 2. Claude Calls Nexus via Bash ⭐⭐⭐ YOUR CURRENT PATTERN

Inside Claude Code, Claude uses Bash to call nexus:

```
User: "Find all papers by VanderWeele on mediation"

Claude: Let me search your Zotero library.
        [Runs: nexus research zotero search "VanderWeele mediation"]

        Found 12 papers:
        1. VanderWeele (2015) - Explanation in Causal Inference
        2. VanderWeele & Vansteelandt (2014) - Mediation Analysis...
        ...

        Would you like me to create a literature note?
```

**How it works:**
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    User      │ ──► │    Claude    │ ──► │    nexus     │
│   (query)    │     │   (thinks)   │     │   (executes) │
└──────────────┘     └──────────────┘     └──────────────┘
                            │                    │
                            └────────────────────┘
                              Claude synthesizes
```

**Implementation**: Create Claude Code plugin with skills that call nexus CLI.

---

### 3. Claude Code Headless Mode in Scripts ⭐⭐

```bash
#!/bin/bash
# nexus-ask: AI-powered question answering using Claude Code

query="$1"

# Step 1: Get data from all sources
zotero_results=$(nexus research zotero search "$query" --json 2>/dev/null)
vault_results=$(nexus knowledge vault search "$query" --json 2>/dev/null)

# Step 2: Combine context
context=$(cat <<EOF
Zotero Library Results:
$zotero_results

Vault Notes:
$vault_results
EOF
)

# Step 3: Ask Claude to synthesize
echo "$context" | claude -p "Based on this context from my knowledge base, answer: $query" \
    --output-format text
```

**Usage:**
```bash
./nexus-ask "What are the key methods for sensitivity analysis in mediation?"
```

**How it works:**
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   nexus      │ ──► │   context    │ ──► │  claude -p   │
│  (gather)    │     │  (combine)   │     │  (analyze)   │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

### 4. MCP Server for Claude Desktop/Code ⭐⭐⭐ POWERFUL

Create a Nexus MCP server that Claude Desktop and Claude Code can use:

```typescript
// mcp-servers/nexus/src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({
  name: "nexus",
  version: "1.0.0",
}, {
  capabilities: { tools: {} }
});

// Tool: Search Zotero
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "nexus_zotero_search",
      description: "Search Zotero library for papers",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          limit: { type: "number", description: "Max results", default: 20 }
        },
        required: ["query"]
      }
    },
    {
      name: "nexus_vault_search",
      description: "Search Obsidian vault for notes",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" }
        },
        required: ["query"]
      }
    },
    {
      name: "nexus_pdf_extract",
      description: "Extract text from PDF file",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path to PDF" }
        },
        required: ["path"]
      }
    },
    {
      name: "nexus_unified_search",
      description: "Search across all knowledge sources",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          sources: { type: "array", items: { type: "string" }, default: ["zotero", "vault", "pdf"] }
        },
        required: ["query"]
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "nexus_zotero_search": {
      const result = execSync(`nexus research zotero search "${args.query}" --json`);
      return { content: [{ type: "text", text: result.toString() }] };
    }
    case "nexus_vault_search": {
      const result = execSync(`nexus knowledge vault search "${args.query}" --json`);
      return { content: [{ type: "text", text: result.toString() }] };
    }
    // ... more tools
  }
});
```

**Config for Claude Desktop:**
```json
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "nexus": {
      "command": "node",
      "args": ["/path/to/mcp-servers/nexus/dist/index.js"]
    }
  }
}
```

**Config for Claude Code:**
```bash
claude mcp add nexus --command "node /path/to/mcp-servers/nexus/dist/index.js"
```

---

### 5. Claude Code Plugin (Current Pattern) ⭐⭐⭐

Plugin skills tell Claude HOW to use nexus:

```markdown
<!-- ~/.claude/plugins/nexus/skills/research/literature-review.md -->
---
description: Conduct literature reviews using Nexus CLI
---

When asked to find literature or conduct a literature review:

## Available Commands

\`\`\`bash
# Search Zotero library
nexus research zotero search "query" --json

# Search PDFs
nexus research pdf search "query" --json

# Search vault notes
nexus knowledge vault search "query" --json

# Unified search (all sources)
nexus knowledge search "query" --json
\`\`\`

## Workflow

1. Search relevant sources based on query
2. Parse JSON results
3. Synthesize findings
4. Offer to create vault note or export citations
```

**How Claude uses it:**
```
User: "Find papers on propensity score matching"

Claude: [Thinking: I should use literature-review skill]
        [Runs: nexus research zotero search "propensity score matching" --json]
        [Analyzes results]

        Found 34 papers on propensity score matching in your library...
```

---

## Architecture: Claude as the Brain

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLAUDE-POWERED NEXUS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                      ┌─────────────────┐                       │
│                      │                 │                       │
│                      │     CLAUDE      │                       │
│                      │                 │                       │
│                      │  • Thinking     │                       │
│                      │  • Analyzing    │                       │
│                      │  • Synthesizing │                       │
│                      │  • Writing      │                       │
│                      │                 │                       │
│                      └────────┬────────┘                       │
│                               │                                 │
│         ┌─────────────────────┼─────────────────────┐          │
│         │                     │                     │          │
│         ▼                     ▼                     ▼          │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐  │
│  │ Claude Code │       │   Claude    │       │  Claude.ai  │  │
│  │   (CLI)     │       │  Desktop    │       │   (Web)     │  │
│  │             │       │   (App)     │       │             │  │
│  │ • Headless  │       │ • MCP       │       │ • MCP ext   │  │
│  │ • Bash      │       │ • Local     │       │ • Multi-tab │  │
│  │ • Piping    │       │ • Files     │       │ • Parallel  │  │
│  └──────┬──────┘       └──────┬──────┘       └──────┬──────┘  │
│         │                     │                     │          │
│         └─────────────────────┼─────────────────────┘          │
│                               │                                 │
│                               ▼                                 │
│                      ┌─────────────────┐                       │
│                      │                 │                       │
│                      │   NEXUS CLI     │                       │
│                      │                 │                       │
│                      │  • Zotero       │                       │
│                      │  • PDFs         │                       │
│                      │  • Vault        │                       │
│                      │  • Courses      │                       │
│                      │  • Manuscripts  │                       │
│                      │                 │                       │
│                      └─────────────────┘                       │
│                                                                 │
│  NO API COSTS • USES EXISTING SUBSCRIPTION • UNLIMITED USE     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Comparison: Claude vs Ollama

| Aspect | Claude (Your Sub) | Ollama (Local) |
|--------|-------------------|----------------|
| **Cost** | $0 extra (already paid) | Free |
| **Quality** | State-of-the-art | Good, varies by model |
| **Speed** | Fast (cloud) | Fast (local M1/M2/M3) |
| **Privacy** | Cloud-based | 100% local |
| **Integration** | Native (Code, Desktop, Web) | Requires setup |
| **Offline** | No | Yes |
| **Recommended** | ⭐⭐⭐ For your workflow | Fallback only |

**Verdict**: Use Claude. You're already paying for it, it's better quality, and integrates natively with your workflow.

---

## Implementation: Three Patterns

### Pattern A: Piping (Simplest) ⭐

```bash
# Add these to your shell
alias nexus-ask='f() { nexus knowledge search "$1" --json | claude -p "Based on these results: $1"; }; f'
alias zotero-ai='f() { nexus research zotero search "$1" --json | claude -p "Summarize these papers on: $1"; }; f'
alias vault-ai='f() { nexus knowledge vault search "$1" --json | claude -p "Synthesize notes on: $1"; }; f'

# Usage
nexus-ask "sensitivity analysis methods"
zotero-ai "VanderWeele mediation"
vault-ai "JASA submission checklist"
```

**Time to implement**: 5 minutes

---

### Pattern B: Claude Code Plugin (Your Current Approach) ⭐⭐⭐

```
~/.claude/plugins/nexus/
├── plugin.json
├── skills/
│   ├── research/
│   │   ├── literature-review.md
│   │   ├── citation-helper.md
│   │   └── methodology.md
│   ├── teaching/
│   │   ├── lecture-prep.md
│   │   └── example-generator.md
│   └── knowledge/
│       ├── unified-search.md
│       └── synthesis.md
└── commands/
    ├── nexus-search.md
    ├── nexus-cite.md
    └── nexus-write.md
```

**How Claude uses skills:**
```markdown
<!-- skills/knowledge/synthesis.md -->
---
description: Synthesize information across all knowledge sources
---

When asked to synthesize, summarize, or answer questions about research:

1. Search relevant sources:
   \`\`\`bash
   nexus knowledge search "query" --json
   \`\`\`

2. Get detailed content for top results:
   \`\`\`bash
   nexus knowledge vault read "path/to/note.md"
   nexus research pdf extract "path/to/paper.pdf" --pages 1-5
   \`\`\`

3. Synthesize findings with:
   - Key themes
   - Methodological approaches
   - Gaps in knowledge
   - Recommendations

4. Offer to save synthesis to vault:
   \`\`\`bash
   nexus knowledge vault write "synthesis-TOPIC.md" --content "..."
   \`\`\`
```

**Time to implement**: 2-3 hours (after nexus CLI exists)

---

### Pattern C: MCP Server (Most Integrated) ⭐⭐

```typescript
// MCP server that wraps nexus CLI
// Works in Claude Desktop AND Claude Code

const tools = [
  "nexus_zotero_search",
  "nexus_zotero_cite",
  "nexus_pdf_extract",
  "nexus_pdf_search",
  "nexus_vault_read",
  "nexus_vault_write",
  "nexus_vault_search",
  "nexus_unified_search",
  "nexus_course_list",
  "nexus_manuscript_status"
];

// Each tool calls the nexus CLI and returns results
```

**Time to implement**: 4-6 hours

---

## Recommended Approach

### Phase 1: CLI + Simple Piping (2 hours)
```bash
# Build basic nexus CLI
# Add shell aliases for piping to Claude
nexus search "query" | claude -p "summarize"
```

### Phase 2: Claude Code Plugin (3 hours)
```bash
# Create plugin with skills
# Skills teach Claude how to use nexus
# Works in Claude Code conversations
```

### Phase 3: MCP Server (Optional, 4 hours)
```bash
# Create MCP server wrapper
# Works in Claude Desktop too
# Most integrated experience
```

---

## Quick Start Commands

Once nexus CLI exists, these work immediately:

```bash
# Basic search with AI summary
nexus research zotero search "mediation" --json | \
  claude -p "Summarize these papers and identify key research gaps"

# Literature review workflow
nexus research zotero search "sensitivity analysis" --json | \
  claude -p "Create a structured literature review outline with sections"

# Teaching prep
nexus teach material find "regression" --json | \
  claude -p "Suggest how to explain this concept to undergraduates"

# Manuscript assistance
nexus write manuscript status probmed --json | \
  claude -p "What sections still need work and what's the priority?"

# Knowledge synthesis
nexus knowledge search "propensity score" --json | \
  claude -p "Synthesize what I know about propensity scores from my notes and papers"
```

---

## Summary

| Method | Complexity | Best For |
|--------|------------|----------|
| **Piping** | 5 min | Quick queries |
| **Plugin** | 3 hours | Full integration |
| **MCP Server** | 4-6 hours | Desktop + Code |

**Recommendation**:
1. Start with **piping** for immediate use
2. Build **plugin** for rich Claude Code integration
3. Add **MCP server** later for Desktop support

**No Ollama needed** - Claude via your existing subscription is:
- Higher quality
- Already paid for
- Natively integrated
- Unlimited use

---

## Sources

- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Headless Mode](https://code.claude.com/docs/en/headless)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [MCP Local Servers](https://modelcontextprotocol.io/docs/develop/connect-local-servers)
- [Claude Code and Bash Scripts](https://stevekinney.com/courses/ai-development/claude-code-and-bash-scripts)

