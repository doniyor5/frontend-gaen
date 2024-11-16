import React, { useState } from 'react'
import { BiHome, BiMenu } from 'react-icons/bi'
import {MdCreate, MdDarkMode, MdFeaturedPlayList, MdPerson} from 'react-icons/md'
import { TiArrowBackOutline } from 'react-icons/ti'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import NavLogo from "../../assets/img/GAEN.png"
import NavbarButton from '../buttons/navbarButton'
import ApiCall from "../../services/getArticles";

export default function Mobile() {
    const navigate = useNavigate();
    const location = useLocation();
    const isUserAuth = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(!open)
	}

   const handleClose = () => {
    setOpen(false)
  }
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


	return (
		<div className='block md:hidden z-50'>
      <div onClick={handleClose} className={`${open ? ' fixed transition-transform duration-300 right-0 bg-black/80 w-[100%] h-[100vh] top-0' : ''}`}></div>
			<div>
				<BiMenu className='text-white text-3xl cursor-pointer' onClick={handleOpen} />
			</div>
			<div>
				<div className={`fixed transition-transform duration-300 pt-10 pl-5 top-0 left-0 bg-slate-950 w-[80%] h-[100vh] transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
					<Link to={'/'}>
						<img src={NavLogo} alt="Logo" />
					</Link>
					<ul className='flex flex-col gap-5 text-white font-[300] text-[16px] pt-10 pl-3'>
						<li className='bg-slate-900 w-[150px] py-2 px-3 rounded-md'>
							<Link className=' flex gap-2 items-center' to={'/main'}>
								<BiHome className='text-white text-xl' />
								Main
							</Link>
						</li>
						<li className='bg-slate-900 w-[150px] py-2 px-3 rounded-md'>
							<Link className=' flex gap-2 items-center' to={'/about'}>
								<TiArrowBackOutline className='text-white text-xl' />
								About
							</Link>
						</li>
						<li className='bg-slate-900 w-[150px] py-2 px-3 rounded-md'>
							<Link className=' flex gap-2 items-center' to={'/features'}>
								<MdFeaturedPlayList className='text-white text-xl' />
								Features
							</Link>
						</li>
						<div className='w-full flex flex-col gap-5'>
                            {isUserAuth && (
                                    <li className='bg-slate-900 w-[150px] py-2 pl-2 rounded-md'>
                                        <Link className="flex flex-row items-center gap-1" to="/create-article">
                                            <MdCreate className='text-white text-xl' />
                                             <p>  Create Article </p>
                                        </Link>
                                    </li>
                            )}
                            {isUserAuth ? (
                                    <li className='bg-slate-900 w-[150px] py-2 pl-2 rounded-md'>
                                    <Link className="flex flex-row items-center gap-2 py-2" to={"/profile"}>
                                       <MdPerson className='text-white text-xl' />
                                        <p>Profile</p>
                                    </Link>
                                    </li>
                            ) : (
                                    <Link to={"/login"}>
                                        <NavbarButton buttonText={"Log in"} />
                                    </Link>
                            )}
                            {isUserAuth && (
                                    <Link onClick={handleLogOut}>
                                        <NavbarButton  buttonText={"Log Out"} />
                                    </Link>
                            )}
						</div>
					</ul>
				</div>
			</div>
		</div>
	)
}
