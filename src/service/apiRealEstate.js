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
