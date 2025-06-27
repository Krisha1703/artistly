// Handles artist onboarding functionality

"use server";

import { db } from "../lib/db";
import { artistOnboardingSchema } from "../schemas/onboading-schema";
import { revalidatePath } from "next/cache";
import { uploadFileToCloudinary } from "../lib/cloudinaryUpload";

export const onboardArtist = async (formData) => {
  try {
    // Validate input
    await artistOnboardingSchema.validate(formData);

    let {
      name,
      bio,
      category,
      languages,
      location,
      feeRange,
      profileImage,
      availability,
      rating,
    } = formData;

    // Convert File to Buffer if valid
    const fileToBuffer = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    };

    if (profileImage instanceof File) {
      console.log("📤 Uploading image to Cloudinary...");
      const buffer = await fileToBuffer(profileImage);

      profileImage = await uploadFileToCloudinary(buffer, "user-profile-images");

      console.log("Cloudinary Upload Success. URL:", profileImage);
    } else {
      console.warn("profileImage is not a valid File object. Skipping upload.");
    }

    // Save to database
    const artist = await db.artist.create({
      data: {
        name,
        bio,
        category,
        languages,
        location,
        feeRange,
        profilePic: profileImage || null,
        availability,
        rating,
      },
    });

    revalidatePath("/artists");

    return { success: true, artist };
  } catch (error) {
    console.error( error);
    return { error: error.message || "Something went wrong." };
  }
};
