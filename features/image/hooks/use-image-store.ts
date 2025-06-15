import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ImageFieldType = {
    prompt: string;
    status: string;
    taskId: string;
    imageUrl?: string;
};

export type ImageGenHistoryType = {
    id: string;
    prompt: string;
    imageUrl: string;
    date: string;
};

interface PromptStoreState {
    imageField: ImageFieldType;
    imageGenHistory: ImageGenHistoryType[];
    regenerate: boolean;
    hydrated: boolean;
    setRegenerate: (regenerate: boolean) => void;
    setImageGenHistory: (history: ImageGenHistoryType[]) => void;
    setImageField: (input: Partial<ImageFieldType>) => void;
    resetImageField: () => void;
    setHydrated: (value: boolean) => void;
}

const initialState: ImageFieldType = {
    prompt: '',
    status: 'idle',
    taskId: '',
};

export const useImageStore = create<PromptStoreState>()(
    persist(
        (set) => ({
            imageField: initialState,
            imageGenHistory: [],
            regenerate: false,
            hydrated: false,
            setRegenerate: (regenerate) => set({ regenerate }),
            setImageGenHistory: (imageGenHistory) => set({ imageGenHistory }),
            setImageField: (input) =>
                set((state) => ({
                    imageField: {
                        ...state.imageField,
                        ...input,
                    },
                })),
            resetImageField: () => set({ imageField: initialState }),
            setHydrated: (value) => set({ hydrated: value }),
        }),
        {
            name: 'image-storage',
            partialize: (state) => ({
                imageGenHistory: state.imageGenHistory,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
