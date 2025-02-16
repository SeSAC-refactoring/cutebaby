import { useCallback, useEffect, useState } from "react";
import { DiseaseInfo, DiseaseList } from "../components/types";
import {
  fetchVaccinationDiseaseList,
  fetchVaccinationInfo,
} from "../components/api-data/vaccinationDisease";
import { useLoading } from "../hooks/useLoading";
import { DiseaseInfoMessage } from "../components/vaccination-page/DiseaseInfoMessage";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import styles from "../styles/VaccinationDetails.module.scss";
import modal from "../styles/Modal.module.scss";

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
        console.error("Error fetching disease list:", error);
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
        console.error(`Error fetching info for disease ${cd}:`, error);
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
      className={modal.modal_overlay}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${modal.modalWrap}`}
      >
        <div className={modal.modal_title_wrap}>
          <h2 className={`${modal.modalTitle} ${typography.text4xlBd}`}>
            예방접종 대상 감염병 정보
          </h2>
          <div
            onClick={() => {
              setOpenDetailsModal(false);
            }}
            className={modal.closeBtn}
          >
            <img src="/img/icons/i-modal-close-s32.svg" alt="" />
          </div>
        </div>

        <div className={modal.modalContentsArea}>
          {isLoading ? (
            <div className={modal.loadingContens}>
              <img src="/img/visuals/visual_loading_ggomul_04.svg" alt="" />
              <p className={typography.textLgMd}>
                자료를 가져오고 있어요..
                <br />
                조금만 기다려주세요..
              </p>
            </div>
          ) : (
            <>
              <div className={styles.chipBtnWrap}>
                {diseaseList.map((disease, idx) => (
                  <button
                    key={disease.cd}
                    className={`${typography.textSmBd} ${
                      focus === idx ? styles.chipBtnAcitve : styles.chipBtn
                    }`}
                    onClick={() => {
                      setFocus(idx);
                      setOnClickDis(disease.cd);
                      fetchDiseaseInfo(disease.cd);
                    }}
                  >
                    {disease.cdNm.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className={styles.diseaseInfoArea}>
                {diseaseInfo[onClickDis] && (
                  <div className={styles.diseaseInfo_wrap}>
                    <div className={styles.title_wrap}>
                      <span className={styles.title_big}>
                        {diseaseInfo[onClickDis].title.split("(")[0]}
                      </span>
                      <span className={styles.title_small}>
                        {"("}
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
