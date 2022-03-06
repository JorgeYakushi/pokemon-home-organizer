import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { boxes } from "../../mocks/boxes";
import { IBox } from "../../common/interfaces/box.interface";
import styles from "../../styles/table.module.scss";
import Image from "next/image";
const Box: NextPage = () => {
  const router = useRouter();
  const boxId = parseInt(router.query.boxId as string, 10);
  const [box, setBox] = useState<IBox>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 30;
  const totalPages: number = Math.ceil(boxes.length / pageSize);
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setBox(boxes[boxId - 1]);
  }, [boxId]);
  return (
    <div className="container">
      <div className={styles.table}>
        <div className={styles.table__head}>
          <div>
            {currentPage !== 1 && (
              <button className="btn-reset" onClick={prevPage}>
                <Image
                  src="/icons/chevron-left.svg"
                  alt="left-arrow"
                  width={30}
                  height={30}
                />
              </button>
            )}
          </div>
          <div className={styles["page-name"]}></div>
          <div>
            {currentPage !== totalPages && (
              <button className="btn-reset" onClick={nextPage}>
                <Image
                  src="/icons/chevron-right.svg"
                  alt="right-arrow"
                  width={30}
                  height={30}
                />
              </button>
            )}
          </div>
        </div>
        <div className={styles.table__body}>
          {box?.boxItems.map((pokemon, index) => (
            <div className={styles.box} key={index}>
              {pokemon.pokemonId ? (
                <div className={styles.item}>
                  <Image
                    src={`/sprites/${pokemon.sprite}`}
                    alt="no pokemon"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src="/icons/pokeball.svg"
                    alt="no pokemon"
                    height={50}
                    width={50}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Box;
