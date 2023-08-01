import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  if (!sessionStorage.getItem("user")) return <Navigate to="/" />;

  return children;
};
