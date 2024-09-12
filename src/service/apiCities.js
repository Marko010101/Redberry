import { redberryApi } from "../constants/redberryApi.js";

export async function getCities() {
  const response = await fetch(`${redberryApi}/cities`, {});

  if (!response.ok) {
    throw new Error(`Could not load cities, status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}
