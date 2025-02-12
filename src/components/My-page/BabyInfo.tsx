import React, { useEffect, useState } from "react";
import styles from "../../styles/Mypage.module.scss";
import { babyinfo } from "../types";
import { UpdateBaby } from "./UpdateBaby";
import { DelbabyModal } from "./DelbabyModal";

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
  const [delModal, setDelModal] = useState<boolean>(false);

  // 수정 버튼 클릭 시
  const update = () => {
    setUpdateBaby(true);
  };

  // 삭제 버튼 클릭 시
  const Del = () => {
    setDelModal(true);
  };

  useEffect(() => {
    const filterbaby = babyInfo.find((baby) => baby.babyid === handleSelectBaby);

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
  }, [handleSelectBaby, babyInfo]);

  return (
    <div className={styles.babyInfo_background}>
      <div className={styles.info_title}>우리아이 정보</div>
      <div className={styles.babyInfo_contents_wrap}>
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
              {/* 삭제 버튼 */}
              <button className={styles.babyInfo_delete_btn} onClick={Del}>
                삭제
              </button>
              {/* 삭제 모달 */}
              {delModal && (
                <DelbabyModal
                  handleSelectBaby={selectedBaby.babyid} // 정확한 babyid 전달
                  babyInfo={babyInfo}
                  onClose={() => setDelModal(false)} // 모달 닫기 이벤트 정상 작동
                />
              )}

              {/* 수정 버튼 */}
              <button className={styles.babyInfo_edit_btn} onClick={update}>
                수정
                <img className={styles.icon} alt="수정 아이콘" src="/img/edit-01.png" />
              </button>

              {/* 수정 모달 */}
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
