"use client";

import { useMessages } from "@/hooks/useMessages";
import React, { useRef, useState } from "react";
import { FaFilePdf, FaPlus, FaTimes } from "react-icons/fa";

type Props = {
  name: string;
  label: string;
};

export default function SinglePdfUploader({ name, label }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messages = useMessages();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    setFile(f);
    e.currentTarget.value = "";
  };

  const handleRemove = () => setFile(null);

  const openFileDialog = () => inputRef.current?.click();

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div
        className="cursor-pointer rounded-xl border border-[#ff6933] bg-[#f5f5f5] p-4 transition hover:shadow-sm"
        onClick={!file ? openFileDialog : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />

        {!file ? (
          <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
            <FaPlus className="text-gray-500 text-lg" />
            <p className="text-sm">{messages.click_to_upload_menu}</p>
          </div>
        ) : (
          <div className="flex items-center justify-between border border-gray-200 rounded-md bg-white p-3 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <FaFilePdf className="text-[#ff6933] text-xl" />
              <div>
                <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
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
      </div>
    </div>
  );
}
