import { useQuery } from "@tanstack/react-query";

import { toast } from "sonner-native";
import { useVideoGenStore } from "../hooks/use-generate-video-store";

export type VideoGenStatus = 
  "LOADING" |
  "CREATED" |
  "DOWNLOADING" |
  "TRANSCRIBING" |
  "ANALYZING" |
  "GENERATING_BLUEPRINT" |
  "AWAITING_BLUEPRINT_REVIEW" |
  "GENERATING_SCENES" |
  "AWAITING_SCENE_REVIEW" |
  "INTERPOLATING_FRAMES" |
  "ASSEMBLING_VIDEO" |
  "UPLOADING_TO_DRIVE" |
  "DRIVE_UPLOAD_FAILED" |
  "UPLOADING_TO_YOUTUBE" |
  "YOUTUBE_UPLOAD_FAILED" |
  "COMPLETED" |
  "FAILED";

type ResponseType = {
  job_id: string;
  status: VideoGenStatus;
  youtube_url: string;
  output_path: string | null;
  error: string | null;
  details: string;
  start_time: string;
  end_time: string | null;
  created_at: string;
};

type Options = {
  refetchInterval: number | false | undefined,
  refetchIntervalInBackground: boolean | undefined
}

export const useVideoGenStatusQuery = (jobId: string | null, options: Options) => {
  const { setVideoGenField } = useVideoGenStore();
  return useQuery({
    enabled: !!jobId,
    queryKey: ["job", jobId],
    queryFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL}/status/${jobId}`;
      const response = await fetch(endpoint);
      if (response.ok) {
        const result: ResponseType = await response.json();
        setVideoGenField({
          status: result.status,
        })
        if(result.status == "COMPLETED") {
          setVideoGenField({
            finalVideo: "COMPLETED",
            finalVideoUrl: result.output_path,
          })
        }
        return result;
      }
      const error = "error while fetching video";
      toast.error(error);
      throw new Error(error);
    },
    refetchInterval: options.refetchInterval,
    refetchIntervalInBackground: options.refetchIntervalInBackground
  });
};

// const statuses: VideoGenStatus[] = [
//   "LOADING",
//   "CREATED",
//   "DOWNLOADING",
//   "TRANSCRIBING",
//   "ANALYZING",
//   "GENERATING_BLUEPRINT",
//   "AWAITING_BLUEPRINT_REVIEW",
//   "GENERATING_SCENES",
//   "AWAITING_SCENE_REVIEW",
//   "INTERPOLATING_FRAMES",
//   "ASSEMBLING_VIDEO",
//   "UPLOADING_TO_DRIVE",
//   "UPLOADING_TO_YOUTUBE",
//   "COMPLETED"
// ];

// type ResponseType = {
//   job_id: string;
//   status: VideoGenStatus;
//   youtube_url: string;
//   output_path: string | null;
//   error: string | null;
//   details: string;
//   start_time: string;
//   end_time: string | null;
//   created_at: string;
// };

// type Options = {
//   refetchInterval?: number | false;
//   refetchIntervalInBackground?: boolean;
// };

// export const useVideoQuery = (jobId: string | null, options: Options = {}) => {
//   const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
//   const { setVideoGenField } = useVideoGenStore();
  
//   // Update status every 2 seconds
//   useEffect(() => {
//     if (!jobId || currentStatusIndex >= statuses.length - 1) return;
    
//     const interval = setInterval(() => {
//       setCurrentStatusIndex(prev => {
//         const nextIndex = prev + 1;
//         return Math.min(nextIndex, statuses.length - 1); // Don't go beyond last status
//       });
//     }, 2000);
    
//     return () => clearInterval(interval);
//   }, [jobId, currentStatusIndex]);

//   return useQuery<ResponseType>({
//     enabled: !!jobId,
//     queryKey: ["video", jobId],
//     queryFn: async () => {
//       const currentStatus = statuses[currentStatusIndex] ?? "LOADING";

//       console.log({currentStatus})
      
//       const mockResponse: ResponseType = {
//         job_id: jobId ?? "",
//         status: currentStatus,
//         youtube_url: "https://www.youtube.com/watch?v=n-07s0oObI8",
//         output_path: currentStatus === "COMPLETED" ? "https://www.youtube.com/watch?v=RmHqTpcFNjU" : null,
//         error: null,
//         details: `Mock details for ${currentStatus}`,
//         start_time: new Date().toISOString(),
//         end_time: currentStatus === "COMPLETED" ? new Date().toISOString() : null,
//         created_at: new Date().toISOString()
//       };

//       setVideoGenField({
//         status: currentStatus
//       });
      
//       return mockResponse;
//     },
//     refetchInterval: false, // We handle the timing via useEffect
//     refetchIntervalInBackground: false
//   });
// };




