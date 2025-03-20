import React, { useEffect, useState } from "react";
import styles from "../../styles/Mypage.module.scss";

import { babyinfo } from "../types";
import { UpdateBaby } from "./UpdateBaby";
import { DelbabyModal } from "./DelbabyModal";

import { BabyInputPlus } from "./BabyInputPlus";

import { BabyList } from "../commons/BabyList";
import { useBabyMonths } from "./hooks/useBabyMonths";

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
  const [babyPlus, setBabyPlus] = useState<boolean>(false); // 아이 등록 모달 상태

  const handleSelectBaby = (babyId: number) => {
    setSelectedBabyId(babyId);
  };

  const babyMonths = useBabyMonths(selectedBaby.birthday); // 아기 개월 수

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
    <div className="babyArea">
      <h3>우리아이 정보</h3>

      <BabyList
        babyInfo={babyInfo}
        handleSelectBaby={handleSelectBaby}
        selectedBabyId={selectedBabyId}
        onOpenModal={() => setBabyPlus(true)}
      />

      <div className="babyInfo hidden">
        {/* 사진 */}
        <div className="pictureArea">
          <div className="picture">
            {!(selectedBaby.picture === "data:image/jpeg;base64,") ? (
              <img
                className="uploaded"
                src={selectedBaby?.picture || "img/babybasic.png"}
                alt="아기 사진"
              />
            ) : (
              <img
                className="default"
                src="img/babybasic.png"
                alt="기본 아기 사진"
              />
            )}
          </div>
        </div>

        <div className="items">
          <div className="item">
            <div className="item-label">생년월일</div>
            <div className="item-value">{selectedBaby.birthday}</div>
          </div>

          <div className="item">
            <div className="item-label">개월 수</div>
            <div className="item-value">{babyMonths}</div>
          </div>

          <div className="itemBtns">
            <div className="item">
              <div className="item-label">성별</div>
              <div className="item-value">
                {selectedBaby.gender === "boy" ? "남아" : "여아"}
              </div>
            </div>
            <div className="buttons">
              <button onClick={() => setDelModal(true)}>삭제</button>
              {delModal && (
                <DelbabyModal
                  handleSelectBaby={selectedBaby.babyid}
                  babyInfo={babyInfo}
                  onClose={() => setDelModal(false)}
                />
              )}

              <button onClick={() => setUpdateBaby(true)}>
                수정
                <img alt="수정 아이콘" src="/img/edit-01.png" />
              </button>
              {updateBaby && (
                <UpdateBaby
                  selectedBaby={selectedBaby}
                  onClose={() => setUpdateBaby(false)}
                  isOpen={updateBaby}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {babyPlus && (
        <div onClick={() => setBabyPlus(false)} style={{ right: "0px" }}>
          <BabyInputPlus
            onClose={() => setBabyPlus(false)}
            babyInfo={babyInfo}
          />
        </div>
      )}
    </div>
  );
};
