# visualize-mermaid

MCP (Model Context Protocol) server that lets AI agents generate and display Mermaid diagrams in a browser.

## Project Structure

```
src/
  index.ts              # MCP server entry point, tool definitions (what LLMs read at ListTools)
  tools/
    getFormat.ts        # get_mermaid_format tool logic
    renderToWeb.ts      # render_mermaid_to_web tool logic
  utils/
    templates.ts        # All diagram templates, examples, rules (11 types)
  renderer/
    mermaidRenderer.ts  # HTML page generator, uses Mermaid CDN v11
  web/
    server.ts           # Express server
public/static/
  actions.js            # Client-side PDF/PNG export buttons (injected by nginx)
```

## Supported Diagram Types (11)

flowchart, sequence, mindmap, classDiagram, erDiagram, stateDiagram, gantt, pie, journey, timeline, architecture

## Deploy Command

After any code change, always run:

```bash
npm run build && docker compose up -d --build mermaid
```

## Infrastructure

- Docker Compose: 3 services — `mermaid` (Node.js :3000), `nginx` (HTTPS :4443), `cleaner` (cron, deletes HTML > 3 days)
- Domains: `drfmermaid.abrdns.com:4443` and `drfmermaid.duckdns.org:4443`
- Shared volume `views_data` stores generated diagram HTML files
- nginx injects `actions.js` via `sub_filter` — no need to modify HTML templates

## Key Design Decisions

- **Stateless HTTP transport** — each `/mcp` POST creates a fresh MCP server instance (`sessionIdGenerator: undefined`)
- **Client-side rendering** — diagrams rendered by browser via Mermaid CDN v11, no headless browser needed
- **Mermaid CDN v11** — required for `architecture-beta` diagram type (v10 does not support it)
- **All text in English** — tool descriptions, rules, messages are in English for better LLM compatibility

## MCP Tool Behavior

- `get_mermaid_format()` with no args → returns all 11 formats (description + example + template + rules) at once
- `get_mermaid_format("erDiagram")` → returns format for specific type (case-insensitive lookup)
- `render_mermaid_to_web` description instructs LLMs to always call `get_mermaid_format` first

## Known Syntax Pitfalls

- **erDiagram**: entity names must be UPPERCASE, relationship labels cannot contain `>`, `<`, `&`
- **architecture-beta**: labels inside `[ ]` cannot contain `/`, `-`, `&`, `(`, `)`
