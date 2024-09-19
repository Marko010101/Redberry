import { redberryApi } from "../constants/redberryApi.js";
import { token } from "../constants/token.js";

export async function getAgents() {
  const response = await fetch(`${redberryApi}/agents`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load Agents, status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function createAgentApi(agentData) {
  const formData = new FormData();
  formData.append("name", agentData.name);
  formData.append("surname", agentData.surname);
  formData.append("email", agentData.email);
  formData.append("phone", agentData.phone);
  formData.append("avatar", agentData.avatar);

  const response = await fetch(`${redberryApi}/agents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Could not create agent, status: ${response.status}, details: ${errorText}`
    );
  }

  const result = await response.json();
  return result;
}