"use client";

import { useMessages } from "@/hooks/useMessages";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type Props = {
  name?: string;
  maxImages?: number;
  accept?: string;
  className?: string;
  error?: string;
  initialFiles?: File[];
  onChange?: (files: File[]) => void;
  defaultImages?: string[]; // URLs from backend
};

type Preview = {
  id: string;
  file?: File;
  url: string;
};

export default function MultiImagePicker({
  name = "images[]",
  maxImages = 5,
  accept = "image/*",
  className,
  initialFiles = [],
  error,
  onChange,
  defaultImages = [],
}: Props) {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const messages = useMessages();

  useEffect(() => {
    if (defaultImages.length > 0) {
      const existingPreviews = defaultImages.map((url) => ({
        id: `default-${Math.random().toString(36).slice(2, 9)}`,
        url,
      }));
      setPreviews(existingPreviews);
    }
  }, [defaultImages]);

  useEffect(() => {
    if (initialFiles.length) handleAddFiles(initialFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(previews.filter((p) => p.file).map((p) => p.file!) || []);
    }
  }, [previews, onChange]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (p.file) URL.revokeObjectURL(p.url);
      });
    };
  }, [previews]);

  const handleAddFiles = (files: File[] | FileList) => {
    const list = Array.from(files);
    const allowed = list.filter((f) => f.type.startsWith("image/"));
    if (allowed.length === 0) return;

    setPreviews((prev) => {
      const space = Math.max(0, maxImages - prev.length);
      const toAdd = allowed.slice(0, space);
      const newPreviews = toAdd.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        url: URL.createObjectURL(file),
      }));
      return [...prev, ...newPreviews];
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleAddFiles(e.target.files);
    e.currentTarget.value = "";
  };

  const removeAt = (index: number) => {
    setPreviews((prev) => {
      const removed = prev[index];
      if (removed?.file) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Drag & drop behavior
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "copy";
      el.classList.add("ring", "ring-offset-2");
    };
    const onDragLeave = () => {
      el.classList.remove("ring", "ring-offset-2");
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      el.classList.remove("ring", "ring-offset-2");
      if (e.dataTransfer?.files) handleAddFiles(e.dataTransfer.files);
    };

    el.addEventListener("dragover", onDragOver);
    el.addEventListener("dragleave", onDragLeave);
    el.addEventListener("drop", onDrop);

    return () => {
      el.removeEventListener("dragover", onDragOver);
      el.removeEventListener("dragleave", onDragLeave);
      el.removeEventListener("drop", onDrop);
    };
  }, [previews]);

  const openFileDialog = () => inputRef.current?.click();

  const handlePointerDownOpen = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (target.closest("button") || target.closest("input")) return;
    e.preventDefault();
    openFileDialog();
  };

  return (
    <div className={twMerge("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        ref={dropRef}
        onPointerDown={handlePointerDownOpen}
        className={`cursor-pointer rounded-xl border ${
          error ? "border-red-500" : "border-[#ff6933]"
        }  bg-[#f5f5f5] p-4 transition hover:shadow-sm`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {messages.upload_images}
            </h3>
            <p className="text-xs text-gray-500">{messages.images_caution}</p>
          </div>
          <div className="text-sm text-gray-600">
            {previews.length}/{maxImages}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {previews.map((p, i) => (
            <div key={p.id} className="relative group">
              <Image
                width={96}
                height={96}
                src={p.url}
                unoptimized
                alt={`img-${i}`}
                className="object-cover w-24 h-24 rounded-md border"
                style={{ pointerEvents: "none" }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(i);
                }}
                className="absolute top-2 right-8 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                title="Remove image"
              >
                <FaTimes className="text-[#ff6933] h-3 w-3" />
              </button>
            </div>
          ))}

          {Array.from({ length: Math.max(0, maxImages - previews.length) }).map(
            (_, idx) => {
              const slotIndex = previews.length + idx;
              return (
                <div
                  key={`slot-${slotIndex}`}
                  className={`flex items-center justify-center w-24 h-24 rounded-md border border-dashed ${
                    error ? "border-red-500" : "border-gray-300"
                  }  bg-white/40 hover:bg-[#ffd466]/30 transition`}
                >
                  <FaPlus
                    className={` ${error ? "text-red-500" : "text-gray-500"}`}
                  />
                </div>
              );
            }
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{messages["drag&drop_or_click"]}</span>
          {previews.length !== 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                previews.forEach((p) => p.file && URL.revokeObjectURL(p.url));
                setPreviews([]);
              }}
              className="flex items-center gap-1 cursor-pointer text-red-500 hover:text-red-700"
            >
              <FaTrash /> {messages.clear}
            </button>
          )}
        </div>

        {error && (
          <span className="text-sm text-[#E50000] font-medium">{error}</span>
        )}
      </div>
    </div>
  );
}
