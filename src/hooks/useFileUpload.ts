import { useState, useCallback, useEffect, useRef } from 'react';
import { UploadedFile, FILE_LIMITS } from '../types/file.types';
import { getValidationError } from '../utils/fileValidation';
import { saveFile, deleteFile } from '../utils/fileStorage';
import { toast } from 'sonner';

export const useFileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const mountedRef = useRef(true);

  const generateId = () => Math.random().toString(36).substr(2, 9);

 
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

   
  useEffect(() => {
    const newTotalSize = files.reduce((acc, file) => acc + file.size, 0);
    setTotalSize(newTotalSize);
  }, [files]);

  const processFile = useCallback(async (uploadedFile: UploadedFile) => {
    if (!mountedRef.current) return;

    setFiles(prev => prev.map(f => 
      f.id === uploadedFile.id 
        ? { ...f, status: 'processing' as const }
        : f
    ));
    
    try {
      const storedPath = await saveFile(uploadedFile.file);
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      if (mountedRef.current) {
        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { 
                ...f, 
                status: 'completed' as const, 
                storedPath,
                previewUrl: f.type.startsWith('image/') 
                  ? URL.createObjectURL(f.file) 
                  : undefined
              }
            : f
        ));
        toast.success(`${uploadedFile.name} processed successfully`);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      if (mountedRef.current) {
        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'error' as const, errorMessage: 'Failed to process file' }
            : f
        ));
        toast.error(`Failed to process ${uploadedFile.name}`);
      }
    }
  }, []);

  const addFiles = useCallback((fileList: FileList) => {
    if (!mountedRef.current) return;

    const newFiles: UploadedFile[] = [];
    const errors: string[] = [];
    const currentFileCount = files.length;
    let processedCount = 0;

    Array.from(fileList).forEach(file => {
      if (currentFileCount + processedCount >= FILE_LIMITS.MAX_FILES) {
        errors.push(`Cannot upload "${file.name}" - Maximum ${FILE_LIMITS.MAX_FILES} files limit reached`);
        return;
      }

      const error = getValidationError(file, files.map(f => f.file));
      if (error) {
        errors.push(`${file.name}: ${error}`);
        return;
      }

      const uploadedFile: UploadedFile = {
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
      };

      if (file.type.startsWith('image/')) {
        uploadedFile.previewUrl = URL.createObjectURL(file);
      }

      newFiles.push(uploadedFile);
      processedCount++;
    });

    if (errors.length > 0) {
      toast.error(errors.join('\n'));
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      setTimeout(() => {
        if (mountedRef.current) {
          newFiles.forEach(file => processFile(file));
        }
      }, 0);
      toast.success(`Added ${newFiles.length} file${newFiles.length === 1 ? '' : 's'}`);
    }
  }, [files, processFile]);

  const removeFile = useCallback(async (id: string) => {
    if (!mountedRef.current) return;

    const fileToRemove = files.find(f => f.id === id);
    if (!fileToRemove) return;

    try {
      if (fileToRemove.storedPath) {
        await deleteFile(fileToRemove.storedPath);
      }

      if (fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }

      setFiles(prev => prev.filter(f => f.id !== id));
      toast.info(`Removed ${fileToRemove.name}`);
    } catch (error) {
      console.error('Error removing file:', error);
      toast.error(`Failed to remove ${fileToRemove.name}`);
    }
  }, [files]);

  const clearFiles = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      await Promise.all(
        files
          .filter(f => f.storedPath)
          .map(f => deleteFile(f.storedPath!))
      );

      files.forEach(file => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });

      setFiles([]);
      toast.info('Cleared all files');
    } catch (error) {
      console.error('Error clearing files:', error);
      toast.error('Failed to clear some files');
    }
  }, [files]);

  return {
    files,
    isDragging,
    setIsDragging,
    addFiles,
    removeFile,
    clearFiles,
    totalSize,
    remainingSpace: FILE_LIMITS.MAX_TOTAL_SIZE - totalSize,
    isAtCapacity: files.length >= FILE_LIMITS.MAX_FILES
  };
};
