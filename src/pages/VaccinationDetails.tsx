import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/VaccinationDetails.module.scss';
import { DiseaseInfo, DiseaseList } from '../components/types';
import {
    fetchVaccinationDiseaseList,
    fetchVaccinationInfo,
} from '../components/api-data/vaccinationDisease';
import { useLoading } from '../hooks/useLoading';
import { DiseaseInfoMessage } from '../components/vaccination-page/DiseaseInfoMessage';

export default function VaccinationDetails() {
    const [onClickDis, setOnClickDis] = useState(0);
    const [focus, setFocus] = useState(1000);
    const [diseaseList, setDiseaseList] = useState<DiseaseList[]>([]);
    const [diseaseInfo, setDiseaseInfo] = useState<{
        [key: number]: DiseaseInfo;
    }>({});
    const [expandItems, setExpandItems] = useState<{
        [key: number]: boolean;
    }>({});

    const { isLoading, startLoading, stopLoading } = useLoading();

    // fetchVaccinationDiseaseList()
    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const list = await fetchVaccinationDiseaseList();
                setDiseaseList(list);
            } catch (error) {
                console.error('Error fetching disease list:', error);
            } finally {
                stopLoading();
            }
        };
        fetchData();
    }, []);

    useEffect(() => {}, [onClickDis]);

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
                startLoading();
                const info: DiseaseInfo = await fetchVaccinationInfo(cd);
                setDiseaseInfo((prev) => ({ ...prev, [cd]: info })); // 데이터 저장
                setExpandItems((prev) => ({ ...prev, [cd]: true })); // 데이터를 불러온 후 상태 변경
            } catch (error) {
                console.error(`Error fetching info for disease ${cd}:`, error);
            } finally {
                stopLoading();
            }
        },
        [expandItems, diseaseInfo]
    );

    return (
        <div className={styles.background}>
            <h1 style={{ marginBottom: '48px' }}>예방접종 대상 감염병 정보</h1>

            {isLoading ? (
                <div
                    style={{
                        width: '100%',
                        height: '200px',
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >
                    로딩 중...
                </div>
            ) : (
                <>
                    <div className={styles.tag_wrap}>
                        {diseaseList.map((disease, idx) => (
                            <button
                                key={disease.cd}
                                style={{
                                    backgroundColor:
                                        focus === idx ? '#D1E9F1' : '#f4fafc',
                                    border:
                                        focus === idx
                                            ? '1px solid #7DADBE'
                                            : '#f4fafc',
                                    color:
                                        focus === idx ? '#425B64' : '#7DADBE',
                                }}
                                className={styles.tag}
                                onClick={() => {
                                    setFocus(idx);
                                    setOnClickDis(disease.cd);
                                    fetchDiseaseInfo(disease.cd);
                                }}
                            >
                                {disease.cdNm.split(' ')[0]}
                            </button>
                        ))}
                    </div>

                    <div>
                        {diseaseInfo[onClickDis] && (
                            <div className={styles.diseaseInfo_wrap}>
                                <div className={styles.title_wrap}>
                                    <span className={styles.title_big}>
                                        {
                                            diseaseInfo[onClickDis].title.split(
                                                '('
                                            )[0]
                                        }
                                    </span>
                                    <span className={styles.title_small}>
                                        {'('}
                                        {
                                            diseaseInfo[onClickDis].title.split(
                                                '('
                                            )[1]
                                        }
                                    </span>
                                </div>
                                <p className={styles.diseaseInfo}>
                                    <DiseaseInfoMessage
                                        message={
                                            diseaseInfo[onClickDis].message
                                        }
                                    />
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
