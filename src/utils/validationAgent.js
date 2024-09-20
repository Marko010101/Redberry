import { errorText } from "../constants/errorText.js";
import { validationTextAgent } from "../constants/validationTextAgent.js";

export const validateInputAgent = (name, value) => {
  if (name === "name" || name === "surname") {
    if (!value.trim()) return validationTextAgent.name;
    if (value.length < 2) return errorText;

    return;
  }

  if (name === "email") {
    if (!value.trim()) return validationTextAgent.email;
    if (!/^.+@redberry\.ge$/.test(value)) return errorText;

    return;
  }

  if (name === "phone") {
    if (!value.trim()) return validationTextAgent.phone;
    const phonePattern = /^5[0-9]{8}$/;

    if (!phonePattern.test(value)) return errorText;

    return;
  }

  if (name === "avatar") {
    if (!value) return validationTextAgent.avatar;
    if (value.size > 1024 * 1024) return "ფაილის ზომა არუნდა აღემატებოდეს 1MB";

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(value.type))
      return "ფაილის ფორმატი უნდა იყოს .png, .jpg, ან .jpeg";

    return;
  }

  return "";
};
