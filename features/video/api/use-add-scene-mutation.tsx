
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { toast } from 'sonner-native';

type ResponseType =  {
  status: string
}

type RequestType = {
  jobId: string
  nextSceneNumber: number
  json: {
    mode: "replace" | "insert";
    scene_context_prompt: string;
    preview_image?: File 
  }
}

export const useAddSceneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL}/jobs/${json.jobId}/scenes/${json.nextSceneNumber}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json.json),
      });
      if (response.ok) {
        const result: ResponseType = await response.json();
        return result;
      }
      const error = "error while deleting scene";
      // toast.error(error);
      throw new Error(error);
    },
    onSuccess: (res, req) => {
      const jobId = req.jobId
      queryClient.invalidateQueries({ queryKey: ['video-scenes', { jobId }]});
    }
  });
};




