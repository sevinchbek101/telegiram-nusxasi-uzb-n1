import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  X,
  File,
  Camera
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const FileUpload = ({ onFileUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    // Validate file size (max 2GB for demo)
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 2GB",
        variant: "destructive"
      });
      return;
    }

    const fileType = getFileType(file);
    const fileSize = formatFileSize(file.size);

    if (fileType === 'image') {
      // For images, create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      onFileUpload({
        type: 'image',
        text: imageUrl,
        fileName: file.name,
        fileSize: fileSize
      });
    } else {
      // For other files
      onFileUpload({
        type: 'file',
        text: file.name,
        fileName: file.name,
        fileSize: fileSize
      });
    }

    toast({
      title: "File uploaded",
      description: `${file.name} has been shared`
    });
  };

  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'file';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fileTypes = [
    { type: 'image', icon: ImageIcon, label: 'Photos', accept: 'image/*' },
    { type: 'video', icon: Video, label: 'Videos', accept: 'video/*' },
    { type: 'audio', icon: Music, label: 'Audio', accept: 'audio/*' },
    { type: 'document', icon: FileText, label: 'Documents', accept: '.pdf,.doc,.docx,.txt,.rtf' },
    { type: 'file', icon: File, label: 'Files', accept: '*' }
  ];

  return (
    <Card className="mt-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Share a file</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* File Type Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {fileTypes.map(({ type, icon: Icon, label, accept }) => (
            <div key={type}>
              <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
                id={`file-${type}`}
              />
              <label 
                htmlFor={`file-${type}`}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <Icon className="w-8 h-8 text-[#0088cc]" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-[#0088cc] bg-[#0088cc]/5' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Drag and drop files here, or 
            <label className="text-[#0088cc] cursor-pointer hover:underline">
              browse
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
            </label>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Maximum file size: 2GB
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;