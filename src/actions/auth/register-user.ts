"use server";
const registerUser = async (credentials: any) => {
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/user/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );

  const data = await response.json();
  return data;
};

export default registerUser;
