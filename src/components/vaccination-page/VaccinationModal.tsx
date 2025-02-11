// import styles from "../../styles/Vaccination.module.scss";
import { useEffect, useState } from 'react';
import styles from '../../styles/Modal.module.scss';
import { VaccinationData } from '../types';
import { vaccinesName } from './vaccination-table/VaccinationTableData';
import { VaccinationModalBtns } from './VaccinationModalBtns';
import { VaccinationModalDateRecord } from './VaccinationModalDateRecord';
import { VaccinationModalInputArea } from './VaccinationModalInputArea';
import { VaccinationModalTitle } from './VaccinationModalTitle';

interface VaccinationModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    vaccinationid: number;
    dosenumber: number;
    selectedBabyVaccinationData: VaccinationData[];
    setNewVaccinationData: React.Dispatch<
        React.SetStateAction<VaccinationData[]>
    >;
    selectedBabyId: number | null;
}

export const VaccinationModal: React.FC<VaccinationModalProps> = ({
    setIsOpen,
    vaccinationid,
    dosenumber,
    selectedBabyVaccinationData,
    setNewVaccinationData,
    selectedBabyId,
}) => {
    const [inputData, setInputData] = useState<VaccinationData[]>([]); // 접종날짜 클릭 시 상태변경

    useEffect(() => {
        console.log('inputData', inputData);
    }, [inputData]);

    return (
        <div
            className={styles.modal_overlay}
            onClick={() => {
                setIsOpen(false);
            }}
        >
            <div
                className={styles.modal_background}
                onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
            >
                <div className={styles.modal_container}>
                    {/* 🌟 모달 제목 */}
                    <VaccinationModalTitle
                        vaccinationid={vaccinationid}
                        setIsOpen={setIsOpen}
                    />

                    {/* 🌟 접종 기록 // 접종한 날짜 보여주기 */}
                    <VaccinationModalDateRecord
                        vaccinationid={vaccinationid}
                        dosenumber={dosenumber}
                        selectedBabyVaccinationData={
                            selectedBabyVaccinationData
                        }
                    />

                    {/* 🌟 접종 입력 필드 // dosenumber만큼 input태그 생성 */}
                    <VaccinationModalInputArea
                        dosenumber={dosenumber}
                        vaccinationid={vaccinationid}
                        selectedBabyVaccinationData={
                            selectedBabyVaccinationData
                        }
                        setInputData={setInputData}
                        selectedBabyId={selectedBabyId}
                    />

                    {/* 🌟 버튼 */}
                    <VaccinationModalBtns
                        vaccinationid={vaccinationid}
                        setIsOpen={setIsOpen}
                        setNewVaccinationData={setNewVaccinationData}
                        inputData={inputData}
                    />
                </div>
            </div>
        </div>
    );
};
