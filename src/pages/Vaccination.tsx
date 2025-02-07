import { Link } from 'react-router-dom';
import styles from '../styles/Vaccination.module.scss';
import { VaccinationTable } from '../components/vaccination-page/hooks/vaccination-table/VaccinationTable';
import { VaccineInfo } from '../components/vaccination-page/VaccineInfo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect } from 'react';
import { fetchVaccinationData } from '../store/vaccinationSlice';
import { log } from 'console';

export default function Vaccination() {
    const dispatch = useDispatch<AppDispatch>();
    const { vaccinationData, loading, error } = useSelector(
        (state: RootState) => state.vaccination
    );

    useEffect(() => {
        dispatch(fetchVaccinationData(5));
        console.log('Updated vaccinationData:', vaccinationData);
    }, [dispatch]);

    return (
        <>
            <div className={styles.background}>
                <div className={styles.title}>표준 예방접종 일정표</div>
                <div className={styles.text}>
                    우리 하나의 예방접종 일정을 관리해보세요 😀
                </div>
                <div className={styles.user_list}>
                    <div className={styles.user}>김하나</div>
                    <div className={styles.user}>김두리</div>
                    <div className={styles.user}>김세찌</div>
                </div>
                <select className={styles.select}>
                    <option>전체</option>
                    <option>1</option>
                    <option>2</option>
                </select>
                <div className={styles.button_wrap}>
                    <button className={styles.small_btn}>
                        <Link to="/VaccinationDetails">감염병 상세설명</Link>
                    </button>
                    <button className={styles.small_btn}>
                        <Link to="/VaccinationCenters">위탁의료기관 찾기</Link>
                    </button>
                </div>
            </div>

            <VaccinationTable />
            <VaccineInfo />

            {/* vaccination 데이터 가져오기 확인 */}
            {loading && <p>로딩 중...</p>}
            {error && <p>오류 {error}</p>}
            {vaccinationData.length === 0 && !loading && !error && (
                <p>예방접종 데이터가 없음</p>
            )}
            {vaccinationData.length > 0 && (
                <ul>
                    {vaccinationData.map((item, i) => {
                        console.log(`Item ${i}:`, item); // item이 어떻게 생겼는지 확인
                        console.log(
                            `typeof babyid: ${typeof item.babyid}, typeof vaccinationid: ${typeof item.vaccinationid}, typeof dosenumber: ${typeof item.dosenumber}, typeof dosedate: ${typeof item.dosedate}`
                        );
                        console.log('dosenumber', item.dosenumber);

                        return (
                            <li key={item.vaccinationid}>
                                <strong>babyid:</strong> {item.babyid}
                                {typeof item.babyid} <br />
                                <strong>vaccinationid:</strong>{' '}
                                {item.vaccinationid}
                                {typeof item.vaccinationid}
                                <br />
                                <strong>dosenumber:</strong> {item.dosenumber}
                                {typeof item.dosenumber}
                                <br />
                                <strong>dosedate:</strong>
                                {item.dosedate}
                                {typeof item.dosedate}
                                <br />
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
