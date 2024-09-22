import { DataItem } from "../interfaces/Data";

export const useWikipediaService = () => {
  const fetchOnThisDay = async (day: number, month: number): Promise<DataItem[]> => {
    try {
      const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      return data.events.sort((a: DataItem, b: DataItem) => a.year - b.year);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
  };

  return { fetchOnThisDay }; 
};