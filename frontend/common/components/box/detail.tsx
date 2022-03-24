import { FC, useState } from "react";
import Select, { createFilter } from "react-select";
import Image from "next/image";
import spritesSpecies from "@/mocks/specieswithsprites.json";
import styles from "@/styles/detail.module.scss";
import {
  IPokemonData,
  IPokemonDetail,
} from "@/interfaces/pokemon-detail.interface";
import { DetailRow } from "./detail-row";
interface IDetailProps {
  detailMap: Map<string, IPokemonDetail>;
  setDetailMap(map: Map<string, IPokemonDetail>): any;
  currentPokemon: IPokemonData;
  setCurrentPokemon: any;
}
interface IDropdown {
  value: number;
  label: string;
}
export const PokemonDetail: FC<IDetailProps> = ({
  detailMap,
  setDetailMap,
  currentPokemon,
  setCurrentPokemon,
}) => {
  const dropDownList: IDropdown[] = spritesSpecies.map((item) => ({
    value: item.pokemonId,
    label: item.name,
  }));
  const [dropdownIndex, setDropdownIndex] = useState(1);

  const onChangeHandler = (e: any) => {
    setDropdownIndex(e.value);
    let pokemonGuid = currentPokemon.pokemonGuid;
    let selectedPokemon = spritesSpecies[e.value - 1];
    let pokemonDetail: IPokemonDetail = {
      speciesId: selectedPokemon.pokemonId,
      formId: 0,
      gender: 0,
      sprite: selectedPokemon.forms[0].sprite,
      isCaught: false,
      isShiny: false,
      hasChanged: false,
    };
    setCurrentPokemon({ pokemonGuid, pokemonDetail });
  };
  const handler = (
    gender: number,
    isShiny: boolean,
    formId: number,
    sprite: string
  ) => {
    let tempMap = new Map(detailMap);
    let pokemonGuid = currentPokemon.pokemonGuid;
    let pokemonDetail: IPokemonDetail = {
      speciesId: spritesSpecies[dropdownIndex - 1].pokemonId,
      formId: formId,
      gender: gender,
      sprite: sprite,
      isCaught: currentPokemon.pokemonDetail?.isCaught || false,
      isShiny: isShiny,
      hasChanged: true,
    };
    console.log(pokemonDetail);
    console.log(dropdownIndex);
    tempMap.set(currentPokemon.pokemonGuid, pokemonDetail);
    setCurrentPokemon({ pokemonGuid, pokemonDetail });
    setDetailMap(tempMap);
  };
  return (
    <>
      <Select
        options={dropDownList}
        filterOption={createFilter({ ignoreAccents: false })}
        onChange={(e) => onChangeHandler(e)}
        id="long-value-select"
        instanceId="long-value-select"
        //  defaultValue={dropDownList[0]}
        value={{
          value: currentPokemon.pokemonDetail?.speciesId || dropdownIndex,
          label:
            spritesSpecies[currentPokemon.pokemonDetail?.speciesId - 1]?.name ||
            spritesSpecies[dropdownIndex - 1].name,
        }}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
      />
      {currentPokemon.pokemonDetail || spritesSpecies[dropdownIndex] ? (
        <div>
          <div className={styles.preview}>
            <div className={styles.preview__image}>
              <img
                src={`/sprites/${
                  currentPokemon.pokemonDetail?.sprite ||
                  spritesSpecies[dropdownIndex - 1].forms[0].sprite
                }`}
                alt=""
              />
            </div>

            <img
              className={styles.preview__base}
              src="/models/base/Asset 33.svg"
              alt=""
            />

            <div className={styles.preview__left}></div>
            <div className={styles.preview__right}></div>
          </div>
          <div className={styles.variants}>
            <div className={styles.variants__header}></div>
            <div className={styles.variants__body}>
              {spritesSpecies[
                (currentPokemon.pokemonDetail?.speciesId || dropdownIndex) - 1
              ].forms.map((form, index) => (
                <DetailRow
                  key={index}
                  name={
                    form.name
                      ? form.name.toString()
                      : spritesSpecies[
                          (currentPokemon.pokemonDetail?.speciesId ||
                            dropdownIndex) - 1
                        ].name
                  }
                  form={form}
                  genderRate={
                    spritesSpecies[
                      (currentPokemon.pokemonDetail?.speciesId ||
                        dropdownIndex) - 1
                    ].genderRate
                  }
                  pokemonDetail={currentPokemon.pokemonDetail}
                  handler={handler}
                ></DetailRow>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
