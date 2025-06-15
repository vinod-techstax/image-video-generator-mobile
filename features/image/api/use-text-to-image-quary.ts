import { useQuery } from "@tanstack/react-query";
import { useImageStore } from "../hooks/use-image-store";

// import { toast } from "sonner-native";


type Options = {
  refetchInterval: number | false | undefined,
  refetchIntervalInBackground: boolean | undefined
}

export const useTextToImageQuery = (jobId: string | null, options: Options) => {
  const { setImageField } = useImageStore();
  return useQuery({
    enabled: !!jobId,
    queryKey: ["job", jobId],
    queryFn: async () => {
      return {
        imageUrl: "https://images.unsplash.com/photo-1734102505163-5050877fbf47?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: 'completed'
      }
      const endpoint = `https://common-dev.techstax.ml/proxy/image-gen/status/${jobId}`;
      const response = await fetch(endpoint);
      if (response.ok) {
        const result = await response.json()  
        if(result.status == "completed") {
          const imageUrl = `https://common-dev.techstax.ml/proxy/image-gen/${result.result}`
          setImageField({
            status: result.status,
          });
          console.log({imageUrl})
          return { 
            status: "completed",
            imageUrl 
          };
        }
        return { 
            status: "pending",
            imageUrl: null
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
