import React, { useState, useEffect } from 'react';
import { X, FileText, FileImage, Loader2, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { UploadedFile } from '../../types/file.types';
import { formatFileSize, getFileTypeIcon } from '../../utils/fileValidation';
import { cn } from '../../lib/utils';
import { Progress } from '../ui/Progress';

interface FileItemProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
  onPreview: (file: UploadedFile) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove, onPreview }) => {
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if (file.status === 'processing') {
      setProgress(0);
      const duration = 2000;  
      const interval = 50;  
      const steps = duration / interval;
      const increment = 100 / steps;
      let currentProgress = 0;

      const timer = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= 100) {
          clearInterval(timer);
        } else {
          setProgress(currentProgress);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [file.status]);

  const getStatusIcon = () => {
    switch (file.status) {
      case 'pending':
        return <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />;
    }
  };

  const getStatusText = () => {
    switch (file.status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
    }
  };

  const getFileIcon = () => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="w-6 h-6 text-blue-500 transition-colors group-hover:text-blue-600" />;
    }
    return <FileText className="w-6 h-6 text-blue-500 transition-colors group-hover:text-blue-600" />;
  };

  const canPreview = file.status === 'completed' && 
    (file.type.startsWith('image/') || 
     file.type === 'text/plain' || 
     file.type === 'application/pdf' || 
     file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

  return (
    <div className={cn(
      "group flex flex-col p-5 bg-white rounded-xl border transition-all duration-300",
      "hover:shadow-lg",
      file.status === 'processing' && "border-blue-200/50 bg-blue-50/30",
      file.status === 'error' && "border-red-200/50 bg-red-50/30",
      file.status === 'completed' && "border-gray-100 hover:border-blue-100",
      "transform hover:-translate-y-0.5"
    )}>
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          {getFileIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-gray-900 truncate group-hover:text-blue-700">
              {file.name}
            </p>
            <div className="flex items-center space-x-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {canPreview && (
                <button
                  onClick={() => onPreview(file)}
                  className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50/80 transition-all"
                  title="Preview file"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onRemove(file.id)}
                className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50/80 transition-all"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500 group-hover:text-gray-600">
              {formatFileSize(file.size)}
            </p>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className={cn(
                "text-sm font-medium transition-colors",
                file.status === 'completed' && "text-green-600",
                file.status === 'processing' && "text-blue-600",
                file.status === 'pending' && "text-yellow-600",
                file.status === 'error' && "text-red-600"
              )}>
                {getStatusText()}
                {file.status === 'processing' && ` ${Math.round(progress)}%`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {file.status === 'processing' && (
        <div className="mt-4">
          <Progress
            value={progress}
            indicatorColor={cn(
              "bg-gradient-to-r from-blue-400 to-blue-500",
              "animate-pulse"
            )}
            className="h-1"
          />
        </div>
      )}

      {file.status === 'error' && file.errorMessage && (
        <p className="text-sm text-red-600 mt-3 animate-fadeIn">
          {file.errorMessage}
        </p>
      )}
    </div>
  );
};

export default FileItem;
