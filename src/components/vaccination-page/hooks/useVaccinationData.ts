// import { useEffect, useState } from 'react';
// import { VaccinationData } from '../../types';

// // vaccinationData를 selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 vaccinationData 업데이트
// export const useVaccinationData = (
//     vaccinationData: VaccinationData[],
//     selectedBabyId: number | null
// ) => {
//     // 선택한 아이 정보 가져오기
//     const [selectedBabyVaccinationData, setSelectedBabyVaccinationData] =
//         useState<VaccinationData[]>([]);

//     // selectedBabyId가 변경될 때 selectedBabyVaccinationData 업데이트
//     useEffect(() => {
//         if (!selectedBabyId) {
//             console.log('selectedBabyId 없습니다.');
//             return;
//         }

//         if (Array.isArray(vaccinationData) && vaccinationData.length > 0) {
//             const filteredVaccinationData = vaccinationData
//                 .flat() // 중첩 배열을 평탄화
//                 .filter((data) => data.babyid === selectedBabyId); // 선택한 아기 ID에 맞는 데이터만 필터링

//             if (filteredVaccinationData) {
//                 console.log(
//                     'filteredVaccinationData >>>',
//                     filteredVaccinationData
//                 );

//                 setSelectedBabyVaccinationData(filteredVaccinationData);
//             }
//         }
//     }, [vaccinationData, selectedBabyId]); // selectedBabyInfo가 변경될 때 실행

//     return { selectedBabyVaccinationData, setSelectedBabyVaccinationData };
// };
