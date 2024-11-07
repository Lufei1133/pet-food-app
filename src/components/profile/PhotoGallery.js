import React, { useState } from 'react';
import { Camera, Calendar, Heart, Download } from 'lucide-react';

const PhotoGallery = ({ petInfo }) => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: '/api/placeholder/400/300',
      date: '2024-01-15',
      caption: 'Morning walk',
      likes: 12
    },
    {
      id: 2,
      url: '/api/placeholder/400/300',
      date: '2024-01-10',
      caption: 'Play time',
      likes: 8
    }
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhoto = {
        id: photos.length + 1,
        url: URL.createObjectURL(file),
        date: new Date().toISOString().split('T')[0],
        caption: 'New photo',
        likes: 0
      };
      setPhotos([newPhoto, ...photos]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
          <Camera className="inline-block w-5 h-5 mr-2" />
          Upload Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {photo.date}
                </div>
                <div className="flex items-center">
                  <button className="text-red-500 hover:text-red-600">
                    <Heart className="w-5 h-5" />
                  </button>
                  <span className="ml-1 text-gray-600">{photo.likes}</span>
                </div>
              </div>
              <p className="text-gray-700">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;