import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/table.module.scss";
import Image from "next/image";
import Select, { createFilter } from "react-select";
import spritesSpecies from "../../mocks/specieswithsprites.json";
import emptyBox from "../../mocks/empty-box.json";
import { useRouter } from "next/router";
import Link from "next/link";
interface IBoxItem {
  id: number | null;
  box_id: number;
  spriteUrl: string;
  boxPosition: number;
  isCaught: boolean;
}

const Box: NextPage = () => {
  const [boxItems, setBoxItems] = useState<IBoxItem[]>(emptyBox);
  const router = useRouter();
  const [currentBox, setCurrentBox] = useState(0);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [boxIndex, setBoxIndex] = useState<number>(0);
  useEffect(() => {
    if (!router.isReady) return;
    setCurrentBox(parseInt(router.query["boxId"] as string));
  }, [router.isReady, router.query]);
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
          tempBoxItems[boxIndex].isCaught = !tempBoxItems[boxIndex].isCaught;
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
            {currentBox !== 67 && (
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
          {boxItems
            .slice((currentBox - 1) * 30, currentBox * 30)
            .map((pokemon, index) => (
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
                      : "asd",
                    pokemon.id ? styles["item--not-empty"] : null,
                  ].join(" ")}
                >
                  {pokemon.id ? (
                    <Image
                      src={`/sprites/${pokemon.spriteUrl}`}
                      alt="no pokemon"
                      height={50}
                      width={50}
                      className={!pokemon.isCaught ? styles["not-caught"] : ""}
                    />
                  ) : (
                    <div style={{ height: "55px", width: "55px" }}></div>
                  )}
                </div>
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
