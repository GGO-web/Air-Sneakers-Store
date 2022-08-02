import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
   return (
      <section className="not-found section-offsets">
         <div className="not-found__inner container">
            <h1 className="not-found__title">Ooops, page is not found!</h1>

            <img className="not-found__img" src="/images/404.png" alt="404" />

            <NavLink
               to="/"
               className="not-found__button button-style btn-reset"
            >
               Go home
            </NavLink>
         </div>
      </section>
   );
};

export default NotFound;
