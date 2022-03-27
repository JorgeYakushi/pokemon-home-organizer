import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/detail.module.scss";
import { IPokemonDetail } from "@/interfaces/pokemon-detail.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateMapItem } from "@/redux/features/pokemonData/pokemonDataSlice";
import {
  setCurrentPokemon,
  selectCurrentPokemon,
} from "@/redux/features/currentPokemon/currentPokemonSlice";
interface IDetailRowProps {
  name: string;
  genderRate: number;
  form: {
    formId: number;
    pokemon: string;
    name: string | number;
    speciesId: number;
    isBattleOnly: number;
    isMega: number;
    formOrder: number;
    order: number;
    sprite: string;
    shinySprite: string;
    default: number;
    hasGenderDifferences?: number;
    gender?: {
      name: string;
      sprite: string;
      shinySprite: string;
    }[];
  };
}
export const DetailRow: FC<IDetailRowProps> = ({ name, form, genderRate }) => {
  const dispatch = useAppDispatch();
  const currentPokemon = useAppSelector(selectCurrentPokemon);
  const onClick = (gender: number, isShiny: boolean) => {
    let sprite: string = "";
    if (form.hasGenderDifferences && isShiny) {
      sprite = form.gender![gender - 1].shinySprite;
    } else if (form.hasGenderDifferences && !isShiny) {
      sprite = form.gender![gender - 1].sprite;
    } else if (isShiny) {
      sprite = form.shinySprite;
    } else {
      sprite = form.sprite;
    }
    let pokemonGuid = currentPokemon.pokemonGuid;
    let updatePokemonDetail: IPokemonDetail = {
      speciesId: currentPokemon.pokemonDetail.speciesId,
      formId: form.formId,
      gender: gender,
      sprite: sprite,
      isCaught: currentPokemon.pokemonDetail?.isCaught || false,
      isShiny: isShiny,
      hasChanged: true,
    };
    dispatch(
      setCurrentPokemon({ pokemonGuid, pokemonDetail: updatePokemonDetail })
    );
    dispatch(updateMapItem({ key: pokemonGuid, value: updatePokemonDetail }));
  };

  const isSelectedClass = (genderId: number, isShiny: boolean): string =>
    currentPokemon.pokemonDetail.formId === form.formId &&
    currentPokemon.pokemonDetail.gender === genderId &&
    currentPokemon.pokemonDetail.isShiny === isShiny
      ? styles.variants__pick
      : `${styles.variants__pick} gray`;
  return (
    <>
      <div className={styles.variants__row}>
        <div>
          <Image
            src={`/icons/ultraball.svg`}
            height={25}
            width={25}
            alt="ultraball"
          />
          <p>{name}</p>
        </div>
        <div>
          {[-1, 0].indexOf(genderRate) < 0 ? (
            <Image
              onClick={() => onClick(1, false)}
              className={isSelectedClass(1, false)}
              src={`/icons/female.svg`}
              height={25}
              width={25}
              alt="female"
            />
          ) : null}
          {[-1, 8].indexOf(genderRate) < 0 ? (
            <Image
              onClick={() => onClick(2, false)}
              className={isSelectedClass(2, false)}
              src={`/icons/male.svg`}
              height={25}
              width={25}
              alt="male"
            />
          ) : null}
          {genderRate === -1 ? (
            <Image
              onClick={() => onClick(0, false)}
              className={isSelectedClass(0, false)}
              src={`/icons/genderless.svg`}
              height={25}
              width={25}
              alt="genderless"
            />
          ) : null}
        </div>
        <div>
          <Image src={`/icons/shiny.svg`} height={25} width={25} alt="shiny" />
          {[-1, 0].indexOf(genderRate) < 0 ? (
            <Image
              onClick={() => onClick(1, true)}
              className={isSelectedClass(1, true)}
              src={`/icons/female.svg`}
              height={25}
              width={25}
              alt="female"
            />
          ) : null}
          {[-1, 8].indexOf(genderRate) < 0 ? (
            <Image
              onClick={() => onClick(2, true)}
              className={isSelectedClass(2, true)}
              src={`/icons/male.svg`}
              height={25}
              width={25}
              alt="male"
            />
          ) : null}
          {genderRate === -1 ? (
            <Image
              onClick={() => onClick(0, true)}
              className={isSelectedClass(1, true)}
              src={`/icons/genderless.svg`}
              height={25}
              width={25}
              alt="genderless"
            />
          ) : null}
        </div>
      </div>
    </>
  );
};
