import { describe, expect, it, vi } from 'vitest';

import { GET } from '../src/app/api/search/route';

vi.mock('../src/lib/data', () => ({
  searchPosts: vi.fn(async () => [
    {
      id: '1',
      title: 'Test Post',
      excerpt: 'Excerpt',
      slug: 'test-post',
      category: { name: 'Field Notes', slug: 'field-notes' }
    }
  ])
}));

describe('search API', () => {
  it('returns results from search', async () => {
    const request = new Request('http://localhost:3000/api/search?query=test');
    const response = await GET(request);
    const data = await response.json();

    expect(data.results).toHaveLength(1);
    expect(data.results[0].slug).toBe('test-post');
  });
});
