const loginUser = async (email: string, password: string) => {
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  const data = await response.json();
  return data;
};

export default loginUser;
