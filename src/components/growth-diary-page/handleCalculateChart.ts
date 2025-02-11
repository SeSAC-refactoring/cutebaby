import { ChildData, LmsData, PercentileData, Percentiles } from '../types';
import { RefsType } from '../../hooks/useRefs';

// 계산 버튼 클릭 시 차트 보여줌
export const handleCalculateChart = (
    refs: RefsType,
    inputData: ChildData,
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
    // 측정일 값 없으면 // 측정일 input focus
    if (!inputData.measurementDate) {
        refs.measurementDate.current?.focus();
        return;
    }

    // 신장, 몸무게, 머리둘레 값이 모두 없으면 // 신장 input focus
    if (
        !inputData.height &&
        !inputData.weight &&
        !inputData.headCircumference
    ) {
        refs.height.current?.focus();
        return;
    }

    // 필수값 있으면
    setChildData((prev) => ({
        ...prev,
        ...inputData,
    }));
    setShow(true);
};
