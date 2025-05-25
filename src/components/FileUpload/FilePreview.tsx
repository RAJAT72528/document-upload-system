import React, { useState, useEffect } from 'react';
import { X, FileText, Download } from 'lucide-react';
import { UploadedFile } from '../../types/file.types';
import { formatFileSize } from '../../utils/fileValidation';
import { cn } from '../../lib/utils';

interface FilePreviewProps {
  file: UploadedFile | null;
  onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const [textContent, setTextContent] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [docxUrl, setDocxUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (file) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [file]);

  useEffect(() => {
    if (!file) return;

    if (file.type === 'text/plain') {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTextContent(e.target?.result as string || '');
        setIsLoading(false);
      };
      reader.readAsText(file.file);
    }

    if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
      const url = URL.createObjectURL(file.file);
      if (file.type === 'application/pdf') {
        setPdfUrl(url);
      } else {
        setDocxUrl(url);
      }
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  if (!file) return null;

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(onClose, 300); 
  };

  const renderPreviewContent = () => {
    if (file.type.startsWith('image/') && file.previewUrl) {
      return (
        <div className="flex justify-center items-center bg-gray-50/80 rounded-xl p-4">
          <img
            src={file.previewUrl}
            alt={file.name}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      );
    }

    if (file.type === 'text/plain') {
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-48">
            <div className="text-gray-500">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Loading...
            </div>
          </div>
        );
      }
      return (
        <div className="bg-gray-50/80 p-6 rounded-xl backdrop-blur-sm">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono bg-white p-4 rounded-lg shadow-sm max-h-[70vh] overflow-auto">
            {textContent}
          </pre>
        </div>
      );
    }

    if (file.type === 'application/pdf') {
      return (
        <div className="w-full h-[70vh] rounded-xl overflow-hidden shadow-lg bg-white">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title={`Preview of ${file.name}`}
          />
        </div>
      );
    }

    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
      return (
        <div className="w-full h-[70vh] rounded-xl overflow-hidden shadow-lg bg-white">
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(docxUrl)}`}
            className="w-full h-full"
            title={`Preview of ${file.name}`}
            frameBorder="0"
          />
        </div>
      );
    }

    return (
      <div className="text-center py-12 bg-gray-50/80 rounded-xl">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-2">Preview not available</p>
        <p className="text-gray-500 text-sm">
          Click download to view this file type
        </p>
      </div>
    );
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(file.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300",
        modalOpen ? "opacity-100" : "opacity-0"
      )}
      onClick={handleClose}
    >
      <div 
        className={cn(
          "bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl transition-all duration-300",
          modalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b bg-gray-50/80 backdrop-blur-sm">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {file.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors flex items-center space-x-2"
              title="Download file"
            >
              <Download className="w-5 h-5" />
              <span className="text-sm font-medium">Download</span>
            </button>
            <button
              onClick={handleClose}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50/80 rounded-lg transition-colors"
              title="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {renderPreviewContent()}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
