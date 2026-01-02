import { describe, expect, it } from 'vitest';

import { getReadingTime, getTableOfContents } from '../src/lib/markdown';

describe('markdown helpers', () => {
  it('builds a table of contents', () => {
    const toc = getTableOfContents('## Hello\n### World');
    expect(toc).toHaveLength(2);
    expect(toc[0].text).toBe('Hello');
  });

  it('returns reading time text', () => {
    const time = getReadingTime('This is a short test content');
    expect(time).toContain('read');
  });
});
