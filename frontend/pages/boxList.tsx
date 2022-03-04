import { FC, useState } from "react";
import { boxes } from "../mocks/boxes";
import { useEffect } from "react";
import { IBox } from "../common/interfaces/box.interface";
import styles from "../styles/box-list.module.scss";
import Image from "next/image";
const BoxList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 30;

  const totalPages: number = Math.ceil(boxes.length / pageSize);
  const [box, setBox] = useState<IBox[]>([]);
  useEffect(() => {
    const paginateBox = () => {
      setBox(boxes.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    };
    paginateBox();
  }, [currentPage]);

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
  return (
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
        <div className={styles["page-name"]}>
          {`Page ${currentPage} / ${totalPages} (${box[0]?.number} - ${
            box[box.length - 1]?.number
          })`}
        </div>
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
        {box.map((box) => (
          <div className={styles.box} key={box.number}>
            <p>{box.number}</p>
            <div>
              <Image
                src="/open-cardboard-box.svg"
                alt="empty-box"
                width={50}
                height={50}
              />
            </div>
            <p>{box.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxList;
