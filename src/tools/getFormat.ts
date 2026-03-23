import { MermaidTemplates } from '../utils/templates';

export async function getMermaidFormat(diagramType?: string) {
  if (!diagramType) {
    return {
      supported_types: Object.keys(MermaidTemplates),
      message: "Silakan pilih salah satu tipe untuk mendapatkan format detail.",
    };
  }

  // Case-insensitive lookup: match input against all keys regardless of casing
  const matchedKey = Object.keys(MermaidTemplates).find(
    (k) => k.toLowerCase() === diagramType.toLowerCase()
  );

  if (!matchedKey) {
    throw new Error(
      `Tipe diagram '${diagramType}' tidak didukung. Tipe yang tersedia: ${Object.keys(MermaidTemplates).join(', ')}`
    );
  }

  return MermaidTemplates[matchedKey];
}
