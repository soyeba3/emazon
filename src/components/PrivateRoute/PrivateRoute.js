import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userContext } from "../../App";

const PrivateRoute = ({ children }) => {
  const [loggedInUser] = useContext(userContext);
  const location = useLocation()
  return loggedInUser.email ? children : <Navigate to={"/login"} state={{ from: location }} />;
};

export default PrivateRoute;
