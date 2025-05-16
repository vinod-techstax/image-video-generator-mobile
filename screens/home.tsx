import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { useGenerateVideoMutation } from '@/features/video/api/use-generate-video-mutation';
import { useGenerateTextToVideoMutation } from '@/features/video/api/use-generate-text-to-video-mutation';
import { useGenerateImageMutation } from '@/features/image/api/use-generate-image-mutation';
import { usePromptInputStore } from '@/store/use-prompt-input-store';
// import { toast } from 'sonner-native';
import { router } from 'expo-router';
import { ROUTE } from '@/constants/route';
import { useVideoGenStore } from '@/features/video/hooks/use-generate-video-store';
import { useImageStore } from '@/features/image/hooks/use-image-store';
import { Sparkles } from 'lucide-react-native';
import { Spinner } from '@/components/spinner';
import { useNavigation, useTheme } from '@react-navigation/native';
import { generateTypes } from '@/constants/generate-types';

type TabKey = "text-to-image" | "text-to-video";

type TabType = {
  id: string;
  key: TabKey;
  label: string;
  description: string;
}

const tabs: TabType[] = [
  { id: "1", key: "text-to-image", label: "Text to Image", description: "Transform your text descriptions into stunning AI-generated images" },
  { id: "2", key: "text-to-video", label: "Text to Video", description: "Create dynamic videos from text prompts with AI-generated content" },
]

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>(tabs[0].key);

  const { colors } = useTheme();

  const { promptInput, setPromptInput } = usePromptInputStore()
  const { file, fileUrl, prompt, generateType, model } = promptInput

  const generateTextToVideoMutation = useGenerateTextToVideoMutation()
  const generateImageMutation = useGenerateImageMutation()

  const { setVideoGenField, resetVideoGenFields } = useVideoGenStore()
  const { setImageField, resetImageField } = useImageStore()

  const isLoading = generateTextToVideoMutation.isPending || generateImageMutation.isPending

  const navigation = useNavigation()

  const handleGenerate = (selectedPrompt?: string) => {
  
    const _prompt = selectedPrompt ?? prompt
    setPromptInput({prompt: _prompt})

    resetVideoGenFields()
    resetImageField()


    if (!_prompt.trim() && !file && !fileUrl.trim()) {
      // toast.error('Please enter a prompt or provide a file/URL');
      return;
    }

    if(!model) {
      // toast.error('Please select a model');
      return;
    }

    if(generateType?.key == "TextToVideo") {
      generateTextToVideoMutation.mutate({
        prompt: _prompt,
        user_id: "123"
      }, {
        onSuccess: (res) => {
          setVideoGenField({
            jobId: res.job_id,
          })
          navigation.navigate(ROUTE.GENERATE_IMAGE as never)
        }
      })
    }

    if(generateType?.key == "Image") {
     
      generateImageMutation.mutate(
        { prompt: _prompt,
        }, 
        {
          onSuccess: ({ task_id, status }) => {
            setImageField({ prompt: _prompt, taskId: task_id, status })
            navigation.navigate(ROUTE.GENERATE_IMAGE as never)
          },
        },
      )
    }
  };

  const onTabChange = (value: string) => {
    setSelectedTab(value as TabKey)
    const _generateType = generateTypes.find(item => item.id == value)
    setPromptInput({generateType: _generateType})
  }

  return (
    <View className='flex-1 justify-center p-6'>
      <Tabs
        value={selectedTab}
        onValueChange={onTabChange}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          {tabs.map((tab) => (
            <TabsTrigger disabled={isLoading} key={tab.id} value={tab.key} className='flex-1'>
              <Text>{tab.label}</Text>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
        <TabsContent key={tab.id} value={tab.key}>
          <Card>
            <CardHeader>
              <CardTitle>{tab.label}</CardTitle>
              <CardDescription>
                {tab.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='name'>Prompt</Label>
                <Input aria-disabled={isLoading} aria-aria-labelledby='prompt' value={prompt} onChangeText={(text) => setPromptInput({prompt: text})} />
              </View>
            </CardContent>
            <CardFooter className='flex-row justify-center'>
              <Button disabled={isLoading} className='rounded-full px-10 flex flex-row' onPress={(e) => {
                    e.preventDefault()
                    handleGenerate()
                  }}>
                  {!isLoading && <Sparkles size={16} style={{marginRight: 5}} color={colors.background} className="mr-2 transition-transform text-[#ea60da]" />}
                  {isLoading && <Spinner style={{marginRight: 5}} size={20} />}
                  {isLoading && <Text>Generating...</Text>}
                  {!isLoading && <Text>Generate</Text>}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        ))}
      </Tabs>
    </View>
  )
}

export default HomeScreen