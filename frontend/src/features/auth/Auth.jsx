/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserFromCookie,
  selectIsAuthenticated,
  selectLoading,
} from "../user/userSlice";
import { HashLoader } from "react-spinners";
import styles from "./Auth.module.css";
import { Navigate } from "react-router-dom";

function Auth({ isPrivate, children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) dispatch(addUserFromCookie());
  }, [dispatch, isAuthenticated]);

  if (loading === "idle" || loading === "pending") {
    return (
      <div className={styles.spinnerContainer}>
        <HashLoader color="rgb(150, 113, 229)" loading size={50} />
      </div>
    );
  }
  if (isPrivate) {
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    if (!isAuthenticated) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
}

export default Auth;
