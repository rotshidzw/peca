import { describe, expect, it } from 'vitest';

import { sanitizeContent } from '../src/lib/sanitize';

describe('sanitizeContent', () => {
  it('removes script tags', () => {
    const cleaned = sanitizeContent('<script>alert(1)</script><p>safe</p>');
    expect(cleaned).toBe('<p>safe</p>');
  });
});
