import { create } from "zustand";
import { useWikipediaService } from "../services/wikipediaService";
import { DataItem } from "../interfaces/Data";

interface OnThisDayState {
  data: DataItem[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const useOnThisDayStore = create<OnThisDayState>((set) => {
  const { fetchOnThisDay } = useWikipediaService() as { fetchOnThisDay: (day: number, month: number) => Promise<DataItem[]> };
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  return {
    data: [], // Initialize as an empty array
    loading: false,
    error: null,
    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const data = await fetchOnThisDay(day, month);
        set({ data, loading: false }); // Ensure data is set correctly
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        } else {
          set({ error: String(error), loading: false });
        }
      }
    },
  };
});


export default useOnThisDayStore;