import { Model } from '@/store/use-prompt-input-store';
import { Palette, Bot, Sparkles, Mountain, Image as ImageIcon, Video, Clapperboard, Orbit, Film, RefreshCw, Search, Brain, ScrollText, Zap, Hand } from 'lucide-react-native';

type ModelType = {
    video_models: Model[],
    image_models: Model[],
    vector_models: Model[],
    text_to_video_models: Model[]
}

export const models: ModelType = {
  video_models: [
    {
      label: 'Sora',
      icon: Video,
      id: 'sora',
      type: 'Video',
    },
    {
      label: 'Runway ML',
      icon: Clapperboard,
      id: 'runway-ml',
      type: 'Video',
    },
    {
      label: 'Pika Labs',
      icon: Orbit,
      id: 'pika-labs',
      type: 'Video',
    },
    {
      label: 'Gen-2',
      icon: Film,
      id: 'gen-2',
      type: 'Video',
    },
    {
      label: 'AnimateDiff',
      icon: RefreshCw,
      id: 'animatediff',
      type: 'Video',
    },
  ],
  image_models: [
    {
      label: 'Stable Diffusion',
      icon: Palette,
      id: 'stable-diffusion',
      type: 'Image',
    },
    {
      label: 'DALL·E 3',
      icon: Bot,
      id: 'dalle-3',
      type: 'Image',
    },
    {
      label: 'MidJourney',
      icon: Sparkles,
      id: 'midjourney',
      type: 'Image',
    },
    {
      label: 'Imagen',
      icon: Mountain,
      id: 'imagen',
      type: 'Image',
    },
    {
      label: 'DeepFloyd IF',
      icon: ImageIcon,
      id: 'deepfloyd-if',
      type: 'Image',
    },
  ],
  vector_models: [
    {
      label: 'CLIP',
      icon: Search,
      id: 'clip',
      type: 'Vector',
    },
    {
      label: 'OpenAI Embeddings',
      icon: Brain,
      id: 'openai-embeddings',
      type: 'Vector',
    },
    {
      label: 'Sentence-BERT',
      icon: ScrollText,
      id: 'sentence-bert',
      type: 'Vector',
    },
    {
      label: 'FastText',
      icon: Zap,
      id: 'fasttext',
      type: 'Vector',
    },
    {
      label: 'GLoVE',
      icon: Hand,
      id: 'glove',
      type: 'Vector',
    },
  ],
  text_to_video_models: [],
};