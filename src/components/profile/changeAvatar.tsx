"use client";
import { useState } from "react";
import { updateAvatar } from "@/lib/actions/updateAvatar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const newAvatar = async (userId: string, image: string) => {
  await updateAvatar(userId, image);
};

export default function ChangeAvatar({
  userIds,
  imageId,
  change,
}: {
  userIds: string;
  imageId: string;
  change: boolean;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(imageId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gigachad");

      try {
        interface CloudinaryResponse {
          public_id: string;
        }

        const response = await axios.post<CloudinaryResponse>(
          "https://api.cloudinary.com/v1_1/dddgmovz2/image/upload",
          formData
        );

        const public_id = response.data.public_id;
        setImageUrl(public_id);
        newAvatar(userIds, public_id);
        setError(null);
        router.push("/profile");
      } catch (error) {
        setError("Error uploading image. Please try again.");
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="">
      <div
        className={`overflow-hidden cursor-pointer rounded-full w-full h-full`}
        onClick={() =>
          change && document.getElementById("uploadInput")?.click()
        }
      >
        <Image
          width={200}
          height={200}
          src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${imageUrl}`}
          alt="User Avatar"
          className="rounded-full object-cover"
        />
        {change && (
          <button
            id="uploadBtn"
            className="absolute inset-0 rounded-full opacity-30 hover:opacity-70 flex justify-center items-center text-white text-xl"
          >
            <span></span>
          </button>
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
