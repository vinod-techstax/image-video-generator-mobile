import { GenerateType } from "@/store/use-prompt-input-store";
import { Image, Origami, Video } from "lucide-react-native";

export const generateTypes: GenerateType[] = [
    {
      id: "text-to-image", 
      label: "Text to Image",
      key: "Image",
      icon: Image,
      accept: "image/*",
      urlPlaceholder: "Paste image URL or upload file",
      disabled: false,
    },
    {
      id: "text-to-video", 
      label: "Text to Video",
      key: "TextToVideo",
      icon: Image,
      accept: "image/*",
      urlPlaceholder: "Paste image URL or upload file",
      disabled: false,
    },
    {
      id: "video", 
      label: "Video (Beta)", 
      key: "Video", 
      icon: Video,
      accept: "video/*",
      urlPlaceholder: "Paste video URL or upload file",
      disabled: true,
    },
    {
      id: "vector", 
      label: "Vector (Beta)",
      key: "Vector",
      icon: Origami,
      accept: ".svg,.eps,.ai",
      urlPlaceholder: "Paste vector URL or upload file",
      disabled: true,
    },
  ]