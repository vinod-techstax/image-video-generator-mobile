import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Share,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useImageStore } from '@/features/image/hooks/use-image-store';
import { useGenerateImageMutation } from '@/features/image/api/use-generate-image-mutation';
import { useTextToImageQuery } from '@/features/image/api/use-text-to-image-quary';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
// import { toast } from 'sonner-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Custom component imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/features/image/components/empty-state';
import { IconButton } from '@/features/image/components/icon-button';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { PromptSuccessionButton } from '@/components/prompt-succession-button';
import { useGenerateVideoMutation } from '@/features/video/api/use-generate-video-mutation';
import { useTextToVideoQuery } from '@/features/video/api/use-text-to-video-quary';
import { useVideoGenStore } from '@/features/video/hooks/use-generate-video-store';
import { useUser } from '@/hooks/use-user';
import { useGenerateTextToVideoMutation } from '@/features/video/api/use-generate-text-to-video-mutation';
import ViewVideo from '@/components/view-video';

const VideoGeneratorScreen = () => {
  // Navigation
  const navigation = useNavigation();
  const user = useUser();
  const [prompt, setPrompt] = useState('');
  const [jobId, setJobId] = useState('');
  // Global state from Zustand store
  const { resetVideoGenFields, setVideoGenField, videoGenField } = useVideoGenStore();

  // Local state
  const [isCopied, setIsCopied] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [promptInputHeight, setPromptInputHeight] = useState(40);

  // Animations
  const promptInputScale = useSharedValue(1);

  // Refs
  const promptInputRef = useRef(null);

  // API requests
  const generateTextToVideoMutation = useGenerateTextToVideoMutation();

  const [refetch, setRefetch] = useState(true);
  const textToVideoQuery = useTextToVideoQuery(jobId, {
    refetchInterval: refetch ? 3000 : false,
    refetchIntervalInBackground: refetch,
  });

  const isLoading = textToVideoQuery.isLoading || textToVideoQuery.data?.status == 'GENERATING_SCENES' || generateTextToVideoMutation.isPending;
  const videoUrl = textToVideoQuery.data?.videoUrl ?? null;

  const { colors } = useTheme()
  // Screen dimensions
  const { width, height } = Dimensions.get('window');

  // Request media library permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const url = textToVideoQuery.data?.videoUrl;
    console.log("videoUrl")
    console.log({videoUrl: url})
    if (url && url.length > 0) {
      setRefetch(false);
    }
  }, [textToVideoQuery.data?.videoUrl]);

  // Animations
  const animatedPromptInputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: promptInputScale.value }],
    };
  });

  // Image generation
  const handleGenerateImage = () => {
    console.log("handleGenerateImage")
    Keyboard.dismiss();

    if (!prompt.trim()) {
      // toast.error('Please enter a prompt first');
      return;
    }

    // Trigger input animation
    promptInputScale.value = withSpring(1.05, {}, () => {
      promptInputScale.value = withSpring(1);
    });


    generateTextToVideoMutation.mutate(
      { prompt: prompt, user_id: user?.id },
      {
        onSuccess: ({ job_id }) => {
          setJobId(job_id);
        },
      },
    );
  };

  // Copy image URL
  const handleCopyUrl = async () => {
    if (!videoUrl) {
      // toast.error('Image not found');
      return;
    }

    try {
      await Clipboard.setStringAsync(videoUrl);
      setIsCopied(true);
      // toast.success('Image URL copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      // toast.error('Failed to copy URL');
    }
  };

  // Download image
  const handleDownload = async () => {
    if (!videoUrl) {
      // toast.error('Image not found');
      return;
    }

    if (!permissionGranted) {
      // toast.error('Storage permission not granted');
      return;
    }

    try {
      const filename = FileSystem.documentDirectory + `ai-image-${Date.now()}.mp4`;
      const { uri } = await FileSystem.downloadAsync(videoUrl, filename);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('AI Generated', asset, false);

      // toast.success('Image saved to gallery');
    } catch (error) {
      // toast.error('Failed to download image');
    }
  };

  // Share image
  const handleShareImage = async () => {
    if (!videoUrl) {
      // toast.error('Image not found');
      return;
    }

    try {
      await Share.share({
        title: 'My AI Generated Image',
        message: `Check out this AI image I created with the prompt: "${prompt}"`,
        url: videoUrl,
      });
    } catch (error) {
      handleCopyUrl();
    }
  };

  // Clear prompt
  const handleClearPrompt = () => {
    setPrompt("");
    // @ts-expect-error
    promptInputRef.current?.focus();
  };

  // Render loading state
  const renderLoadingState = () => (
    <View className="flex-1 justify-center items-center bg-gray-900/50 rounded-lg">
      <ActivityIndicator size="large" color="#6366F1" />
      <Text className="mt-4  font-medium">
        {isLoading ? 'Waiting in queue...' : 'Creating your masterpiece...'}
      </Text>
      <Text className="mt-1  text-muted-foreground text-sm">
        This may take a moment
      </Text>
    </View>
  );

  // Render image display (center content)
  const renderImageDisplay = () => {
    if (isLoading) {
      return renderLoadingState();
    }

    if (videoUrl) {
      return (
        <View className="flex-1 items-center justify-center p-4 ">
          <TouchableOpacity
            activeOpacity={0.9}
            className="w-full items-center h-full"
          >
            <Card className="overflow-hidden w-full max-w-sm h-full">
              <ViewVideo
                videoSource={videoUrl}
              />
              <View className="absolute bottom-0 left-0 right-0 flex-row justify-between p-3 bg-black/30">
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={handleDownload}
                    className="mr-3"
                  >
                    <MaterialIcons name="file-download" size={22} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleShareImage}
                    className="mr-3"
                  >
                    <MaterialIcons name="share" size={22} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCopyUrl}
                  >
                    <MaterialIcons name="content-copy" size={22} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="flex-1 items-center justify-center p-4">
        <EmptyState
          icon="videocam"
          title="Your Vision Awaits"
          description="Enter a prompt below and tap Generate to create your video"
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 s">

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Top Heading */}
        <View className=" py-4">
          <View className="flex-row items-center px-4">
            <Text className="text-xl font-bold flex-1 text-center mr-6">
              AI Video Generator
            </Text>
          </View>
        </View>

        {/* Middle - Image Display Area */}
        <Card style={{marginHorizontal: 15, marginBottom: 20}} className="flex-1 justify-center border ">
          {renderImageDisplay()}
        </Card>

        {/* Bottom - Input & Generate Button */}
        <View className="px-4 pb-4 pt-2">
          <Animated.View style={animatedPromptInputStyle} className="mb-3">
            {prompt.trim() && <View className='flex-row justify-between pb-2'>
              <PromptSuccessionButton prompt={prompt} />
              (
              <Button
                size="sm"
                variant={"ghost"}
                onPress={handleClearPrompt}
                className="w-fit"
              >
                <MaterialIcons name="clear" size={20} color="#9CA3AF" />
              </Button>
              )
            </View>}
            <View className="bg-gray-800 rounded-lg flex-row pr-2">
              <View className='w-full relative' style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: "gray",
                borderRadius: 8,
                padding: 1, // This creates space for the focus effect
              }}>
                <Textarea
                  multiline
                  className='w-full'
                  value={prompt}
                  onChangeText={(text) => setPrompt(text)}
                  placeholder="Describe the video you want to create..."
                  style={{
                    height: Math.max(100),
                    padding: 12,
                    // color: {colors},
                    fontSize: 16,
                    // minHeight: 48,
                    // maxHeight: 20,
                    textAlignVertical: 'top',
                    borderRadius: 7, // Slightly less than parent to align with inner border,
                    borderWidth: 0
                  }}
                  onContentSizeChange={(e) =>
                    setPromptInputHeight(e.nativeEvent.contentSize.height)
                  }
                />
              </View>
            </View>
          </Animated.View>

          <Button
            onPress={handleGenerateImage}
            disabled={!prompt || isLoading}
            className="rounded-full"
          >
            <View className="flex-row items-center justify-center">
              {isLoading && (
                <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
              )}
              <Text className="font-medium">
                {isLoading ? 'Generating...' :
                  isLoading ? 'In Queue...' : 'Generate Video'}
              </Text>
            </View>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VideoGeneratorScreen;


