import React from 'react';
import { UploadedFile } from '../../types/file.types';
import FileItem from './FileItem';
import { XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileListProps {
  files: UploadedFile[];
  onRemoveFile: (id: string) => void;
  onPreviewFile: (file: UploadedFile) => void;
  onClearAll?: () => void;
}

const FileList: React.FC<FileListProps> = ({ 
  files, 
  onRemoveFile, 
  onPreviewFile,
  onClearAll 
}) => {
  if (files.length === 0) return null;

  const completedFiles = files.filter(f => f.status === 'completed').length;
  const processingFiles = files.filter(f => f.status === 'processing').length;
  const errorFiles = files.filter(f => f.status === 'error').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Files ({files.length}/5)
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            {completedFiles > 0 && (
              <span className="flex items-center text-green-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                {completedFiles} completed
              </span>
            )}
            {processingFiles > 0 && (
              <span className="flex items-center text-blue-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 animate-pulse" />
                {processingFiles} processing
              </span>
            )}
            {errorFiles > 0 && (
              <span className="flex items-center text-red-600">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                {errorFiles} failed
              </span>
            )}
          </div>
        </div>
        {onClearAll && files.length > 1 && (
          <button
            onClick={onClearAll}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg text-sm font-medium",
              "text-gray-700 hover:text-red-600 hover:bg-red-50/80",
              "transition-all duration-200"
            )}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onRemove={onRemoveFile}
            onPreview={onPreviewFile}
          />
        ))}
      </div>
    </div>
  );
};

export default FileList;
