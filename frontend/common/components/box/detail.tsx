import { FC } from "react";
import Select, { createFilter } from "react-select";
import Image from "next/image";
import spritesSpecies from "@/mocks/specieswithsprites.json";
import styles from "@/styles/detail.module.scss";
import { IPokemonDetail } from "@/interfaces/pokemon-detail.interface";
import { DetailRow } from "./detail-row";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  setCurrentPokemon,
  selectCurrentPokemon,
} from "@/redux/features/currentPokemon/currentPokemonSlice";
import { IDropdown } from "@/interfaces/select.interface";

export const PokemonDetail: FC = () => {
  const dispatch = useAppDispatch();
  const currentPokemon = useAppSelector(selectCurrentPokemon);
  const dropDownList: IDropdown[] = spritesSpecies.map((item) => ({
    value: item.pokemonId,
    label: item.name,
  }));

  const onChangeHandler = (e: any) => {
    let pokemonGuid = currentPokemon.pokemonGuid;
    let selectedPokemon = spritesSpecies[e.value - 1];
    let pokemonDetail: IPokemonDetail = {
      speciesId: selectedPokemon.pokemonId,
      formId: 0,
      gender: 0,
      sprite: selectedPokemon.forms[0].sprite,
      isCaught: currentPokemon.pokemonDetail.isCaught,
      isShiny: false,
      hasChanged: false,
    };
    dispatch(setCurrentPokemon({ pokemonGuid, pokemonDetail }));
  };

  return (
    <>
      <Select
        options={dropDownList}
        filterOption={createFilter({ ignoreAccents: false })}
        onChange={(e) => onChangeHandler(e)}
        id="long-value-select"
        instanceId="long-value-select"
        value={{
          value: currentPokemon.pokemonDetail.speciesId,
          label:
            spritesSpecies[currentPokemon.pokemonDetail.speciesId - 1].name,
        }}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
      />

      <div>
        <div className={styles.preview}>
          <div className={styles.preview__image}>
            <Image
              src={`/sprites/${currentPokemon.pokemonDetail?.sprite}`}
              height={300}
              width={300}
              alt={
                spritesSpecies[currentPokemon.pokemonDetail.speciesId - 1].name
              }
            />
          </div>
          <div className={styles.preview__base}>
            <Image
              className={styles.preview__base__image}
              src={"/models/base/Asset 33.svg"}
              height={130}
              width={500}
              alt={"base"}
            />
          </div>

          <div className={styles.preview__left}></div>
          <div className={styles.preview__right}></div>
        </div>
        <div className={styles.variants}>
          <div className={styles.variants__header}></div>
          <div className={styles.variants__body}>
            {spritesSpecies[
              currentPokemon.pokemonDetail?.speciesId - 1
            ].forms.map((form, index) => (
              <DetailRow
                key={index}
                name={
                  form.name
                    ? form.name.toString()
                    : spritesSpecies[
                        currentPokemon.pokemonDetail?.speciesId - 1
                      ].name
                }
                form={form}
                genderRate={
                  spritesSpecies[currentPokemon.pokemonDetail?.speciesId - 1]
                    .genderRate
                }
              ></DetailRow>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
