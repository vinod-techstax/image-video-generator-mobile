
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

type ResponseType =  {
  success: boolean
}

type RequestType = {
  jobId: string
  sceneNumber: number
}

export const useDeleteSceneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL}/jobs/${json.jobId}/scenes/${json.sceneNumber}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (response.ok) {
        return {
          success: true
        };
      }
      const error = "error while deleting scene";
      toast.error(error);
      throw new Error(error);
    },
    onSuccess: (res, req) => {
      const jobId = req.jobId
      queryClient.invalidateQueries({ queryKey: ['video-scenes', { jobId }]});
    }
  });
};




