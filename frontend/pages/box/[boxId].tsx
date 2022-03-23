import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "@/styles/table.module.scss";
import { useRouter } from "next/router";
import { IUserBoxes } from "@/interfaces/box-items.interface";
import {
  IPokemonData,
  IPokemonDetail,
} from "@/interfaces/pokemon-detail.interface";
import { PokemonDetail } from "@/components/box/detail";
import { Header } from "@/components/layout/header";
import { TableBody } from "@/components/box/table-body";
import { TableHeader } from "@/components/box/table-header";
import axios from "axios";

const Box: NextPage = (props: any) => {
  useEffect(() => {
    if (props.userData) {
      setUserBoxes(props.userData);
      let pokemonData: IPokemonData[] = props.userData.pokemonData;
      var newMap = new Map(
        pokemonData.map((p) => [p.pokemonGuid, p.pokemonDetail])
      );
      setDetailMap(newMap);
    }
  }, [props]);
  const [userBoxes, setUserBoxes] = useState<IUserBoxes>();
  const [pokemonGuid, setPokemonGuid] = useState<string>("");
  const router = useRouter();
  const [currentBox, setCurrentBox] = useState(0);
  const [detailMap, setDetailMap] = useState<Map<string, IPokemonDetail>>(
    new Map()
  );

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentBox(parseInt(router.query["boxId"] as string));
    axios(`${process.env.BACKEND_API}/boxes`);
  }, [router.isReady, router.query]);
  const onSave = () => {
    let userId = userBoxes?.userId!;
    let pokemonData: IPokemonData[] = [];
    detailMap.forEach((val: any, key: string) => {
      let data: IPokemonData = {
        userId,
        pokemonGuid: key,
        pokemonDetail: val,
      };
      pokemonData.push(data);
    });
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pokemonData }),
    };

    fetch(`${process.env.BACKEND_API}/boxes/update`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <div style={{ position: "fixed", top: "0", left: "0" }}>
        <button onClick={onSave}>SAVE</button>
      </div>
      <Header></Header>
      <div className="container main center">
        <div className={styles.table}>
          <TableHeader currentBox={currentBox}></TableHeader>
          <TableBody
            boxItems={userBoxes?.boxData.boxes[currentBox - 1].boxItems!}
            detailMap={detailMap}
            setDetailMap={setDetailMap}
            setPokemonGuid={setPokemonGuid}
          ></TableBody>
        </div>
        <div className="">
          <PokemonDetail
            detailMap={detailMap}
            setDetailMap={setDetailMap}
            pokemonGuid={pokemonGuid}
          ></PokemonDetail>
        </div>
      </div>
    </>
  );
};

export default Box;
