import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Products from "./pages/Products/Products";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";

const App: FC = () => {
   return (
      <main className="main">
         <BrowserRouter>
            <Routes>
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
         </BrowserRouter>
      </main>
   );
};

export default App;
