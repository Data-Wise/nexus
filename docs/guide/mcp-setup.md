---
title: MCP Setup
---

# MCP Setup

**⏱️ Time: 5 min**

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nexus": {
      "command": "node",
      "args": ["~/.obsidian/plugins/nexus/connector.js"]
    }
  }
}
```
