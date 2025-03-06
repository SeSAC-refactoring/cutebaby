import { useCallback, useEffect, useState } from 'react';

// 백신 목록 보기 버튼 클릭 시 토글 (선택된 병원의 ID 저장)
export const useToggleVaccineList = () => {
    const [showVaccineList, setShowVaccineList] = useState<{
        [key: number]: boolean;
    }>({}); // 각 병원의 백신 목록 상태 토글

    const toggleVaccineList = useCallback((orgcd: number) => {
        setShowVaccineList((prev) => {
            // 모든 키의 값을 false로 설정
            const makeFalse = Object.fromEntries(
                Object.keys(prev).map((key) => [Number(key), false])
            );

            // 클릭한 orgcd만 토글
            return { ...makeFalse, [orgcd]: !prev[orgcd] };
        });
    }, []);

    // VaccineList 바깥 클릭 시 VaccineList 닫기 // 바깥 클릭 시 모두 false로
    // useEffect(() => {
    //     console.log('✔️useeffect 실행됨');

    //     const handleClickOutside = (e: MouseEvent) => {
    //         console.log('Clicked element:', e.target); // 어떤 요소를 클릭했는지 출력

    //         // `.vaccineList` 내부를 클릭했는지 확인
    //         if (!(e.target as HTMLElement)?.closest('.vaccineList')) {
    //             // .closest('vaccineList'): 클릭한 요소가 .vaccineList 내부에 포함되는지 확인

    //             console.log('바깥클릭 감지됨');

    //             setShowVaccineList((prev) => {
    //                 // 모든 키의 값을 false로 설정
    //                 const makeFalse = Object.fromEntries(
    //                     Object.keys(prev).map((key) => [Number(key), false])
    //                 );
    //                 return { ...makeFalse };
    //             });
    //         } else {
    //             console.log('내부 클릭했으니 안닫음');
    //         }
    //     };
    //     document.addEventListener('click', handleClickOutside); // 페이지 전체에서 클릭 이벤트가 발생할 때마다 handleClickOutside 실행

    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     }; //  컴포넌트 언마운트 시(useEffect가 사라질 때) // 이벤트 리스너 제거
    // }, [showVaccineList]);

    return { showVaccineList, setShowVaccineList, toggleVaccineList };
};
