import { FC } from "react";
import Image from "next/image";
import styles from "@/styles/table.module.scss";
import { IBoxItem } from "@/interfaces/box-items.interface";
import { IPokemonDetail } from "@/interfaces/pokemon-detail.interface";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectPokemonData,
  updateMapItem,
} from "@/redux/features/pokemonData/pokemonDataSlice";
import {
  setCurrentPokemon,
  selectCurrentPokemon,
} from "@/redux/features/currentPokemon/currentPokemonSlice";
interface ITableProps {
  boxItems: IBoxItem[];
}
export const TableBody: FC<ITableProps> = ({ boxItems }) => {
  const dispatch = useAppDispatch();
  const pokemonData = useAppSelector(selectPokemonData);
  const currentPokemon = useAppSelector(selectCurrentPokemon);
  const [boxIndex, setBoxIndex] = useState<number>(-1);

  const handleClick = (e: any, index: number) => {
    let pokemonGuid = boxItems[index].pokemonGuid;
    let pokemonDetail: IPokemonDetail =
      pokemonData[pokemonGuid] || currentPokemon.pokemonDetail;
    dispatch(setCurrentPokemon({ pokemonGuid, pokemonDetail }));
    setBoxIndex(index);
    switch (e.detail) {
      case 2:
        let pokemonGuid = boxItems[index].pokemonGuid;
        if (pokemonData[pokemonGuid]) {
          let tempPokemon: IPokemonDetail = { ...pokemonData[pokemonGuid] };
          tempPokemon.isCaught = !tempPokemon.isCaught;
          dispatch(updateMapItem({ key: pokemonGuid, value: tempPokemon }));
        }
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div className={styles.table__body}>
        {boxItems?.map((pokemon, index) => (
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
              {pokemonData[pokemon.pokemonGuid] ? (
                <div>
                  <Image
                    src={`/sprites/${pokemonData[pokemon.pokemonGuid].sprite}`}
                    alt="no pokemon"
                    height={50}
                    width={50}
                    className={
                      !pokemonData[pokemon.pokemonGuid].isCaught ? "gray" : ""
                    }
                  />
                </div>
              ) : (
                <div style={{ height: "55px", width: "55px" }}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
