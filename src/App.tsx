import React, { FC, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Products from "./pages/Products/Products";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";

const routes: Array<{ path: string; element: JSX.Element }> = [
   {
      path: "/login",
      element: <Login></Login>,
   },
   {
      path: "/signup",
      element: <SignUp></SignUp>,
   },
   {
      path: "/",
      element: (
         <ProtectedRoute path="/login">
            <Home></Home>
         </ProtectedRoute>
      ),
   },
   {
      path: "/products",
      element: (
         <ProtectedRoute path="/login">
            <Products></Products>
         </ProtectedRoute>
      ),
   },
   {
      path: "/products/:id",
      element: (
         <ProtectedRoute path="/login">
            <ProductInfo></ProductInfo>
         </ProtectedRoute>
      ),
   },
   {
      path: "*",
      element: <NotFound></NotFound>,
   },
];

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
               {routes.map((route) => (
                  <Route
                     key={route.path}
                     path={route.path}
                     element={route.element}
                  ></Route>
               ))}
            </Routes>
         </div>
      </main>
   );
};

export default App;
