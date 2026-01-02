const scriptRegex = /<script[^>]*>[\s\S]*?<\/script>/gi;

export function sanitizeContent(input: string) {
  return input.replace(scriptRegex, '');
}
