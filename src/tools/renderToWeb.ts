import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createMermaidHtmlPage } from '../renderer/mermaidRenderer';
import { getBaseUrl } from '../web/server';

const viewsDir = path.join(__dirname, '../../public/views');

export async function renderMermaidToWeb(mermaidCode: string) {
  // Validasi input
  if (!mermaidCode || mermaidCode.trim().length === 0) {
    throw new Error('mermaid_code must not be empty.');
  }

  const id = uuidv4();
  const htmlPath = path.join(viewsDir, `${id}.html`);
  const baseUrl = getBaseUrl();

  // Buat HTML page yang merender diagram secara client-side
  await createMermaidHtmlPage(mermaidCode, id, htmlPath);

  return {
    web_url: `${baseUrl}/views/${id}.html`,
    message: 'Open web_url in a browser to view the rendered diagram.',
  };
}
