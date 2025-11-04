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
  initialFiles?: File[];
  onChange?: (files: File[]) => void;
};

type Preview = {
  id: string;
  file: File;
  url: string;
};

export default function MultiImagePicker({
  name = "images",
  maxImages = 5,
  accept = "image/*",
  className,
  initialFiles = [],
  onChange,
}: Props) {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialFiles.length) handleAddFiles(initialFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
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
      const next = [...prev, ...newPreviews];
      onChange?.(next.map((p) => p.file));
      return next;
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
      if (removed) URL.revokeObjectURL(removed.url);
      const next = prev.filter((_, i) => i !== index);
      onChange?.(next.map((p) => p.file));
      return next;
    });
  };

  // drag & drop handlers
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropRef.current, previews]);

  const openFileDialog = () => inputRef.current?.click();

  const handlePointerDownOpen = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    if (target.closest("button") || target.closest("input")) {
      return;
    }

    e.preventDefault();
    openFileDialog();
  };

  const messages = useMessages();

  return (
    <div className={twMerge("w-full", className)}>
      {/* real file input for forms */}
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
        className="cursor-pointer rounded-xl border border-[#ff6933] bg-[#f5f5f5] p-4 transition hover:shadow-sm"
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
          {/* show previews */}
          {previews.map((p, i) => (
            <div key={p.id} className="relative group">
              <Image
                width={96}
                height={96}
                src={p.url}
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
                  className="flex items-center justify-center w-24 h-24 rounded-md  border border-dashed border-gray-300 bg-white/40 hover:bg-[#ffd466]/30 transition"
                >
                  <FaPlus className="text-gray-500" />
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
                // clear all
                previews.forEach((p) => URL.revokeObjectURL(p.url));
                setPreviews([]);
                onChange?.([]);
              }}
              className="flex items-center gap-1 cursor-pointer text-red-500 hover:text-red-700"
            >
              <FaTrash /> {messages.clear}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
