import { Navigate } from "react-router-dom";

const PublicRoute  = ({ children }) => {
  const isLogin = !!localStorage.getItem("token");

  return isLogin ? <Navigate to="/"/> : children;
};

export default PublicRoute;