// Schema for artist onboarding form validation

import * as Yup from "yup";

export const categories = ["DJ", "Singer", "Dancer", "Speaker", "Magician", "Comedian", "Acrobat", "Instrumentalist"];
export const languages = [
  "English", "Hindi", "Tamil", "Malayalam", "Thai", "Spanish",
  "French", "German", "Japanese", "Gujarati", "Punjabi", "Bengali",
  "Telugu", "Kannada", "Marathi"
];

export const feeRanges = [ "$500-$1,000", "$1,000-$2,000", "$2,000-$5,000", "$5,000+"];

export const ratingOptions = [ 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export const availabilityOptions = [ "Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings", "Nights"];


export const artistOnboardingSchema = Yup.object().shape({
    // Artist Full Name
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

    // Artist Bio
  bio: Yup.string()
    .min(10, "Bio must be at least 10 characters")
    .required("Bio is required"),

    // Artist Location
  location: Yup.string()
    .required("Location is required"),

    // Artist Category
  category: Yup.array()
    .of(Yup.string().oneOf(categories))
    .min(1, "Select at least one role")
    .required("Select at least one role"),

    // Artist Languages Spoken
  languages: Yup.array()
    .of(Yup.string().oneOf(languages))
    .min(1, "Select at least one language")
    .required("Select at least one language"),

    // Artist Fee Range
  feeRange: Yup.string()
    .oneOf(feeRanges, "Please select a valid fee range")
    .required("Fee range is required"),

    // Artist Profile Image - optional but must be a valid image file
 profileImage: Yup.mixed()
  .required("Profile image is required")
  .test("fileType", "Only image files are allowed", (value) => {
    if (!value) return true; 
    return value instanceof File || (Array.isArray(value) && value[0] instanceof File);
  }),

    // Artist Availability
  availability: Yup.array()
  .of(Yup.string().oneOf(availabilityOptions))
  .min(1, "Select at least one availability option")
  .required("Availability is required"),

    // Artist Rating
   rating: Yup.number()
    .oneOf(ratingOptions, "Please select a valid artist rating")
    .required("Rating is required"),
});
