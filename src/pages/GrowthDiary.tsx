import { useSelector } from 'react-redux';
import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { GrowthCalculate } from '../components/growth-diary-page/GrowthCalculate';
import { GrowthDiaryComponent } from '../components/growth-diary-page/GrowthDiaryComponent';
import styles from '../styles/GrowthDiary.module.scss';
import { RootState } from '../store';
import { BabyList } from '../components/BabyList';

export default function GrowthDiary() {
    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );

    return (
        <>
            <div className={styles.background}>
                <div className={styles.title}>성장기록</div>
                <div className={styles.text}>
                    우리 아이의 성장을 기록해보세요 😀
                </div>
                <BabyList />
                <GrowthDiaryComponent />
                <DiaryChart />
            </div>

            {/* 계산하는 페이지 / 다른 페이지로 분리 예정??  */}
            <br />
            <hr />
            <GrowthCalculate />
        </>
    );
}
