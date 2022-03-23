import { FC, useState } from "react";
import Image from "next/image";
import styles from "@/styles/login.module.scss";
import Link from "next/link";
import { titleCase } from "common/utils/string-manip";
export const LoginButton: FC<{ service: string }> = ({ service }) => {
  return (
    <Link href={`${process.env.BACKEND_API}/auth/${service}`} passHref>
      <a className={styles[service]}>
        <Image
          src={`/icons/login/${service}.svg`}
          height={25}
          width={50}
          alt={service}
        />
        <p>Sign with {titleCase(service)}</p>
      </a>
    </Link>
  );
};
