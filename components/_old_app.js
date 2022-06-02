/*
import "../styles/globals.css";
import { authContext } from "../context/myContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { publicRoutes } from "../routes";
import { checkAccessToken } from "../config/apis";
import { paths } from "../Utils/constants";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // on initial load - run auth check
    //authCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck() {
    // redirect to login page if accessing a private page and not logged in
    const userData = JSON.parse(localStorage.getItem("userData"));
    const isPublicRoute =
      publicRoutes.filter((route) => route.path === router.pathname).length > 0;
      if (userData === null && !isPublicRoute) {
        router.push(paths.SIGN_IN)
      } else {
        setUser(userData);
      }
    }

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Component {...pageProps} />
    </authContext.Provider>
  );
}

export default MyApp;
*/
