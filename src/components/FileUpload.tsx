import type { ChangeEvent } from "react";

interface FileUploadProps {
  onFileUpload: (content: string, fileName: string) => void;
  isLoading: boolean;
}

const FileUpload = ({ onFileUpload, isLoading }: FileUploadProps) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileUpload(content, file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="w-full relative group">
        <label
          className={`
            flex flex-col items-center justify-center 
            w-full h-48 px-4 py-6 
            transition-all duration-300 ease-in-out
            border-2 border-dashed rounded-xl
            ${
              isLoading
                ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                : `
                border-blue-400 bg-white hover:border-blue-600 
                hover:bg-blue-50 cursor-pointer
                focus-within:ring-4 focus-within:ring-blue-200
              `
            }
            overflow-hidden relative
          `}
        >
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
            <div
              className={`p-3 mb-3 rounded-full ${isLoading ? "bg-gray-200" : "bg-blue-100"} transition-colors`}
            >
              <svg
                className={`w-8 h-8 ${isLoading ? "text-gray-400" : "text-blue-600"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <div className="space-y-1">
              <p
                className={`text-lg font-medium ${isLoading ? "text-gray-500" : "text-gray-700"}`}
              >
                {isLoading ? "Processing your file..." : "Click to upload"}
              </p>
              <p
                className={`text-sm ${isLoading ? "text-gray-400" : "text-gray-500"}`}
              >
                {isLoading ? "This may take a moment" : "or drag and drop"}
              </p>
              <p
                className={`text-xs mt-2 ${isLoading ? "text-gray-400" : "text-blue-600"}`}
              >
                TXT files only
              </p>
            </div>
          </div>

          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={isLoading}
            accept=".txt"
          />
        </label>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      {/* File requirements */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Upload a properly formatted text file with two columns of numbers
        </p>
      </div>
    </div>
  );
};

export { FileUpload };
