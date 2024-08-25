"use server";

import { createSession, decrypt } from "./session";

const loginUser = async (email: string, password: string) => {
  const response = await fetch(`http://localhost:8000/user/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  await createSession(data.accessToken + "");

  return data;
};

export default loginUser;
