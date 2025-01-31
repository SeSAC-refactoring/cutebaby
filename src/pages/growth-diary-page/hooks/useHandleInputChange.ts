import { ChildData } from '../types';

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
