import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Link, NavLink, useLocation } from 'react-router-dom'

const Bottombar = () => {
    const { pathname } = useLocation();
    return (
        <section className='bottom-bar'>

            {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (

                    <Link to={link.route} key={link.label} className={`bottombar-link group ${isActive && "bg-primary-500"} rounded-[10px] flex-center flex-col gap-1 p-2 transition`} >
                        <img src={link.imgURL} alt={`${link.label} image`} className={`group-hover:invert-white ${isActive ? "invert-white" : ""}`} />
                        <p className="tiny-medium text-light-2" >{link.label}</p>
                    </Link>

                )
            })}

        </section>
    )
}

export default Bottombar