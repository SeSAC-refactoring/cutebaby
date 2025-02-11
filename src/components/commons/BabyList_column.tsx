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
}

export const BabyListColumn: React.FC<BabyListProps> = ({
  babyInfo,
  handleSelectBaby,
  selectedBabyId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBabyInfo());
  }, [dispatch, babyInfo.length]);

  return (
    <div>
      <div className={`${styles.button_group} ${styles.column_button_group}`}>
        {babyInfo.length === 0 ? (
          <p>등록된 아이가 없습니다!</p>
        ) : (
          babyInfo.map((baby: babyinfo) => (
            <button
              key={baby.babyid}
              className={
                baby.babyid === selectedBabyId
                  ? styles.column_button_selected // 선택된 경우 클래스 적용
                  : styles.button
              }
              onClick={() => handleSelectBaby(baby.babyid)}
              style={{
                cursor: "pointer",
                fontWeight: baby.babyid === selectedBabyId ? "bold" : "normal",
              }}
            >
              {baby.babyname}
              {baby.babyid === selectedBabyId ? (
                <img
                  src="img/check-02.png"
                  alt="체크 아이콘"
                  style={{ marginLeft: "8px" }}
                ></img>
              ) : (
                <></>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
