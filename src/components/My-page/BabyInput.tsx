import React from 'react'
import styles from "../../styles/Mypage.module.scss";


export default function BabyInput() {
  return (
    <>
    <div className={styles.user_list}>
          <div className={styles.user_wrap}>
            <div className={styles.user}>김하나</div>
            <div className={styles.user}>김두리</div>
            <div className={styles.user}>김세찌</div>
          </div>
          <button className={styles.enroll}>아이등록</button>
        </div>
    </>
)
}
