import { FC, useState } from "react";
import Image from "next/image";
import styles from "@/styles/header.module.scss";
import Link from "next/link";
export const Header: FC = () => {
  return (
    <header className={[styles.header, "container"].join(" ")}>
      <div className={styles.header__content}>
        <div className={styles.header__pokeball}>
          <Image
            alt="pokeball"
            src={"/icons/pokeball-menu.svg"}
            height={50}
            width={50}
          />
        </div>
        <ul>
          <li>HOME</li> <span></span>
          <li>BOXES</li> <span></span>
          <li>PRESETS</li> <span></span>
          <li>ABOUT</li> <span></span>
          <li>SETTINGS</li>
        </ul>
      </div>
    </header>
  );
};
