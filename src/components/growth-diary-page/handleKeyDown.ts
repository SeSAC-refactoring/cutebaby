import { RefsType } from '../../hooks/useRefs';
import { ChildData, Percentiles } from '../types';
import { handleCalculateChart } from './handleCalculateChart';

// 엔터 키 이벤트 핸들러
export const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    refs: RefsType,
    inputData: ChildData,
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // 기본 엔터 동작 방지 (예: form 제출 방지)
        handleCalculateChart(refs, inputData, setChildData, setShow);
    }
};
