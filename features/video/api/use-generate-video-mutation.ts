
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";
import { useVideoGenStore } from "../hooks/use-generate-video-store";

type ResponseType = {
  message: string;
  job_id: string;
  youtube_url: string;
};

type RequestType = {
  text_prompt: string
  file: File | null;
  youtube_url: string;
};

export const useGenerateVideoMutation = () => {
  const { setVideoGenField } = useVideoGenStore()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {

      // console.log("video_video_m ")
      // setVideoGenField({
      //   jobId: "1ldfgjbnldkbfgm"
      // })
      // await waitFor(2000)
      // return {
      //   job_id: "1ldfgjbnldkbfgm",
      //   message: "Started",
      //   file_url: json.file_url
      // }

      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL}/process-video`;
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
        setVideoGenField({
          jobId: result.job_id,
        })
        return result
      }      
      throw new Error("Error while generating video")
    },
    onError: () => {
      toast.error("Error while generating video")
    }
  });
  return mutation;
};







