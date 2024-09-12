import { redberryApi } from "../constants/redberryApi.js";

export async function getRegions() {
  const response = await fetch(`${redberryApi}/regions`, {});

  if (!response.ok) {
    throw new Error(`Could not load regions, status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}
