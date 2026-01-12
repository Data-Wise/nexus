# Phase 1 Implementation Plan: Zotero Integration

**Branch:** `dev`  
**Target:** Extend statistical-research MCP server  
**Effort:** 4 hours  
**Database:** 5,931 Zotero items at `~/Zotero/zotero.sqlite`

---

## 🎯 Objective

Add Zotero library search and citation capabilities to the statistical-research MCP server, making all 5,931 items accessible to Claude via natural language queries.

---

## 📋 Current State Analysis

### statistical-research MCP Server

**Location:** `~/projects/dev-tools/mcp-servers/statistical-research/`

**Structure:**
```
statistical-research/
├── src/
│   ├── index.ts           # MCP server entry point
│   ├── tools/             # MCP tools
│   ├── utils/             # Utilities
│   └── cli/               # CLI commands
├── skills/                # Claude skills (17 total)
├── tests/                 # Test scripts
└── package.json           # Bun TypeScript project
```

**Current Capabilities:**
- ✅ R code execution
- ✅ Literature search (arxiv, crossref)
- ✅ Simulation workflows
- ✅ Manuscript management
- ❌ Zotero integration (missing)

### Zotero Database

**Location:** `~/Zotero/zotero.sqlite` (176 MB)  
**Items:** 5,931 (excluding attachments/notes)

**Key Tables:**
- `items` - Main items table
- `itemData` + `itemDataValues` - Field data (title, abstract, etc.)
- `itemCreators` + `creators` - Authors
- `itemTags` + `tags` - Tags
- `itemAnnotations` - Highlights/notes
- `collections` + `collectionItems` - Collections

---

## 🏗️ Implementation Design

### Architecture Decision: TypeScript + Shell Hybrid

**TypeScript MCP Tools** (for Claude integration):
- `zotero_search` - Search library
- `zotero_cite` - Generate citations
- `zotero_get_item` - Get item details

**Shell Utilities** (for complex SQLite):
- `src/utils/zotero.ts` - TypeScript wrapper
- Shell functions for multi-table joins

**Rationale:**
- MCP tools must be TypeScript (SDK requirement)
- SQLite queries easier in shell for prototyping
- TypeScript can call shell functions via `Bun.$`

---

## 📝 Detailed Tasks

### Task 1.1: Create Zotero Utility Module (1.5 hours)

**File:** `src/utils/zotero.ts`

**Functions:**
```typescript
interface ZoteroItem {
  key: string;
  title: string;
  authors: string[];
  year: string;
  itemType: string;
  abstract?: string;
  tags: string[];
  collections: string[];
  citationKey?: string;  // Better BibTeX
}

interface ZoteroSearchOptions {
  query: string;
  limit?: number;
  itemType?: string;
  tags?: string[];
  collections?: string[];
}

// Core functions
export async function searchZotero(options: ZoteroSearchOptions): Promise<ZoteroItem[]>
export async function getZoteroItem(key: string): Promise<ZoteroItem | null>
export async function getZoteroAnnotations(key: string): Promise<Annotation[]>
export async function formatCitation(item: ZoteroItem, style: 'apa' | 'bibtex'): Promise<string>
export async function getRecentItems(limit: number): Promise<ZoteroItem[]>
```

**Implementation Approach:**

1. **Database path resolution:**
   ```typescript
   const ZOTERO_DB = process.env.ZOTERO_DB || 
     `${process.env.HOME}/Zotero/zotero.sqlite`;
   ```

2. **SQLite queries via Bun.$ (shell):**
   ```typescript
   async function queryZotero(sql: string): Promise<any[]> {
     const result = await Bun.$`sqlite3 -json ${ZOTERO_DB} ${sql}`;
     return JSON.parse(result.stdout);
   }
   ```

3. **Search implementation:**
   ```typescript
   export async function searchZotero(options: ZoteroSearchOptions) {
     const { query, limit = 20 } = options;
     
     const sql = `
       SELECT DISTINCT
         i.key,
         (SELECT value FROM itemDataValues 
          WHERE valueID = (SELECT valueID FROM itemData 
                          WHERE itemID = i.itemID 
                          AND fieldID = (SELECT fieldID FROM fields WHERE fieldName = 'title'))) as title,
         (SELECT GROUP_CONCAT(firstName || ' ' || lastName, '; ')
          FROM itemCreators ic
          JOIN creators c ON ic.creatorID = c.creatorID
          WHERE ic.itemID = i.itemID) as authors,
         (SELECT value FROM itemDataValues 
          WHERE valueID = (SELECT valueID FROM itemData 
                          WHERE itemID = i.itemID 
                          AND fieldID = (SELECT fieldID FROM fields WHERE fieldName = 'date'))) as date
       FROM items i
       WHERE i.itemTypeID NOT IN (1, 14)  -- Exclude attachments/notes
       AND (
         title LIKE '%${query}%'
         OR authors LIKE '%${query}%'
       )
       LIMIT ${limit};
     `;
     
     const results = await queryZotero(sql);
     return results.map(normalizeZoteroItem);
   }
   ```

