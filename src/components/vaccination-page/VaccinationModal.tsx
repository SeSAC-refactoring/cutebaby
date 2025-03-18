// import styles from "../../styles/Vaccination.module.scss";
// import { VaccinationModalBtns } from "./VaccinationModalBtns";
import { VaccinationSchedule } from "./vaccination-table/VaccinationSchedule";
import { VaccinationScheduleName } from "./vaccination-table/VaccinationScheduleName";
import { VaccinationModalDateRecord } from "./VaccinationModalDateRecord";
import { VaccinationModalTitle } from "./VaccinationModalTitle";

interface VaccinationModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vaccinationid: number;
  dosenumber: number;
  // setNewVaccinationData: React.Dispatch<
  //     React.SetStateAction<VaccinationData[]>
  // >;
  selectedBabyId: number | null;
  matchedVaccineList: any[];
}

export const VaccinationModal: React.FC<VaccinationModalProps> = ({
  setIsOpen,
  vaccinationid,
  dosenumber,
  // setNewVaccinationData,
  selectedBabyId,
  matchedVaccineList,
}) => {
  return (
    <div
      style={{ right: "0" }}
      onClick={() => {
        setIsOpen(false);
      }}
      className="modalBg"
    >
      <div onClick={(e) => e.stopPropagation()} className="mediumModal">
        {/* 🌟 모달 제목 */}
        <VaccinationModalTitle
          vaccinationid={vaccinationid}
          setIsOpen={setIsOpen}
        />
        <section className="flex justify-between sm:hidden gap-2">
          <div className="flex flex-col text-center border border-blue-3 rounded-[0.6rem] max-w-[40%] min-w-[35%]">
            <p className="bg-blue-3 p-4 text-blue-8 rounded-t-[0.5rem]">
              접종일자
            </p>
            <div className="p-4 ">
              <VaccinationSchedule
                matchedVaccineList={matchedVaccineList}
                vaccinationid={vaccinationid}
              />
            </div>
          </div>

          <div className="flex flex-col text-center border border-blue-3 rounded-[0.6rem]  max-w-[30%] min-w-[20%]">
            <p className="bg-blue-3 p-4 text-blue-8 rounded-t-[0.5rem]">
              권장횟수
            </p>
            <div className="p-4">{dosenumber}</div>
          </div>
          <div className="flex flex-col text-center border border-blue-3 rounded-[0.6rem]  max-w-[30%] min-w-[20%]">
            <p className="bg-blue-3 p-4 text-blue-8 rounded-t-[0.5rem]">
              완료횟수
            </p>
            <div className="p-4">
              <VaccinationScheduleName
                matchedVaccineList={matchedVaccineList}
                vaccinationid={vaccinationid}
              />
            </div>
          </div>
        </section>

        {/* 🌟 접종 기록 // 접종한 날짜 보여주기 + 입력수정삭제 버튼 */}
        <VaccinationModalDateRecord
          vaccinationid={vaccinationid}
          dosenumber={dosenumber}
          selectedBabyId={selectedBabyId}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};
