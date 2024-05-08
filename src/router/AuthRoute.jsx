import PropTypes from "prop-types";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { userToken } = useAuthContext();

  // passing the user to home page if they are already logged in
  if (userToken) {
    return <Navigate to={"/"} replace></Navigate>;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node,
};

export default AuthRoute;
