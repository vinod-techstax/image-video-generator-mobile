import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VideoGenStatus } from '../api/use-video-gen-status-query';


export type VideoTitle = {
  id: string;
  title: string;
};

export type ImagePrompt = {
  imageUrl: string;
  prompt?: string;
};

interface VideoGenState {
  videoGenField: {
    jobId: string | null;
    status: VideoGenStatus;
    blueprintReview: 'COMPLETED' | 'PENDING' | 'IDLE';
    sceneReview: 'COMPLETED' | 'PENDING' | 'IDLE';
    audioReview: 'COMPLETED' | 'PENDING' | 'IDLE';
    finalVideo: 'COMPLETED' | "PENDING" | 'IDLE';
    finalVideoUrl: string | null;
  };
  setVideoGenField: (fields: Partial<VideoGenState['videoGenField']>) => void;
  resetVideoGenFields: () => void; 
}

const initialState = {
  jobId: null,
  status: 'LOADING' as VideoGenStatus,

  blueprintReview: 'IDLE' as const,
  sceneReview: 'IDLE' as const,
  audioReview: 'COMPLETED' as const,
  finalVideo: 'IDLE' as const,
  
  finalVideoUrl: null,
};

export const useVideoGenStore = create<VideoGenState>()(
  persist(
    (set) => ({
      videoGenField: initialState,
      setVideoGenField: (fields) =>
        set((state) => ({
          videoGenField: {
            ...state.videoGenField,
            ...fields,
          },
        })),
    resetVideoGenFields: () =>
      set({
        videoGenField: initialState,
      }), 
    }),
    {
      name: 'video-gen-storage', // unique name for localStorage key
      partialize: (state) => ({ 
        videoGenField: { 
          jobId: state.videoGenField.jobId,

          blueprintReview: state.videoGenField.blueprintReview,
          sceneReview: state.videoGenField.sceneReview,
          audioReview: state.videoGenField.audioReview,
          finalVideo: state.videoGenField.finalVideo,
          
          finalVideoUrl: state.videoGenField.finalVideoUrl,
        } 
      }),
    }
  )
);