import readingTime from 'reading-time';

export function getReadingTime(content: string) {
  return readingTime(content).text;
}

export function getTableOfContents(content: string) {
  const headingRegex = /^(##|###)\s+(.*)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1] === '##' ? 2 : 3;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    headings.push({ id, text, level });
  }

  return headings;
}
