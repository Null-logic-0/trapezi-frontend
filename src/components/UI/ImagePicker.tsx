"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";

type ImagePickerProps = {
  name: string;
  defaultImage?: string;
  firstName: string;
  lastName: string;
};

function ImagePicker({
  name,
  defaultImage,
  firstName,
  lastName,
}: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(
    defaultImage || null
  );
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const imageInput = useRef<HTMLInputElement | null>(null);

  const handlePickClick = () => imageInput.current?.click();

  const handleClearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPickedImage(null);
    setIsImageUpdated(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPickedImage(null);
      setIsImageUpdated(false);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
        setIsImageUpdated(true);
      }
    };
    fileReader.readAsDataURL(file);
  };

  // Derive initials from first and last name
  const initials = `${firstName?.[0] || ""}${
    lastName?.[0] || ""
  }`.toUpperCase();

  // If user hasn't updated image, always show latest defaultImage
  const displayImage = isImageUpdated ? pickedImage : defaultImage;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-[100px] h-[100px] rounded-full  flex items-center justify-center 
        bg-[#ff6633] text-white text-2xl font-semibold cursor-pointer group"
      >
        {displayImage ? (
          <Image
            src={displayImage}
            alt="Avatar"
            fill
            unoptimized
            sizes="100px"
            className="object-cover rounded-full"
          />
        ) : (
          <span>{initials || "U"}</span>
        )}

        {pickedImage && isImageUpdated && (
          <button
            onClick={handleClearImage}
            className="absolute z-100 top-1 right-2 bg-[#ffd466] text-black rounded-full p-0.5 
              shadow-md hover:bg-[#ffca2c] transition"
          >
            <IoClose size={18} />
          </button>
        )}

        <button
          onClick={handlePickClick}
          type="button"
          className="bg-[#ffd466] text-lg rounded-full absolute z-100 bottom-0 right-0  hover:bg-[#ffca2c] text-black  font-medium 
          p-2 cursor-pointer  transition"
        >
          <MdAddAPhoto />
        </button>
      </div>

      <input
        ref={imageInput}
        type="file"
        accept="image/*"
        name={name}
        onChange={handleImageChange}
        className="hidden"
      />

      <input
        type="hidden"
        name={name}
        value={pickedImage || defaultImage || ""}
      />
    </div>
  );
}

export default ImagePicker;
