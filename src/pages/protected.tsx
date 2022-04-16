import React from "react";
import { Navigate, useLocation } from "react-router";
import { COOKIES } from "../config/constants";


export default function RequireAuth({ children }: { children: JSX.Element }) {

    let location = useLocation();

    if (!(COOKIES.get("token") && COOKIES.get("userinfo_audioset"))) {
        return <Navigate to={"/"} state={{ from: location }} replace={true} />
    }

    return children;
}
