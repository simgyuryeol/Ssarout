import { Navigate } from "react-router-dom";

const PageBlock  = ({ children }) => {
  const isLogin = !!localStorage.getItem("data");

  return isLogin ? children : <Navigate to="/"/>;
};

export default PageBlock;