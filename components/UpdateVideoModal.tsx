'use client';

import { useState } from 'react';
import { Video } from '@/types';

interface UpdateVideoModalProps {
  video: Video;
  onClose: () => void;
  onUpdate: (video: Partial<Video>) => void;
}

export default function UpdateVideoModal({ video, onClose, onUpdate }: UpdateVideoModalProps) {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [coverUrl, setCoverUrl] = useState(video.coverUrl);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      title,
      description,
      coverUrl,
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl text-black font-bold mb-4">Update Video</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-black text-sm font-medium mb-1">Cover Image URL</label>
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
