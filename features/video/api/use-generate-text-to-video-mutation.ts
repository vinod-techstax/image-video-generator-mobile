import { waitFor } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner-native';

// import { waitFor } from '../../../lib/utils';

type ResponseType = {
  job_id: string;
};

type RequestType = {
  prompt: string;
  user_id: string
};

export const useGenerateTextToVideoMutation = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log({ json });

      await waitFor(2000)
      return {
        job_id: "f87d1be8ae424a9fb35fd0bca334c25f",
      }

      const endpoint = `https://common-dev.techstax.ml/proxy/text2video/generate`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      console.log({response_ok: response.status})

      if(response.ok) {
        const result: ResponseType = await response.json()
        return result
      }
      throw new Error("Error while generating video")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};
