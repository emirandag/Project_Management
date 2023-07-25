import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  if (!localStorage.getItem("user")) return <Navigate to="/" />;

  return children;
};
