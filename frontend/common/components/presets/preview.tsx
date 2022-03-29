import { FC, useState } from "react";
import Image from "next/image";
import styles from "@/styles/presets.module.scss";
import Link from "next/link";
import { titleCase } from "@/utils/functions/string-manip";

import { IPokemonPreset } from "@/interfaces/presets.interface";
interface IPresetProps {
  preset: IPokemonPreset[];
}
export const PresetPreview: FC<IPresetProps> = ({ preset }) => {
  console.log(preset);
  return (
    <div className={styles.presets__table}>
      {preset.map((poke, index) => (
        <div key={index}>
          <Image
            height={30}
            width={30}
            src={`/sprites/${poke.sprite}`}
            alt={poke.speciesId.toString()}
          />
        </div>
      ))}
    </div>
  );
};
