// services/useWikipediaService.test.ts
import { describe, it, expect, vi } from 'vitest';
import { useWikipediaService } from '../services/wikipediaService';

// Mock the global fetch API
global.fetch = vi.fn();

const mockData = {
  events: [
    { year: 1990, text: 'Some event', pages: [] },
    { year: 1980, text: 'Another event', pages: [] }
  ]
};

describe('useWikipediaService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch and return sorted events data', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const { fetchOnThisDay } = useWikipediaService();
    const events = await fetchOnThisDay(25, 12);

    expect(events).toEqual([
      { year: 1980, text: 'Another event', pages: [] },
      { year: 1990, text: 'Some event', pages: [] }
    ]);

    expect(global.fetch).toHaveBeenCalledWith('https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/12/25');
  });

  it('should throw an error when fetch fails', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false
    });

    const { fetchOnThisDay } = useWikipediaService();

    // Expect fetchOnThisDay to throw an error
    await expect(fetchOnThisDay(25, 12)).rejects.toThrow('Failed to fetch data');

    expect(global.fetch).toHaveBeenCalledWith('https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/12/25');
  });

  it('should throw an error when network request fails', async () => {
    // Mock a network failure
    (global.fetch as any).mockRejectedValue(new Error('Network Error'));

    const { fetchOnThisDay } = useWikipediaService();
    await expect(fetchOnThisDay(25, 12)).rejects.toThrow('Failed to fetch data');
  });
});
