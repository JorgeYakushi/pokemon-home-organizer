import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/table.module.scss";

export const TableHeader: FC<{ currentBox: number }> = ({ currentBox }) => {
  return (
    <>
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
          {currentBox !== 200 && (
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
    </>
  );
};
