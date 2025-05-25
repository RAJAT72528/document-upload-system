export const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

export const preloadComponents = async () => {
  const criticalComponents = [
    () => import('../components/FileUpload/FileUploadContainer'),
    () => import('../components/FileUpload/DropZone'),
    () => import('../components/FileUpload/FileList')
  ];
  
  await Promise.all(criticalComponents.map(component => component()));
};
