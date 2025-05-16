import { generateTypes } from '@/constants/generate-types';
import { models } from '@/constants/modes';
import { LucideProps } from 'lucide-react-native';
import { create } from 'zustand';

export type GenerateTypeKey = "Video" | 'Image' | "Vector" | "TextToVideo"

export type GenerateType = {
  id: string;
  label: string;
  key: GenerateTypeKey;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  disabled?: boolean
  accept: string;
  urlPlaceholder: string;
}

export type Model = {
    id: string;
    label: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: GenerateTypeKey
}

type PromptInput = {
    prompt: string;
    file: File | null;
    fileUrl: string;
    model: Model | null;
    generateType: GenerateType | null
};

interface PromptStoreState {
    promptInput: PromptInput;
    setPromptInput: (input: Partial<PromptInput>) => void;
}

const defaultGenerateType = generateTypes[0] ?? null
const defaultModel = models.video_models[0] ?? null

export const usePromptInputStore = create<PromptStoreState>((set) => ({
    promptInput: {
        prompt: '',
        file: null,
        fileUrl: '',
        generateType: defaultGenerateType,
        model: defaultModel
    },
    setPromptInput: (input) => set((state) => ({
        promptInput: {
            ...state.promptInput,
            ...input
        }
    }))
}));