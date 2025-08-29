import { Cuboid, PictureInPicture, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const DragDropUpload = ({
  onFileSelect,
  selectedFile,
  onRemove,
  isRequired = false,
  maxFileSizeMB = 5,
  accept = "*", // default izinkan semua
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const handleFile = (file) => {
    setError("");

    // validasi ekstensi & mime
    if (accept !== "*" && accept !== "") {
      const allowedTypes = accept.split(",").map((a) => a.trim().toLowerCase());
      const fileType = file.type?.toLowerCase() || "";
      const fileExt = "." + file.name.split(".").pop().toLowerCase();

      const isAllowed =
        allowedTypes.includes(fileType) ||
        allowedTypes.includes(fileExt) ||
        allowedTypes.some(
          (a) => a.endsWith("/*") && fileType.startsWith(a.replace("/*", ""))
        );

      if (!isAllowed) {
        setError("Format file tidak didukung!");
        return;
      }
    }

    // validasi size
    if (file.size / 1024 / 1024 > maxFileSizeMB) {
      setError(`File terlalu besar! Maksimal ${maxFileSizeMB} MB`);
      return;
    }

    onFileSelect(file);
  };

  const getPreviewUrl = (file) => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (imageTypes.includes(file.type)) {
      return URL.createObjectURL(file);
    }
    return null; // kalau bukan image
  };

  const shortenFileName = (name) =>
    name.length > 50 ? name.substring(0, 50) + "..." : name;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        File {isRequired && <span className="text-red-400">*</span>}
      </label>

      {selectedFile ? (
        <div className="relative">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                {getPreviewUrl(selectedFile) ? (
                  <img
                    src={getPreviewUrl(selectedFile)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Cuboid className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  {shortenFileName(selectedFile.name)}
                </p>
                <p className="text-gray-400 text-xs">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-600 hover:border-gray-500 hover:bg-gray-900/50"
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (e.dataTransfer.files.length > 0)
              handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                isDragOver ? "bg-blue-500/20" : "bg-gray-800"
              }`}
            >
              {isDragOver ? (
                <Upload className="w-8 h-8 text-blue-400" />
              ) : (
                <PictureInPicture className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-white text-lg font-medium mb-2">
                {isDragOver ? "Drop your file here" : "Upload File"}
              </p>
              <p className="text-gray-400 text-sm">
                Drag & drop atau klik untuk pilih file
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Supports: Semua file (Max {maxFileSizeMB}MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files.length > 0) handleFile(e.target.files[0]);
        }}
        className="hidden"
      />
    </div>
  );
};

export default DragDropUpload