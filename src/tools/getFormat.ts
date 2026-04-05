import { MermaidTemplates } from '../utils/templates';

export async function getMermaidFormat(diagramType?: string) {
  if (!diagramType) {
    return {
      supported_types: Object.keys(MermaidTemplates),
      message: "Use render_mermaid_to_web with mermaid_code following the formats above to display a diagram.",
      formats: MermaidTemplates,
    };
  }

  const key = Object.keys(MermaidTemplates).find(
    k => k.toLowerCase() === diagramType.toLowerCase()
  );
  const template = key ? MermaidTemplates[key] : undefined;
  if (!template) {
    throw new Error(
      `Diagram type '${diagramType}' is not supported. Available types: ${Object.keys(MermaidTemplates).join(', ')}`
    );
  }

  return template;
}
