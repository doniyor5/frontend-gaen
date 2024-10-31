import React, { useState } from "react";
import ApiCall from "../services/getArticles";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const EmailSend = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const HandleEmailSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    if (!email) {
      setisLoading(false);
      toast.error("email is required");
      return;
    }
    try {
      const response = await ApiCall.emailSend({ email });
      toast.success(response.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setEmail("");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white max-w-sm mx-auto mt-40 border p-5 rounded-md ">
      <h2>Forgot your password?</h2>
      <p>
        Please enter your email address and we will email you a link to reset
        your password.
      </p>
      <form action="" onSubmit={HandleEmailSubmit}>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email..."
        />
        <div className="flex justify-between items-end">
          <button className="block text-white bg-red-500 mt-2 rounded-md active:text-green-500 py-1 px-3">
            {isLoading ? "loading..." : "send"}
          </button>
          <Link className="hover:underline hover:text-red-400 " to="/login">
            back to login page
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EmailSend;
