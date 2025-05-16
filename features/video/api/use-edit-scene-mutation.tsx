
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

type ResponseType =  {
  status: string
}

type RequestType = {
  jobId: string
  sceneNumber: number;
  json: {
    mode: "replace" | "insert";
    scene_context_prompt?: string;
    preview_image?: File
  }
}

export const useEditSceneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL}/jobs/${json.jobId}/scenes/${json.sceneNumber}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json.jobId),
      });
      if (response.ok) {
        const result: ResponseType = await response.json();
        return result;
      }
      const error = "error while approving blueprint";
      toast.error(error);
      throw new Error(error);
    },
    onSuccess: (res, req) => {
      const jobId = req.jobId
      queryClient.invalidateQueries({ queryKey: ['video-scenes', { jobId }]});
    }
  });
};




