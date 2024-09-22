import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useWikipediaService } from '../services/wikipediaService';
import { DataItem } from '../interfaces/Data';
import useOnThisDayStore from '../store/useOnThisDayStore';

vi.mock('../services/wikipediaService', () => ({
  useWikipediaService: vi.fn().mockReturnValue({
    fetchOnThisDay: vi.fn(), // Mock the function here
  }),
}));

const mockData: DataItem[] = [
  { year: 1990, text: 'Some event', pages: [] },
  { year: 1980, text: 'Another event', pages: [] }
];

describe('useOnThisDayStore', () => {
  const store = useOnThisDayStore;

  beforeEach(() => {
    (useWikipediaService as jest.Mock).mockClear();
    (useWikipediaService as jest.Mock).mockReturnValue({
      fetchOnThisDay: vi.fn(),
    });
  });

  it('should fetch and set data correctly when fetch is successful', async () => {
    (useWikipediaService as jest.Mock).mockReturnValue({
      fetchOnThisDay: vi.fn().mockResolvedValue(mockData),
    });

    await act(async () => {
      await store.getState().fetchData();
    });

    expect(store.getState().loading).toBe(false);
    expect(store.getState().data).toEqual(mockData);
    expect(store.getState().error).toBeNull();
  });

  it('should handle error correctly when fetch fails', async () => {
    (useWikipediaService as jest.Mock).mockReturnValue({
      fetchOnThisDay: vi.fn().mockRejectedValue(new Error('Fetch failed')),
    });

    await act(async () => {
      await store.getState().fetchData();
    });

    expect(store.getState().loading).toBe(false);
    expect(store.getState().data).toEqual([]);
    expect(store.getState().error).toBe('Fetch failed');
  });
});
