import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/VaccinationDetails.module.scss';
import { DiseaseInfo, DiseaseList } from '../components/types';
import {
    fetchVaccinationDiseaseList,
    fetchVaccinationInfo,
} from '../components/api-data/vaccinationDisease';

export default function VaccinationDetails() {
    const [diseaseList, setDiseaseList] = useState<DiseaseList[]>([]);
    const [diseaseInfo, setDiseaseInfo] = useState<{
        [key: number]: DiseaseInfo;
    }>({});
    const [expandItems, setExpandItems] = useState<{
        [key: number]: boolean;
    }>({});

    // fetchVaccinationDiseaseList()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await fetchVaccinationDiseaseList();
                setDiseaseList(list);
            } catch (error) {
                console.error('Error fetching disease list:', error);
            }
        };
        fetchData();
    }, []);

    // fetchVaccinationInfo()
    const fetchDiseaseInfo = useCallback(
        async (cd: number) => {
            // 정보가 열려 있으면 닫기
            if (expandItems[cd]) {
                setExpandItems((prev) => ({ ...prev, [cd]: false }));
                return;
            }

            // 이미 데이터가 있다면 바로 열기
            if (diseaseInfo[cd]) {
                setExpandItems((prev) => ({ ...prev, [cd]: true }));
                return;
            }

            // 데이터가 없으면 API 요청
            try {
                const info: DiseaseInfo = await fetchVaccinationInfo(cd);
                setDiseaseInfo((prev) => ({ ...prev, [cd]: info })); // 데이터 저장
                setExpandItems((prev) => ({ ...prev, [cd]: true })); // 데이터를 불러온 후 상태 변경
            } catch (error) {
                console.error(`Error fetching info for disease ${cd}:`, error);
            }
        },
        [expandItems, diseaseInfo]
    );

    return (
        <>
            <h1>예방접종 대상 감염병 상세설명</h1>
            <div className={styles.background}>
                <select className={styles.select}>
                    <option>전체</option>
                    <option>B형간염</option>
                    <option>결핵</option>
                </select>

                <ul>
                    {diseaseList.map((disease) => (
                        <li key={disease.cd}>
                            <span>{disease.cdNm}</span>
                            <button
                                onClick={() => fetchDiseaseInfo(disease.cd)}
                            >
                                {expandItems[disease.cd]
                                    ? '접기 ▲'
                                    : '더보기 ▼'}
                            </button>
                            {expandItems[disease.cd] &&
                                diseaseInfo[disease.cd] && (
                                    <div className="disease-info">
                                        <h3>{diseaseInfo[disease.cd].title}</h3>
                                        <p>
                                            {diseaseInfo[disease.cd].message
                                                .split('\n') // 줄바꿈 적용
                                                .map((line, i) => (
                                                    <span key={i}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
