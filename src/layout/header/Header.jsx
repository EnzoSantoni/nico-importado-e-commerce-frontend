import { faBars, faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";
import { useUser } from "../../context/UserContext";


export default function Header () {
    const navigate = useNavigate();
    const {user, logout} = useUser()
    const [ menuOpen, setMenuOpen ] = useState(false);

    const {toggleSidebarOrder, totalQuantity} = useOrder();

    const linkStyles = 'px-4 py-3 lg:p-4 hover:text-text hover:bg-surface-hover lg:hover:bg-transparent transition-colors'

    const links = [
        {to: "/", title: 'Principal'},
        {to: "/contact", title: 'Contacto'},
        {to: "/about-us", title: 'Acerca de'},
        {to: "/register", title: 'Registro'},
        
        ...(user?.role === "ADMIN_ROLE" ? [
            {to: "/admin-product", title: 'Admin Product'},
            {to:"/admin-user", title:'Admin User'}] : [])
        
    ]
    return (
        <header className="relative flex items-center justify-between bg-bg border-b border-borders px-4 lg:pl-0 h-16">
            <button className="lg:hidden size-11 flex items-center justify-center rounded-md text-text hover:bg-surface-hover cursor-pointer transition-colors duration-200 text-xl" onClick={() => setMenuOpen(!menuOpen)}>
                <FontAwesomeIcon icon={menuOpen ? faXmark : faBars}></FontAwesomeIcon>
            </button>
            <nav className={`${menuOpen ? 'flex opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'} absolute top-full left-0 right-0 z-10 flex-col bg-bg border-b border-borders lg:static lg:flex lg:flex-row lg:border-0 starting:opacity-0 starting:-translate-y-2 transition-[opacity,translate,display] transition-discrete duration-200 ease-out lg:opacity-100 lg:translate-y-0 lg:transition-none`}>
                {links.map(l => {
                    return <NavLink to={l.to} className={({isActive})  => linkStyles + (isActive ?  ' text-text' : ' text-text-muted')} key={l.to} onClick={() => setMenuOpen(!menuOpen)}>{l.title}</NavLink>
                })}
            </nav>
            <div className="flex justify-center items-center">
                {user ? <button className="px-4 py-3 lg:p-4 hover:text-text hover:bg-surface-hover lg:hover:bg-transparent text-text-muted transition-colors" onClick={() => logout()}>Logout</button> : <button className="px-4 py-3 lg:p-4 hover:text-text hover:bg-surface-hover lg:hover:bg-transparent transition-colors text-text-muted" onClick={() => navigate("/login")}>Login</button>}
                <button className="relative size-11 flex items-center justify-center rounded-md text-text hover:bg-surface-hover cursor-pointer transition-colors duration-200 text-xl" onClick={() => toggleSidebarOrder()}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {totalQuantity >= 1 && <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-accent text-xs font-medium text-text-on-accent tabular-nums">{totalQuantity}</span>}
                </button>
            </div>
        </header>
    )
}