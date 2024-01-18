import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  //   const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;

// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useRefreshToken from "../../hooks/useRefreshToken";
// import useAuth from "../../hooks/useAuth";

// export default function PersistLogin() {
//   const [isLoading, setIsLoading] = useState(true);

//   const refresh = useRefreshToken();
//   const { auth } = useAuth();

//   useEffect(() => {
//     const verifyRefreshToken = async () => {
//       console.log("verifyRefreshToken() from PersistLogin.jsx fired");
//       try {
//         await refresh();
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     console.log("PersistLoading.jsx fired");
//     console.log(`isLoading: ${isLoading}`);
//     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
//   }, [isLoading]);
//   return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
// }
