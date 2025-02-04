import { useCallback, useState } from 'react';

// 백신 목록 보기 버튼 클릭 시 토글 (선택된 병원의 ID 저장)
export const useToggleVaccineList = () => {
    const [showVaccineList, setShowVaccineList] = useState<{
        [key: number]: boolean;
    }>({}); // 각 병원의 백신 목록 상태 토글

    const toggleVaccineList = useCallback((orgcd: number) => {
        setShowVaccineList((prev) => ({
            ...prev,
            [orgcd]: !prev[orgcd],
        }));
    }, []);

    return { showVaccineList, setShowVaccineList, toggleVaccineList };
};
