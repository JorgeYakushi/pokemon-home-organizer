import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "@/styles/table.module.scss";
import { useRouter } from "next/router";
import { IUserBoxes } from "common/interfaces/box-items.interface";
import { IPokemonDetail } from "common/interfaces/pokemon-detail.interface";
import { PokemonDetail } from "./detail";
import { Header } from "@/components/layout/header";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";
// interface IUpdateData {
//   userGuid: string;
//   pokemonGuid: string;
//   pokemonData: IPokemonDetail;
// }
const Box: NextPage = (props: any) => {
  //get all pokemonn data
  useEffect(() => {
    if (props.userData) {
      setUserBoxes(props.userData);
      console.log(props.userData);
    }
  }, [props]);
  const [userBoxes, setUserBoxes] = useState<IUserBoxes>();
  const [pokemonGuid, setPokemonGuid] = useState<string>("");
  //for navigation
  const router = useRouter();
  // 1 to 200, selected box
  const [currentBox, setCurrentBox] = useState(0);
  // 1 to 30, click/focus position inside box

  //details
  const [detailMap, setDetailMap] = useState<Map<string, IPokemonDetail>>(
    new Map()
  );

  // const [arrChanges, setArrChanges] = useState<IUpdateData[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentBox(parseInt(router.query["boxId"] as string));
  }, [router.isReady, router.query]);

  return (
    <>
      <Header></Header>
      <div className="container main">
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
