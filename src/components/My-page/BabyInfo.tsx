import React from 'react';
import styles from '../../styles/Mypage.module.scss'

interface Baby {
    babyname: string;
    birthday: string;
    gender: string;
    picture: string | null; // picture가 null일 수도 있으므로
  }
  

interface BabyInputProps {
    babyInfo: Baby[];  // babyInfo는 배열 형식임
  }

  
  export const BabyInfo: React.FC<BabyInputProps> = ({babyInfo}) => {
  
 

    
  return (
    <>
           <div className={styles.info_box}>
          <div className={styles.info_title}>아이 정보보기</div>
          <div className={styles.info_content}>
            <div className={styles.info_a}>생년월일</div>
            <div className={styles.info_b}>2025년 1월 30일</div>
          </div>
          <div className={styles.info_content}>
            <div className={styles.info_a}>성별</div>
            <div className={styles.info_b}>여자</div>
          </div>
          <div className={styles.info_content}>
            <div className={styles.info_a}>신장</div>
            <div className={styles.info_b}>120cm</div>
          </div>
          <div className={styles.info_content}>
            <div className={styles.info_a}>체중</div>
            <div className={styles.info_b}>12kg</div>
          </div>
          <div className={styles.info_content}>
            <div className={styles.info_a}>머리둘레</div>
            <div className={styles.info_b}>30cm</div>
          </div>

        </div>
        <button className={styles.edit_btn}>수정</button>

    </>

)
}
