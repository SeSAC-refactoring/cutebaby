import React, { useEffect, useState } from 'react';
import styles from '../../styles/Mypage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSelectBaby } from '../../hooks/useSelectBaby';

export const BabyInfo: React.FC = () => {
    // Redux에서 babyInfo 가져오기
    const { babyInfo } = useSelector((state: RootState) => state.baby);

    const { selectedBabyId } = useSelectBaby(babyInfo);

    const [selectedBaby, setSelectedBaby] = useState(() =>
        babyInfo.find((baby) => Number(baby.babyid) === Number(selectedBabyId)) || null
    );
useEffect(()=>{

})
    const [session , setsession] = useState(
        sessionStorage.getItem('selectedBabyId')
    )

    useEffect(() => {
        

        const baby = babyInfo.find((baby) => Number(baby.babyid) === Number(selectedBabyId)) || null;
        setSelectedBaby(baby);

    }, [selectedBabyId, session]);

    // 선택된 아기가 없을 경우
    if (!selectedBaby) {
        return <div className={styles.info_box}>선택된 아기 정보가 없습니다.</div>;
    }

    return (
        <>
            <div className={styles.info_box}>
                <div className={styles.info_title}>아이 정보보기</div>
                <div className={styles.info_content}>
                    <div className={styles.info_a}>이름</div>
                    <div className={styles.info_b}>{selectedBaby.babyname}</div>
                </div>
                <div className={styles.info_content}>
                    <div className={styles.info_a}>성별</div>
                    <div className={styles.info_b}>{selectedBaby.gender === 'boy' ? '남아' : '여아'}</div>
                </div>
                <div>
                    {/* <img src={selectedBaby.picture} alt="" /> */}
                </div>
            </div>
            <button className={styles.edit_btn}>수정</button>
        </>
    );
};
