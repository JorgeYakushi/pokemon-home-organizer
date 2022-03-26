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

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  loadMap,
  selectPokemonData,
} from "@/redux/features/pokemonData/pokemonDataSlice";
const Box: NextPage = (props: any) => {
  const dispatch = useAppDispatch();
  const pokemonData = useAppSelector(selectPokemonData);
  const [userBoxes, setUserBoxes] = useState<IUserBoxes>();
  useEffect(() => {
    if (props.userData && !userBoxes) {
      setUserBoxes(props.userData);
      let pokemonData: IPokemonData[] = props.userData.pokemonData;

      dispatch(loadMap(pokemonData));
    }
  }, [props, userBoxes, dispatch]);

  const router = useRouter();
  const [currentBox, setCurrentBox] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentBox(parseInt(router.query["boxId"] as string));
  }, [router.isReady, router.query]);

  const onSave = () => {
    let userId = userBoxes?.userId!;
    let pokemonDataArray: IPokemonData[] = [];
    for (const [key, value] of Object.entries(pokemonData)) {
      let data: IPokemonData = {
        userId,
        pokemonGuid: key,
        pokemonDetail: value,
      };
      pokemonDataArray.push(data);
    }

    // axios.put(`${process.env.BACKEND_API}/boxes/update`, {
    //   pokemonData: pokemonDataArray,
    // });
  };
  return (
    <>
      <div style={{ position: "fixed", top: "0", left: "0" }}>
        <button onClick={onSave}>SAVE</button>
        <button>SAVE2</button>
      </div>
      <Header></Header>
      <div className="container main center">
        <div className={styles.table}>
          <TableHeader currentBox={currentBox}></TableHeader>
          <TableBody
            boxItems={userBoxes?.boxData.boxes[currentBox - 1].boxItems!}
          ></TableBody>
        </div>
        <div className="">{/* <PokemonDetail></PokemonDetail> */}</div>
      </div>
    </>
  );
};

export default Box;
