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

const ImageGeneratorScreen = () => {
  // Navigation
  const navigation = useNavigation();
  
  // Global state from Zustand store
  const { 
    imageField,
    setImageField, 
    setRegenerate, 
    regenerate 
  } = useImageStore();
  
  // Local state
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [promptInputHeight, setPromptInputHeight] = useState(40);
  
  // Animations
  const promptInputScale = useSharedValue(1);
  
  // Refs
  const promptInputRef = useRef(null);
  
  // API requests
  const generateImageMutation = useGenerateImageMutation();
  
  const [refetch, setRefetch] = useState(true);
  const textToImageQuery = useTextToImageQuery(imageField.taskId, {
    refetchInterval: refetch ? 3000 : false,
    refetchIntervalInBackground: refetch,
  });

  const isLoading = textToImageQuery?.data?.status == "pending" || textToImageQuery.isLoading || generateImageMutation.isPending;
  const imageUrl = textToImageQuery?.data?.imageUrl ?? imageField.imageUrl;
  
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
  
  // Handle image generation completion
  useEffect(() => {
    const url = textToImageQuery.data?.imageUrl;
    if (url && url.length > 0) {
      setRefetch(false);
      
      // Show success toast when image is successfully generated
      if (textToImageQuery.data?.status === 'completed') {
        // toast.success('Image generated successfully!');
      }
    }
  }, [textToImageQuery.data?.imageUrl, textToImageQuery.data?.status]);

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
    
    const prompt = imageField.prompt;
    setRegenerate(false);
    
    if (!prompt.trim()) {
      // toast.error('Please enter a prompt first');
      return;
    }
    
    // Trigger input animation
    // promptInputScale.value = withSpring(1.05, {}, () => {
      //   promptInputScale.value = withSpring(1);
    // });
    
    setImageField({
      ...imageField,
      status: 'pending',
      taskId: '',
    });
    
    generateImageMutation.mutate(
      { prompt },
      {
        onSuccess: ({ task_id, status }) => {
          setImageField({
            prompt,
            taskId: task_id,
            status,
          });
          setRefetch(true);
          // toast.info('Image generation started');
        },
        onError: () => {
          // toast.error('Failed to start image generation');
          setImageField({
            ...imageField,
            status: 'idle',
          });
        }
      },
    );
  };

  // Copy image URL
  const handleCopyUrl = async () => {
    if (!imageUrl) {
      // toast.error('Image not found');
      return;
    }
    
    try {
      await Clipboard.setStringAsync(imageUrl);
      setIsCopied(true);
      // toast.success('Image URL copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      // toast.error('Failed to copy URL');
    }
  };

  // Download image
  const handleDownload = async () => {
    if (!imageUrl) {
      // toast.error('Image not found');
      return;
    }
    
    if (!permissionGranted) {
      // toast.error('Storage permission not granted');
      return;
    }
    
    try {
      const filename = FileSystem.documentDirectory + `ai-image-${Date.now()}.jpg`;
      const { uri } = await FileSystem.downloadAsync(imageUrl, filename);
      
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('AI Generated', asset, false);
      
      // toast.success('Image saved to gallery');
    } catch (error) {
      // toast.error('Failed to download image');
    }
  };

  // Share image
  const handleShareImage = async () => {
    if (!imageUrl) {
      // toast.error('Image not found');
      return;
    }
    
    try {
      await Share.share({
        title: 'My AI Generated Image',
        message: `Check out this AI image I created with the prompt: "${imageField.prompt}"`,
        url: imageUrl,
      });
    } catch (error) {
      handleCopyUrl();
    }
  };

  // Clear prompt
  const handleClearPrompt = () => {
    setRegenerate(false);
    setImageField({ ...imageField, prompt: "" });
    // @ts-expect-error
    promptInputRef.current?.focus();
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Render loading state
  const RenderLoadingState = () => (
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
  const RenderImageDisplay = () => {
    if (isLoading) {
      return <RenderLoadingState/>;
    }
    
    if (imageUrl) {
      return (
        <View className="flex-1 items-center justify-center p-4">
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={toggleFullscreen}
            className="w-full items-center"
          >
            <Card className="overflow-hidden w-full max-w-sm">
              <Image
                source={{ uri: imageUrl }}
                className="w-full aspect-square rounded-lg"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 left-0 right-0 flex-row justify-between p-3 bg-black/30">
                <View className="flex-row">
                  <TouchableOpacity 
                    onPress={handleDownload} 
                    className="mr-3"
                  >
                    <MaterialIcons name="file-download" size={22} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleShareImage}
                    className="mr-3"
                  >
                    <MaterialIcons name="share" size={22} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleCopyUrl}
                  >
                    <MaterialIcons name="content-copy" size={22} color="#fff" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <MaterialIcons name="fullscreen" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View className="flex-1 items-center justify-center p-4">
        <EmptyState
          icon="image"
          title="Your Vision Awaits"
          description="Enter a prompt below and tap Generate to create your image"
        />
      </View>
    );
  };

  // Render fullscreen image modal
  const renderFullscreenModal = () => (
    isFullscreen && imageUrl && (
      <Animated.View 
        entering={FadeIn}
        exiting={FadeOut}
        className="absolute inset-0 z-50 bg-black"
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1">
            <View className="flex-row justify-end p-4">
              <TouchableOpacity onPress={toggleFullscreen}>
                <MaterialIcons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View className="flex-1 justify-center items-center">
              <Image
                source={{ uri: imageUrl }}
                style={{ width, height: height * 0.7 }}
                resizeMode="contain"
              />
            </View>
            
            <View className="flex-row justify-around p-6">
              <IconButton
                icon="file-download"
                label="Save"
                onPress={handleDownload}
                variant="solid"
              />
              <IconButton
                icon="share"
                label="Share"
                onPress={handleShareImage}
                variant="solid"
              />
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    )
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Top Heading */}
        <View className=" py-4">
          <View className="flex-row items-center px-4">
            <Text className="text-xl font-bold flex-1 text-center mr-6">
              AI Image Generator
            </Text>
          </View>
        </View>
        
        {/* Middle - Image Display Area */}
        <Card style={{marginHorizontal: 15, marginBottom: 20}} className="flex-1 justify-center border ">
          <RenderImageDisplay/>
        </Card>
        
        {/* Bottom - Input & Generate Button */}
        <View className="px-4 pb-4 pt-2 mt-5">
          <Animated.View style={animatedPromptInputStyle} className="mb-3">
            {imageField.prompt.trim() && <View className='flex-row justify-between pb-2'>
                {/* <Button
                    size="sm"
                    variant={"outline"}
                    className="w-fit rounded-full p-1 px-4"
                  >
                    <Text>Enhance my prompt</Text>
                  </Button> */}
                  <PromptSuccessionButton prompt={imageField.prompt}/>
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
                  value={imageField.prompt}
                  onChangeText={(text) => setImageField({ prompt: text })}
                  placeholder="Describe the image you want to create..."
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
                  // onContentSizeChange={(e) => 
                  //   setPromptInputHeight(e.nativeEvent.contentSize.height)
                  // }
                />
              </View>
            </View>
          </Animated.View>
          
          <Button
            onPress={handleGenerateImage}
            disabled={!imageField.prompt || isLoading}
            className="rounded-full"
          >
            <View className="flex-row items-center justify-center">
              {isLoading && (
                <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
              )}
              <Text className="font-medium">
                {isLoading ? 'Generating...' : 
                 isLoading ? 'In Queue...' : 'Generate Image'}
              </Text>
            </View>
          </Button>
        </View>
      </KeyboardAvoidingView>
      
      {/* Fullscreen image modal */}
      {renderFullscreenModal()}
    </SafeAreaView>
  );
};

export default ImageGeneratorScreen;


