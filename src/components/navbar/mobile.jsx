import React, { useState } from "react";
import { BiHome, BiMenu } from "react-icons/bi";
import { MdFeaturedPlayList } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLogo from "../../assets/img/GAEN.png";
import NavbarButton from "../buttons/navbarButton";
import ApiCall from "../../services/getArticles";

export default function Mobile() {
    const navigate = useNavigate();
    const location = useLocation();
    const isUserAuth = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogOut = async () => {
        if (!refresh_token || !token) {
            setError("Authentication token or refresh token is missing");
            return;
        }

        try {
            await ApiCall.logOut(refresh_token, token);
            localStorage.removeItem("user_full_name");
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            navigate(`${location.pathname}`);
        } catch (error) {
            console.error(
                    "Logout Error:",
                    error.response ? error.response.data : error.message
            );
            setError("Logout failed. Please try again.");
        }
    };

    return (
            <div className="block md:hidden z-50">
                {/* Overlay */}
                {open && (
                        <div
                                onClick={handleClose}
                                className="fixed inset-0 bg-black/80 transition-opacity duration-300"
                        ></div>
                )}

                {/* Menu Icon */}
                <div>
                    <BiMenu className="text-white text-3xl cursor-pointer" onClick={handleOpen} />
                </div>

                {/* Sidebar */}
                <div
                        className={`fixed top-0 left-0 h-full w-[80%] bg-slate-950 transform transition-transform duration-300 z-50 ${
                                open ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="pt-10 pl-5">
                        <Link to={"/"} onClick={handleClose}>
                            <img src={NavLogo} alt="Logo" className="w-24 mb-8" />
                        </Link>
                        <ul className="flex flex-col gap-5 text-white font-light text-base pl-1">
                            <li>
                                <Link
                                        className="flex items-center gap-2 bg-slate-900 rounded-md py-2 px-3 w-full"
                                        to={"/main"}
                                        onClick={handleClose}
                                >
                                    <BiHome className="text-xl" />
                                    Main
                                </Link>
                            </li>
                            <li>
                                <Link
                                        className="flex items-center gap-2 bg-slate-900 rounded-md py-2 px-3 w-full"
                                        to={"/about"}
                                        onClick={handleClose}
                                >
                                    <TiArrowBackOutline className="text-xl" />
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                        className="flex items-center gap-2 bg-slate-900 rounded-md py-2 px-3 w-full"
                                        to={"/features"}
                                        onClick={handleClose}
                                >
                                    <MdFeaturedPlayList className="text-xl" />
                                    Features
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-5 flex flex-col gap-5 pl-1">
                            {isUserAuth ? (
                                    <Link to={"/profile"} onClick={handleClose}>
                                        <NavbarButton buttonText={"Profile"} />
                                    </Link>
                            ) : (
                                    <Link to={"/login"} onClick={handleClose}>
                                        <NavbarButton buttonText={"Log in"} />
                                    </Link>
                            )}
                            {isUserAuth && (
                                    <button onClick={handleLogOut}>
                                        <NavbarButton buttonText={"Log Out"} />
                                    </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    );
}
