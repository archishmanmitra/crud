'use client';

import { useState } from 'react';
import { Video } from '@/types';

interface CreateVideoModalProps {
  onClose: () => void;
  onCreate: (video: Omit<Video, 'id' | 'createdAt'>) => void;
}

export default function CreateVideoModal({ onClose, onCreate }: CreateVideoModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      title,
      description,
      coverUrl: coverUrl || '/api/placeholder/300/200',
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl text-black font-bold mb-4">Add New Video</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
              required
              placeholder='Enter video title'
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
              rows={3}
              required
              placeholder='Enter video description'
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-black text-sm font-medium mb-1">Cover Image URL</label>
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full text-gray-700 p-2 border border-gray-300 rounded-md"
              placeholder="Leave empty for default cover"
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
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
