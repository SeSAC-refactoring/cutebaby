import { useCallback, useEffect, useState } from "react";
import { DiseaseInfo, DiseaseList } from "../types";
import {
  fetchVaccinationDiseaseList,
  fetchVaccinationInfo,
} from "../api-data/vaccinationDisease";
import { useLoading } from "../../hooks/useLoading";
import { DiseaseInfoMessage } from "./DiseaseInfoMessage";

export default function VaccinationDetails({ setOpenDetailsModal }: any) {
  const [onClickDis, setOnClickDis] = useState(0);
  const [focus, setFocus] = useState(1000);
  const [diseaseList, setDiseaseList] = useState<DiseaseList[]>([]);
  const [diseaseInfo, setDiseaseInfo] = useState<{
    [key: number]: DiseaseInfo;
  }>({});
  const [expandItems, setExpandItems] = useState<{
    [key: number]: boolean;
  }>({});

  // hook 사용
  const { isLoading, startLoading, stopLoading } = useLoading();

  // fetchVaccinationDiseaseList()
  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const list = await fetchVaccinationDiseaseList();
        setDiseaseList(list);
      } catch (error) {
        // console.error("Error fetching disease list:", error);
      } finally {
        stopLoading();
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {}, [onClickDis]);

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
        // console.error(`Error fetching info for disease ${cd}:`, error);
      } finally {
        stopLoading();
      }
    },
    [expandItems, diseaseInfo]
  );

  console.log(diseaseInfo);

  return (
    <div
      onClick={() => {
        setOpenDetailsModal(false);
      }}
      // className=" w-full h-full absolute top-0 left-0 flex flex-col backdrop-blur-sm z-30"
      className="modalBg"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        // className="bg-white border-2 border-gray-6 rounded-[40px] p-10 absolute z-50 top-36"
        className="whiteboxModal"
      >
        <div
          // className="flex justify-between"
          className="topArea"
        >
          <h2>예방접종 대상 감염병 정보</h2>
          <div
            onClick={() => {
              setOpenDetailsModal(false);
            }}
            className="close"
          >
            <img src="/img/icons/i-modal-close-s32.svg" alt="" />
          </div>
        </div>

        <>
          {isLoading ? (
            <div
              // className="flex flex-col justify-center items-center mt-4"
              className="response-state"
            >
              <img src="/img/visuals/visual_loading_ggomul_04.svg" alt="" />
              <div className="text">
                <p>자료를 가져오고 있어요..</p>
                <p>조금만 기다려주세요..</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {diseaseList.map((disease, idx) => (
                  <button
                    key={disease.cd}
                    onClick={() => {
                      setFocus(idx);
                      setOnClickDis(disease.cd);
                      fetchDiseaseInfo(disease.cd);
                    }}
                    className={`min-w-20 ${
                      focus === idx
                        ? " chip-button-blue chip-button-sm selected"
                        : " chip-button-blue chip-button-sm"
                    }`}
                  >
                    {disease.cdNm.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div>
                {diseaseInfo[onClickDis] && (
                  <div className="h-full">
                    <div className="flex gap-4 items-center border-b-2 border-gray-3 pb-6 ">
                      <span className="text-xl font-bd">
                        {diseaseInfo[onClickDis].title.split("(")[0]}
                      </span>
                      <span className="text-sm font-md text-gray-6">
                        {diseaseInfo[onClickDis].title
                          .split("(")[1]
                          .slice(0, -1)}
                      </span>
                    </div>
                    <DiseaseInfoMessage
                      message={diseaseInfo[onClickDis].message}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}
