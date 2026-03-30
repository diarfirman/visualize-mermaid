# MCP Mermaid Visual Server

> [Bahasa Indonesia](README.id.md)

An MCP Server for creating and visualizing [Mermaid](https://mermaid.js.org/) diagrams directly in the browser. Diagrams are rendered **client-side** via the Mermaid.js CDN — no Puppeteer or headless browser required.

## Features

- **8 diagram types** supported: flowchart, sequence, mindmap, classDiagram, erDiagram, stateDiagram, gantt, pie
- **Browser-based rendering** — diagrams are opened via a local HTTP link
- **XSS-safe** — all input is escaped before being written to HTML
- **MCP-compatible** — integrates with Claude Desktop or any MCP client

## How It Works

```
MCP Client → render_mermaid_to_web → generate HTML → serve via Express → open in browser
```

1. The tool receives Mermaid code
2. Generates an `.html` file in `public/views/`
3. Express serves the file at `http://localhost:3000/views/<id>.html`
4. The browser opens the link and renders the diagram using Mermaid.js CDN

## Installation

```bash
git clone https://github.com/diarfirman/visualize-mermaid.git
cd visualize-mermaid
npm install
npm run build
```

## Running the Server

```bash
npm start
```

The MCP server runs over stdio. The web server automatically starts at `http://localhost:3000`.

To change the port:

```bash
PORT=4000 npm start
```

## MCP Tools

### `get_mermaid_format`

Returns the template and examples for a specific diagram type.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `diagram_type` | string | No | Diagram type. Leave empty to list all supported types. |

**Supported types:** `flowchart`, `sequence`, `mindmap`, `classDiagram`, `erDiagram`, `stateDiagram`, `gantt`, `pie`

**Example response (no parameter):**
```json
{
  "supported_types": ["flowchart", "sequence", "mindmap", "..."],
  "message": "Please choose a type to get detailed format."
}
```

---

### `render_mermaid_to_web`

Renders Mermaid code into a web page and returns a URL to open in the browser.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mermaid_code` | string | Yes | Valid Mermaid code. |

**Example response:**
```json
{
  "web_url": "http://localhost:3000/views/43aafb08-0dff-434f-8ea6-e2361ceba68d.html",
  "message": "Open web_url in your browser to view the rendered diagram."
}
```

## Usage Examples

### Flowchart

```
graph TD
    A[Start] --> B{Decision?}
    B -->|Yes| C[Process]
    B -->|No| D[End]
    C --> D
```

### Sequence Diagram

```
sequenceDiagram
    participant User
    participant Server
    User->>Server: HTTP Request
    Server-->>User: HTTP Response
```

### ER Diagram

```
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
```

## Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mermaid-visual": {
      "command": "node",
      "args": ["/path/to/visualize-mermaid/dist/index.js"]
    }
  }
}
```

## Project Structure

```
src/
├── index.ts                  # Entry point — MCP server + web server
├── renderer/
│   └── mermaidRenderer.ts    # Generates HTML page with Mermaid.js CDN
├── tools/
│   ├── getFormat.ts          # Tool: get_mermaid_format
│   └── renderToWeb.ts        # Tool: render_mermaid_to_web
├── utils/
│   └── templates.ts          # Templates and examples for all diagram types
└── web/
    └── server.ts             # Express server — serves HTML files from public/views/
```

## Development

```bash
# Run directly with ts-node (no build step)
npm run dev

# Build TypeScript
npm run build

# Check for vulnerabilities
npm audit
```

## License

MIT
