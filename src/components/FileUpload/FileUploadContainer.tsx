import React, { useState } from 'react';
import { Trash2, AlertCircle, Info, X } from 'lucide-react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { UploadedFile, FILE_LIMITS } from '../../types/file.types';
import { formatFileSize } from '../../utils/fileValidation';
import DropZone from './DropZone';
import FileList from './FileList';
import FilePreview from './FilePreview';
import { cn } from '../../lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '../ui/drawer';

const FileUploadContainer: React.FC = () => {
  const {
    files,
    isDragging,
    setIsDragging,
    addFiles,
    removeFile,
    clearFiles,
    totalSize,
    remainingSpace,
    isAtCapacity
  } = useFileUpload();

  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

  const handlePreviewFile = (file: UploadedFile) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <button 
            className="fixed top-6 right-6 w-11 h-11 rounded-full bg-white/90 hover:bg-white/95 backdrop-blur-sm transition-all duration-300 flex items-center justify-center shadow-lg border border-white/20 z-50 group"
            aria-label="Author information"
          >
            <Info className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white/95 backdrop-blur-xl border-l border-white/20">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900">About</h2>
              <DialogTrigger asChild>
                <button 
                  className="rounded-full p-2.5 hover:bg-black/5 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogTrigger>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex flex-col items-center space-y-7">
                  <div className="relative">
                    <img 
                      src="/github-pic.png" 
                      alt="Rajat Singh" 
                      className="w-32 h-32 rounded-full shadow-xl ring-4 ring-white/90"
                    />
                    <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none"></div>
                  </div>
                  
                  <div className="text-center space-y-1">
                    <h3 className="text-2xl font-semibold text-gray-900">Rajat Singh</h3>
                    <p className="text-gray-500">Sr. Software Engineer </p>
                    <p className="text-gray-500"> 8+ Years of Experience</p>

                  </div>

                  <div className="w-full space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2.5">About the Project</h4>
                      <p className="text-gray-600 leading-relaxed">
                       A modern, robust, and highly customizable document upload and preview system built with <strong>React</strong> and <strong>TypeScript</strong>. This application provides a seamless user experience for uploading, managing, and previewing documents, with persistent storage and a UI inspired by Apple’s design principles.
                      </p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2.5">Features</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                          Drag & Drop File Upload
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                          File Preview Support
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                          Progress Tracking
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-8 border-b bg-gradient-to-br from-gray-50 via-white to-blue-50">
           
          
          <DropZone
            onFilesAdded={addFiles}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            disabled={isAtCapacity}
          />
          
          {isAtCapacity && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200/50 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Maximum file limit reached ({FILE_LIMITS.MAX_FILES} files)
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Please remove some files to upload more.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {files.length > 0 && (
          <div>
            <div className="p-6">
              <FileList
                files={files}
                onRemoveFile={removeFile}
                onPreviewFile={handlePreviewFile}
                onClearAll={clearFiles}
              />
            </div>
          </div>
        )}
      </div>
      
      <FilePreview
        file={previewFile}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default FileUploadContainer;
