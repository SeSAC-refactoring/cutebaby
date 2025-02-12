import React, { useEffect, useState } from "react";
import styles from "../../styles/Mypage.module.scss";
import { babyinfo } from "../types";
import { UpdateBaby } from "./UpdateBaby";
import { BabyListColumn } from "../commons/BabyListColumn";
import { useSelectBaby } from "../../hooks/useSelectBaby";
import { BabyList } from "../commons/BabyList";
import { MypageBabyList } from "./MypageBabyList";

interface BabyInputProps {
  babyInfo: babyinfo[];
  handleSelectBaby: number | null;
}

export const BabyInfo: React.FC<BabyInputProps> = ({
  babyInfo,
  handleSelectBaby,
}) => {
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
    const filterbaby = babyInfo.find(
      (baby) => baby.babyid === handleSelectBaby
    );
    console.log("filterbaby>>", filterbaby?.picture);
    if (filterbaby != null) {
      let pictureUrl: string | null = null;

      if (filterbaby.picture instanceof File) {
        // File 객체이면 URL 생성
        pictureUrl = URL.createObjectURL(filterbaby.picture);
      } else if (typeof filterbaby.picture === "string") {
        // 기존 URL이면 그대로 사용
        pictureUrl = filterbaby.picture;
        console.log(">>", pictureUrl);
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
    <div className={styles.babyInfo_background}>
      <div className={styles.info_title}>우리아이 정보</div>
      <div className={styles.babyInfo_contents_wrap}>
        {/* <div className={styles.babyList_wrap}> */}
        {/* </div> */}
        <div className={styles.babyInfo_wrap}>
          {/* <img src="/img/Profile.png" alt="아기 사진" /> */}
          <div>
            {selectedBaby.picture ? (
              <img
                src={selectedBaby.picture}
                alt="아기 사진"
                className={styles.baby_img}
              />
            ) : (
              <p>사진이 없습니다.</p>
            )}
          </div>
          <div className={styles.babyInfo_detail_wrap}>
            <div style={{ marginBottom: "32px" }} className={styles.detail_set}>
              <label className={styles.info_label}>생년월일</label>
              <div className={styles.name}>2025년 1월 10일</div>
            </div>
            <div className={styles.detail_set}>
              <label className={styles.info_label}>성별</label>
              <div className={styles.name}>
                {" "}
                {selectedBaby.gender === "boy" ? "남아" : "여아"}
              </div>
            </div>
            <div className={styles.babyInfo_btn_wrap}>
              <button className={styles.babyInfo_delete_btn}>삭제</button>
              <button className={styles.babyInfo_edit_btn} onClick={update}>
                수정
                <img
                  className={styles.icon}
                  alt="수정 아이콘"
                  src="/img/edit-01.png"
                />
              </button>
              {updateBaby && (
                <UpdateBaby
                  selectedBaby={selectedBaby}
                  onClose={() => setUpdateBaby(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
