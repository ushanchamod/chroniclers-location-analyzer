import type { RecentFile } from "../types";

interface RecentFilesProps {
  files: RecentFile[];
  onSelect: (file: RecentFile) => void;
  onRemove: (fileName: string) => void;
}

const RecentFiles = ({ files, onSelect, onRemove }: RecentFilesProps) => {
  const handleRemove = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    onRemove(fileName);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Recently Uploaded Files
        </h3>
        <span className="text-sm text-gray-500">{files.length} files</span>
      </div>

      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={`${file.name}-${file.date}`}
            className="group relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={() => onSelect(file)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span className="font-medium text-gray-800 truncate">
                    {file.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-1"></span>
                    List 1: {file.stats.list1Count}
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                    List 2: {file.stats.list2Count}
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-purple-400 mr-1"></span>
                    Distance: {file.stats.distance.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                {new Date(file.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>

            <button
              onClick={(e) => handleRemove(e, file.name)}
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 bg-red-500 rounded-full shadow-md hover:bg-red-600"
              title="Remove file"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { RecentFiles };
