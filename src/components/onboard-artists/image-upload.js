// Image Uploading and Previewing Component

import Image from "next/image"

const ImageUpload = ({handleImageChange, imagePreview, register}) => {
  return (
    <div>
        <label className="block font-semibold mb-1">Profile Image (optional)</label>
        <input
          type="file"
          {...register("profileImage")}
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-purple-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            width={100}
            height={100}
            loading="lazy"
            aria-label="Image Preview"
            className="mt-4 w-32 h-32 object-cover rounded-full border-2 border-purple-300"
          />
        )}
    </div>
  )
}

export default ImageUpload