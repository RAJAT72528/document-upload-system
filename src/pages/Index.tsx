import FileUploadContainer from "../components/FileUpload/FileUploadContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFD]">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
            Document Upload
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Simple and secure file management system. Upload, preview, and manage your documents with ease.
          </p>
        </header>
        <FileUploadContainer />
      </div>
    </div>
  );
};

export default Index;