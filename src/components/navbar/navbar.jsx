import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLogo from "../../assets/img/GAEN.png";
import NavbarButton from "../buttons/navbarButton";
import Mobile from "./mobile";
import ApiCall from "../../services/getArticles";

export default function Navbar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isUserAuth = !!localStorage.getItem("token");
  const token = localStorage.getItem("token");
  const refresh_token = localStorage.getItem("refresh_token");
  const [error, setError] = useState("");
  const find = () => {
    const nameFinder = localStorage.getItem("user_full_name");
    setName(nameFinder);
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
            console.error("Logout Error:", error.response ? error.response.data : error.message);
            setError("Logout failed. Please try again.");
        }
    };

  useEffect(() => {
    find();
  }, []);

  return (
    <div className="left-0 flex justify-between w-full top-3 z-50">
      <div>
        <Link className="" to={"/"}>
          <img className="" src={NavLogo} alt="Logo" />
        </Link>
      </div>
      <div className="hidden md:block">
        <ul className="flex gap-10 text-white font-[300] text-[16px] items-center">
          {isUserAuth && (
            <li>
              <Link to="/create-article">Create Article</Link>
            </li>
          )}

          <li>
            <Link to={"/main"}>Gallery</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/features"}>Features</Link>
          </li>

          {isUserAuth ? (
            <Link to={"/profile"}>
              <button>Profil</button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <NavbarButton buttonText={"Log in"} />
            </Link>
          )}
          {isUserAuth && (
            <Link onClick={handleLogOut}>
              <NavbarButton buttonText={"Log Out"} />
            </Link>
          )}
        </ul>
      </div>
      <Mobile />
    </div>
  );
}
