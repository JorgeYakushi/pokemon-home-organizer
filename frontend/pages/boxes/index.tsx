import { useState } from "react";
import type { NextPage } from "next";
import { boxes } from "../../mocks/boxes";
import { useEffect } from "react";
import { IBox } from "../../common/interfaces/box.interface";
import styles from "../../styles/table.module.scss";
import Image from "next/image";
import Link from "next/link";
import { filenames } from "../../mocks/filenames";
const BoxList: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 30;
  const totalPages: number = Math.ceil(boxes.length / pageSize);
  const [box, setBox] = useState<IBox[]>([]);
  console.log(process.env.BACKEND_API);
  useEffect(() => {
    const paginateBox = () => {
      setBox(boxes.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    };
    // const iterateFileNames = () => {
    //   let pokemonDexNum: number;
    //   let genderCode: string;
    //   let formCode: string;
    //   let spriteType: string;
    //   let formNumber: string;
    //   let pokeArray: string[] = [];
    //   filenames.map((item: string) => {
    //     pokemonDexNum = parseInt(item.substring(13, 17));
    //     genderCode = item.substring(22, 24);
    //     formCode = item.substring(25, 26);
    //     spriteType = item.substring(38, 39);
    //     formNumber = item.substring(18, 21);

    //     if (
    //       genderCode === "mf" ||
    //       genderCode == "uk" ||
    //       genderCode == "fd" ||
    //       genderCode === "mo" ||
    //       genderCode === "fo"
    //     ) {
    //       if (formCode === "n" && spriteType === "n" && formNumber === "000") {
    //         pokeArray.push(item);
    //       }
    //     }
    //   });
    //   console.log(boxes);
    //   console.log(pokeArray);
    // }; iterateFileNames();
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
  const addBox = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: 1, number: 11 }),
    };
    console.log(requestOptions);
    fetch(`${process.env.BACKEND_API}/add-box`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  const getBoxes = () => {
    fetch(`${process.env.BACKEND_API}/boxes`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="container">
      <button onClick={getBoxes}>GET BOXES</button>
      <button onClick={addBox}>ADD BOX</button>
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
              <Link href={`/box/${box.number}`} passHref>
                <a>
                  <Image
                    src="/open-cardboard-box.svg"
                    alt="empty-box"
                    width={50}
                    height={50}
                  />
                </a>
              </Link>
              <p>{box.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoxList;
