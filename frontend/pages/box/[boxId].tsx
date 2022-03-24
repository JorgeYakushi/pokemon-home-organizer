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
  const [userBoxes, setUserBoxes] = useState<IUserBoxes>();
  useEffect(() => {
    if (props.userData && !userBoxes) {
      setUserBoxes(props.userData);
      let pokemonData: IPokemonData[] = props.userData.pokemonData;
      var newMap = new Map(
        pokemonData.map((p) => [p.pokemonGuid, p.pokemonDetail])
      );
      setDetailMap(newMap);
    }
  }, [props, userBoxes]);
  const emptyPokemon: IPokemonData = {
    pokemonGuid: "",
    pokemonDetail: {
      speciesId: 1,
      formId: 1,
      gender: 1,
      sprite: "",
      isCaught: false,
      isShiny: false,
      hasChanged: false,
    },
  };
  const [currentPokemon, setCurrentPokemon] =
    useState<IPokemonData>(emptyPokemon);
  const router = useRouter();
  const [currentBox, setCurrentBox] = useState(0);
  const [detailMap, setDetailMap] = useState<Map<string, IPokemonDetail>>(
    new Map()
  );

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentBox(parseInt(router.query["boxId"] as string));
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

    axios.put(`${process.env.BACKEND_API}/boxes/update`, { pokemonData });
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
            setCurrentPokemon={setCurrentPokemon}
          ></TableBody>
        </div>
        <div className="">
          <PokemonDetail
            detailMap={detailMap}
            setDetailMap={setDetailMap}
            currentPokemon={currentPokemon!}
            setCurrentPokemon={setCurrentPokemon}
          ></PokemonDetail>
        </div>
      </div>
    </>
  );
};

export default Box;
