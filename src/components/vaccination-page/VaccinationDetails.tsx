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

  return (
    <div
      onClick={() => {
        setOpenDetailsModal(false);
      }}
      className=" w-full h-full absolute top-0 left-0 flex flex-col backdrop-blur-sm z-30"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white border-2 border-gray-6 rounded-[40px] p-10 absolute z-50 top-36"
      >
        <div className="flex justify-between">
          <h2 className="text-xl sm:text-4xl">예방접종 대상 감염병 정보</h2>
          <div
            onClick={() => {
              setOpenDetailsModal(false);
            }}
          >
            <img
              className="cursor-pointer"
              src="/img/icons/i-modal-close-s32.svg"
              alt=""
            />
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center mt-4">
              <img src="/img/visuals/visual_loading_ggomul_04.svg" alt="" />
              <p>
                자료를 가져오고 있어요..
                <br />
                조금만 기다려주세요..
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mt-10">
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
                        ? " flex px-4 py-[10px] justify-center items-center gap-1 bg-blue-3 rounded-full text-bs font-bd text-blue-10 border-2 border-blue-7 h-10"
                        : " flex px-4 py-[10px] justify-center items-center gap-1 bg-blue-1 rounded-full text-bs font-bd text-blue-7 h-10"
                    }`}
                  >
                    {disease.cdNm.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                {diseaseInfo[onClickDis] && (
                  <div>
                    <div className="flex gap-4 items-center border-b-2 border-gray-3 pb-6 ">
                      <span className="text-xl font-bd text-gray-10">
                        {diseaseInfo[onClickDis].title.split("(")[0]}
                      </span>
                      <span className="text-sm font-md text-gray-6">
                        {diseaseInfo[onClickDis].title.split("(")[1]}
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
        </div>
      </div>
    </div>
  );
}
