import { useFetchLocation } from "./hooks/useFetchLocation";
import { useLocationSelect } from "./hooks/useLocationSelect";
import { useToggleVaccineList } from "./hooks/useToggleVaccineList";
import { usePagenation } from "./hooks/usePagenation";
import { useSearchCenters } from "./hooks/useSearchCenters";
import { useHandleSearch } from "./hooks/useHandleSearch";
import { useRefs } from "../../hooks/useRefs";
import { PagenationBtns } from "./PagenationBtns";
import { CenterList } from "./CenterList";

export default function VaccinationCenters({ setOpenCentersModal }: any) {
  // hook 사용
  const {
    currentPage,
    setCurrentPage,
    selectedLocation,
    handleProvinceSelect,
    handleCitySelect,
  } = useLocationSelect();
  const { showVaccineList, setShowVaccineList, toggleVaccineList } =
    useToggleVaccineList();
  const { isLoading, centers, totalPages, setTotalPages, searchCenters } =
    useSearchCenters(selectedLocation, setShowVaccineList);
  const { provinces, cities, isFirstLoading } =
    useFetchLocation(selectedLocation);
  const refs = useRefs();
  const {
    inputAddress,
    setInputAddress,
    handleSearch,
    savedAddress,
    hasSearched,
  } = useHandleSearch(selectedLocation, setCurrentPage, searchCenters, refs);
  const { startPage, endPage, handlePageChange } = usePagenation(
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    searchCenters,
    savedAddress
  );

  return (
    <div
      className="modalBg"
      onClick={() => {
        setOpenCentersModal(false);
      }}
    >
      <div
        className="whiteboxModal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        // style={{ height: centers.length === 0 ? '400px' : '900px' }}
      >
        <section className="topArea">
          <h2>위탁의료기관 찾기</h2>
          <div
            className="close"
            onClick={() => {
              setOpenCentersModal(false);
            }}
          >
            <img src="/img/Button-close.png" alt="닫기" />
          </div>
        </section>
        {/* <div>
                    <p>어린이 국가예방접종 사업 위탁의료기관이란?</p>
                    <p>
                        어린이 국가예방접종 대상자가 비용 부담없이 접종받을 수
                        있는 의료기관입니다.
                    </p>
                    <p>
                        의료기관마다 취급하는 백신이 다를 수 있으므로, 특정
                        제품을 접종하고자 할 때는 방문할 의료기관에 사전
                        확인하시기 바랍니다.
                    </p>
                </div> */}
        <section className="contentsArea">
          {/* 데이터를 불러오는 로딩 화면 */}
          {isFirstLoading && (
            <div className="response-state">
              <img src="/img/visuals/visual_loading_ggomul_04.svg" alt="" />
              <div className="text">
                <p>자료를 가져오고 있어요..</p>
                <p>조금만 기다려주세요..</p>
              </div>
            </div>
          )}
          {/* 지역(시/도) 선택 드롭다운 */}
          <article className="formArea">
            <select
              ref={refs.province}
              value={selectedLocation.province}
              disabled={isFirstLoading} // 데이터 불러오는 동안은 드롭다운으로 지역 선택 불가
              onChange={handleProvinceSelect}
            >
              <option value="">시/도</option>
              {provinces.map((province) => (
                <option key={province.cd} value={province.cd}>
                  {province.cdNm}
                </option>
              ))}
            </select>

            {/* 도시(시/군/구) 선택 드롭다운 (지역이 선택되지 않으면 disabled) */}
            <select
              ref={refs.city}
              value={selectedLocation.city}
              disabled={!selectedLocation.province}
              onChange={handleCitySelect}
            >
              <option value="">시/군/구</option>
              {cities.map((city) => (
                <option key={city.cd} value={city.cd}>
                  {city.cdNm}
                </option>
              ))}
            </select>

            <div>
              <input
                type="text"
                value={inputAddress}
                placeholder="주소"
                disabled={!selectedLocation.city} // 도시를 선택하지 않으면 disabled
                onChange={(e) => setInputAddress(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              {/* 검색 버튼 */}
              <button className="searchBtn" onClick={handleSearch}>
                <p>검색</p>
                <img src="/img/search-01.png" alt="검색"></img>
              </button>
            </div>
          </article>

          <hr />

          {/* 검색 결과(병원 리스트) 표시 */}
          <article className="centerListArea">
            {!hasSearched ? (
              <div className="response-state">
                <img src="/img/visuals/visual_loading_ggomul_03.svg" alt="" />
                <div className="text">
                  <p>주소를 선택 후</p>
                  <p>검색해주세요:)</p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="response-state">
                <img
                  src="/img/visuals/visual_loading_ggomul_04.svg"
                  alt="이미지"
                />
                <div className="text">
                  <p>자료를 가져오고 있어요..</p>
                  <p>조금만 기다려주세요..</p>
                </div>
              </div>
            ) : !centers || (centers || []).filter(Boolean).length < 1 ? (
              <div className="response-state">
                <img src="/img/visuals/visual_loading_ggomul_06.svg" alt="" />
                <div className="text">
                  <p>찾으시는 병원 정보가</p> <p>없습니다...</p>
                </div>
              </div>
            ) : (
              <>
                <CenterList
                  centers={centers}
                  toggleVaccineList={toggleVaccineList}
                  showVaccineList={showVaccineList}
                />

                {/* 페이지네이션 버튼 */}
                <PagenationBtns
                  currentPage={currentPage}
                  totalPages={totalPages}
                  startPage={startPage}
                  endPage={endPage}
                  handlePageChange={(page) =>
                    handlePageChange(page, inputAddress)
                  }
                />
              </>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}
