import { DiaryChart } from "../components/growth-diary-page/DiaryChart";
import { GrowthCalculate } from "../components/growth-diary-page/GrowthCalculate";
import { DiaryTable } from "../components/growth-diary-page/DiaryTable";
import { BabyList } from "../components/commons/BabyList";
import { DiaryInputArea } from "../components/growth-diary-page/DiaryInputArea";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useSelectBaby } from "../hooks/useSelectBaby";
import { useEffect, useState } from "react";
import { useGrowData } from "../components/growth-diary-page/hooks/useGrowData";
import { RecentGrowthRecord } from "../components/growth-diary-page/RecentGrowthRecord";
import { Link, useNavigate } from "react-router-dom";
import { GrowRewriteModal } from "../components/growth-diary-page/GrowRewriteModal";
import { GrowDelModal } from "../components/growth-diary-page/GrowDelModal";

import "../styles/pages/GrowthDiary.scss";
import "../styles/components/maincontents.scss";

export default function GrowthDiary() {
  const [openCalModal, setOpenCalModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  // 수정 및 삭제 모달 상태 추가
  const [openRewriteModal, setOpenRewriteModal] = useState<boolean>(false);
  const [openDelModal, setOpenDelModal] = useState<boolean>(false);
  const [selectedGrowId, setSelectedGrowId] = useState<number | null>(null);

  const { babyInfo, nothingBaby } = useSelector(
    (state: RootState) => state.baby
  );

  //  로그인 안했을 시 // 로그인 페이지로 리디렉션
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
  const { growData } = useGrowData(growInfo, selectedBabyId);

  // console.log('애기 성장정보 입니다 >>>>', growInfo);
  // console.log('selectedBabyId에 따른 성장정보 입니다 >>>>', growData);

  // 수정 모달 열기
  const handleEdit = (growId: number) => {
    setSelectedGrowId(growId);
    setOpenRewriteModal(true);
  };

  // 삭제 모달 열기
  const handleDelete = (growId: number) => {
    setSelectedGrowId(growId);
    setOpenDelModal(true);
  };

  return (
    <main className="grow">
      {/* 성장 계산기 모달 */}
      {openCalModal && (
        <GrowthCalculate
          setOpenCalModal={setOpenCalModal}
          babyInfo={babyInfo}
          selectedBabyId={selectedBabyId}
        />
      )}

      {/* 성장기록 보러가기 모달 */}
      {openAddModal && (
        <div
          onClick={() => {
            setOpenAddModal(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div>
              <DiaryInputArea
                setOpenAddModal={setOpenAddModal}
                selectedBabyId={selectedBabyId}
              />
            </div>
            <DiaryTable
              growData={growData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {openRewriteModal && selectedGrowId !== null && (
        <GrowRewriteModal
          growId={selectedGrowId}
          growData={growData}
          onClose={() => setOpenRewriteModal(false)}
        />
      )}

      {/* 삭제 모달 */}
      {openDelModal && selectedGrowId !== null && (
        <GrowDelModal
          growId={selectedGrowId}
          growData={growData}
          onClose={() => setOpenDelModal(false)}
        />
      )}
      {/* <div> */}
      <div className="maincontents">
        <div>
          <div>
            <div className="max-sm:text-2xl font-bd">성장일지</div>
            <div>
              <strong>우리 아이의 성장</strong>을 기록하고 상태를 확인해보세요:)
            </div>
          </div>

          <button onClick={() => setOpenCalModal(true)}>
            성장상태 계산
            <img src="../img/icons/i-chevron-right-s20.svg" alt=">" />
          </button>
        </div>

        <div>
          {babyInfo.length > 0 && (
            <>
              <BabyList
                babyInfo={babyInfo}
                handleSelectBaby={handleSelectBaby}
                selectedBabyId={selectedBabyId}
              />

              {/* 성장기록 그래프 */}

              {growData.length > 0 ? (
                <>
                  <div>
                    <div>
                      <div>우리 아이 성장 추이</div>
                      <div className="graphBtnArea">
                        <div className="graphArea">
                          <DiaryChart growData={growData} />
                        </div>
                      </div>
                      <RecentGrowthRecord
                        growData={growData}
                        setOpenAddModal={setOpenAddModal}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {growData.length > 0 ? (
                <></>
              ) : (
                <>
                  <div style={{ marginTop: "32px" }}>
                    <div></div>
                    <div></div>
                  </div>
                  <div
                    style={{
                      height: "512px",
                      bottom: "512px",
                    }}
                  >
                    <div>
                      <img src="/img/Ggoggo-002.png" />
                      <div>등록된 기록이 없습니다!</div>

                      <button
                        onClick={() => {
                          setOpenAddModal(true);
                        }}
                      >
                        성장기록 등록하기
                        <img
                          src="../img/icons/i-chevron-right-s28.svg"
                          alt=">"
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {babyInfo.length === 0 && (
            <>
              <div>
                <div></div>
                <div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div>
                <div>
                  <img src="/img/Ggoggo-002.png" />
                  <div>등록된 아이가 없습니다!</div>

                  <Link to="/Mypage">
                    <button>
                      아이 등록하기
                      <img
                        src="../img/icons/i-chevron-right-s28.svg"
                        alt="바로가기 아이콘"
                      ></img>
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
