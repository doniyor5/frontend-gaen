import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

import Strelka from "../assets/img/Arrow 1.png";

import { Link, useParams } from "react-router-dom";
import MainPageImage2 from "../assets/img/Image1.png";
import MainPageImage3 from "../assets/img/Image2.png";
import IdCard from "../assets/img/Vector (3).png";
import Location from "../assets/img/Vector (4).png";
import MainPageImage1 from "../assets/img/mainPageImage.png";
import ApiCall from "../services/getArticles";

export default function ArtworkDetails() {
  const { slug } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["Article"],
    queryFn: () => ApiCall.GetArticle(slug),
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    <h3 className=" text-white text-center">Loading...</h3>;
    return;
  }
  if (error) {
    <h3>{error.message}</h3>;
    return;
  }
  return (
    <>
      <div className="pb-20">
        <div className="main-container">
          <Navbar />

          <div className="max-w-3xl   mx-auto">
            <Link to={"/main"}>
              <div
                data-aos="fade-down"
                className="flex mb-2 gap-3 items-center mt-16"
              >
                <img src={Strelka} alt="back" />
                <h2 className=" text-[#D9D9D9] text-2xl font-[600] hover:underline">
                  Back
                </h2>
              </div>
            </Link>

            <div data-aos="fade-up">
              <img
                classname="w-full object-cover h-[380px] rounded-xl mt-5"
                src={`https://shaxzodbek-muxtorov.jprq.site${data?.art_img}`}
                alt="Main Image 1"
              />
            </div>

            <div
              data-aos="fade-up"
              className="flex gap-2 mt-4 justify-center"
            ></div>

            <div data-aos="fade-down" className="mt-10 md:mt-0">
              <h1 className="text-[30px] md:text-[42px] font-[600] text-white">
                {data?.title}
              </h1>
              <div className="flex gap-2 items-center text-[#E4E4E4] mt-5">
                <img src={IdCard} alt="" />
                <p className="text-[12px] md:text-[16px]">{data?.email}</p>
              </div>
              <div className="flex gap-2 items-center text-[#E4E4E4] mb-3 mt-4">
                <img src={Location} alt="" />
                <p className=" text-[12px] md:text-[16px]">{data?.country}</p>
              </div>

              <div>
                <p className="text-[18px] break-all leading-normal md:text-3xl text-white font-[400] md:leading-[50px]">
                  {data?.description}
                </p>

                <div className="mt-7 md:mt-16">
                  <input
                    className="px-8 bg-transparent border-b w-full py-2 text-white outline-none"
                    type="text"
                    placeholder="Add a comment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
