/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";

import {
   Navbar as NavbarCustom,
   Nav,
   Button,
   Offcanvas,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

import { firebaseAuth } from "../../../../firebaseConfig";

import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
   getCartTotalItemsSelector,
   setCartItems,
} from "../../../../redux/cart/cartSlice";
import { IUser } from "../../../../redux/user/user.model";
import {
   getUserSelector,
   signIn,
   signOut,
} from "../../../../redux/user/userSlice";

import Cart from "../../../Cart/Cart";

const Navbar: FC = () => {
   const user = useAppSelector(getUserSelector);
   const dispatch = useAppDispatch();

   const [cartIsOpen, setCartIsOpen] = useState(false);

   const cartTotalItems = useAppSelector(getCartTotalItemsSelector);

   const menuBreakpoint: string = "lg";

   const signOutHandler = async () => {
      await firebaseAuth.signOut();

      dispatch(signOut());

      dispatch(setCartItems([]));
   };

   // get current userInfo using signIn method
   useEffect(() => {
      if (!user.name) {
         const currentUser: IUser = {
            name: firebaseAuth.currentUser?.displayName as string,
            email: firebaseAuth.currentUser?.email as string,
         };

         dispatch(signIn(currentUser));
      }
   }, []);

   return (
      <>
         <NavbarCustom key={menuBreakpoint} expand={menuBreakpoint}>
            <NavbarCustom.Toggle
               className="navbar__toggle"
               aria-controls={`offcanvasNavbar-expand-${menuBreakpoint}`}
            >
               <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M1 7H19M1 1H19M1 13H13"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </NavbarCustom.Toggle>

            <NavbarCustom.Offcanvas
               id={`offcanvasNavbar-expand-${menuBreakpoint}`}
               aria-labelledby={`offcanvasNavbarLabel-expand-${menuBreakpoint}`}
               placement="end"
            >
               <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                     className="fs-2"
                     id={`offcanvasNavbarLabel-expand-md`}
                  >
                     Menu
                  </Offcanvas.Title>
               </Offcanvas.Header>

               <Offcanvas.Body className="navbar__body">
                  <Nav className="navbar__links d-flex">
                     <Nav.Link className="navbar__link" to="/" as={NavLink}>
                        Home
                     </Nav.Link>
                     <Nav.Link
                        className="navbar__link"
                        to="/products"
                        as={NavLink}
                     >
                        Products
                     </Nav.Link>
                  </Nav>

                  <div className="navbar__controls">
                     <span className="navbar__controls-user">
                        <svg
                           width="22"
                           height="22"
                           viewBox="0 0 22 22"
                           className="d-inline-block me-2"
                           style={{ verticalAlign: "bottom" }}
                           fill="currentColor"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11 3.25C8.37665 3.25 6.25 5.37665 6.25 8C6.25 10.6234 8.37665 12.75 11 12.75C13.6234 12.75 15.75 10.6234 15.75 8C15.75 5.37665 13.6234 3.25 11 3.25ZM7.75 8C7.75 6.20507 9.20507 4.75 11 4.75C12.7949 4.75 14.25 6.20507 14.25 8C14.25 9.79493 12.7949 11.25 11 11.25C9.20507 11.25 7.75 9.79493 7.75 8Z"
                              fill="currentColor"
                           />
                           <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 14.0485 1.51989 16.8016 3.55751 18.7571C5.48833 20.61 8.11182 21.75 11 21.75C13.8882 21.75 16.5117 20.61 18.4425 18.7571C20.4801 16.8016 21.75 14.0485 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25ZM1.75 11C1.75 5.89137 5.89137 1.75 11 1.75C16.1086 1.75 20.25 5.89137 20.25 11C20.25 13.1948 19.4863 15.2103 18.2089 16.7966C17.4149 15.2828 15.8286 14.25 14 14.25H8C6.17143 14.25 4.58513 15.2828 3.79109 16.7966C2.51372 15.2103 1.75 13.1948 1.75 11ZM14 15.75C15.4339 15.75 16.6521 16.6792 17.0831 17.9685C15.4565 19.3898 13.3294 20.25 11 20.25C8.67062 20.25 6.54352 19.3898 4.91687 17.9685C5.34791 16.6792 6.56613 15.75 8 15.75H14Z"
                              fill="currentColor"
                           />
                        </svg>

                        {user.name || "User"}
                     </span>
                     <button
                        onClick={() => signOutHandler()}
                        className="navbar__button d-flex align-items-center gap-2 button-style btn-reset"
                     >
                        <img
                           className="navbar__button-icon"
                           aria-hidden="true"
                           src="/images/logout.svg"
                           alt=""
                        />
                        Logout
                     </button>
                  </div>
               </Offcanvas.Body>
            </NavbarCustom.Offcanvas>

            <Button
               onClick={() => setCartIsOpen(!cartIsOpen)}
               variant="outline-light"
               className="cart-button rounded-circle ms-4"
            >
               <svg
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M1.72754 0.818015C1.62707 0.416171 1.21986 0.17186 0.818015 0.272331C0.416171 0.372801 0.17186 0.780008 0.272331 1.18185L1.32418 5.38883L2.30298 9.47281C2.71918 11.2094 3.04677 12.5763 3.43552 13.6382C3.83428 14.7274 4.32329 15.5731 5.10786 16.2215C5.17557 16.2775 5.24455 16.3319 5.31476 16.3847C6.12821 16.9965 7.06452 17.275 8.21672 17.4089C9.33994 17.5394 10.7455 17.5394 12.5312 17.5394H13.1248C14.6698 17.5394 15.886 17.5394 16.8658 17.4403C17.8694 17.3388 18.6952 17.1282 19.4383 16.663C19.7908 16.4423 20.1183 16.184 20.4151 15.8926C21.001 15.3175 21.3871 14.619 21.7069 13.7499H17C16.5858 13.7499 16.25 13.4141 16.25 12.9999C16.25 12.5857 16.5858 12.2499 17 12.2499H22.1699C22.2921 11.7954 22.4158 11.2968 22.5482 10.7499L14 10.7499C13.5858 10.7499 13.25 10.4141 13.25 9.99993C13.25 9.58572 13.5858 9.24993 14 9.24993L22.9074 9.24993C23.0559 8.61663 23.1724 8.0734 23.2251 7.61247C23.2968 6.98468 23.2675 6.38692 22.9542 5.84113C22.8201 5.60769 22.6525 5.3952 22.4568 5.21045C21.9991 4.77849 21.4246 4.6107 20.7973 4.53416C20.193 4.46042 19.4252 4.46044 18.4936 4.46046L2.63824 4.46046L1.72754 0.818015Z"
                     fill="currentColor"
                  />
                  <path
                     d="M9.42109 20.9999C10.0024 20.9999 10.4737 20.5287 10.4737 19.9473C10.4737 19.3659 10.0024 18.8947 9.42109 18.8947C8.83973 18.8947 8.36845 19.3659 8.36845 19.9473C8.36845 20.5287 8.83973 20.9999 9.42109 20.9999Z"
                     fill="currentColor"
                  />
                  <path
                     d="M15.7369 20.9999C16.3182 20.9999 16.7895 20.5287 16.7895 19.9473C16.7895 19.3659 16.3182 18.8947 15.7369 18.8947C15.1555 18.8947 14.6842 19.3659 14.6842 19.9473C14.6842 20.5287 15.1555 20.9999 15.7369 20.9999Z"
                     fill="currentColor"
                  />
               </svg>

               <div className="cart-button__quantity rounded-circle bg-danger d-flex justify-content-center align-items-center">
                  {cartTotalItems}
               </div>
            </Button>
         </NavbarCustom>

         <Cart {...{ cartIsOpen, setCartIsOpen }}></Cart>
      </>
   );
};

export default Navbar;
