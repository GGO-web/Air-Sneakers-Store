import { FC } from "react";

import { Navbar as NavbarCustom, Nav } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import { firebaseAuth } from "../../../../firebaseConfig";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getUserSelector, signOut } from "../../../../redux/user/userSlice";

const Navbar: FC = () => {
   const user = useAppSelector(getUserSelector);
   const dispatch = useAppDispatch();

   const signOutHandler = async () => {
      await firebaseAuth.signOut();

      dispatch(signOut());
   };

   return (
      <NavbarCustom className="navbar p-0">
         <Nav className="navbar__links d-flex me-5 g-5">
            <Nav.Link className="navbar__link" to="/" as={NavLink}>
               Home
            </Nav.Link>
            <Nav.Link className="navbar__link" to="/products" as={NavLink}>
               Products
            </Nav.Link>
         </Nav>

         <div className="navbar__controls">
            <span className="navbar__controls-user">
               <img
                  className="d-inline-block me-2"
                  style={{ verticalAlign: "bottom" }}
                  src="/images/profile.svg"
                  alt=""
               />
               {user.name || "User"}
            </span>
            <button
               onClick={() => signOutHandler()}
               className="navbar__button d-flex align-items-center gap-2 button-style btn-reset"
            >
               <img
                  className="w-20 h-20"
                  aria-hidden="true"
                  src="/images/logout.svg"
                  alt=""
               />
               Logout
            </button>
         </div>
      </NavbarCustom>
   );
};

export default Navbar;
