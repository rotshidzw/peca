import { describe, expect, it } from 'vitest';

import { getPagination } from '../src/lib/pagination';

describe('getPagination', () => {
  it('returns total pages', () => {
    const pagination = getPagination(1, 10, 45);
    expect(pagination.totalPages).toBe(5);
  });

  it('detects next and previous pages', () => {
    const pagination = getPagination(2, 10, 30);
    expect(pagination.hasPreviousPage).toBe(true);
    expect(pagination.hasNextPage).toBe(true);
  });
});
