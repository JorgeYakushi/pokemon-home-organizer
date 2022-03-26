import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/layout/spinner";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (isLoaded) {
      return;
    }
    const getUserData = () => {
      let googleId: string = JSON.parse(
        localStorage.getItem("userData") || ""
      ).googleId;

      axios(`${process.env.BACKEND_API}/boxes?userId=${googleId}`).then(
        (response) => {
          setUserData(response.data);
          console.log(response.data);
        }
      );
    };

    if (typeof window !== "undefined" && userData === null) {
      if (localStorage.getItem("userData")) {
        console.log("getting data");
        setIsLoaded(true);
        getUserData();
      } else if (router.pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <Provider store={store}>
      {counter > 0 ? <Spinner></Spinner> : null}
      <Component {...pageProps} userData={userData} />
    </Provider>
  );
}

export default MyApp;
