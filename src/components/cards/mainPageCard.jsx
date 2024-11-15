import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IdCard from "../../assets/img/id.png";
import Location from "../../assets/img/location.png";
import ApiCall from "../../services/getArticles";

export default function MainPageCard({
  page,
  setHasMore,
  setPagiError,
  filter,
}) {
  const [data, setData] = useState([]);
  const [mail, setMail] = useState("");
  const [token, setToken] = useState("");

  const GetArts = async (page) => {
    try {
      const response = await ApiCall.GetArticles(page);
      if (response.results.length > 0) {
        setData((prevData) => [...prevData, ...response.results]);
      } else {
        setHasMore(false);
        setPagiError("No more articles available");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHasMore(false);
        setPagiError("No more articles available");
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };

    useEffect(() => {
        const email = localStorage.getItem("user_email");
        const tokenAuth = localStorage.getItem("token");

        if (email && tokenAuth) {
            setMail(email);
            setToken(tokenAuth);
            console.log("Email:", email);
            console.log("Token:", tokenAuth);
        } else {
            console.error("Email yoki token topilmadi!");
        }
    }, []);


  useEffect(() => {
    GetArts(page);
  }, [page]);

  const filteredData = data
    .reverse()
    .filter((item) =>
      item.art_name.toLowerCase().includes(filter.toLowerCase())
    );

  if (filteredData.length === 0) {
    return <h2>Not found</h2>;
  }
    return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center px-4 py-8">
                {filteredData.map((item, index) => (
                        <div
                                key={index}
                                data-aos="fade-up"
                                className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden w-full sm:max-w-sm"
                        >
                            <img
                                    className="w-full h-48 object-cover"
                                    src={item?.art_img || "defaultImage.jpg"}
                                    alt={`Art from ${item?.art_name}`}
                            />
                            <div className="flex flex-col justify-between flex-1 p-4">
                                <h3 className="text-[#16192C] text-lg font-semibold">
                                    {item?.title}
                                </h3>
                                <div className="my-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <img className="w-5 h-5" src={IdCard} alt="ID Card Icon" />
                                        <p className="text-gray-600 font-medium text-sm">
                                            {item?.art_name}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img className="w-4 h-4" src={Location} alt="Location Icon" />
                                        <p className="text-gray-600 font-medium text-sm">
                                            {item?.country}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                                    {item?.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <Link to={`/details/${item?.slug}`}>
                                        <button className="bg-[#0A1F44] hover:bg-[#0B2B61] transition-colors py-2 px-4 text-white font-semibold text-sm rounded-lg">
                                            See more
                                        </button>
                                    </Link>
                                    {mail === item.email && (
                                            <button
                                                    className="bg-red-500 hover:bg-red-600 transition-colors py-2 px-4 text-white font-semibold text-sm rounded-lg"
                                                    onClick={async () => {
                                                        try {
                                                            await ApiCall.deleteArticle(item.slug, token);
                                                            setData((prevData) =>
                                                                    prevData.filter((article) => article.slug !== item.slug)
                                                            );
                                                        } catch (error) {
                                                            console.error("Error deleting article:", error);
                                                        }
                                                    }}
                                            >
                                                Delete
                                            </button>
                                    )}
                                </div>
                            </div>
                        </div>
                ))}
            </div>
    );

}