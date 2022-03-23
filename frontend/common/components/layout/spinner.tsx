import { FC, useState } from "react";
import styles from "@/styles/spinner.module.scss";
import Image from "next/image";
export const Spinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <Image
        className={styles.pokeball}
        src={"/icons/pokeball-menu.svg"}
        height={50}
        width={50}
        alt={"pokeball"}
      />
    </div>
  );
};
