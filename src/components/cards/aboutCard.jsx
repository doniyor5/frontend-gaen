import React from "react";
import Card1 from "../../assets/img/objectives_img-1.png";
import Card2 from "../../assets/img/objectives_img-2.png";
import Card3 from "../../assets/img/objectives_img-3.png";
import Card4 from "../../assets/img/objectives_img-4.png";
import doniyor from "../../assets/img/doniyor.jpg";
import dildora from "../../assets/img/dildora.jpg";
import shaxzodbek from "../../assets/img/shaxzodbek.jpeg";

import DataObjectImage1 from "../../assets/img/HalikovMirazam.jpeg";
import DataObjectImage2 from "../../assets/img/ValeraPavlov.jpeg";
import DataObjectImage3 from "../../assets/img/XuratovaRyana.jpeg";

import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules

export default function AboutCard() {


    const data = [
        {
            id: 1,
            image: doniyor,
            name: "Doniyor Abdusamadov",
            job: "Founder & CEO",
        },
        {
            id: 2,
            image: dildora,
            name: "Dildora Mamirova",
            job: "Community Manager",
        },
        {
            id: 3,
            image: shaxzodbek,
            name: "Muxtorov Shaxzodbek",
            job: "Web developer",
        },
    ];

    const dataObject = [
        {
            image: DataObjectImage1,
            name: "Valera Pavlov",
            content: "As an art curator, GAEN has become an invaluable tool for discovering fresh talent worldwide. Its focus on cross-cultural engagement means I can easily bring unique, underrepresented perspectives to my exhibitions. ",
            position: "Kazakhstan",
        },
        {
            image: DataObjectImage2,
            content: "GAEN gave me the exposure I struggled to find as an emerging artist in Uzbekistan. The platform’s translation feature is fantastic—it allowed my artwork and message to resonate with diverse audiences without language barriers",
            name: "Halikov Mirazam",
            position: "Uzbekistan",
        },
        {
            image: DataObjectImage3,
            content: "As an art curator, GAEN has become an invaluable tool for discovering fresh talent worldwide. Its focus on cross-cultural engagement means I can easily bring unique, underrepresented perspectives to my exhibitions.",
            name: "Xuratova Ryana",
            position: "Kazakhstan",
        }
    ];

    return (
            <>
                <div className="md:flex justify-between gap-28 items-center mb-24">
                    <div data-aos="fade-up" className="md:w-2/4 text-white">
                        <h1 className="mt-10 md:mt-0 text-4xl font-[600] leading-10">
                            Promote Cultural Exchange
                        </h1>
                        <p className="my-3 md:my-6  font-[500] text-[16px] leading-5">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s
                        </p>
                    </div>
                    <div data-aos="fade-up" className="md:w-2/4">
                        <img className="w-full" src={Card1} alt=""/>
                    </div>
                </div>
                <div className="flex flex-wrap-reverse md:flex-nowrap justify-between md:gap-28 items-center mb-24">
                    <div data-aos="fade-up" className="w-full md:w-2/4">
                        <img className="w-full" src={Card2} alt=""/>
                    </div>
                    <div data-aos="fade-up" className="md:w-2/4 text-white">
                        <h1 className="mt-3 md:mt-0 text-4xl font-[600] leading-10">
                            Enhance Learning
                        </h1>
                        <p className="my-3 md:my-6  font-[500] text-[16px] leading-5">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s
                        </p>
                    </div>
                </div>
                <div className="md:flex justify-between gap-28 items-center mb-24">
                    <div data-aos="fade-up" className="md:w-2/4 text-white">
                        <h1 className="mt-3 md:mt-0  text-4xl font-[600] leading-10">
                            Support Emerging Artists
                        </h1>
                        <p className="my-3 md:my-6  font-[500] text-[16px] leading-5">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s
                        </p>
                    </div>
                    <div data-aos="fade-up" className="md:w-2/4">
                        <img className="w-full" src={Card3} alt=""/>
                    </div>
                </div>
                <div className="flex flex-wrap-reverse md:flex-nowrap justify-between md:gap-28 items-center mb-24">
                    <div data-aos="fade-up" className="w-full md:w-2/4">
                        <img className="w-full" src={Card4} alt=""/>
                    </div>
                    <div data-aos="fade-up" className="md:w-2/4 text-white">
                        <h1 className="mt-3 md:mt-0 text-4xl font-[600] leading-10">
                            Foster Collaboration
                        </h1>
                        <p className="my-3 md:my-6  font-[500] text-[16px] leading-5">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s
                        </p>
                    </div>
                </div>

                <div>
                    <h1
                            data-aos="fade-down"
                            className="text-center text-4xl text-white mt-10 mb-4"
                    >
                        Team
                    </h1>

                    <div data-aos="fade-up" className="md:flex gap-6 justify-center">
                        {data.map((d) => (
                                <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                                    <img
                                            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mb-6 border-4 border-gray-700"
                                            src={d.image}
                                            alt={`Photo of ${d.name}, who is our ${d.job}`}
                                            loading="lazy"
                                    />
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-white">{d.name}</h3>
                                    <p className="mt-2 text-lg sm:text-xl text-gray-400">{d.job}</p>
                                </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h1
                            data-aos="fade-down"
                            className="text-center text-4xl text-white mt-24 mb-4"
                    >
                        Hear from our customers
                    </h1>
                    <Swiper
                            slidesPerView={4}
                            spaceBetween={40}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                200: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                700: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                900: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1100: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                            className="mySwiper"
                    >
                        {dataObject.map((data) => (
                                <SwiperSlide key={data.name}>
                                    <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6">
                                        {/* Image Container */}
                                        <div className="relative w-60 h-60">
                                            <img
                                                    src={data.image}
                                                    alt={data.name}
                                                    className="rounded-full w-full h-full object-cover border-4 border-white shadow-md"
                                            />
                                        </div>

                                        {/* Content Container */}
                                        <div className="mt-6 text-center">
                                            <em className="text-gray-600 text-sm italic">
                                                {data.content}
                                            </em>
                                            <h3 className="mt-4 text-xl font-semibold text-gray-800">
                                                {data.name}
                                            </h3>
                                            <h5 className="text-md text-gray-500">
                                                {data.position}
                                            </h5>
                                        </div>
                                    </div>
                                </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </>
    );
}
