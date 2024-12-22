import { errorText } from "../constants/errorText.js";
import { validationTextListing } from "../constants/validationTextListing.js";

export const validateInputListing = (name, value) => {
  if (name === "is_rental") {
    if (value === null) return validationTextListing.is_rental;
    return;
  }

  if (name === "address") {
    if (!value) return validationTextListing.address;
    if (value.length < 2) return errorText;
    return;
  }

  if (name === "bedrooms") {
    const numberValue = Number(value);
    if (!value || isNaN(value) || !Number.isInteger(numberValue))
      return validationTextListing.bedrooms;
    return;
  }

  const numericFields = ["zip_code", "price", "area"];
  if (numericFields.includes(name)) {
    if (isNaN(value)) return validationTextListing[name];
    if (!value) return errorText;
    return;
  }

  if (name === "region_id" || name === "city_id") {
    if (!value) return validationTextListing[name];
    return;
  }

  if (name === "description") {
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount < 5) return validationTextListing.description;
    return;
  }

  if (name === "image") {
    if (!value) return validationTextListing.image;

    if (value.size > 1024 * 1024) return "ფაილის ზომა არუნდა აღემატებოდეს 1MB";

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(value.type)) {
      return "ფაილის ფორმატი უნდა იყოს .png, .jpg, image/webp ან .jpeg";
    }

    return;
  }

  if (name === "agent_id") {
    if (!value) return validationTextListing.agent_id;
    return;
  }

  return "";
};
