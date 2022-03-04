import type { NextPage } from "next";
import Head from "next/head";
import BoxList from "./boxList";

import { useEffect } from "react";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pokemon Home Organizer</title>
        <meta name="description" content="Pokemon Home Organizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BoxList></BoxList>
    </div>
  );
};

export default Home;
