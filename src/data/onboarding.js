// Constants and validation schema for onboarding form

import * as Yup from "yup";

export const categories = ["DJ", "Singer", "Dancer", "Speaker", "Magician", "Comedian"];
export const languages = ["English", "Hindi", "Tamil", "Malayalam", "Thai", "Spanish", "French", "German", "Japanese", "Gujarati", "Punjabi", "Bengali", "Telugu", "Kannada", "Marathi"];
export const feeRanges = ["$50–$100", "$100–$200", "$200–$500", "$500+"];

export const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().required("Bio is required"),
  location: Yup.string().required("Location is required"),
  category: Yup.array().min(1, "Select at least one category"),
  feeRange: Yup.string().required("Fee range is required"),
});