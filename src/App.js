import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./pages/aboutPage.jsx";
import AdditionalPages from "./pages/additionalPages";
import ArtworkDetails from "./pages/artworkDetails";
import Login from "./pages/login";
import MainPage2 from "./pages/mainPage2";
import Register from "./pages/register.jsx";
import EmailSend from "./pages/email-request.js";
import ResetPassword from "./pages/reset-password.js";
import CreateArticle from "./pages/create-article.js";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  useEffect(() => {
    AOS.init({
      offset: 200,
      delay: 0,
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const routes = [
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/about1",
      element: <ArtworkDetails />,
    },
    {
      path: "/features",
      element: <AdditionalPages />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/main",
      element: <MainPage2 />,
    },
    {
      path: "/additional",
      element: <AdditionalPages />,
    },
    {
      path: "/details/:slug",
      element: <ArtworkDetails />,
    },
    {
      path: "/password-reset-confirm/:uid/:token",
      element: <ResetPassword />,
    },
    {
      path: "/forget-password",
      element: <EmailSend />,
    },
    {
      path: "/create-article",
      element: <CreateArticle />,
    },
    {
      path: "/about",
      element: <Navigate to={"/"} />,
    },
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_normalizeFormMethod: true,
    },
  });
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
