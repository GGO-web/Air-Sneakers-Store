import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";

const Home = () => {
   return (
      <>
         <Header></Header>

         <section className="home section-offsets">
            <div className="home__inner container">
               <h1 className="home__title">
                  Explore an exciting world with the best sneakers
               </h1>

               <NavLink
                  to="/products"
                  className="home__button button-style btn-reset"
               >
                  Go to store
               </NavLink>
            </div>
         </section>
      </>
   );
};

export default Home;
