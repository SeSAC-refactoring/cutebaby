import React from "react";
import styles from "../../styles/GrowthDiary.module.scss";

export const DiaryInputArea = () => {
  return (
    <div className={styles.inputArea_wrap}>
      <div>
        <label className={styles.label} htmlFor="height">
          신장
        </label>
        <div>
          <input
            className={styles.input}
            type="number"
            id="height"
            placeholder="숫자 입력"
          />
          <span>cm</span>
        </div>
      </div>

      <div>
        <label className={styles.label} htmlFor="height">
          체중
        </label>
        <div>
          <input
            className={styles.input}
            type="number"
            id="height"
            placeholder="숫자 입력"
          />
          <span>kg</span>
        </div>
      </div>

      <div>
        <label className={styles.label} htmlFor="head">
          머리둘레
        </label>
        <div>
          <input
            className={styles.input}
            type="number"
            id="head"
            placeholder="숫자 입력"
          />
          <span>cm</span>
        </div>
      </div>
    </div>
  );
};
