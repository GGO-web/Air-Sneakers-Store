import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

const ProtectedRoute = ({
   path = "/login",
   children,
}: {
   path: string;
   children: ReactElement;
}) => {
   const { status, data: signInCheckResult } = useSigninCheck();

   if (status === "loading") {
      return (
         <div
            className="d-flex align-items-center justify-content-center gap-3 fs-1 text-center"
            style={{ flex: "1 1 auto", margin: "auto", justifySelf: "center" }}
         >
            Some awesome is loading...
            <div
               className="spinner-border"
               role="status"
               style={{ width: "60px", height: "60px" }}
            ></div>
         </div>
      );
   }

   if (!signInCheckResult.signedIn) {
      return <Navigate to={path}></Navigate>;
   }

   return children;
};

export default ProtectedRoute;
