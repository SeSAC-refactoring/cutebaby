import React, { useEffect, useState } from "react";
import styles from "../../styles/Mypage.module.scss";
import { babyinfo } from "../types";
import { UpdateBaby } from "./UpdateBaby";

interface BabyInputProps {
  babyInfo: babyinfo[];
  handleSelectBaby: number | null;
}

export const BabyInfo: React.FC<BabyInputProps> = ({ babyInfo, handleSelectBaby }) => {
  const [selectedBaby, setSelectedBaby] = useState<{
    babyid: number;
    babyname: string;
    gender: string;
    birthday: string;
    picture: string | null;
  }>({
    babyid: 0,
    babyname: "",
    gender: "",
    birthday: "",
    picture: null,
  });

  const [updateBaby, setUpdateBaby] = useState<boolean>(false);
  const update = () => {
    setUpdateBaby(true);
  };

  useEffect(() => {
    const filterbaby = babyInfo.find((baby) => baby.babyid === handleSelectBaby);
    console.log('filterbaby>>',filterbaby?.picture)
    if (filterbaby!= null) {
      let pictureUrl: string | null = null;

      if (filterbaby.picture instanceof File) {
        // File 객체이면 URL 생성
        pictureUrl = URL.createObjectURL(filterbaby.picture);

      } else if (typeof filterbaby.picture === "string") {
        // 기존 URL이면 그대로 사용
        pictureUrl = filterbaby.picture;
        console.log('>>',pictureUrl)

      }

      setSelectedBaby({
        babyid: filterbaby.babyid,
        babyname: filterbaby.babyname,
        gender: filterbaby.gender,
        birthday: filterbaby.birthday,
        picture: pictureUrl,
      });
    }
  }, [handleSelectBaby, babyInfo]);

  return (
    <>
      <div className={styles.info_box}>
        {updateBaby && <UpdateBaby selectedBaby={selectedBaby} onClose={() => setUpdateBaby(false)} />}

        <div className={styles.info_title}>아이 정보보기</div>
        <div className={styles.info_content}>
          <div className={styles.info_a}>이름</div>
          <div className={styles.info_b}>{selectedBaby.babyname}</div>
        </div>
        <div className={styles.info_content}>
          <div className={styles.info_a}>성별</div>
          <div className={styles.info_b}>{selectedBaby.gender === "boy" ? "남아" : "여아"}</div>
        </div>
        <div>
          {selectedBaby.picture ? (
            <img src={selectedBaby.picture} alt="아기 사진" />
          ) : (
            <p>사진이 없습니다.</p>
          )}
        </div>
      </div>
      <button className={styles.edit_btn} onClick={update}>
        수정
      </button>
    </>
  );
};
