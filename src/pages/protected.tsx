import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router";


function RequireAuth({ children }: { children: JSX.Element }) {
    // let auth = useAuth();
    // let location = useLocation();

    // let navigate = useNavigate()

    // if (!auth.user) {
    //     return navigate("/login", { state: { from: location }, replace: true })
    // }

    return children;
}
