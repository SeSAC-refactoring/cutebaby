import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchBabyInfo } from "../../store/babySlice";
import { babyinfo } from "../types";
import typography from "../../styles/commons/Typography.module.scss";
import styles from "../../styles/commons/ChildrenTabs.module.scss";

interface BabyListProps {
  babyInfo: babyinfo[];
  handleSelectBaby: (babyId: number) => void;
  selectedBabyId?: number | null;
  onOpenModal?: () => void;
}

export const BabyList: React.FC<BabyListProps> = ({
  babyInfo,
  handleSelectBaby,
  selectedBabyId,
  onOpenModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBabyInfo());
  }, [dispatch, babyInfo.length]);

  

  return (
    // 마이페이지의 babylist 스타일의 경우 아이 등록 버튼까지 감는 div
    <div className={styles.container}>
      <div className={`${styles.segments}`}>
        {babyInfo.length === 0 ? (
          <p>등록된 아이가 없습니다!</p>
        ) : (
          babyInfo.map((baby: babyinfo) => (
            <button
              key={baby.babyid}
              className={
                baby.babyid === selectedBabyId
                  ? `${styles.segmentsItem_selected} ${typography.textLgBd}` // 선택된 경우 클래스 적용
                  : `${styles.segmentsItem} ${typography.textLgBd}`
              }
              onClick={() => handleSelectBaby(baby.babyid)}
              // style={{
              //   fontWeight: baby.babyid === selectedBabyId ? "bold" : "normal",
              // }}
            >
              {baby.babyname.length > 3 ? baby.babyname.slice(0, 3) + "..." : baby.babyname}       
              <img
                className={
                  baby.babyid === selectedBabyId
                    ? styles.showCheckIcon // 선택된 경우 클래스 적용
                    : styles.hiddenCheckIcon
                }
                src="/img/icons/i-tabs-check-s24.svg"
                alt="체크 아이콘"
              />
            </button>
          ))
        )}
      </div>

      {/* 마이페이지의 경우에만 아이등록 버튼 생김 */}
      {onOpenModal && (
        <button onClick={onOpenModal} className={styles.add_button}>
          아이 등록 +
        </button>
      )}
    </div>
  );
};
