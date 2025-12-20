"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export default function FileUpload({ files, setFiles }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files, setFiles]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
      "application/x-autocad": [".dwg"],
      "image/vnd.dwg": [".dwg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
          isDragActive
            ? "border-[#0D9488] bg-[#0D9488]/5"
            : "border-gray-200 hover:border-[#0D9488] hover:bg-[#0D9488]/5"
        )}
      >
        <input {...getInputProps()} />
        <Upload
          className={cn(
            "w-10 h-10 mx-auto mb-3",
            isDragActive ? "text-[#0D9488]" : "text-gray-400"
          )}
        />
        {isDragActive ? (
          <p className="text-[#0D9488] font-medium">Dosyaları buraya bırakın...</p>
        ) : (
          <div>
            <p className="text-[#6B7280]">
              Dosyaları sürükleyip bırakın veya{" "}
              <span className="text-[#0D9488] font-medium">tıklayarak seçin</span>
            </p>
          </div>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-[#0D9488]" />
                <div>
                  <p className="text-sm font-medium text-[#111827] truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
