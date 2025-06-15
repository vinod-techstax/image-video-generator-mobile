import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EnhancedPromptsStoreType {
  enhancedPrompts: string[];
  enhancedPromptsIsLoading: boolean;
  setEnhancedPrompts: (prompts: string[]) => void;
  setEnhancedPromptsIsLoading: (enhancedPromptsIsLoading: boolean) => void;
  resentEnhancedPrompts: () => void;
}

export const useEnhancedPromptsStore = create<EnhancedPromptsStoreType>()(
  persist(
    (set) => ({
      enhancedPrompts: [],
      enhancedPromptsIsLoading: false,
      setEnhancedPrompts: (enhancedPrompts) =>
        set({ enhancedPrompts, enhancedPromptsIsLoading: false }),
      setEnhancedPromptsIsLoading: (enhancedPromptsIsLoading) =>
        set({ enhancedPromptsIsLoading }),
      resentEnhancedPrompts: () =>
        set({ enhancedPrompts: [], enhancedPromptsIsLoading: false }),
    }),
    {
      name: 'enhanced-prompts-storage',
      partialize: (state) => ({
        enhancedPrompts: state.enhancedPrompts,
      }),
    },
  ),
);
