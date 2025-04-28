'use client';

import { useEffect, useState } from 'react';
import { Video } from '@/types';
import { videoStore } from '@/lib/videoStore';
import VideoCard from '@/components/VideoCard';
import CreateVideoModal from '@/components/CreateVideoModal';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  useEffect(() => {
    setVideos(videoStore.getVideos());
  }, []);
  
  const handleCreateVideo = (video: Omit<Video, 'id' | 'createdAt'>) => {
    const newVideo = videoStore.addVideo(video);
    setVideos([...videos, newVideo]);
  };
  
  const handleUpdateVideo = (id: string, video: Partial<Video>) => {
    const updatedVideo = videoStore.updateVideo(id, video);
    if (updatedVideo) {
      setVideos(videos.map(v => v.id === id ? updatedVideo : v));
    }
  };
  
  const handleDeleteVideo = (id: string) => {
    const deleted = videoStore.deleteVideo(id);
    if (deleted) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-zinc-900 font-bold">Video Library</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add New Video
        </button>
      </div>
      
      {videos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-xl text-gray-600">No videos in your library yet.</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Your First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              onDelete={handleDeleteVideo}
              onUpdate={handleUpdateVideo}
            />
          ))}
        </div>
      )}
      
      {isCreateModalOpen && (
        <CreateVideoModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateVideo}
        />
      )}
    </div>
  );
}