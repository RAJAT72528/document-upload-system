import { ALLOWED_TYPES, FILE_LIMITS } from "../types/file.types";

export const validateFileType = (file: File): boolean => {
  return Object.keys(ALLOWED_TYPES).includes(file.type);
};

export const validateFileSize = (file: File): boolean => {
  return file.size <= FILE_LIMITS.MAX_FILE_SIZE;
};

export const validateTotalSize = (files: File[]): boolean => {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  return totalSize <= FILE_LIMITS.MAX_TOTAL_SIZE;
};

export const getFileTypeIcon = (type: string): string => {
  switch (true) {
    case type.startsWith('image/'):
      return 'image';
    case type === 'application/pdf':
      return 'pdf';
    case type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'docx';
    case type === 'text/plain':
      return 'txt';
    default:
      return 'file';
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getValidationError = (file: File, existingFiles: File[] = []): string | null => {
  
  const isValidType = Object.entries(ALLOWED_TYPES).some(([mimeType, extensions]: [string, readonly string[]]) => {
    return file.type === mimeType || Array.from(extensions).some((ext: string) => file.name.toLowerCase().endsWith(ext));
  });

  if (!isValidType) {
    return 'Invalid file type. Supported types: PDF, DOCX, TXT, PNG, JPG';
  }

  
  if (file.size > FILE_LIMITS.MAX_FILE_SIZE) {
    return `File size exceeds ${formatFileSize(FILE_LIMITS.MAX_FILE_SIZE)} limit`;
  }

   
  if (existingFiles.length >= FILE_LIMITS.MAX_FILES) {
    return `Maximum ${FILE_LIMITS.MAX_FILES} files allowed`;
  }

  
  const totalSize = existingFiles.reduce((sum, f) => sum + f.size, 0) + file.size;
  if (totalSize > FILE_LIMITS.MAX_TOTAL_SIZE) {
    return `Total size exceeds ${formatFileSize(FILE_LIMITS.MAX_TOTAL_SIZE)} limit`;
  }

   
  if (existingFiles.some(f => f.name === file.name && f.size === file.size)) {
    return 'A file with the same name and size already exists';
  }

  return null;
};

export const isImageFile = (type: string): boolean => {
  return type.startsWith('image/');
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};
