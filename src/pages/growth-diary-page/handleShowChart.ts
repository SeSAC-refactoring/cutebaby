import { useRef } from 'react';
import { ChildData } from './types';

// 차트를 보는 버튼 클릭 시
export const handleShowChart = (
    childData: ChildData,
    refs: {
        measurementDate: React.RefObject<HTMLInputElement | null>;
        height: React.RefObject<HTMLInputElement | null>;
    },
    setShowChart: React.Dispatch<React.SetStateAction<boolean>>
) => {
    // 측정일 값 없으면 input focus
    if (!childData.measurementDate) {
        refs.measurementDate.current?.focus();
        return;
    }

    // 신장, 몸무게, 머리둘레 값이 모두 없으면 input focus
    if (
        !childData.height &&
        !childData.weight &&
        !childData.headCircumference
    ) {
        refs.height.current?.focus();
        return;
    }

    setShowChart((prev) => !prev);
};
