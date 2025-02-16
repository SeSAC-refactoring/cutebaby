import React, { useEffect, useState } from "react";
import styles from "../../styles/Mypage.module.scss";

import { babyinfo } from "../types";
import { UpdateBaby } from "./UpdateBaby";
import { DelbabyModal } from "./DelbabyModal";

import { BabyListColumnSmall } from "../commons/BabyListColumn_small";
import { BabyInputPlus } from "./BabyInputPlus";

import { BabyList } from "../commons/BabyList";
import modal from "../../styles/Modal.module.scss";
import button from "../../styles/commons/Button.module.scss";
import typography from "../../styles/commons/Typography.module.scss";

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
      <div className={typography.textXlBd}>우리아이 정보</div>

      <div className={styles.babyInfo_contents_wrap}>
        <BabyList
          babyInfo={babyInfo}
          handleSelectBaby={handleSelectBaby}
          selectedBabyId={selectedBabyId}
          onOpenModal={() => setBabyPlus(true)}
        />

        <div className={styles.babyInfo_wrap}>
          <div>
            {!(selectedBaby.picture === "data:image/jpeg;base64,") ? (
              <img
                src={selectedBaby?.picture || "img/babybasic.png"}
                alt="아기 사진"
                className={styles.baby_img}
              />
            ) : (
              <img src="img/babybasic.png" alt="기본 아기 사진"></img>
            )}
          </div>
          <div className={styles.babyInfo_detail_wrap}>
            <div className={styles.detail_wrap}>
              <div
                style={{ marginBottom: "32px" }}
                className={styles.detail_set}
              >
                <div className={typography.textSmBd}>생년월일</div>
                <div className={typography.textXlBd}>
                  {selectedBaby.birthday}
                </div>
              </div>
              <div className={styles.detail_set}>
                <div className={typography.textSmBd}>성별</div>
                <div className={typography.textXlBd}>
                  {selectedBaby.gender === "boy" ? "남아" : "여아"}
                </div>
              </div>
            </div>
            <div className={styles.babyInfo_btn_wrap}>
              <button
                className={`${button.btnMeCo} ${typography.textMdBd}`}
                onClick={() => setDelModal(true)}
              >
                삭제
              </button>
              {delModal && (
                <DelbabyModal
                  handleSelectBaby={selectedBaby.babyid}
                  babyInfo={babyInfo}
                  onClose={() => setDelModal(false)}
                />
              )}

              <button
                // className={styles.babyInfo_edit_btn}
                className={`${button.btnMdYw} ${typography.textMdBd}`}
                onClick={() => setUpdateBaby(true)}
              >
                수정
                <img
                  className={styles.icon}
                  alt="수정 아이콘"
                  src="/img/edit-01.png"
                />
              </button>
            </div>
            {updateBaby && (
              <UpdateBaby
                selectedBaby={selectedBaby}
                onClose={() => setUpdateBaby(false)}
              />
            )}
          </div>
        </div>
      </div>

      {babyPlus && (
        <div
          onClick={() => setBabyPlus(false)}
          style={{ right: "0px" }}
          className={modal.modal_overlay}
        >
          <BabyInputPlus
            onClose={() => setBabyPlus(false)}
            babyInfo={babyInfo}
          />
        </div>
      )}
    </div>
  );
};
