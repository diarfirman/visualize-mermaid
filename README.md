# MCP Mermaid Visual Server

MCP Server untuk membuat dan memvisualisasikan diagram [Mermaid](https://mermaid.js.org/) langsung di browser. Diagram dirender secara **client-side** via Mermaid.js CDN — tidak memerlukan Puppeteer atau headless browser.

## Fitur

- **8 tipe diagram** didukung: flowchart, sequence, mindmap, classDiagram, erDiagram, stateDiagram, gantt, pie
- **Render via browser** — diagram dibuka lewat link HTTP lokal
- **XSS-safe** — semua input di-escape sebelum ditulis ke HTML
- **MCP-compatible** — bisa diintegrasikan dengan Claude Desktop atau MCP client lainnya

## Cara Kerja

```
MCP Client → render_mermaid_to_web → generate HTML → serve via Express → buka di browser
```

1. Tool menerima kode Mermaid
2. Membuat file `.html` di `public/views/`
3. Express server menyajikan file di `http://localhost:3000/views/<id>.html`
4. Browser membuka link dan merender diagram menggunakan Mermaid.js CDN

## Instalasi

```bash
git clone https://github.com/diarfirman/visualize-mermaid.git
cd visualize-mermaid
npm install
npm run build
```

## Menjalankan Server

```bash
npm start
```

Server MCP berjalan via stdio. Web server otomatis berjalan di `http://localhost:3000`.

Untuk mengubah port:

```bash
PORT=4000 npm start
```

## Tools MCP

### `get_mermaid_format`

Mengembalikan template dan contoh untuk tipe diagram tertentu.

**Parameter:**

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `diagram_type` | string | Tidak | Tipe diagram. Kosongkan untuk melihat semua tipe yang tersedia. |

**Tipe yang didukung:** `flowchart`, `sequence`, `mindmap`, `classDiagram`, `erDiagram`, `stateDiagram`, `gantt`, `pie`

**Contoh response (tanpa parameter):**
```json
{
  "supported_types": ["flowchart", "sequence", "mindmap", ...],
  "message": "Silakan pilih salah satu tipe untuk mendapatkan format detail."
}
```

---

### `render_mermaid_to_web`

Merender kode Mermaid menjadi halaman web dan mengembalikan URL untuk dibuka di browser.

**Parameter:**

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `mermaid_code` | string | Ya | Kode Mermaid yang valid. |

**Contoh response:**
```json
{
  "web_url": "http://localhost:3000/views/43aafb08-0dff-434f-8ea6-e2361ceba68d.html",
  "message": "Buka web_url di browser untuk melihat diagram yang dirender."
}
```

## Contoh Penggunaan

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

## Konfigurasi Claude Desktop

Tambahkan ke file `claude_desktop_config.json`:

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

## Struktur Proyek

```
src/
├── index.ts                  # Entry point — MCP server + web server
├── renderer/
│   └── mermaidRenderer.ts    # Generate HTML page dengan Mermaid.js CDN
├── tools/
│   ├── getFormat.ts          # Tool: get_mermaid_format
│   └── renderToWeb.ts        # Tool: render_mermaid_to_web
├── utils/
│   └── templates.ts          # Template & contoh untuk semua tipe diagram
└── web/
    └── server.ts             # Express server — serve file HTML di public/views/
```

## Development

```bash
# Jalankan langsung dengan ts-node (tanpa build)
npm run dev

# Build TypeScript
npm run build

# Cek vulnerability
npm audit
```

## Lisensi

MIT
