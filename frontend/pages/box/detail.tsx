import { FC, useState } from "react";
import Select, { createFilter } from "react-select";
import spritesSpecies from "../../common/mocks/specieswithsprites.json";
import styles from "@/styles/detail.module.scss";
interface IDropdown {
  value: number;
  label: string;
}
export const PokemonDetail: FC = () => {
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
    </>
  );
};
