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
                className="w-full object-cover h-[380px] rounded-xl mt-5"
                src={data.art_img}
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



                {/*  Comment */}
                  <div className="mt-7 md:mt-16 ">
                          <div className="max-w-2xl mx-auto px-4">
                              <div className="flex justify-between items-center mb-6">
                                  <h2 className="text-lg lg:text-2xl font-bold text-gray-300 dark:text-white">Discussion
                                      (20)</h2>
                              </div>
                              <form className="mb-6">
                                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                      <label htmlFor="comment" className="sr-only">Your comment</label>
                                      <textarea id="comment" rows="6"
                                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                placeholder="Write a comment..." required></textarea>
                                  </div>
                                  <button type="submit"
                                          className="inline-flex items-center bg-blue-900 py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                      Post comment
                                  </button>
                              </form>

                              <div className="max-h-96 overflow-y-auto px-6 gap-5">

                              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                  <footer className="flex justify-between items-center mb-2 ">
                                      <div className="flex  items-center">
                                          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                              <img
                                                      className="mr-2 w-6 h-6 rounded-full"
                                                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                      alt="Michael Gough"/>Michael Gough</p>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                              <time pubdate dateTime="2022-02-08"
                                                    title="February 8th, 2022">Feb. 8, 2022
                                              </time>
                                          </p>
                                      </div>
                                      <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                              type="button">
                                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                               fill="currentColor" viewBox="0 0 16 3">
                                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                          </svg>
                                          <span className="sr-only">Comment settings</span>
                                      </button>

                                      <div id="dropdownComment1"
                                           className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                              aria-labelledby="dropdownMenuIconHorizontalButton">
                                              <li>
                                                  <a href="#"
                                                     className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                              </li>
                                              <li>
                                                  <a href="#"
                                                     className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                              </li>
                                              <li>
                                                  <a href="#"
                                                     className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                              </li>
                                          </ul>
                                      </div>
                                  </footer>
                                  <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really
                                      worth time reading. Thank you! But tools are just the
                                      instruments for the UX designers. The knowledge of the design tools are as
                                      important as the
                                      creation of the design strategy.</p>
                                  <div className="flex items-center mt-4 space-x-4">
                                      <button type="button"
                                              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                          <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true"
                                               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                          </svg>
                                          Reply
                                      </button>
                                  </div>
                              </article>


                              </div>
                          </div>


                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    </>
  );
}
