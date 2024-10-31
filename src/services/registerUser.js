const registerUser = async (first_name) => {
  const url = "https://shaxzodbek-muxtorov.jprq.site/api/v1/auth/register/";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password: first_name.password,
        password2: first_name.password2,
        email: first_name.email,
        first_name: first_name.first_name,
        country: first_name.country,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData?.email);
      throw new Error(`Failed to register: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

export { registerUser };
