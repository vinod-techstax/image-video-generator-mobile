
import { waitFor } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";

type ResponseType = {
  task_id: string;
  status: string;
};

type RequestType = {
  prompt: string
};

export const useGenerateImageMutation = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {

      await waitFor(2000)
      return {
        task_id: "50b92819-4c77-4a2a-b811-05b54d10e110",
        status: "completed",
      }

      const endpoint = `https://common-dev.techstax.ml/proxy/image-gen/generate`;
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
      throw new Error("Error while generating image")
    },
    onError: () => {
      toast.error("Error while generating image")
    }
  });
  return mutation;
};







