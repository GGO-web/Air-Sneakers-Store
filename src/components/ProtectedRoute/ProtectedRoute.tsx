import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getUserSelector } from "../../redux/user/userSlice";

const ProtectedRoute = ({
   path = "/login",
   children,
}: {
   path: string;
   children: ReactElement;
}) => {
   const user = useAppSelector(getUserSelector);

   if (!user.isAuth) {
      return <Navigate to={path}></Navigate>;
   }

   return children;
};

export default ProtectedRoute;
