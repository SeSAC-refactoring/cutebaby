import React from 'react';
import styles from '../../styles/Mypage.module.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const BabyInfo: React.FC = () => {
    const { babyInfo } = useSelector((state: RootState) => state.baby);

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
    );
};
