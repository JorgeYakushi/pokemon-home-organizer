import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/table.module.scss";
import Image from "next/image";
import Select, { createFilter } from "react-select";
import spritesSpecies from "../../mocks/specieswithsprites.json";

interface IBoxItem {
  id: number | null;
  box_id: number;
  spriteUrl: string;
  boxPosition: number;
  isCaught: boolean;
}

const Box: NextPage = () => {
  const [boxItems, setBoxItems] = useState<IBoxItem[]>(
    Array(30)
      .fill({
        id: null,
        box_id: 1,
        spriteUrl: "",
        boxPosition: 1,
        isCaught: false,
      })
      .map(
        (item, index) =>
          (item = {
            id: null,
            box_id: 1,
            spriteUrl: "",
            boxPosition: index + 1,
            isCaught: false,
          })
      )
  );
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [boxIndex, setBoxIndex] = useState<number>(0);
  useEffect(() => {}, []);
  const addToBoxItem = () => {
    let tempBoxItems: IBoxItem[] = [...boxItems];
    tempBoxItems[boxIndex].spriteUrl =
      spritesSpecies[dropdownIndex!].forms[0].sprite;
    tempBoxItems[boxIndex].id = spritesSpecies[dropdownIndex!].pokemonId;
    setBoxItems(tempBoxItems);
  };
  const handleClick = (e: any, index: number) => {
    switch (e.detail) {
      case 1:
        setBoxIndex(index);
        break;
      case 2:
        let tempBoxItems: IBoxItem[] = [...boxItems];
        if (tempBoxItems[boxIndex].id) {
          tempBoxItems[boxIndex].isCaught = true;
          setBoxItems(tempBoxItems);
        }
        break;
      default:
        return;
    }
  };
  return (
    <div className="container">
      <div className={styles.table}>
        <div className={styles.table__head}>
          <div className={styles["page-name"]}></div>
        </div>
        <div className={styles.table__body}>
          {boxItems.map((pokemon, index) => (
            <div
              className={styles.box}
              key={index}
              onClick={(e) => {
                handleClick(e, index);
              }}
            >
              {pokemon.id ? (
                <div className={styles.item}>
                  <Image
                    src={`/sprites/${pokemon.spriteUrl}`}
                    alt="no pokemon"
                    height={50}
                    width={50}
                    className={!pokemon.isCaught ? styles["not-caught"] : ""}
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src="/icons/pokeball.svg"
                    alt="no pokemon"
                    height={50}
                    width={50}
                    className={
                      index === boxIndex ? styles["item--selected"] : ""
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <Select
          id="long-value-select"
          instanceId="long-value-select"
          options={spritesSpecies.map((item, index) => ({
            value: index,
            label: item.name,
          }))}
          filterOption={createFilter({ ignoreAccents: false })}
          onChange={(e: any) => setDropdownIndex(e.value)}
        />
        {dropdownIndex !== null ? (
          <img
            src={`/sprites/${spritesSpecies[dropdownIndex!].forms[0].sprite}`}
            alt=""
          />
        ) : null}

        <button onClick={addToBoxItem}>ADD TO BOXX</button>
      </div>
    </div>
  );
};

export default Box;
