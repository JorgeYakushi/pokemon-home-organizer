import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("userData")) {
      let googleId: string = JSON.parse(
        localStorage.getItem("userData") || ""
      ).googleId;
      fetch(`${process.env.BACKEND_API}/boxes?userId=${googleId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserData(data);
        });
    }
  }, []);

  return <Component {...pageProps} userData={userData} />;
}

export default MyApp;
