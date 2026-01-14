import { describe, expect, it } from 'vitest';

import { rateLimit } from '../src/lib/rate-limit';

describe('rateLimit', () => {
  it('blocks after reaching limit', () => {
    const key = 'test-key';
    const first = rateLimit(key, 2, 1000);
    const second = rateLimit(key, 2, 1000);
    const third = rateLimit(key, 2, 1000);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
  });
});
