import { FC } from "react";
import { NavLink } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

const Header: FC = () => {
   return (
      <header className="header">
         <div className="header__inner container">
            <NavLink to="/" className="header__logo">
               <img className="header__logo-img" src="/logo.svg" alt="" />
               <span>Air Sneakers</span>
            </NavLink>

            <Navbar></Navbar>
         </div>
      </header>
   );
};

export default Header;
