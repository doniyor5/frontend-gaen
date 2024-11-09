import axios from "axios";

const loginUser = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(
      "https://api.gaen.uz/api/v1/auth/login/",
      payload
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data?.detail;
  }
};

export { loginUser };
