import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/layout/spinner";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [counter, setCounter] = useState(0);

  axios.interceptors.request.use(
    (request) => {
      setCounter(counter + 1);
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (res) => {
      setCounter(counter - 1);
      return res;
    },
    (error) => {
      console.error(error);
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("userData")) {
      getUserData();
    } else if (typeof window !== "undefined" && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);
  const getUserData = () => {
    let googleId: string = JSON.parse(
      localStorage.getItem("userData") || ""
    ).googleId;

    axios(`${process.env.BACKEND_API}/boxes?userId=${googleId}`).then(
      (response) => setUserData(response.data)
    );
  };
  return (
    <>
      {counter > 0 ? <Spinner></Spinner> : null}
      <Component {...pageProps} userData={userData} />
    </>
  );
}

export default MyApp;
