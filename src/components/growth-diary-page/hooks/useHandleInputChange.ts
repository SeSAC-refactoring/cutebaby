import { ChildData } from '../../types';

// growthDiaryPage에서 측정일/키/체중/머리둘레 입력값 변할 시
export const useHandleInputChange = (
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>
) => {
    // 입력값 변경 (입력 필드 업데이트)
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChildData((prev) => ({
            ...prev,
            [name]: value ? parseFloat(value) : null, // string -> number로 형변환하여 저장
        }));
    };
};
