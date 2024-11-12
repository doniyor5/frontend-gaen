import axios from "axios";
const URL = "https://api.gaen.uz/api/v1/article/user/art/";


const ApiCall = {
  GetArticles: async (page) => {
    const { data } = await axios.get(URL, {
      params: {
        page: page,
      },
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
      responseType: "json",
    });
    return data;
  },
  GetArticle: async (slug) => {
    const { data } = await axios.get(`https://api.gaen.uz/api/v1/article/user/art/`);
    return data;
  },

  emailSend: async (email) => {
    const { data } = await axios.post(
      "https://api.gaen.uz/api/v1/auth/password-reset/",
      email
    );
    return data;
  },
  resetPassword: async (post) => {
    const { data } = await axios.patch(
      "https://api.gaen.uz/api/v1/auth/set-new-password/",
      post
    );
    return data;
  },
  postArticle: async (article, token) => {
    const { data } = await axios.post(URL, article, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  logOut: async (refresh_token, token) => {
    const { data } = await axios.post(
      "https://api.gaen.uz/api/v1/auth/logout/",
      refresh_token,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  },

  // method  for delete article
deleteArticle: async (id, token) => {
  const {data} = await axios.delete(
      `https://api.gaen.uz/api/v1/article/user/art/${id}/`,
      token,
      {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
  return data;
  }
}

export default ApiCall;