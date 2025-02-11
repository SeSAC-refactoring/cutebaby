import React from 'react';
import { Disease } from './Disease';
import { VaccineType } from './VaccineType';
import { DoseDate } from './DoseDate';
import { TotalDoses } from './TotalDoses';
import { VaccinationSchedule } from './VaccinationSchedule';
import { VaccinationData } from '../../types';
import { vaccinationScheduleData } from './VaccinationTableData';

interface VaccinationTableProps {
    selectedBabyVaccinationData: VaccinationData[];
    selectedBabyId: number | null;
}

export const VaccinationTable: React.FC<VaccinationTableProps> = ({
    selectedBabyVaccinationData,
    selectedBabyId,
}) => {
    console.log('selectedBabyVaccinationData', selectedBabyVaccinationData);

    // 서버에 있는 데이터와 일치하는 백신 찾기 matchedVaccine
    const matchedVaccineList = vaccinationScheduleData.flat().map((data) => {
        // flat()을 사용해 2차원 배열을 1차원 배열로 변환

        // selectedBabyVaccinationData에 일치하는 데이터 있는지 찾기
        let matchedVaccine = selectedBabyVaccinationData.find(
            (item) =>
                item.vaccinationid === data.vaccinationid &&
                item.dosenumber === data.dosenumber
        );

        // 벡신 1~2차 로 되어있는 칸일 경우 // vaccinationid(13, 14, 16) && dosenumber === 0일 경우
        // data.vaccinationid ===  13 || 14 ||16 이고 data.dosenumber === 0 인 항목은
        // data.vaccinationid === item.vaccinationid 일 떄, item.dosenumber가 1인 것만 있으면 1이 있는 항목으로 반환하고,
        // item.dosenumber가 2인 것이 있으면 2가 있는 걸로 반환
        if (
            data.vaccinationid &&
            [13, 14, 16].includes(data.vaccinationid) &&
            data.dosenumber === 0
        ) {
            const vaccine1 = selectedBabyVaccinationData.find(
                (item) =>
                    item.vaccinationid === data.vaccinationid &&
                    item.dosenumber === 1
            );
            const vaccine2 = selectedBabyVaccinationData.find(
                (item) =>
                    item.vaccinationid === data.vaccinationid &&
                    item.dosenumber === 2
            );

            if (vaccine2) {
                matchedVaccine = vaccine2; // dosenumber가 2이면 반환
            } else if (vaccine1) {
                matchedVaccine = vaccine1; // dosenumber가 1이면 반환
            }
        }
        // console.log('matchedVaccine', matchedVaccine);

        return matchedVaccine || null; // 없는 경우 null
    });

    console.log('matchedVaccineList', matchedVaccineList);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    height: '492px',
                    overflow: 'auto',
                }}
            >
                <Disease />
                <VaccineType
                    selectedBabyId={selectedBabyId}
                    selectedBabyVaccinationData={selectedBabyVaccinationData}
                />
                <TotalDoses />
                <div>
                    <DoseDate />
                    <VaccinationSchedule
                        matchedVaccineList={matchedVaccineList}
                    />
                </div>
            </div>
        </div>
    );
};
