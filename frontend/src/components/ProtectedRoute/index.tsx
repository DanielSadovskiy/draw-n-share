import { CurrentUserContext } from "context/currentUserContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const {user} = useContext(CurrentUserContext)
  const isLoggedIn: boolean = user !== null;
  const location = useLocation()

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
  };