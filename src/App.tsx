import React, { FC, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Products from "./pages/Products/Products";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";

const App: FC = () => {
   const location = useLocation();

   const [displayLocation, setDisplayLocation] = useState(location);
   const [transitionStage, setTransistionStage] = useState("fadeIn");

   const changeAnimation = () => {
      if (transitionStage === "fadeOut") {
         setDisplayLocation(location);
         setTransistionStage("fadeIn");
      }
   };

   useEffect(() => {
      if (
         location.pathname === "/login" ||
         displayLocation.pathname === "/login"
      ) {
         setDisplayLocation(location);
         setTransistionStage("fadeOut");
      } else if (location !== displayLocation) {
         setTransistionStage("fadeOut");
      }
   }, [location, displayLocation]);

   return (
      <main className="main">
         <div
            className={`transition-group ${transitionStage}`}
            onAnimationEnd={() => changeAnimation()}
         >
            <Routes location={displayLocation}>
               <Route path="/login" element={<Login></Login>}></Route>
               <Route path="/signup" element={<SignUp></SignUp>}></Route>

               <Route
                  path="/"
                  element={
                     <ProtectedRoute path="/login">
                        <Home></Home>
                     </ProtectedRoute>
                  }
               ></Route>

               <Route
                  path="/products"
                  element={
                     <ProtectedRoute path="/login">
                        <Products></Products>
                     </ProtectedRoute>
                  }
               ></Route>

               <Route
                  path="/products/:id"
                  element={
                     <ProtectedRoute path="/login">
                        <ProductInfo></ProductInfo>
                     </ProtectedRoute>
                  }
               ></Route>

               <Route path="*" element={<Error></Error>}></Route>
            </Routes>
         </div>
      </main>
   );
};

export default App;
