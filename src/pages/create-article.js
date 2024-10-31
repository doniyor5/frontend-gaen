import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ApiCall from "../services/getArticles";
import Input from "../components/input/input";
import Textarea from "../components/input/textarea";
import SelectInput from "../components/input/select-input";
import FileInput from "../components/input/file-input";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [artName, setArtName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [artImg, setArtImg] = useState(null);
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => ApiCall.GetArticles(),
    refetchOnWindowFocus: false,
  });

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !country ||
      !description ||
      !artImg ||
      !category ||
      !title ||
      !artName
    ) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("art_name", artName);
    formData.append("country", country);
    formData.append("email", localStorage.getItem("user_email"));
    formData.append("description", description);
    formData.append("art_img", artImg);
    formData.append("category", category);
    formData.append("user", localStorage.getItem("user_full_name"));

    try {
       await ApiCall.postArticle(formData, token);
      setSuccess("Article created successfully!");
      setError("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError("Failed to create article.");
    }
  };

  return (
    <div className="px-3 ">
      <div className="border max-w-md   mx-auto mt-4  rounded-md hover:shadow-white ">
        <h2 className="text-white text-center text-2xl mt-4">
          Create New Article
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="px-10 pb-4 "
        >
          <Input
            state={title}
            setState={setTitle}
            type={"text"}
            name={"Title"}
            placeholder={"Title"}
          />
          <Input
            state={artName}
            setState={setArtName}
            type={"text"}
            name={"Art Name"}
            placeholder={"Art Name"}
          />
          <Input
            state={country}
            setState={setCountry}
            type={"text"}
            name={"Country"}
            placeholder={"Country"}
          />
          <SelectInput
            state={category}
            setState={setCategory}
            category={data?.results}
          />
          <Textarea
            state={description}
            setState={setDescription}
            name={"Description"}
          />
          <FileInput setState={setArtImg} />
          <div className="flex justify-between items-end mt-2">
            <button
              type="submit"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
            >
              Send
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </div>
        </form>
        {success && <p className="text-green-400">{success}</p>}
      </div>
    </div>
  );
};

export default CreateArticle;
