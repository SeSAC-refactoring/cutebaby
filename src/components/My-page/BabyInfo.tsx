import React, { useEffect, useState } from "react";
import styles from "../../styles/Mypage.module.scss";
import { babyinfo } from "../types";
import { UpdateBaby } from "./UpdateBaby";
import { DelbabyModal } from "./DelbabyModal";
import { BabyListColumnSmall } from "../commons/BabyListColumn_small";
import { BabyInputPlus } from "../my-page/BabyInputPlus";  // 🔹 모달 import

interface BabyInputProps {
  babyInfo: babyinfo[];
}

export const BabyInfo: React.FC<BabyInputProps> = ({ babyInfo }) => {
  const [selectedBabyId, setSelectedBabyId] = useState<number | null>(
    babyInfo.length > 0 ? babyInfo[0].babyid : null
  );

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
  const [delModal, setDelModal] = useState<boolean>(false);
  const [babyPlus, setBabyPlus] = useState<boolean>(false); // 🔹 아이 등록 모달 상태

  const handleSelectBaby = (babyId: number) => {
    setSelectedBabyId(babyId);
  };

  useEffect(() => {
    const filterbaby = babyInfo.find((baby) => baby.babyid === selectedBabyId);

    if (filterbaby) {
      let pictureUrl: string | null = null;

      if (filterbaby.picture instanceof File) {
        pictureUrl = URL.createObjectURL(filterbaby.picture);
      } else if (typeof filterbaby.picture === "string") {
        pictureUrl = filterbaby.picture;
      }

      setSelectedBaby({
        babyid: filterbaby.babyid,
        babyname: filterbaby.babyname,
        gender: filterbaby.gender,
        birthday: filterbaby.birthday,
        picture: pictureUrl,
      });
    }
  }, [selectedBabyId, babyInfo]);

  return (
    <div className={styles.babyInfo_background}>
      <div className={styles.info_title}>우리아이 정보</div>

      <div className={styles.babyInfo_contents_wrap}>
        {/* 🔹 BabyListColumnSmall에 모달 열기 함수 전달 */}
        <BabyListColumnSmall 
          babyInfo={babyInfo} 
          handleSelectBaby={handleSelectBaby} 
          selectedBabyId={selectedBabyId} 
          onOpenModal={() => setBabyPlus(true)} // 🔹 버튼 클릭 시 모달 열기
        />

        <div className={styles.babyInfo_wrap}>
          <div>
            {selectedBaby.picture ? (
              <img src={selectedBaby.picture} alt="아기 사진" className={styles.baby_img} />
            ) : (
              <p>사진이 없습니다.</p>
            )}
          </div>
          <div className={styles.babyInfo_detail_wrap}>
            <div style={{ marginBottom: "32px" }} className={styles.detail_set}>
              <label className={styles.info_label}>생년월일</label>
              <div className={styles.name}>{selectedBaby.birthday}</div>
            </div>
            <div className={styles.detail_set}>
              <label className={styles.info_label}>성별</label>
              <div className={styles.name}>
                {selectedBaby.gender === "boy" ? "남아" : "여아"}
              </div>
            </div>
            <div className={styles.babyInfo_btn_wrap}>
              <button className={styles.babyInfo_delete_btn} onClick={() => setDelModal(true)}>
                삭제
              </button>
              {delModal && (
                <DelbabyModal
                  handleSelectBaby={selectedBaby.babyid}
                  babyInfo={babyInfo}
                  onClose={() => setDelModal(false)}
                />
              )}

              <button className={styles.babyInfo_edit_btn} onClick={() => setUpdateBaby(true)}>
                수정
                <img className={styles.icon} alt="수정 아이콘" src="/img/edit-01.png" />
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

      {babyPlus && (
        <BabyInputPlus
          onClose={() => setBabyPlus(false)}
          babyInfo={babyInfo}
        />
      )}
    </div>
  );
};
