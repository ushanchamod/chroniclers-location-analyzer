import { useState, type ChangeEvent } from "react";
import { validateInputFile } from "../utils";

interface FileUploadProps {
  onFileUpload: (content: string, fileName: string, isValid: boolean) => void;
  isLoading: boolean;
}

/**
 * FileUpload Component
 * 
 * This component provides a styled file input interface for uploading `.txt` files. 
 * It reads the file content, validates it using a custom `validateInputFile` utility, 
 * and notifies the parent component of the result via a callback.
 * 
 * The component handles:
 * - File selection (click or drag-and-drop)
 * - File reading (as plain text)
 * - Validation of file content
 * - Visual feedback for loading state and errors
 * 
 * @param {Object} props - Props passed to the component.
 * @param {(content: string, fileName: string, isValid: boolean) => void} props.onFileUpload 
 *   Function called after file is read and validated.
 *   - `content`: The content of the file as a string.
 *   - `fileName`: The name of the uploaded file.
 *   - `isValid`: Boolean indicating whether the file passed validation.
 * 
 * @param {boolean} props.isLoading 
 *   If true, disables the file input and shows a loading indicator to prevent further uploads.
 * 
 * @returns {JSX.Element} A file upload input component with drag-and-drop UI, validation, and error handling.
 * 
 * @example
 * <FileUpload 
 *   isLoading={false} 
 *   onFileUpload={(content, fileName, isValid) => {
 *     if (isValid) {
 *       // Process the valid file content
 *     } else {
 *       // Handle invalid file
 *     }
 *   }} 
 * />
 */
const FileUpload = ({ onFileUpload, isLoading }: FileUploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const validation = validateInputFile(content);

        if (!validation.isValid) {
          setError(validation.error ?? null);
          return;
        }

        onFileUpload(content, file.name, true);
      } catch (err) {
        setError("Failed to process file");
        onFileUpload("", file.name, false);
      }
    };

    reader.onerror = () => {
      setError("Error reading file");
      onFileUpload("", file.name, false);
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
                {isLoading ? "This may take a moment" : ""}
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

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Upload a properly formatted text file with two columns of numbers
        </p>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
          <div className="flex items-center">
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export { FileUpload };
