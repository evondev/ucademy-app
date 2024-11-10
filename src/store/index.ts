import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState {
  shouldExpandedPlayer: boolean;
  setShouldExpandedPlayer: (expanded: boolean) => void;
}

const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        shouldExpandedPlayer: false,
        setShouldExpandedPlayer: (expanded) =>
          set({ shouldExpandedPlayer: expanded }),
      }),
      {
        name: 'global-storage',
      },
    ),
  ),
);

export default useGlobalStore;
