const validateEmail = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/validate-email/${token}`,
  );
  if (response.status === 200) {
    return {
      message: "Email validated successfully.",
      error: false,
    };
  } else {
    return {
      message: "Email validation failed.",
      error: true,
    };
  }
};

export default validateEmail;
