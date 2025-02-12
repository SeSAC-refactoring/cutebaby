import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchBabyInfo } from "../../store/babySlice";
import { babyinfo } from "../types";
import styles from "../../styles/commons/ChildrenTabs.module.scss";

interface BabyListProps {
  babyInfo: babyinfo[];
  handleSelectBaby: (babyId: number) => void;
  selectedBabyId: number | null;
  onOpenModal: () => void;  // 🔹 모달 열기 함수 prop 추가
}

export const BabyListColumnSmall: React.FC<BabyListProps> = ({
  babyInfo,
  handleSelectBaby,
  selectedBabyId,
  onOpenModal, 
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBabyInfo());
  }, [dispatch]);

  return (
    <div>
      <div className={`${styles.button_group} ${styles.column_button_group_small}`}>
        {babyInfo.length === 0 ? (
          <p>등록된 아이가 없습니다!</p>
        ) : (
          babyInfo.map((baby: babyinfo) => (
            <button
              key={baby.babyid}
              className={baby.babyid === selectedBabyId ? styles.column_button_selected : styles.button}
              onClick={() => handleSelectBaby(baby.babyid)}
              style={{
                cursor: "pointer",
                fontWeight: baby.babyid === selectedBabyId ? "bold" : "normal",
              }}
            >
              {baby.babyname}
              {baby.babyid === selectedBabyId && (
                <img src="img/check-02.png" alt="체크 아이콘" style={{ marginLeft: "8px" }} />
              )}
            </button>
          ))
        )}
        {/* 상위컴포넌트로 상태변경 전달하기 */}
        <button onClick={onOpenModal} className={styles.enroll}>
          아이 등록
        </button>
      </div>
    </div>
  );
};
