import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  if (router.query.googleId) {
    let body = {
      googleId: router.query.googleId,
      displayName: router.query.displayName,
    };
    localStorage.setItem("userData", JSON.stringify(body));
    router.push("box/1");
  } else {
    if (typeof window !== "undefined" && localStorage.getItem("userData")) {
      router.push("box/1");
    }
  }
  useEffect(() => {});
  return (
    <div>
      <Head>
        <title>Pokemon Home planner</title>
        <meta name="description" content="Pokemon Home planner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
