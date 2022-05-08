import '../styles/globals.css';
import { authContext } from '../context/myContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { publicRoutes } from '../routes';
import { checkAccessToken } from '../config/apis';
import { paths } from '../Utils/constants';
import Loader from '../components/Loader';

function MyApp({ Component, pageProps }) {
  const [authState, setAuthState] = useState({});
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      publicRoutes.filter((route) => route.path === router.pathname).length > 0
    ) {
      router.push(router.pathname);
      setIsLoading(false);
    } else {
      if (!isUserAuthenticated) {
        checkAccessToken()
          .then((res) => {
            if (res && res.success) {
              setAuthState(res.data);
              setIsUserAuthenticated(true);
            } else {
              setAuthState({});
              setIsUserAuthenticated(false);
              router.push(paths.SIGN_IN); // redirect to sign in page
            }
          })
          .then(() => setIsLoading(false))
          .catch((err) => {
            setIsUserAuthenticated(false);
            router.push(paths.SIGN_IN); // redirect to sign in page
          });
      }
    }
  }, []);
  console.log(isLoading);
  return (
    <authContext.Provider
      value={{
        authState,
        setAuthState,
        isUserAuthenticated,
        setIsUserAuthenticated,
        isLoading,
        setIsLoading,
      }}>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </authContext.Provider>
  );
}

export default MyApp;
