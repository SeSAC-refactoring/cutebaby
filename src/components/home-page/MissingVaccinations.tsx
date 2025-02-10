import React from 'react';
import { VaccinationData } from '../types';

import styles from '../../styles/Home.module.scss';
import { vaccinationScheduleData } from '../vaccination-page/vaccination-table/VaccinationTableData';

interface MissingVaccinationsProps {
    selectedBabyVaccinationData: VaccinationData[];
}

export const MissingVaccinations: React.FC<MissingVaccinationsProps> = ({
    selectedBabyVaccinationData,
}) => {
    // 예방접종 안 한 백신 목록 찾기
    const missingVaccinations = vaccinationScheduleData.flat().filter(
        (data) =>
            data.text && // 텍스트가 존재하는 항목만 필터링
            data.vaccinationid !== 7 && // 폐렴구균 PPSV 제외 (고위험군에 한하여 접종)
            data.vaccinationid !== 17 && // 인플루엔자 IIV 제외
            !selectedBabyVaccinationData.some(
                (item) =>
                    item.vaccinationid === data.vaccinationid &&
                    item.dosenumber === data.dosenumber
            )
    );

    return (
        <div>
            {missingVaccinations.length > 0 ? (
                <div className={styles.vaccine_list}>
                    {missingVaccinations.map((data, i) => (
                        <div key={i} className={styles.vaccine_item}>
                            {data.text}
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.completed_message}>
                    모든 예방접종이 완료되었습니다!
                </p>
            )}
        </div>
    );
};
