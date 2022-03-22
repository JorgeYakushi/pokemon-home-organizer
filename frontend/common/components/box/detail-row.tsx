import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/detail.module.scss";
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
  handler(
    gender: number,
    isShiny: boolean,
    formId: number,
    sprite: string
  ): any;
}
export const DetailRow: FC<IDetailRowProps> = ({
  name,
  form,
  genderRate,
  handler,
}) => {
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
    handler(gender, isShiny, form.formId, sprite);
  };
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
              className={styles.variants__pick}
              src={`/icons/female.svg`}
              height={25}
              width={25}
              alt="female"
            />
          ) : null}
          {[-1, 8].indexOf(genderRate) < 0 ? (
            <Image
              onClick={() => onClick(2, false)}
              className={styles.variants__pick}
              src={`/icons/male.svg`}
              height={25}
              width={25}
              alt="male"
            />
          ) : null}
          {genderRate === -1 ? (
            <Image
              onClick={() => onClick(0, false)}
              className={styles.variants__pick}
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
              className={styles.variants__pick}
              src={`/icons/female.svg`}
              height={25}
              width={25}
              alt="female"
            />
          ) : null}
          {[-1, 8].indexOf(genderRate) < 0 ? (
            <Image
              onClick={() => onClick(2, true)}
              className={styles.variants__pick}
              src={`/icons/male.svg`}
              height={25}
              width={25}
              alt="male"
            />
          ) : null}
          {genderRate === -1 ? (
            <Image
              onClick={() => onClick(0, true)}
              className={styles.variants__pick}
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
