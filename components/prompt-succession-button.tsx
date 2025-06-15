import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react-native';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePromptSuccessionMutation } from '@/hooks/api/prompt-succession-mutation';
import { useEnhancedPromptsStore } from '@/store/use-enhanced-prompts-store';
import { Text } from '@/components/ui/text';
import { useTheme } from '@react-navigation/native';

type PromptSuccessionButtonProps = ButtonProps & {
  isLoading?: boolean;
  prompt: string;
};

export const PromptSuccessionButton = ({
  prompt,
  isLoading,
  className,
  variant = 'outline',
  size = 'sm',
  ...props
}: PromptSuccessionButtonProps) => {
  const { colors } = useTheme()
  const { enhancedPromptsIsLoading, setEnhancedPrompts, setEnhancedPromptsIsLoading } = useEnhancedPromptsStore();
  const promptSuccessionMutation = usePromptSuccessionMutation();

  const handlePromptEnhance = () => {
    setEnhancedPromptsIsLoading(true);
    promptSuccessionMutation.mutate(
      { prompt },
      {
        onSuccess: (res) => {
          setEnhancedPrompts(res.data);
        },
        onError: () => {
          setEnhancedPromptsIsLoading(false);
        }
      },
    );
  };

  return (

    <Button
      disabled={isLoading || enhancedPromptsIsLoading || !prompt.trim()}
      size="sm"
      variant={variant}
      className="w-fit rounded-full p-1 px-4 flex-row"
      {...props}
      onPress={handlePromptEnhance}
    >
      {enhancedPromptsIsLoading ? (
        <Loader2 style={{marginRight: 5}} color={colors.primary} size={16} className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles style={{marginRight: 5}} color={colors.primary} size={16} className="mr-2 h-4 w-4" />
      )}
      <Text>Enhance my prompt</Text>
    </Button>

    // <Button
    //   variant={variant}
    //   size={size}
    //   onPress={handlePromptEnhance}
    //   disabled={isLoading || enhancedPromptsIsLoading || !prompt.trim()}
    //   className={cn('rounded-full', className)}
    //   {...props}
    // >
    // {enhancedPromptsIsLoading ? (
    //   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    // ) : (
    //   <Sparkles className="mr-2 h-4 w-4" />
    // )}
    // <Text>Enhance my prompt</Text>
    // </Button>
  );
};