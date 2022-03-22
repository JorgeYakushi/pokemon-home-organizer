import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "@/styles/table.module.scss";
import Image from "next/image";
import Select, { createFilter } from "react-select";
import { useRouter } from "next/router";
import Link from "next/link";
import Downshift from "downshift";

import { IUserBoxes } from "common/interfaces/box-items.interface";
import { IPokemonDetail } from "common/interfaces/pokemon-detail.interface";

import { PokemonDetail } from "./detail";

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

  //for navigation
  const router = useRouter();
  // 1 to 200, selected box
  const [currentBox, setCurrentBox] = useState(0);
  // 1 to 30, click/focus position inside box
  const [boxIndex, setBoxIndex] = useState<number>(0);

  //details
  const detailMap: Map<string, IPokemonDetail> = new Map();

  // const [arrChanges, setArrChanges] = useState<IUpdateData[]>([]);
  // const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentBox(parseInt(router.query["boxId"] as string));
  }, [router.isReady, router.query]);
  const addToBoxItem = (
    isShiny: boolean,
    formId: number,
    gender: number,
    sprite: string
  ) => {
    // let tempData: IPokemonCompleteData = { ...pokemonCompleteData! };
    // let tempBoxItems: IBoxItem[] = tempData.boxes.boxItems;
    // let index = (currentBox - 1) * 30 + boxIndex;
    // let selectedPokemon = spritesSpecies[dropdownIndex!];
    // let tempPokemon = tempBoxItems[index];
    // tempPokemon.spriteUrl = sprite;
    // tempPokemon.pokemonGuid =
    //   tempBoxItems[index].pokemonGuid === ""
    //     ? Guid.newGuid()
    //     : tempBoxItems[index].pokemonGuid;
    // let newPokemon: IPokemonDetail = {
    //   speciesId: selectedPokemon.pokemonId,
    //   isShiny: isShiny,
    //   formId: formId,
    //   gender: gender,
    // };
    // detailMap.set(tempBoxItems[index].pokemonGuid, newPokemon);
    // let tempUpdate: IUpdateData = {
    //   userGuid: "aeaman",
    //   pokemonGuid: tempPokemon.pokemonGuid,
    //   pokemonData: newPokemon,
    // };
    // setArrChanges((arrChanges) => [...arrChanges, tempUpdate]);
    // console.log(tempData);
    // setPokemonCompleteData(tempData);
  };
  const handleClick = (e: any, index: number) => {
    switch (
      e.detail
      // case 1:
      //   setBoxIndex(index);
      //   break;
      // case 2:
      //   let tempData: IPokemonCompleteData = { ...pokemonCompleteData! };
      //   let tempBoxItems: IBoxItem[] = tempData.boxes.boxItems;
      //   let pokemonIndex = (currentBox - 1) * 30 + boxIndex;
      //   if (tempBoxItems[pokemonIndex].pokemonGuid) {
      //     tempBoxItems[pokemonIndex].isCaught =
      //       !tempBoxItems[pokemonIndex].isCaught;
      //     setPokemonCompleteData(tempData);
      //   }
      //   break;
      // default:
      //   return;
    ) {
    }
  };

  return (
    <div className="container">
      <div className={styles.table}>
        <div className={styles.table__head}>
          <div>
            {currentBox !== 1 && (
              <Link href={`/box/${currentBox - 1}`} passHref>
                <a>
                  <Image
                    src="/icons/chevron-left.svg"
                    alt="left-arrow"
                    width={30}
                    height={30}
                  />
                </a>
              </Link>
            )}
          </div>
          <div className={styles["page-name"]}>{`Box ${currentBox}`}</div>
          <div>
            {currentBox !== 200 && (
              <Link href={`/box/${currentBox + 1}`} passHref>
                <a>
                  <Image
                    src="/icons/chevron-right.svg"
                    alt="left-arrow"
                    width={30}
                    height={30}
                  />
                </a>
              </Link>
            )}
          </div>
        </div>

        <div className={styles.table__body}>
          {userBoxes?.boxData.boxes[currentBox - 1].boxItems.map(
            (pokemon, index) => (
              <div
                className={styles.box}
                key={index}
                onClick={(e) => {
                  handleClick(e, index);
                }}
              >
                <div
                  className={[
                    styles.item,
                    pokemon.boxPosition === boxIndex + 1
                      ? styles["item--selected"]
                      : "",
                    pokemon.pokemonGuid ? styles["item--not-empty"] : null,
                  ].join(" ")}
                >
                  {detailMap.get(pokemon.pokemonGuid) ? (
                    <Image
                      src={`/sprites/${detailMap.get(pokemon.pokemonGuid)}`}
                      alt="no pokemon"
                      height={50}
                      width={50}
                      className={
                        !detailMap.get(pokemon.pokemonGuid)?.isCaught
                          ? styles["not-caught"]
                          : ""
                      }
                    />
                  ) : (
                    <div style={{ height: "55px", width: "55px" }}></div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="">
        <PokemonDetail></PokemonDetail>
      </div>
    </div>
  );
};

export default Box;
