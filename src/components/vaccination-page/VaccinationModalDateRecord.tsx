import React from 'react';
import { VaccinationData } from '../types';

interface VaccinationModalDateRecordProps {
    vaccinationid: number;
    dosenumber: number;
    selectedBabyVaccinationData: VaccinationData[];
}
export const VaccinationModalDateRecord: React.FC<
    VaccinationModalDateRecordProps
> = ({ vaccinationid, dosenumber, selectedBabyVaccinationData }) => {
    if (vaccinationid === 17) return null; // 인플루엔자는 접종기록 안함

    return (
        <div>
            <p>접종 기록</p>
            {Array.from({ length: dosenumber }, (_, i) => {
                const doseNum = i + 1; // 1차, 2차 ... 보여줄 것
                const matchedDose = selectedBabyVaccinationData.find(
                    (data) =>
                        data.vaccinationid === vaccinationid &&
                        data.dosenumber === doseNum
                );

                return (
                    <p key={i}>
                        {vaccinationid === 4
                            ? '6차 - '
                            : vaccinationid === 8
                              ? ''
                              : `${doseNum}차 - `}
                        {matchedDose ? matchedDose.dosedate : '미접종'}
                    </p>
                );
            })}
        </div>
    );
};
