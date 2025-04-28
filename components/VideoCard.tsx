'use client';

import { useState } from 'react';
import { Video } from '@/types';
import UpdateVideoModal from './UpdateVideoModal';

interface VideoCardProps {
  video: Video;
  onDelete: (id: string) => void;
  onUpdate: (id: string, video: Partial<Video>) => void;
}

export default function VideoCard({ video, onDelete, onUpdate }: VideoCardProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this video?')) {
      onDelete(video.id);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video bg-gray-200">
        <img 
          src={video.coverUrl || "/api/placeholder/300/200"} 
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg text-black capitalize font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{video.description}</p>
        
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      
      {isUpdateModalOpen && (
        <UpdateVideoModal
          video={video}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={(updatedVideo) => {
            onUpdate(video.id, updatedVideo);
            setIsUpdateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
