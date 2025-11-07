"use client";

import { useMessages } from "@/hooks/useMessages";
import React, { useRef, useState, useEffect } from "react";
import { FaFilePdf, FaPlus, FaTimes } from "react-icons/fa";

type Props = {
  name: string;
  label: string;
  error?: string;
  initialFile?: File | null;
  defaultFileUrl?: string; // <-- URL of the existing PDF
  onChange?: (file: File | null) => void;
};

export default function SinglePdfUploader({
  name,
  label,
  error,
  initialFile = null,
  defaultFileUrl,
  onChange,
}: Props) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultFileUrl || null
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messages = useMessages();

  // Notify parent whenever file changes
  useEffect(() => {
    if (onChange) onChange(file);
  }, [file, onChange]);

  // Cleanup created object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    if (f.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    setFile(f);
    const newUrl = URL.createObjectURL(f);
    setPreviewUrl(newUrl);
    e.currentTarget.value = ""; // allow re-upload same file
  };

  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const openFileDialog = () => inputRef.current?.click();

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div
        className={`cursor-pointer rounded-xl border ${
          error ? "border-red-500" : "border-[#ff6933]"
        } bg-[#f5f5f5] p-4 transition hover:shadow-sm`}
        onClick={!previewUrl ? openFileDialog : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />

        {!previewUrl ? (
          <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
            <FaPlus
              className={`${error ? "text-red-500" : "text-gray-500"} text-lg`}
            />
            <p className="text-sm">{messages.click_to_upload_menu}</p>
          </div>
        ) : (
          <div className="flex items-center justify-between border border-gray-200 rounded-md bg-white p-3 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <FaFilePdf className="text-[#ff6933] text-xl" />
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                  {file?.name ||
                    previewUrl.split("/").pop() ||
                    "existing-file.pdf"}
                </p>
                {file ? (
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                ) : (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#ff6933] hover:underline"
                  >
                    View file
                  </a>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <FaTimes className="text-[#ff6933] h-3 w-3" />
            </button>
          </div>
        )}

        {error && (
          <p className="text-sm font-medium mt-2 text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
