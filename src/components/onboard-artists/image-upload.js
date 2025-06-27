// Handles image upload and preview for artist profiles

import Image from "next/image";

const ImageUpload = ({ handleImageChange, imagePreview }) => {
  return (
    <div>
      <label className="block font-semibold mb-1">Profile Image <span className="text-red-500">*</span></label>
      <input
        type="file"
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
          className="mt-4 w-32 h-32 object-cover rounded-full border-2 border-purple-300"
        />
      )}
    </div>
  );
};

export default ImageUpload;
