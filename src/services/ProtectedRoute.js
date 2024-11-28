import React from "react";
import {Navigate} from "react-router-dom";
import {useUser} from "../pages/UserProvider";

// A wrapper for protecting routes
const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useUser();

    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default ProtectedRoute;
