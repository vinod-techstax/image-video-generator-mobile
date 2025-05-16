import { z } from 'zod';

export const GenerationSchema = z.object({
  prompt: z.string()
    .min(3, "Prompt must be at least 3 characters")
    .max(1000, "Prompt cannot exceed 1000 characters"),
  model: z.string()
});

export type GenerationInput = z.infer<typeof GenerationSchema>;

export const validateGenerationInput = (input: Partial<GenerationInput>) => {
  try {
    return {
      success: true,
      data: GenerationSchema.parse(input),
      error: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        error: error.errors
      };
    }
    return {
      success: false,
      data: null,
      error: [{ message: "An unknown error occurred" }]
    };
  }
};