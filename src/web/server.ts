import express from 'express';
import path from 'path';
import fs from 'fs/promises';

const app = express();
// FIX: PORT via environment variable dengan fallback
const PORT = parseInt(process.env.PORT || '3000', 10);

// Folder publik (relatif dari dist/web/ setelah build)
const publicDir = path.join(__dirname, '../../public');
const viewsDir = path.join(publicDir, 'views');

export async function ensureDirectories(): Promise<void> {
  await fs.mkdir(viewsDir, { recursive: true });
}

// Serve static files (HTML pages)
app.use('/views', express.static(viewsDir));

let serverInstance: ReturnType<typeof app.listen> | null = null;

export function startWebServer(): void {
  serverInstance = app.listen(PORT, () => {
    // Log ke stderr agar tidak mengganggu stdio MCP transport
    console.error(`Web server running at http://localhost:${PORT}`);
  });
}

export function stopWebServer(): void {
  if (serverInstance) {
    serverInstance.close();
    serverInstance = null;
  }
}

export function getBaseUrl(): string {
  return `http://localhost:${PORT}`;
}
