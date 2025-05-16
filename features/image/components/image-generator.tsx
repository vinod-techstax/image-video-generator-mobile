import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Sparkles, Image as ImageIcon, Film, ChevronDown } from 'lucide-react-native';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GenerationInput, validateGenerationInput } from '@/types/validation';
import { Text } from '@/components/ui/text';

type GenerationType = 'image' | 'video';

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState<GenerationType>('image');
  const [selectedModel, setSelectedModel] = useState("Stable Diffusion");
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const models = {
    image: ["Stable Diffusion", "DALL-E", "Midjourney"],
    video: ["Runway Gen-2", "Pika Labs", "Stable Video"]
  };

  const generateImage = ({prompt, model}: GenerationInput) => {}

  const generateVideo = ({prompt, model}: GenerationInput) => {}

  const generateMutation = useMutation({
    mutationFn: async (type: GenerationType) => 
      type === 'image' 
        ? generateImage({ prompt, model: selectedModel }) 
        : generateVideo({ prompt, model: selectedModel }),
    onSuccess: (data) => {
      console.log("Generated content:", data);
      // Handle the generated content URL here
    },
    onError: (error) => {
      console.error("Generation error:", error);
      setError("Failed to generate. Please try again.");
    }
  });

  const handleGenerate = () => {
    setError(null);
    
    const validation = validateGenerationInput({
      prompt,
      model: selectedModel
    });
    
    if (!validation.success) {
      setError(validation.error?.[0]?.message || "Invalid input");
      return;
    }
    
    generateMutation.mutate(generationType);
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="flex-1 p-6 items-center justify-center min-h-screen">
        <View className="w-full max-w-md">
          <Text className="text-white text-2xl font-semibold mb-8 text-center">
            Generate images and videos
          </Text>
          
          <View className="bg-gray-900 rounded-lg p-5 mb-8">
            {/* Generation Type Selector */}
            <View className="flex-row mb-4 bg-gray-800 rounded-lg overflow-hidden">
              <TouchableOpacity
                className={`flex-1 flex-row justify-center items-center py-3 ${
                  generationType === 'image' ? 'bg-gray-700' : 'bg-transparent'
                }`}
                onPress={() => setGenerationType('image')}
              >
                <ImageIcon size={18} color="#ffffff" />
                <Text className="text-white ml-2">Image</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`flex-1 flex-row justify-center items-center py-3 ${
                  generationType === 'video' ? 'bg-gray-700' : 'bg-transparent'
                }`}
                onPress={() => setGenerationType('video')}
              >
                <Film size={18} color="#ffffff" />
                <Text className="text-white ml-2">Video</Text>
              </TouchableOpacity>
            </View>
            
            {/* Model Selector */}
            <View className="mb-4">
              <Text className="text-white text-sm mb-2">
                {generationType === 'image' ? 'Image model' : 'Video model'}
              </Text>
              
              <View className="relative">
                <TouchableOpacity 
                  onPress={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
                  className="flex-row items-center justify-between bg-gray-800 rounded-md px-4 py-3"
                >
                  <Text className="text-white">{selectedModel}</Text>
                  <ChevronDown size={16} color="#ffffff" />
                </TouchableOpacity>
                
                {isModelSelectorOpen && (
                  <View className="absolute top-12 left-0 right-0 bg-gray-800 rounded-md z-10 border border-gray-700">
                    {models[generationType].map((model) => (
                      <TouchableOpacity 
                        key={model}
                        className="px-4 py-3 border-b border-gray-700 last:border-b-0"
                        onPress={() => {
                          setSelectedModel(model);
                          setIsModelSelectorOpen(false);
                        }}
                      >
                        <Text className="text-white">{model}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
            
            {/* Prompt Input */}
            <Input
              multiline
              numberOfLines={4}
              placeholder={`Describe the ${generationType} you'd like to create...`}
              value={prompt}
              onChangeText={setPrompt}
            //   helperText={`Add rich details to improve your ${generationType}`}
            //   error={error}
            />
          </View>
          
          {/* Generate Button */}
          <Button
            onPress={handleGenerate}
            disabled={generateMutation.isPending || !prompt.trim()}
          >
            <Text>Generate</Text>
          </Button>
          
          {/* Results would be displayed here */}
        </View>
      </View>
    </ScrollView>
  );
};
