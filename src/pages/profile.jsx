import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Profile(){
    const [userInfo , setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Token topilmadi. Iltimos, tizimga kiring.');
                    return;
                }

                const response = await axios.get('https://api.gaen.uz/api/v1/auth/get_user_info/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUserInfo(response.data.user);
            } catch (error) {
                setError('User maʼlumotlarini olishda xato sodir bo‘ldi.');
                console.error('Error fetching user info:', error.response ? error.response.data : error.message);
            }
        };

        fetchUserInfo();
    }, []);


    if (error) return <p>{error}</p>;
    if (!userInfo) return <p>Loading... </p>

    return (
        <section className="relative pt-36 pb-24">
        <img src="https://pagedone.io/asset/uploads/1705473908.png" alt="cover-image" className="w-full absolute top-0 left-0 z-0 h-60 object-cover" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                <img src={userInfo?.profile_pic} alt=" ."
                    className="border-4 border-solid w-48 bg-white h-48 border-white rounded-full object-cover" />
            </div>
            <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
                <div className="block">
                    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                    <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">{userInfo?.first_name} {userInfo?.last_name}</h3>
                    <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">{userInfo?.email} <br className="hidden sm:block" /> {userInfo?.country}</p>
                </div>

                <button
                        className="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="white" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                    </svg>
                    <span className="px-2 font-semibold text-base leading-7 text-white">Edit profile</span>
                </button>
            </div>


            <h1 className="text-center text-white text-2xl mt-10">Update Password</h1>
            <form className="lg:ml-32 flex max-sm:flex-wrap max-sm:justify-center items-center">

                <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
                        <div className="max-w-sm mt-10">
                            <label className="block text-sm mb-2 text-white"> Current Password</label>
                            <div className="relative">
                                <input
                                        required
                                        id="hs-toggle-password"
                                        type={showPassword ? "text" : "password"}
                                        className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Enter password"
                                />

                                <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                                >
                                    <svg
                                            className="shrink-0 size-3.5"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                    >

                                        <path className={showPassword ? "hidden" : ""}
                                              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                        <path className={showPassword ? "hidden" : ""}
                                              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                        <path className={showPassword ? "hidden" : ""}
                                              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                        <line className={showPassword ? "hidden" : ""} x1="2" x2="22" y1="2"
                                              y2="22"></line>


                                        <path className={showPassword ? "" : "hidden"}
                                              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                        <circle className={showPassword ? "" : "hidden"} cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                            <Link to="/forgot-password">
                                <span className="block text-sm mx-1 mt-2 text-red-500"> Forgot Password</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*New password */}
                <div className="w-full max-w-7xl mb-6  px-6 md:px-8">
                    <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
                        <div className="max-w-sm mt-10">
                            <label className="block text-sm mb-2 text-white"> New Password</label>
                            <div className="relative">
                                <input
                                        required
                                        id="hs-toggle-password"
                                        type={showPassword ? "text" : "password"}
                                        className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Enter password"
                                />

                                <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                                >
                                    <svg
                                            className="shrink-0 size-3.5"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                    >

                                        <path className={showPassword ? "hidden" : ""}
                                              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                        <path className={showPassword ? "hidden" : ""}
                                              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                        <path className={showPassword ? "hidden" : ""}
                                              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                        <line className={showPassword ? "hidden" : ""} x1="2" x2="22" y1="2"
                                              y2="22"></line>


                                        <path className={showPassword ? "" : "hidden"}
                                              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                        <circle className={showPassword ? "" : "hidden"} cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
                <button type="submit"
                        className="lg:mt-12 md:mt-12 lg:mr-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900">
                    Save
                </button>

            </form>

        </div>
        </section>

    )
}