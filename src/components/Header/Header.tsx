import { FC } from "react";
import Navbar from "./components/Navbar/Navbar";

const Header: FC = () => {
   return (
      <header className="header">
         <div className="header__inner container">
            <a className="header__logo" href="#!">
               <img className="header__logo-img" src="/logo.svg" alt="" />
               Air Sneakers
            </a>

            <Navbar></Navbar>
         </div>
      </header>
   );
};

export default Header;
