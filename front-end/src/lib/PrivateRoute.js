import { Navigate } from "react-router-dom";

const PrivateRoute  = ({ children }) => {
  const isLogin = !!localStorage.getItem("token");

  return isLogin ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;