**Test Cases:**
- Search for "mediation" (should return ~200+ items)
- Search for "VanderWeele" (author search)
- Search for non-existent term (empty results)
- Limit parameter (return exactly N items)

---

### Task 1.2: Create MCP Tools (1.5 hours)

**File:** `src/tools/zotero.ts`

**Tools to Add:**

#### Tool 1: `zotero_search`
```typescript
{
  name: "zotero_search",
  description: "Search your Zotero library for papers, books, and other references",
  inputSchema: {
    type: "object",
    properties: {
      query: { 
        type: "string", 
        description: "Search query (searches title, authors, abstract)" 
      },
      limit: { 
        type: "number", 
        description: "Maximum results to return (default: 20)",
        default: 20
      },
      item_type: {
        type: "string",
        description: "Filter by item type (journalArticle, book, etc.)",
        optional: true
      }
    },
    required: ["query"]
  }
}
```

**Handler:**
```typescript
case "zotero_search": {
  const { query, limit, item_type } = args as { 
    query: string; 
    limit?: number; 
    item_type?: string 
  };
  
  const results = await searchZotero({ query, limit, itemType: item_type });
  
  return {
    content: [{
      type: "text",
      text: formatZoteroResults(results)
    }]
  };
}
```

#### Tool 2: `zotero_cite`
```typescript
{
  name: "zotero_cite",
  description: "Generate formatted citation for a Zotero item",
  inputSchema: {
    type: "object",
    properties: {
      key: { 
        type: "string", 
        description: "Zotero item key (e.g., 'ABC123XYZ')" 
      },
      style: {
        type: "string",
        description: "Citation style: 'apa', 'bibtex', 'chicago'",
        default: "apa",
        enum: ["apa", "bibtex", "chicago", "mla"]
      }
    },
    required: ["key"]
  }
}
```

#### Tool 3: `zotero_get_item`
```typescript
{
  name: "zotero_get_item",
  description: "Get detailed information about a specific Zotero item",
  inputSchema: {
    type: "object",
    properties: {
      key: { 
        type: "string", 
        description: "Zotero item key" 
      }
    },
    required: ["key"]
  }
}
```

**Integration into `src/index.ts`:**
1. Import tools from `./tools/zotero.ts`
2. Add to tools list in `ListToolsRequestSchema` handler
3. Add to tool execution in `CallToolRequestSchema` handler

---

### Task 1.3: Update Server & Test (1 hour)

**1. Update `src/index.ts`:**
```typescript
import { zoteroTools } from './tools/zotero.ts';

// In ListToolsRequestSchema handler:
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    ...existingTools,
    ...zoteroTools  // Add Zotero tools
  ]
}));

// In CallToolRequestSchema handler:
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  // Add Zotero tool handlers
  if (name.startsWith('zotero_')) {
    return handleZoteroTool(name, args);
  }
  
  // ... existing handlers
});
```

**2. Test with MCP Inspector:**
```bash
cd ~/projects/dev-tools/mcp-servers/statistical-research
bun run dev  # Start server

# In another terminal:
npx @modelcontextprotocol/inspector bun run src/index.ts

# Test queries:
# - zotero_search { "query": "mediation" }
# - zotero_search { "query": "VanderWeele", "limit": 10 }
# - zotero_get_item { "key": "<actual-key-from-search>" }
# - zotero_cite { "key": "<key>", "style": "apa" }
```

**3. Create Test Script:**

**File:** `tests/test-zotero.sh`
```bash
#!/bin/bash
# Test Zotero integration

set -e

echo "Testing Zotero tools..."

# Test 1: Search
echo "Test 1: Search for 'mediation'"
result=$(echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"zotero_search","arguments":{"query":"mediation","limit":5}}}' | \
  bun run src/index.ts)
echo "$result" | jq .

# Test 2: Get item
echo "Test 2: Get specific item"
# Extract first key from previous search
key=$(echo "$result" | jq -r '.result.content[0].text' | grep -o 'Key: [A-Z0-9]\+' | head -1 | cut -d' ' -f2)
echo "Using key: $key"

result2=$(echo "{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"tools/call\",\"params\":{\"name\":\"zotero_get_item\",\"arguments\":{\"key\":\"$key\"}}}" | \
  bun run src/index.ts)
echo "$result2" | jq .

# Test 3: Citation
echo "Test 3: Generate citation"
result3=$(echo "{\"jsonrpc\":\"2.0\",\"id\":3,\"method\":\"tools/call\",\"params\":{\"name\":\"zotero_cite\",\"arguments\":{\"key\":\"$key\",\"style\":\"apa\"}}}" | \
  bun run src/index.ts)
echo "$result3" | jq .

echo "✅ All Zotero tests passed!"
```

**4. Update README:**
Add Zotero tools to the README with examples.

---

## ✅ Acceptance Criteria

