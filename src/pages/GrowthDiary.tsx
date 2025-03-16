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
          className="modalBg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="whiteboxModal growthCalculate"
          >
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

      <div className="whitebox">
        <div className="flex justify-between w-full">
          <div className="title">
            <h2>성장일지</h2>
            <p className="growthDiary">
              <strong>우리 아이의 성장</strong>을 기록하고 상태를 확인해보세요:)
            </p>
          </div>

          <button
            className="ml-4 button-yellow button-xs"
            onClick={() => setOpenCalModal(true)}
          >
            <p>성장상태 계산</p>
            <img src="../img/icons/i-chevron-right-s20.svg" alt="*" />
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
                  <div className="flex justify-between gap-[2rem] w-full">
                    <div className="border-[3px] border-blue-3 w-[70%]">
                      <div>우리 아이 성장 추이</div>
                      <div className="graphArea min-h-[10vh] max-h-[50vh]">
                        <DiaryChart growData={growData} />
                      </div>
                    </div>
                    <RecentGrowthRecord
                      growData={growData}
                      setOpenAddModal={setOpenAddModal}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}

              {growData.length > 0 ? (
                <></>
              ) : (
                <>
                  <div className="w-[70rem] flex justify-between">
                    <div className="w-[50.5rem] h-[30rem] bg-gray-1 rounded-[2rem]"></div>
                    <div className="w-[17.5rem] h-[30rem] bg-gray-1 rounded-[2rem]"></div>
                  </div>
                  <div className="w-[70rem] h-[35.625rem] relative bottom-[35.625rem] flex justify-center items-center backdrop-blur-sm mt-20">
                    <div className="flex flex-col items-center z-[100] gap-6 pb-20">
                      <img src="/img/Ggoggo-002.png" />
                      <div className="text-xl font-md text-gray-6">
                        등록된 기록이 없습니다!
                      </div>

                      <button
                        className="button-black button-md"
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
              <div className="flex flex-col justify-between w-[70rem] h-[35.625rem] mt-[1.75rem]">
                <div className="w-full h-[4rem] bg-gray-1 rounded-[2rem]"></div>
                <div className="flex justify-between w-[70rem]">
                  <div className="w-[50.5rem] h-[30rem] bg-gray-1 rounded-[2rem]"></div>
                  <div className="w-[17.5rem] h-[30rem] bg-gray-1 rounded-[2rem]"></div>
                </div>
              </div>
              <div className="w-[70rem] h-[35.625rem] relative bottom-[35.625rem] flex justify-center items-center backdrop-blur-sm">
                <div className="flex flex-col items-center z-[100] gap-6">
                  <img src="/img/Ggoggo-002.png" />
                  <div className="text-xl font-md text-gray-6 ">
                    등록된 아이가 없습니다!
                  </div>

                  <Link to="/Mypage" className="button button-black button-lg">
                    아이 등록하기
                    <img
                      src="../img/icons/i-chevron-right-s28.svg"
                      alt="바로가기 아이콘"
                    />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
