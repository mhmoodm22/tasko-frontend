import PropTypes from "prop-types";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import WebPreLoader from "../components/Loader/WebPreLoader";

const PrivateRoute = ({ children }) => {
  const { userLoading, userToken } = useAuthContext();

  // passing the user to the protected route if user has token

  if (userLoading) {
    return <WebPreLoader />;
  }

  if (!userToken) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
