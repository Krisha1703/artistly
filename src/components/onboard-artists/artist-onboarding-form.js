// Artist Onboarding Form Component

"use client";

import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {categories, languages, feeRanges, schema} from "@/data/onboarding"
import CheckboxGroup from "./checkbox-field";
import ImageUpload from "./image-upload";
import InputField from "./input-field";
import SelectField from "./select-field";

export default function ArtistOnboardingForm() {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
      profileImage: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Artist Submitted:", data);
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-8 bg-white/80 backdrop-blur-lg border my-10 border-purple-200 shadow-2xl rounded-2xl space-y-8 text-gray-800"
    >
        <h2 className="text-3xl font-bold text-purple-700 text-center">
        🎭 Artist Onboarding Form
        </h2>

        {/* Name */}
        <InputField
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            register={register}
            errors={errors}
            required
        />

        {/* Bio */}
        <InputField
            name="bio"
            type="textarea"
            label="Short Bio"
            placeholder="Tell us about yourself"
            register={register}
            errors={errors}
            required
        />

        {/* Category */}
        <CheckboxGroup
            name="category"
            label="Your Roles"
            options={categories}
            register={register}
            errors={errors}
            required
        />

        {/* Languages */}
        <CheckboxGroup
            name="languages"
            label="Languages Spoken"
            options={languages}
            register={register}
            errors={errors}
        />


        {/* Fee Range */}
        <SelectField
            name="feeRange"
            label="Fee Range"
            register={register}
            errors={errors}
            options={feeRanges}
            placeholder="Select Fee Range"
            required
        />

        {/* Location */}
        <InputField
            name="location"
            label="Location"
            placeholder="Enter your location"
            register={register}
            errors={errors}
            required
        />

        {/* Image Upload */}
        <ImageUpload
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
            register={register}
         />

      {/* Submit */}
      <div className="pt-4 text-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-purple-800 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition transform duration-300"
        >
          Submit Artist 🎉
        </button>
      </div>
      
    </form>
  );
}
