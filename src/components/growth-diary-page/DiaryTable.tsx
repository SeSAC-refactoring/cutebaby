import React, { useEffect, useState } from "react";
import { newGrowData } from "../types";
import styles from "../../styles/GrowthDiary.module.scss";
import { GrowRewriteModal } from "./GrowRewriteModal";
import { GrowDelModal } from "./GrowDelModal";

interface DiaryTableProps {
  growData: newGrowData[];
  onEdit: (growId: number) => void;
  onDelete: (growId: number) => void;
}

export const DiaryTable: React.FC<DiaryTableProps> = ({
  growData,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.list_wrap}>
      <div className={styles.row_title}>
        <div className={styles.list_title}>측정날짜</div>
        <div className={styles.list_title}>키(cm)</div>
        <div className={styles.list_title}>몸무게(kg)</div>
        <div className={styles.list_title}>머리둘레(cm)</div>
      </div>
      <div>
        {growData.length > 0 ? (
          <ul>
            {growData.map((info, i) => (
              <li key={i} className={styles.row_el}>
                <div className={styles.list_el}>{info.inputData}</div>
                <div className={styles.list_el}>{info.height}</div>
                <div className={styles.list_el}>{info.weight}</div>
                <div className={styles.list_el}>{info.head}</div>
                <button
                  className={`${styles.table_btn} ${styles.delete_btn}`}
                  onClick={() => onDelete(info.id)}
                >
                  삭제
                </button>
                <button
                  className={`${styles.table_btn} ${styles.edit_btn}`}
                  onClick={() => onEdit(info.id)}
                >
                  수정
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <li className={styles.row_el}>성장 기록이 없습니다.</li>
          </ul>
        )}
      </div>
    </div>
  );
};
