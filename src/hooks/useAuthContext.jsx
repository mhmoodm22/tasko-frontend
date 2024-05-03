import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";

const useAuthContext = () => {
  const contextValue = useContext(AuthContext);

  return contextValue;
};

export default useAuthContext;
