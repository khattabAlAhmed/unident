import { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutMutation } from "@/lib/react-query/QueriesAndMutations";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";


const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { pathname } = useLocation();
    const { mutate: signOut, isSuccess } = useSignOutMutation()
    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);
    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to='/' className='flex gap-3 items-center'>
                    <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
                </Link>
                <Link to={`/profile/${user.id}`} className={`flex gap-3 items-center `}>
                    <img
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className="h-14 w-14 rounded-full"
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">{user.name}</p>
                        {/* <p className="small reqular text-light-3">@{user.username}</p> */}
                        <p className="small reqular text-light-3"><span className={`${user.gender === "Male" ? "text-blue-600" : user.gender == "Female" ? "text-pink-600" : ""}`}>@</span>{user.username}</p>

                    </div>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink, i) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                                <NavLink to={link.route + user.ids[i]} className={'flex gap-4 items-center p-4'}>
                                    <img src={link.imgURL} alt={`${link.label} image`} className={`group-hover:invert-white ${isActive ? "invert-white" : ""}`} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button
                variant="ghost"
                className="shad-button_ghost"
                onClick={() => signOut()}>
                <img src={'/assets/icons/logout.svg'} />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
            {/* <Button
                variant="ghost"
                className="shad-button_ghost group"
                onClick={() => signOut()}>
                <img src={'/assets/icons/logout.svg'} className={`group-hover:invert-white`} />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button> */}
        </nav>
    )
}

export default LeftSidebar