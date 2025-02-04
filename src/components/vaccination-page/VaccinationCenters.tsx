import { useFetchLocation } from './hooks/useFetchLocation';
import { useLocationSelect } from './hooks/useLocationSelect';
import { useToggleVaccineList } from './hooks/useToggleVaccineList';
import { usePagenation } from './hooks/usePagenation';
import { useSearchCenters } from './hooks/useSearchCenters';
import { PagenationBtns } from './PagenationBtns';
import { CenterList } from './CenterList';

export const VaccinationCenters = () => {
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

    const { provinces, cities } = useFetchLocation(selectedLocation);

    const { startPage, endPage, handlePageChange } = usePagenation(
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        searchCenters
    );

    return (
        <div>
            <h2>위탁의료기관 찾기</h2>

            {/* 지역(시/도) 선택 드롭다운 */}
            <select
                value={selectedLocation.province}
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

            <input type="text" placeholder="주소" />

            {/* 검색 버튼 */}
            <button
                onClick={() => searchCenters(1)}
                disabled={!selectedLocation.province || !selectedLocation.city}
            >
                병원 검색
            </button>

            {/* 병원 리스트 표시 */}
            <div>
                <h3>병원 목록</h3>
                {isLoading ? (
                    <p>병원 정보를 불러오는 중...</p>
                ) : centers.length > 0 ? (
                    <div>
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
                            handlePageChange={handlePageChange}
                        />
                    </div>
                ) : (
                    <p>해당 지역의 병원이 없습니다.</p>
                )}
            </div>
        </div>
    );
};
