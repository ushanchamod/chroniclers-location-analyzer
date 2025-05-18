// App.tsx
import { useState, useEffect } from "react";
import type { RecentFile } from "./types";
import { DistanceCalculator, FileUpload, RecentFiles } from "./components";
import { calculateDistance, parseInputFile } from "./utils";

const STORAGE_KEY = "chroniclerRecentFiles";

const App = () => {
  const [data, setData] = useState<{
    list1: number[];
    list2: number[];
    distance?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);

  // Load recent files from localStorage on mount
  useEffect(() => {
    const storedFiles = localStorage.getItem(STORAGE_KEY);
    if (storedFiles) {
      setRecentFiles(JSON.parse(storedFiles));
    }
  }, []);

  const handleFileUpload = (content: string, fileName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const parsedData = parseInputFile(content);
      setData(parsedData);

      // Add to recent files
      const newRecentFile = {
        name: fileName,
        date: new Date().toISOString(),
        stats: {
          list1Count: parsedData.list1.length,
          list2Count: parsedData.list2.length,
          distance: calculateDistance(parsedData.list1, parsedData.list2),
        },
      };

      const updatedRecentFiles = [
        newRecentFile,
        ...recentFiles.filter((file) => file.name !== fileName).slice(0, 4),
      ];

      setRecentFiles(updatedRecentFiles);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecentFiles));
    } catch (err) {
      setError(
        "Error parsing the input file. Please ensure it matches the expected format.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecentFileSelect = (file: RecentFile) => {
    setData({
      list1: Array(file.stats.list1Count).fill(0),
      list2: Array(file.stats.list2Count).fill(0),
      distance: file.stats.distance,
    });
  };

  const handleRemoveFile = (fileName: string) => {
    const updatedFiles = recentFiles.filter((file) => file.name !== fileName);
    setRecentFiles(updatedFiles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Chief Chronicler's Location Analyzer
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Upload the input file to calculate the distance between location
            lists
          </p>
        </div>

        <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />

        {recentFiles.length > 0 && (
          <RecentFiles
            files={recentFiles}
            onSelect={handleRecentFileSelect}
            onRemove={handleRemoveFile}
          />
        )}

        {/* Loading and error states remain the same */}
        {isLoading && (
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-500">Processing your file...</p>
          </div>
        )}
        {error && (
          <div className="mt-4 text-center">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        )}
        {/* ... */}

        {data && (
          <div className="mt-8">
            <DistanceCalculator data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
