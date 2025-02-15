import React, { useEffect } from "react";
import styles from "../../styles/Modal.module.scss";
import button from "../../styles/commons/Button.module.scss";
import { useDelbaby } from "./hooks/useDelbaby";
import { babyinfo } from "../types";

interface DelbabyProps {
  onClose: () => void;
  babyInfo: babyinfo[];
  handleSelectBaby: number | null;
}

export const DelbabyModal: React.FC<DelbabyProps> = ({
  onClose,
  handleSelectBaby,
}) => {
  const { delbaby } = useDelbaby();

  // `handleSelectBaby`가 올바른 값인지 확인
  useEffect(() => {
    console.log("삭제할 babyid:", handleSelectBaby);
  }, [handleSelectBaby]);

  // 모달 닫기
  const goBack = () => {
    console.log(" 모달 닫기 실행");
    onClose();
  };

  // 아이 삭제 핸들러
  const handleDelete = async () => {
    if (handleSelectBaby !== null) {
      const success = await delbaby(handleSelectBaby);
      if (success) {
        console.log(" 아이 삭제 성공");
        onClose();
      } else {
        console.error(" 아이 삭제 실패");
      }
    } else {
      console.error("⚠ 삭제할 babyid가 null입니다.");
    }
  };

  return (
    <div className={styles.modal_overlay} onClick={goBack}>
      <div className={styles.modal_container} style={{ padding: "50px" }}>
        <div
          className={styles.modal_title_wrap}
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <div className={styles.modal_title}>정말 삭제하시겠습니까?</div>
          <div className={styles.del_modal_button_wrap}>
            <button
              onClick={goBack}
              className={`${button.btnXlYw} ${styles.cancel_button}`}
            >
              취소
            </button>
            <button
              onClick={handleDelete}
              className={`${button.btnXlGr} ${styles.del_button}`}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
