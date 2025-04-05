"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CloudinaryResponse } from "@/lib/interface";
import { newPetAvatar } from "@/lib/actions/newPetAvatar";
import { PawPrint } from "lucide-react";

export default function ChangePetAvatar({
  petId,
  imageId,
  change,
  width,
  height,
  className = "",
}: {
  petId: string;
  imageId: string;
  change: boolean;
  height: number;
  width: number;
  className?: string;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(imageId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "petAvatar");

      try {
        const response = await axios.post<CloudinaryResponse>(
          "https://api.cloudinary.com/v1_1/dddgmovz2/image/upload",
          formData
        );

        const public_id = response.data.public_id;
        setImageUrl(public_id);
        newPetAvatar({ imageId: public_id, petId: petId });
        setError(null);
      } catch (error) {
        setError("Error uploading image. Please try again.");
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`${className}`}>
      <div
        className={`overflow-hidden cursor-pointer rounded-full`}
        onClick={() =>
          change && document.getElementById("uploadInput")?.click()
        }
      >
        {imageUrl ? (
          <Image
            width={width}
            height={height}
            src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${imageUrl}`}
            alt="User Avatar"
            className="rounded-full object-cover"
          />
        ) : (
          <PawPrint className="w-32 h-32" />
        )}
      </div>

      {change && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={loading}
          className="hidden"
          id="uploadInput"
        />
      )}

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