### Functional Requirements
- [ ] Can search 5,931 Zotero items by title, author, abstract
- [ ] Returns structured results (title, authors, year, abstract)
- [ ] Can retrieve detailed item information by key
- [ ] Can generate citations in APA format
- [ ] Handles empty search results gracefully
- [ ] Respects limit parameter

### Non-Functional Requirements
- [ ] Search completes in < 2 seconds for typical queries
- [ ] Proper error handling (database not found, invalid key, etc.)
- [ ] TypeScript types are correct and exported
- [ ] Test script passes all tests
- [ ] No breaking changes to existing tools

### Integration Requirements
- [ ] Works in Claude Code (`claude mcp add`)
- [ ] Works in Claude Desktop (MCP config)
- [ ] MCP Inspector shows tools correctly
- [ ] Tool descriptions are clear for Claude

---

## 🧪 Testing Strategy

### Unit Tests
```typescript
// tests/zotero.test.ts
import { describe, test, expect } from "bun:test";
import { searchZotero, getZoteroItem } from "../src/utils/zotero";

describe("Zotero Integration", () => {
  test("searchZotero returns results", async () => {
    const results = await searchZotero({ query: "mediation", limit: 5 });
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(5);
  });
  
  test("searchZotero handles non-existent query", async () => {
    const results = await searchZotero({ query: "xyznonexistent123" });
    expect(results.length).toBe(0);
  });
  
  test("getZoteroItem returns item details", async () => {
    const searchResults = await searchZotero({ query: "mediation", limit: 1 });
    const item = await getZoteroItem(searchResults[0].key);
    expect(item).toBeTruthy();
    expect(item?.title).toBeTruthy();
  });
});
```

### Integration Tests
Use `tests/test-zotero.sh` to validate end-to-end MCP tool execution.

### Manual Testing in Claude
```
User: "Search my Zotero library for papers on mediation"

Claude: [Uses zotero_search tool]
        Found 247 papers on mediation in your library:
        
        1. VanderWeele & Vansteelandt (2014) - Mediation Analysis with...
        2. Imai et al. (2010) - A general approach to causal mediation...
        ...
        
        Would you like me to create a literature note for any of these?
```

---

## 📊 Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Search speed | < 2s | Time `zotero_search` execution |
| Result accuracy | 100% | Verify results match SQLite direct query |
| Error rate | 0% | Run 100 searches, count failures |
| Claude comprehension | 95%+ | Claude can successfully use tools |

---

## 🚧 Known Limitations & Future Work

### Phase 1 Limitations
- ❌ No full-text PDF search (Phase 2)
- ❌ No annotation extraction (future)
- ❌ No collection browsing (future)
- ❌ Only APA citations (other styles future)
- ❌ No Better BibTeX integration (future)

### Future Enhancements
- Phase 2: Extract and search PDF contents
- Phase 3: Sync annotations to Obsidian vault
- Phase 4: Collection and tag management
- Phase 5: Advanced citation styles (CSL support)

---

## 📁 Files to Create/Modify

### New Files
```
statistical-research/
├── src/
│   ├── utils/
│   │   └── zotero.ts          # NEW (300 lines)
│   └── tools/
│       └── zotero.ts          # NEW (200 lines)
└── tests/
    ├── test-zotero.sh         # NEW (50 lines)
    └── zotero.test.ts         # NEW (100 lines)
```

### Modified Files
```
statistical-research/
├── src/
│   └── index.ts               # MODIFIED (add Zotero tools)
└── README.md                  # MODIFIED (document Zotero tools)
```

**Total New Code:** ~650 lines  
**Modified Code:** ~50 lines

---

## 🎯 Next Steps After Approval

1. **Create feature branch:**
   ```bash
   cd ~/projects/dev-tools/nexus
   git worktree add ../nexus-features/zotero-integration -b feature/zotero-integration
   cd ../nexus-features/zotero-integration
   ```

2. **Implement in this order:**
   - Task 1.1: `src/utils/zotero.ts` (1.5h)
   - Task 1.2: `src/tools/zotero.ts` (1.5h)
   - Task 1.3: Testing & integration (1h)

3. **Test & merge:**
   ```bash
   # Run tests
   cd ~/projects/dev-tools/mcp-servers/statistical-research
   bun test
   ./tests/test-zotero.sh
   
   # Merge to dev
   cd ~/projects/dev-tools/nexus
   git checkout dev
   git merge feature/zotero-integration
   git worktree remove ../nexus-features/zotero-integration
   git branch -d feature/zotero-integration
   ```

---

## ❓ Questions / Clarifications Needed

1. **Better BibTeX integration:** Do you use Better BibTeX in Zotero? If so, we can use citation keys instead of Zotero keys.

2. **Citation styles:** APA only for Phase 1, or should I add BibTeX too?

3. **Search scope:** Should abstract search be included in Phase 1, or just title/author?

4. **Collections:** Priority for collection browsing, or defer to future phase?

---

**Ready to proceed?** Awaiting approval to create feature branch and start implementation.
