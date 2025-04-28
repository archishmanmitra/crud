import { Video } from '@/types';

// Simple client-side store using localStorage
export const videoStore = {
  getVideos: (): Video[] => {
    if (typeof window === 'undefined') return [];
    
    const videos = localStorage.getItem('videos');
    return videos ? JSON.parse(videos) : [];
  },
  
  addVideo: (video: Omit<Video, 'id' | 'createdAt'>): Video => {
    const videos = videoStore.getVideos();
    const newVideo = {
      ...video,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    localStorage.setItem('videos', JSON.stringify([...videos, newVideo]));
    return newVideo;
  },
  
  updateVideo: (id: string, video: Partial<Omit<Video, 'id' | 'createdAt'>>): Video | null => {
    const videos = videoStore.getVideos();
    const index = videos.findIndex((v) => v.id === id);
    
    if (index === -1) return null;
    
    const updatedVideo = {
      ...videos[index],
      ...video,
    };
    
    videos[index] = updatedVideo;
    localStorage.setItem('videos', JSON.stringify(videos));
    
    return updatedVideo;
  },
  
  deleteVideo: (id: string): boolean => {
    const videos = videoStore.getVideos();
    const filteredVideos = videos.filter((v) => v.id !== id);
    
    if (filteredVideos.length === videos.length) return false;
    
    localStorage.setItem('videos', JSON.stringify(filteredVideos));
    return true;
  }
};