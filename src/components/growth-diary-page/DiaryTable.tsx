import React, { useEffect, useState } from "react";
import { newGrowData } from "../types";
import styles from "../../styles/GrowthDiary.module.scss";
import { GrowRewriteModal } from "./GrowRewriteModal";
import { GrowDelModal } from "./GrowDelModal";
import typography from "../../styles/commons/Typography.module.scss";

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
      <div className={`${typography.textLgRg} ${styles.tableBody}`}>
        {growData.length > 0 ? (
          <ul className={typography.textLgRg}>
            {growData.map((info, i) => (
              <li key={i} className={styles.row_el}>
                <div className={`${styles.list_el} ${typography.textLgRg}`}>
                  {info.inputData}
                </div>
                <div className={`${styles.list_el} ${typography.textLgRg}`}>
                  {info.height}
                </div>
                <div className={`${styles.list_el} ${typography.textLgRg}`}>
                  {info.weight}
                </div>
                <div className={`${styles.list_el} ${typography.textLgRg}`}>
                  {info.head}
                </div>
                <div className={styles.btn_wrap}>
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
                    <img src="/img/edit-02.png" alt="수정아이콘"></img>
                  </button>
                </div>
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
