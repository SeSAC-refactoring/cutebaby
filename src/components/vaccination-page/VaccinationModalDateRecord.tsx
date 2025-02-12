import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchVaccinationData } from '../../store/vaccinationSlice';
import { VaccinationData } from '../types';
import { InputVac } from './vaccination-table/InputVac';
import { DelVac } from './vaccination-table/DelVac';
import { UpdateVac } from './vaccination-table/UpdateVac';

interface VaccinationModalDateRecordProps {
    vaccinationid: number;
    dosenumber: number;
    selectedBabyId: number | null;
}

export const VaccinationModalDateRecord: React.FC<VaccinationModalDateRecordProps> = ({
    vaccinationid,
    dosenumber,
    selectedBabyId,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const babyId: number = selectedBabyId ?? 0;

    // Redux에서 예방접종 데이터 가져오기
    const vacinfo: VaccinationData[] = useSelector(
        (state: RootState) => state.vaccination.vaccinationData
    );

    // 특정 아기의 예방접종 데이터 필터링
    const selectedBabyVaccinationData = vacinfo.filter(
        (data) => data.babyid === babyId
    );

    // 선택된 `vaccinationid`에 해당하는 데이터만 필터링
    const specificVaccinationData = selectedBabyVaccinationData.filter(
        (data) => data.vaccinationid === vaccinationid
    );

    useEffect(() => {
        if (babyId > 0) {
            dispatch(fetchVaccinationData(babyId));
        }
    }, [dispatch, babyId]);

    const { requestVac } = InputVac();
    const { requestDelVac } = DelVac();
    const { requestupdateVac } = UpdateVac();

    const [selectedDose, setSelectedDose] = useState<number | null>(null);
    const [doseDate, setDoseDate] = useState<string>('');

    useEffect(() => {
        console.log('🔍 클릭한 예방접종 ID에 해당하는 기록:', specificVaccinationData);
    }, [specificVaccinationData]);

    if (vaccinationid === 17) return <p>매년 접종하세요</p>;

    const handleOpenInput = (doseNum: number, currentDate: string | null) => {
        setSelectedDose(selectedDose === doseNum ? null : doseNum);
        setDoseDate(currentDate || new Date().toISOString().split('T')[0]);
    };

    // 신규 데이터 등록
    const handleSaveData = async (doseNum: number) => {
        try {
            await requestVac({
                babyid: babyId,
                vaccinationid: vaccinationid,
                dosenumber: doseNum,
                dosedate: doseDate,
            });

            setSelectedDose(null);
            dispatch(fetchVaccinationData(babyId));
        } catch (error) {
            console.error(error);
        }
    };

    // 데이터 삭제
    const handleDeleteData = async (doseNum: number) => {
        try {
            await requestDelVac({
                babyid: babyId,
                vaccinationid: vaccinationid,
                dosenumber: doseNum,
                dosedate: doseDate,

            });

            setSelectedDose(null);
            dispatch(fetchVaccinationData(babyId));
        } catch (error) {
            console.error(error);
        }
    };

    // 기존 데이터 수정
    const handleupDate = async (doseNum: number) => {
        try {
            await requestupdateVac({
                babyid: babyId,
                vaccinationid: vaccinationid,
                dosenumber: doseNum,
                dosedate: doseDate,
            });

            setSelectedDose(null);
            dispatch(fetchVaccinationData(babyId));
        } catch (error) {
            console.error(error);
        }
    };

    // 접종일이 있는 차수 중 마지막 차수 찾기
    const existingDoses = specificVaccinationData
        .filter((data) => data.vaccinationid === vaccinationid && data.dosenumber !== null)
        .map((data) => data.dosenumber as number)
        .sort((a, b) => a - b);

    const lastDose = existingDoses.length > 0 ? existingDoses[existingDoses.length - 1] : null;

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
                            <p>{doseNum}차 - </p>
                            <p>{matchedDose ? matchedDose.dosedate : '미접종'}</p>
                            <button onClick={() => handleOpenInput(doseNum, matchedDose?.dosedate || null)}>
                                {matchedDose ? '수정' : '입력'}
                            </button>
                            <button onClick={() => handleDeleteData(doseNum)} disabled={doseNum !== lastDose}>
                                삭제
                            </button>
                        </div>

                        {/* 해당 차수의 input 필드 */}
                        {selectedDose === doseNum && (
                            <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
                                <input
                                    type="date"
                                    value={doseDate}
                                    onChange={(e) => setDoseDate(e.target.value)}
                                />
                                <button
                                    onClick={() =>
                                        matchedDose ? handleupDate(doseNum) : handleSaveData(doseNum)
                                    }
                                >
                                    완료
                                </button>
                                <button onClick={() => setSelectedDose(null)}>취소</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
