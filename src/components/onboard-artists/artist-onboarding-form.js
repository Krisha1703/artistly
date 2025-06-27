// Input form for Managers to onboard artists

"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  categories,
  languages,
  feeRanges,
  artistOnboardingSchema,
  availabilityOptions,
  ratingOptions,
} from "../../../schemas/onboading-schema";

import CheckboxGroup from "./checkbox-field";
import ImageUpload from "./image-upload";
import InputField from "./input-field";
import SelectField from "./select-field";
import { onboardArtist } from "../../../actions/onboard-artist";

export default function ArtistOnboardingForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(artistOnboardingSchema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      rating: null,
      location: "",
      availability: [],
      profileImage: "", 
    },
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitSuccess("");

    const result = await onboardArtist({
      name: data.name,
      bio: data.bio,
      category: data.category,
      languages: data.languages,
      feeRange: data.feeRange,
      rating: data.rating, 
      location: data.location,
      availability: data.availability,
      profileImage: data.profileImage || null,
    });

    if (result.error) {
      setSubmitError(result.error);
    } else {
      setSubmitSuccess("Artist profile saved successfully!");
      reset();
      setImagePreview(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setValue("profileImage", file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-8 backdrop-blur-lg border my-10 border-purple-200 shadow-2xl rounded-2xl space-y-8"
    >
      <h2 className="text-3xl font-bold text-purple-700 text-center">
        🎭 Artist Onboarding Form
      </h2>

      {submitError && (
        <div className="text-red-600 font-medium text-center">{submitError}</div>
      )}
      {submitSuccess && (
        <div className="text-green-600 font-medium text-center">{submitSuccess}</div>
      )}

      <InputField
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        register={register}
        errors={errors}
        required
      />

      <InputField
        name="bio"
        type="textarea"
        label="Short Bio"
        placeholder="Tell us about yourself"
        register={register}
        errors={errors}
        required
      />

      <CheckboxGroup
        name="category"
        label="Your Roles"
        options={categories}
        register={register}
        errors={errors}
        required
      />

      <CheckboxGroup
        name="languages"
        label="Languages Spoken"
        options={languages}
        register={register}
        errors={errors}
        required
      />

      <SelectField
        name="feeRange"
        label="Fee Range"
        register={register}
        errors={errors}
        options={feeRanges}
        placeholder="Select Fee Range"
        required
      />


      <CheckboxGroup
        name="availability"
        label="Availability"
        options={availabilityOptions}
        register={register}
        errors={errors}
      />

      <SelectField
        name="rating"
        label="Artist Rating"
        register={register}
        errors={errors}
        options={ratingOptions} 
        placeholder="Select Rating"
        required
      />

      <InputField
        name="location"
        label="Location"
        placeholder="Enter your location"
        register={register}
        errors={errors}
        required
      />

      <ImageUpload
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        register={register}
      />

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
