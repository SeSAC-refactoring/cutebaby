import React, { useEffect, useState } from 'react';
import { VaccinationData } from '../types';

interface VaccinationModalDateRecordProps {
    vaccinationid: number;
    dosenumber: number;
    selectedBabyVaccinationData: VaccinationData[];
    // setInputData: React.Dispatch<React.SetStateAction<VaccinationData>>;
    selectedBabyId: number | null;
}
export const VaccinationModalDateRecord: React.FC<
    VaccinationModalDateRecordProps
> = ({
    vaccinationid,
    dosenumber,
    selectedBabyVaccinationData,
    // setInputData,
    selectedBabyId,
}) => {
    const [inputData, setInputData] = useState<VaccinationData>({
        babyid: selectedBabyId,
        vaccinationid: null,
        dosenumber: null,
        dosedate: null,
    }); // 접종 날짜 클릭 시 상태변경

    const [selectedDose, setSelectedDose] = useState<number | null>(null); // 현재 열려 있는 dose 저장
    const [doseDate, setDoseDate] = useState<string>(''); // 날짜 입력 값 저장

    useEffect(() => {
        console.log('inputData', inputData);
    }, [inputData]); // inputData 확인

    if (vaccinationid === 17) return <p>매년 접종하세요</p>; // 인플루엔자는 접종기록 안함

    const handleOpenInput = (doseNum: number, currentDate: string | null) => {
        setSelectedDose(selectedDose === doseNum ? null : doseNum); // 클릭 시 해당 차수 토글
        setDoseDate(currentDate || new Date().toISOString().split('T')[0]); // 접종한 날짜 있으면 불러오기, 없으면 오늘 날짜
    };

    const handleSaveData = (doseNum: number) => {
        setInputData({
            babyid: selectedBabyId,
            vaccinationid: vaccinationid,
            dosenumber: dosenumber,
            dosedate: doseDate,
        });
        console.log(`입력/수정할 데이터 (inputData): ${inputData}`);
        setSelectedDose(null); // 입력 후 인풋창 닫기
    };

    const handleDeleteData = (doseNum: number) => {
        setInputData({
            babyid: selectedBabyId,
            vaccinationid: vaccinationid,
            dosenumber: dosenumber,
            dosedate: doseDate,
        });
        console.log(`삭제할 데이터 (inputData): ${inputData}`);
        setSelectedDose(null); // 입력 후 인풋창 닫기
    };

    // 접종일이 있는 차수 중 마지막 차수 찾기
    const existingDoses = selectedBabyVaccinationData
        .filter(
            (data) =>
                data.vaccinationid === vaccinationid && data.dosenumber !== null
        )
        .map((data) => data.dosenumber as number) // dosenumber만으로 배열 구성 // as number: 확실한 숫자로 설정하여 오류 해결..
        .sort((a, b) => a - b); // 오름차순 정렬
    const lastDose =
        existingDoses.length > 0
            ? existingDoses[existingDoses.length - 1]
            : null; // 접종 기록이 없으면(existingDoses가 빈 배열이면) null 반환

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
                    <div key={i}>
                        <div style={{ display: 'flex' }}>
                            <p>
                                {vaccinationid === 4
                                    ? '6차 - '
                                    : vaccinationid === 8
                                      ? ''
                                      : `${doseNum}차 - `}
                            </p>
                            <p>
                                {matchedDose ? matchedDose.dosedate : '미접종'}
                            </p>
                            <button
                                onClick={() =>
                                    handleOpenInput(
                                        doseNum,
                                        matchedDose?.dosedate || null
                                    )
                                }
                            >
                                {matchedDose ? '수정' : '입력'}
                            </button>
                            <button
                                onClick={() => handleDeleteData(doseNum)}
                                disabled={doseNum !== lastDose} // 접종한 차수 중 마지막 차수가 아니면 disabled
                            >
                                삭제
                            </button>
                        </div>

                        {/* 해당 차수의 input 필드 */}
                        {selectedDose === doseNum && (
                            <div
                                style={{
                                    marginTop: '5px',
                                    display: 'flex',
                                    gap: '10px',
                                }}
                            >
                                <input
                                    type="date"
                                    value={doseDate}
                                    onChange={(e) =>
                                        setDoseDate(e.target.value)
                                    }
                                />
                                <button onClick={() => handleSaveData(doseNum)}>
                                    확인
                                </button>
                                <button onClick={() => setSelectedDose(null)}>
                                    취소
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
