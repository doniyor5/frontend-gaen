import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ApiCall from "../services/getArticles";
import Input from "../components/input/input";
import Textarea from "../components/input/textarea";
import SelectInput from "../components/input/select-input";
import FileInput from "../components/input/file-input";
import { Link, useNavigate } from "react-router-dom";
import CountrySelect from "../components/select/select";

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

    const { data, isLoading, error: queryError } = useQuery({
        queryKey: ["getCategory"],
        queryFn: ApiCall.GetCategory,
        refetchOnWindowFocus: false,
    });



    const handleCountryChange = (selectedCountry) => {
        if (selectedCountry) {
            setCountry(selectedCountry);
        } else {
            setCountry("");
        }
    };


    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("title", title);
        formData.append("art_name", artName);
        formData.append("country", country?.name);
        formData.append("email", localStorage.getItem("user_email"));
        formData.append("description", description);
        formData.append("art_img", artImg);
        formData.append("category", category?.name);
        setArtImg(artImg);
        console.log(artImg)

        if (!artImg) {
            setError("Please select an image.");
            return;
        }



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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (queryError) {
        return <div>Failed to fetch categories: {queryError.message}</div>;
    }

    return (
        <div className="px-3">
            <div className="border max-w-md mx-auto mt-4 rounded-md hover:shadow-white">
                <h2 className="text-white text-center text-2xl mt-4">Create New Article</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="px-10 pb-4">
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
                    <CountrySelect
                        value={country}
                        selectedCountry={country}
                        onChange={handleCountryChange}
                    />
                    <SelectInput
                        state={category}
                        setState={(selectedCategorySlug) => {
                            const selectedCategory = data.find(cat => cat.slug === selectedCategorySlug);
                            setCategory(selectedCategory); // setCategory should be an object representing the selected category
                            console.log("Selected Category:", selectedCategory); // Debugging output
                        }}
                        category={data || []}
                    />

                    <Textarea state={description} setState={setDescription} name={"Description"} />
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
