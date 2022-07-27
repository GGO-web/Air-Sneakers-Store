import { FC } from "react";

import { Navbar as NavbarCustom, Button, Nav } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import { firebaseAuth } from "../../../../firebaseConfig";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { signOut } from "../../../../redux/user/userSlice";

const Navbar: FC = () => {
   const dispatch = useAppDispatch();

   const signOutHandler = async () => {
      await firebaseAuth.signOut();

      dispatch(signOut());
   };

   return (
      <NavbarCustom className="navbar bg-white p-0">
         <Nav className="navbar__links d-flex me-4 g-5">
            <Nav.Link className="navbar__link px-3" to="/" as={NavLink}>
               Home
            </Nav.Link>
            <Nav.Link className="navbar__link px-3" to="/products" as={NavLink}>
               Products
            </Nav.Link>
         </Nav>

         <Button
            onClick={() => signOutHandler()}
            className="navbar__button button-style btn-reset"
         >
            Logout
         </Button>
      </NavbarCustom>
   );
};

export default Navbar;
