import { useFetchLocation } from "../components/vaccination-page/hooks/useFetchLocation";
import { useLocationSelect } from "../components/vaccination-page/hooks/useLocationSelect";
import { useToggleVaccineList } from "../components/vaccination-page/hooks/useToggleVaccineList";
import { usePagenation } from "../components/vaccination-page/hooks/usePagenation";
import { useSearchCenters } from "../components/vaccination-page/hooks/useSearchCenters";
import { PagenationBtns } from "../components/vaccination-page/PagenationBtns";
import { useHandleSearch } from "../components/vaccination-page/hooks/useHandleSearch";
import { useRefs } from "../hooks/useRefs";
import { CenterList } from "../components/vaccination-page/CenterList";

import styles from "../styles/VaccinationCenters.module.scss";
import modal from "../styles/Modal.module.scss";
import layout from "../styles/commons/Layout.module.scss";

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
      className={modal.modal_overlay}
      onClick={() => {
        setOpenCentersModal(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={modal.modalWrap}
        style={{ height: centers.length === 0 ? "400px" : "900px" }}
      >
        <div className={styles.search_wrap}>
          <div className={modal.modal_title_wrap}>
            <h2
              className={layout.title}
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "48px",
              }}
            >
              위탁의료기관 찾기
            </h2>
            <div
              onClick={() => {
                setOpenCentersModal(false);
              }}
              className={modal.X_btn}
            >
              X
            </div>
          </div>

          <div>
            <p>어린이 국가예방접종 사업 위탁의료기관이란?</p>
            <p>
              어린이 국가예방접종 대상자가 비용 부담없이 접종받을 수 있는
              의료기관입니다.
            </p>
            <p>
              의료기관마다 취급하는 백신이 다를 수 있으므로, 특정 제품을
              접종하고자 할 때는 방문할 의료기관에 사전 확인하시기 바랍니다.
            </p>
          </div>

          {/* 지역(시/도) 선택 드롭다운 */}
          <div className={styles.select_wrap}>
            <select
              ref={refs.province}
              value={selectedLocation.province}
              disabled={isFirstLoading} // 데이터 불러오는 동안은 드롭다운으로 지역 선택 불가
              onChange={handleProvinceSelect}
              className={styles.select}
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
              className={styles.select}
            >
              <option value="">시/군/구</option>
              {cities.map((city) => (
                <option key={city.cd} value={city.cd}>
                  {city.cdNm}
                </option>
              ))}
            </select>

            <input
              className={styles.select}
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
            <button className={styles.search_btn} onClick={handleSearch}>
              검색
              <img src="/img/search-01.png" alt="검색"></img>
            </button>
          </div>
        </div>

        {/* 데이터를 불러오는 로딩 화면 */}
        {isFirstLoading && (
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <p>로딩 중...</p>
          </div>
        )}

        {/* 검색 결과(병원 리스트) 표시 */}
        <div className={styles.contents_wrap}>
          {!hasSearched ? (
            <p>검색해 주세요.</p> // 검색 전 표시 문구
          ) : isLoading ? (
            <p>로딩 중...</p>
          ) : !centers || (centers || []).filter(Boolean).length < 1 ? (
            <p>병원 정보가 없습니다.</p>
          ) : (
            <div style={{ overflow: "auto" }}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
