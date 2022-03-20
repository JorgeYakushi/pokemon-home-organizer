import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/table.module.scss";
import Image from "next/image";
import Select, { createFilter } from "react-select";
import spritesSpecies from "../../mocks/specieswithsprites.json";
import emptyBox from "../../mocks/empty-box.json";
import { useRouter } from "next/router";
import Link from "next/link";
import { IPokemon } from "../../common/interfaces/pokemon.interface";
import { Guid } from "../../common/utils/Guid";
interface IBoxItem {
  id: string;
  box_id: number;
  spriteUrl: string;
  boxPosition: number;
  isCaught: boolean;
}
interface IUpdateData {
  guid: string;
  pokkemonData: IPokemon;
}
const Box: NextPage = () => {
  //list of user pokemons
  const [boxItems, setBoxItems] = useState<IBoxItem[]>(emptyBox);

  //for navigation
  const router = useRouter();
  // 1 to 68, selected box
  const [currentBox, setCurrentBox] = useState(0);
  // 1 to 30, click/focus position inside box
  const [boxIndex, setBoxIndex] = useState<number>(0);

  //details
  const detailMap: Map<string, IPokemon> = new Map();

  const [arrChanges, setArrChanges] = useState<IUpdateData[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

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
    let tempBoxItems: IBoxItem[] = [...boxItems];
    let index = (currentBox - 1) * 30 + boxIndex;
    let selectedPokemon = spritesSpecies[dropdownIndex!];
    let tempPokemon = tempBoxItems[index];
    tempPokemon.spriteUrl = sprite;
    tempPokemon.id =
      tempBoxItems[index].id === "" ? Guid.newGuid() : tempBoxItems[index].id;
    let newPokemon: IPokemon = {
      speciesId: selectedPokemon.pokemonId,
      isShiny: false,
      isCaught: false,
      formId: 1,
      gender: 0,
    };
    detailMap.set(tempBoxItems[index].id, newPokemon);
    let tempUpdate: IUpdateData = {
      guid: tempPokemon.id,
      pokkemonData: newPokemon,
    };
    arrChanges.push();

    setArrChanges((arrChanges) => [...arrChanges, tempUpdate]);
    setBoxItems(tempBoxItems);
  };
  const handleClick = (e: any, index: number) => {
    switch (e.detail) {
      case 1:
        setBoxIndex(index);
        break;
      case 2:
        let tempBoxItems: IBoxItem[] = [...boxItems];
        let pokemonIndex = (currentBox - 1) * 30 + boxIndex;
        if (tempBoxItems[pokemonIndex].id) {
          tempBoxItems[pokemonIndex].isCaught =
            !tempBoxItems[pokemonIndex].isCaught;
          setBoxItems(tempBoxItems);
        }
        break;
      default:
        return;
    }
  };

  const onSave = () => {
    let temparr = arrChanges
      .reverse()
      .filter(
        (c, index, self) => self.findIndex((t) => c.guid === t.guid) === index
      );
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
                      : "",
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
        {dropdownIndex !== null &&
        spritesSpecies[dropdownIndex!].hasGenderDifferences ? (
          <div>
            {spritesSpecies[dropdownIndex!].gender!.map((gender, index) => (
              <div key={index}>
                <div
                  onClick={() =>
                    addToBoxItem(false, 1, index + 1, gender.sprite)
                  }
                >
                  <Image
                    src={`/sprites/${gender.sprite}`}
                    height={50}
                    width={50}
                    alt={`${gender.name} ${
                      spritesSpecies[dropdownIndex!].name
                    }`}
                  />
                  <p>{`${gender.name} ${
                    spritesSpecies[dropdownIndex!].name
                  }`}</p>
                </div>
                <div
                  onClick={() =>
                    addToBoxItem(true, 1, index + 1, gender.shinySprite)
                  }
                >
                  <Image
                    src={`/sprites/${gender.shinySprite}`}
                    height={50}
                    width={50}
                    alt={"shiny " + gender.name}
                  />
                  <p>{`shiny ${gender.name} ${
                    spritesSpecies[dropdownIndex!].name
                  }`}</p>
                </div>
              </div>
            ))}
          </div>
        ) : dropdownIndex !== null ? (
          <div>
            <div
              onClick={() =>
                addToBoxItem(
                  false,
                  1,
                  0,
                  spritesSpecies[dropdownIndex!].forms[0].sprite
                )
              }
            >
              <Image
                src={`/sprites/${
                  spritesSpecies[dropdownIndex!].forms[0].sprite
                }`}
                height={50}
                width={50}
                alt={`${spritesSpecies[dropdownIndex!].name}`}
              />
              <p>{`${spritesSpecies[dropdownIndex!].name}`}</p>
            </div>
            <div
              onClick={() =>
                addToBoxItem(
                  true,
                  1,
                  0,
                  spritesSpecies[dropdownIndex!].forms[0].shinySprite
                )
              }
            >
              <Image
                src={`/sprites/${
                  spritesSpecies[dropdownIndex!].forms[0].shinySprite
                }`}
                height={50}
                width={50}
                alt={`shiny ${spritesSpecies[dropdownIndex!].name}`}
              />
              <p>{`shiny ${spritesSpecies[dropdownIndex!].name}`}</p>
            </div>
          </div>
        ) : null}
        {dropdownIndex !== null &&
        spritesSpecies[dropdownIndex!].forms.length > 1
          ? spritesSpecies[dropdownIndex!].forms.slice(1).map((form, index) => (
              <div key={index}>
                <div
                  onClick={() => addToBoxItem(false, index + 1, 0, form.sprite)}
                >
                  <Image
                    src={`/sprites/${form.sprite}`}
                    height={50}
                    width={50}
                    alt={`${form.name} ${spritesSpecies[dropdownIndex!].name}`}
                  />
                  <p>{`${form.name} ${spritesSpecies[dropdownIndex!].name}`}</p>
                </div>
                <div
                  onClick={() =>
                    addToBoxItem(true, index + 1, 0, form.shinySprite)
                  }
                >
                  <Image
                    src={`/sprites/${form.shinySprite}`}
                    height={50}
                    width={50}
                    alt={`shiny ${form.name} ${
                      spritesSpecies[dropdownIndex!].name
                    }`}
                  />
                  <p>{`shiny ${form.name} ${
                    spritesSpecies[dropdownIndex!].name
                  }`}</p>
                </div>
              </div>
            ))
          : null}
        <button onClick={onSave}>SAVE</button>
        <div className="">{boxItems[0].id}</div>
        <div className="">{detailMap.get(boxItems[0].id)?.gender}</div>
      </div>
    </div>
  );
};

export default Box;
