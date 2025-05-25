import React, { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DropZoneProps {
  onFilesAdded: (files: FileList) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  disabled?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({
  onFilesAdded,
  isDragging,
  setIsDragging,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      onFilesAdded(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(e.target.files);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 sm:p-12 text-center",
        "transition-all duration-300 ease-out transform",
        "cursor-pointer group min-h-[280px] flex items-center justify-center",
        isDragging ? (
          "bg-blue-50/80 border-2 border-blue-500/50 scale-[1.02]"
        ) : (
          "bg-gray-50/80 border-2 border-gray-200/80 hover:border-blue-400/50 hover:bg-blue-50/50"
        ),
        disabled && "opacity-50 cursor-not-allowed",
        "backdrop-blur-sm"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Drop zone for file upload"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
        aria-hidden="true"
      />
      
      <div className="flex flex-col items-center space-y-6">
        <div className={cn(
          "p-6 rounded-full transition-all duration-300",
          isDragging ? (
            "bg-blue-100/80 scale-110"
          ) : (
            "bg-white shadow-sm group-hover:bg-blue-50/80 group-hover:scale-105"
          )
        )}>
          {isDragging ? (
            <Upload className="h-10 w-10 text-blue-500 transition-transform animate-bounce" />
          ) : (
            <FileText className="h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
          )}
        </div>
        
        <div className="space-y-3">
          <p className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {isDragging ? "Drop your files here" : "Drag & drop your files"}
          </p>
          <p className="text-base text-gray-500 group-hover:text-gray-600 transition-colors">
            or <span className="text-blue-500 hover:text-blue-600">browse</span> to choose files
          </p>
          <div className="pt-2">
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Supports PDF, DOCX, TXT, PNG, JPG • Max 5 files • Up to 10MB each
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
