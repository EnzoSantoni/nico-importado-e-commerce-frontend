import {
  faBars,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const { toggleSidebarOrder, totalQuantity } = useOrder();

  const linkStyles =
    "px-4 py-3 lg:p-4 hover:text-text hover:bg-surface-hover lg:hover:bg-transparent transition-colors";

  const links = [
    { to: "/", title: "Principal" },
    { to: "/contact", title: "Contacto" },
    { to: "/about-us", title: "Acerca de" },
    { to: "/register", title: "Registro" },

    ...(user?.role === "ADMIN_ROLE"
      ? [
          { to: "/admin-product", title: "Admin Product" },
          { to: "/admin-user", title: "Admin User" },
        ]
      : []),
  ];
  return (
    <header className="relative flex h-16 items-center justify-between border-b border-borders bg-bg px-4 lg:pl-0">
      <button
        className="flex size-11 cursor-pointer items-center justify-center rounded-md text-xl text-text transition-colors duration-200 hover:bg-surface-hover lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars}></FontAwesomeIcon>
      </button>
      <nav
        className={`${menuOpen ? "flex translate-y-0 opacity-100" : "hidden -translate-y-2 opacity-0"} absolute top-full right-0 left-0 z-10 flex-col border-b border-borders bg-bg transition-[opacity,translate,display] transition-discrete duration-200 ease-out lg:static lg:flex lg:translate-y-0 lg:flex-row lg:border-0 lg:opacity-100 lg:transition-none starting:-translate-y-2 starting:opacity-0`}
      >
        {links.map((l) => {
          return (
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                linkStyles + (isActive ? " text-text" : " text-text-muted")
              }
              key={l.to}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {l.title}
            </NavLink>
          );
        })}
      </nav>
      <div className="flex items-center justify-center">
        {user ? (
          <button
            className="px-4 py-3 text-text-muted transition-colors hover:bg-surface-hover hover:text-text lg:p-4 lg:hover:bg-transparent"
            onClick={() => logout()}
          >
            Logout
          </button>
        ) : (
          <button
            className="px-4 py-3 text-text-muted transition-colors hover:bg-surface-hover hover:text-text lg:p-4 lg:hover:bg-transparent"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
        <button
          className="relative flex size-11 cursor-pointer items-center justify-center rounded-md text-xl text-text transition-colors duration-200 hover:bg-surface-hover"
          onClick={() => toggleSidebarOrder()}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          {totalQuantity >= 1 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-medium text-text-on-accent tabular-nums">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
