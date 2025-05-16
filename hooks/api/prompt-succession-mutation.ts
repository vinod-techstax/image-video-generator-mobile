import { waitFor } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner-native';
// import { waitFor } from '../../lib/utils';

type ResponseType = {
  success: boolean;
  statusCode: number;
  data: string[];
  message?: string
};

type RequestType = {
  prompt: string;
};

export const usePromptSuccessionMutation = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {

        // await waitFor(2000)
        // return {
        //     data: [
        //         "Create a vivid image of a sleek racing car, tearing down the track at an astonishing speed of 500 km/h, surrounded by a blur of motion and dynamic colors.",
        //         "Illustrate a high-performance racing car, expertly designed, racing at a staggering 500 kilometers per hour, with a dramatic backdrop of a racetrack and cheering fans.",
        //         "Generate an action-packed scene featuring a state-of-the-art racing car, accelerating at 500 km/h, with dust and debris flying as it leaves a trail of speed.",
        //         "Visualize an adrenaline-fueled moment of a racing car zooming past at 500 km/h, with detailed reflections on its shiny surface and a sense of velocity that captures the essence of speed.",
        //         "Design an electrifying image of a futuristic racing car, pushing the limits at 500 kilometers per hour on a winding racetrack, with vibrant streaks of light illustrating its incredible speed."
        //     ],
        //     message: "",
        //     statusCode: 200,
        //     success: true
        // }

      const endpoint = `https://dummy-site2.techstax.ml/api/suggestion/prompt`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      console.log({ response_ok: response.status });

      if (response.ok) {
        const result: ResponseType = await response.json();
        return result;
      }

      throw new Error('Error while generating prompts');
    },
    onError: () => {
      toast.error('Error while generating prompts');
    },
  });
  return mutation;
};
