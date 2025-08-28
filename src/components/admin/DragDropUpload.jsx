import { PictureInPicture, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_NAME_LENGTH = 50;
const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

const DragDropUpload = ({ onFileSelect, selectedFile, onRemove, isRequired = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      alert(`File terlalu besar! Maksimal ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    resizeImage(file, (resizedFile) => {
      onFileSelect(resizedFile);
    });
  };

  const resizeImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = width * ratio;
          height = height * ratio;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          callback(resizedFile);
        }, file.type, 0.8);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getPreviewUrl = (file) => URL.createObjectURL(file);

  const shortenFileName = (name) => {
    return name.length > MAX_FILE_NAME_LENGTH
      ? name.substring(0, MAX_FILE_NAME_LENGTH) + '...'
      : name;
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Gambar {isRequired && <span className="text-red-400">*</span>}
      </label>

      {selectedFile ? (
        <div className="relative">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-800">
                <img
                  src={getPreviewUrl(selectedFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  {shortenFileName(selectedFile.name)}
                </p>
                <p className="text-gray-400 text-xs">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${isDragOver
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-900/50'
            }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isDragOver ? 'bg-blue-500/20' : 'bg-gray-800'
                }`}
            >
              {isDragOver ? (
                <Upload className="w-8 h-8 text-blue-400" />
              ) : (
                <PictureInPicture className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-white text-lg font-medium mb-2">
                {isDragOver ? 'Drop your image here' : 'Upload Image'}
              </p>
              <p className="text-gray-400 text-sm">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Supports: JPG, PNG, GIF (Max 2MB)
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default DragDropUpload;
