import { redberryApi } from "../constants/redberryApi.js";
import { token } from "../constants/token.js";

export async function getRealEstateList() {
  const response = await fetch(`${redberryApi}/real-estates`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load real estates, status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function getRealEstateById(id) {
  const response = await fetch(`${redberryApi}/real-estates/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Could not load real estate by id, status: ${response.status}`
    );
  }

  const result = await response.json();
  return result;
}

export async function deleteRealEstateById(id) {
  const response = await fetch(`${redberryApi}/real-estates/${id}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `The real estate item could not be deleted, status: ${response.status}`
    );
  }

  const result = await response.json();
  return result;
}

export async function createRealEstateAPi(formValues) {
  const formData = new FormData();
  Object.keys(formValues).forEach((key) => {
    formData.append(key, formValues[key]);
  });

  const response = await fetch(`${redberryApi}/real-estates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Could not create real-estate, status: ${response.status}, details: ${errorText}`
    );
  }

  const result = await response.json();
  return result;
}
