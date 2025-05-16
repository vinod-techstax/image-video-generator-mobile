import { useQuery } from "@tanstack/react-query";

// import { toast } from "sonner";


type Options = {
  refetchInterval: number | false | undefined,
  refetchIntervalInBackground: boolean | undefined
}

export const useTextToVideoQuery = (jobId: string | null, options: Options) => {
  
  return useQuery({
    enabled: !!jobId,
    queryKey: ["job", jobId],
    queryFn: async () => {

      return {
         status: "COMPLETED",
         videoUrl: "https://www.youtube.com/watch?v=_oBqUa5ncvE"
      }

      const endpoint = `https://common-dev.techstax.ml/proxy/text2video/status/${jobId}`;
      const response = await fetch(endpoint);
      if (response.ok) {
        const result = await response.json()
        if(result.status == "COMPLETED") { // or GENERATING_SCENES
          const videoUrl = `https://common-dev.techstax.ml/proxy/text2video/video/${jobId}`
          console.log("video gen statuus COMPLETED", videoUrl)
          return { 
            status: result.status,
            videoUrl 
          };
        }
        return { 
            status: result.status,
            videoUrl: null
          };
      }
      const error = "error while fetching video";
    //   toast.error(error);
      throw new Error(error);
    },
    refetchInterval: options.refetchInterval,
    refetchIntervalInBackground: options.refetchIntervalInBackground
  });
};
