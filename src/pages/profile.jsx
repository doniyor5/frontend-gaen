import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CountrySelect from '../components/select/select';

export default function Profile() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        profilePic: null,
    });
    const [userToken, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [Pic, setPic] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const tokenAuth = localStorage.getItem("token");
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
            setProfile({
                firstName: storedUserInfo.first_name,
                email: storedUserInfo.email,
                country: storedUserInfo.country,
                profilePic: storedUserInfo.profile_pic,
            });
        }
        if (tokenAuth) {
            setToken(tokenAuth);
            fetchProfile(tokenAuth);
        }
    }, []);

    const fetchProfile = async (userToken) => {
        try {
            const response = await axios.get('https://api.gaen.uz/api/v1/auth/get_user_info/', {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            setUserInfo(response.data.user);
            setProfile({
                firstName: response.data.user.first_name,
                email: response.data.user.email,
                country: response.data.user.country,
                profilePic: response.data.user.profile_pic,
            });
        } catch (error) {
            alert('Error fetching user information.');
            console.error(error);
        }
    };

    const handleCountryChange = (selectedCountry) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            country: selectedCountry?.name,
        }));
    };

    const updateUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log('No token found. Please log in again.');
            setError('Please log in again.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append("firstName", profile.firstName);
            formData.append("lastName", profile.lastName);
            formData.append("country", profile.country);

            if (profile.profilePic instanceof File) {
                formData.append("profile_pic", profile.profilePic);
            }

            const response = await axios.put(
                    "https://api.gaen.uz/api/v1/auth/updateProfile/",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
            );

            setSuccessMessage("Profile updated successfully!");
            setError(null);

            const profilePic = response.data?.user?.profile_pic || userInfo.profile_pic;

            const updatedUserInfo = {
                ...userInfo,
                first_name: profile.firstName,
                email: profile.email,
                country: profile.country,
                profile_pic: profilePic,
            };

            setUserInfo(updatedUserInfo);
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                } else {
                    setError('Error updating profile. Please try again.');
                }
                console.error('Error response:', error.response);
            } else {
                setError('Network error. Please try again.');
                console.error('Network error:', error);
            }
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile((prevProfile) => ({ ...prevProfile, profilePic: file }));
            setPic(URL.createObjectURL(file));
            setIsImageLoading(false);
        }
    };

    const handleImageLoad = () => {
        setIsImageLoading(false); // Hide loading state once image is loaded
    };

    if (error) return <p>{error}</p>;
    if (!userInfo) return <p>Loading... </p>;
    const base_url = "https://api.gaen.uz/";

    return (
            <section className="relative pt-36 pb-24">
                <img src="https://pagedone.io/asset/uploads/1705473908.png" alt="cover-image" className="w-full absolute top-0 left-0 z-0 h-60 object-cover" />
                <div className="w-full max-w-7xl mx-auto px-6 md:px-8">

                    <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                        <label htmlFor="profilePicUpload" className="cursor-pointer">
                            {isImageLoading && <input
                                    id="profilePicUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    className="hidden"
                            />}
                            <img
                                    src={Pic || base_url + userInfo.profile_pic}
                                    alt=".."
                                    className="border-4 border-solid w-48 bg-white h-48 border-white rounded-full object-cover"
                                    onLoad={handleImageLoad}

                            />
                            <input
                                    id="profilePicUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    className="hidden"
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5"></div>

                    {successMessage && <p className="text-emerald-600 success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <h1 className="text-center text-white text-2xl mt-10">Update Profile</h1>
                    <form encType="multipart/form-data" method="PUT" onSubmit={(e) => {
                        e.preventDefault();
                        updateUserProfile();
                    }} className="lg:ml-32 flex flex-col  max-sm:flex-wrap max-sm:justify-center items-center">
                        {/* Editable Fields */}
                        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
                            <label className="block text-sm mb-2 text-white">Full Name</label>
                            <input
                                    type="text"
                                    name="firstName"
                                    value={profile.firstName}
                                    onChange={handleProfileChange}
                                    className="py-3 ps-4 pe-10  block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <label className="block text-sm mb-2 text-white">Email</label>
                            <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg  text-sm focus:border-blue-500 focus:ring-blue-500"
                            />


                            <CountrySelect

                                    selectedCountry={{ name: profile.country }}
                                    onChange={handleCountryChange}
                            />
                        </div>

                        <Link to="/forgot-password">
                            <span className="block lg:mr-24 text-sm mx-auto mt-2 text-red-500">Forgot Password</span>
                        </Link>
                        <button type="submit"
                                className="lg:mt-12 md:mt-12 lg:mr-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-600 hover:bg-blue-200 mt-10">
                            Update Profile
                        </button>
                    </form>
                </div>
            </section>
    );
}