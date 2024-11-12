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

  useEffect(()=>{
    const email = localStorage.getItem("user_3email");
    const tokenAuth = localStorage.getItem("token");
    setMail(email);
    setToken(tokenAuth)
    console.log(token)
  })

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {filteredData.map((item, index) => (
        <div
          data-aos="fade-up"
          key={index}
          className="md:w1/3 bg-white p-3 rounded-xl"
        >
          <img
            className="w-full"
            src={
              item?.art_img

            }
            alt={"#img"}
          />
          <div className="py-3 px-4">
            <h3 className="text-[#16192C] text-[16px] font-[600]">
              {item?.title}
            </h3>

            <div className="flex gap-1 items-center my-3">
              <img className="w-4" src={IdCard} alt={"#icon"} />
              <p className="text-[#4D4D4D] font-[600] text-[12px]">
                {item?.art_name}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <img className="w-3.5" src={Location} alt={"#location"} />
              <p className="text-[#4D4D4D] font-[600] text-[12px]">
                {item?.country}
              </p>
            </div>

            <p className="mt-3 overflow-hidden text-[#425466] font-[400]">
              {item?.description}
            </p>

            <div className="mt-3">
              <Link to={`/details/${item?.slug}`}>
                <button className="bg-[#0A1F44] py-3 px-5 text-white w-fit font-[600] text-[12px] rounded-lg">
                  See more
                </button>
              </Link>
              {/* delete button if post email = user email */}
              {mail === item?.email ? (
                <button
                  className="bg-red-500 py-3 px-5 text-white w-fit font-[600] text-[12px] rounded-lg"
                  onClick={() => {
                    ApiCall.deleteArticle(item.slug, token);
                    GetArts()
                  }}
                >
                  Delete 
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}