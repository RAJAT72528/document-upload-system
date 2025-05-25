 
function joinPaths(...parts: string[]): string {
  return parts
    .map(part => part.replace(/^\/+|\/+$/g, ''))  
    .filter(Boolean)
    .join('/');
}

const UPLOAD_DIR = 'src/uploaded-files';

export async function saveFile(file: File): Promise<string> {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${timestamp}-${sanitizedName}`;
  const filePath = joinPaths(UPLOAD_DIR, filename);

  try {
    const response = await fetch(`/_fs/write/${filePath}`, {
      method: 'POST',
      body: await file.arrayBuffer(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return filePath;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error(`Failed to save file ${file.name}`);
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    const response = await fetch(`/_fs/delete/${path}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error(`Failed to delete file at ${path}`);
  }
}

export async function loadStoredFiles(): Promise<string[]> {
  try {
    const response = await fetch(`/_fs/list/${UPLOAD_DIR}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const files = await response.json();
    return files
      .filter((file: string) => !file.startsWith('.'))  
      .map((file: string) => joinPaths(UPLOAD_DIR, file));
  } catch (error) {
    console.error('Error loading stored files:', error);
    return [];
  }
}
