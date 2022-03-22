import { FC, useState } from "react";
import Select, { createFilter } from "react-select";
import Image from "next/image";
import spritesSpecies from "@/mocks/specieswithsprites.json";
import styles from "@/styles/detail.module.scss";
import { IPokemonDetail } from "@/interfaces/pokemon-detail.interface";
import { DetailRow } from "./detail-row";
interface IDetailProps {
  detailMap: Map<string, IPokemonDetail>;
  setDetailMap(map: Map<string, IPokemonDetail>): any;
  pokemonGuid: string;
}
interface IDropdown {
  value: number;
  label: string;
}
export const PokemonDetail: FC<IDetailProps> = ({
  detailMap,
  setDetailMap,
  pokemonGuid,
}) => {
  const dropDownList: IDropdown[] = spritesSpecies.map((item) => ({
    value: item.pokemonId,
    label: item.name,
  }));
  const [dropdownIndex, setDropdownIndex] = useState(1);
  const [previewImage, setPreviewImage] = useState(
    spritesSpecies[0].forms[0].sprite
  );

  const onChangeHandler = (e: any) => {
    setDropdownIndex(e.value);
    setPreviewImage(spritesSpecies[e.value - 1].forms[0].sprite);
  };
  const handler = (
    gender: number,
    isShiny: boolean,
    formId: number,
    sprite: string
  ) => {
    let tempMap = new Map(detailMap);
    let newPokemon: IPokemonDetail = {
      speciesId: spritesSpecies[dropdownIndex - 1].pokemonId,
      formId: formId,
      gender: gender,
      sprite: sprite,
      isCaught: false,
      isShiny: isShiny,
    };
    tempMap.set(pokemonGuid, newPokemon);
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
        defaultValue={dropDownList[0]}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
      />
      <div className={styles.preview}>
        <div className={styles.preview__image}>
          <img src={`/sprites/${previewImage}`} alt="" />
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
          {spritesSpecies[dropdownIndex - 1].forms.map((form, index) => (
            <DetailRow
              key={index}
              name={
                form.name
                  ? form.name.toString()
                  : spritesSpecies[dropdownIndex - 1].name
              }
              form={form}
              genderRate={spritesSpecies[dropdownIndex - 1].genderRate}
              handler={handler}
            ></DetailRow>
          ))}
        </div>
      </div>
    </>
  );
};
