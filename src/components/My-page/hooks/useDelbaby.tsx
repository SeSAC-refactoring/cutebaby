// hooks/useDelbaby.ts
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchBabyInfo } from '../../../store/babySlice';
import { AppDispatch } from '../../../store';

export const useDelbaby = () => {
    const dispatch = useDispatch<AppDispatch>();
    const delbaby = async (babyId: number | null) => {
            
        console.log(babyId)
        const babyid = Number(babyId)
        if (!babyId) {
            alert("삭제할 아이를 선택하세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/api/delbaby', { babyid });

                dispatch(fetchBabyInfo())
                console.log("아기 삭제 완료:", babyId);
            
        } catch (error) {
            console.error("아기 삭제 실패:", error);
            alert("아기 삭제에 실패했습니다.");
        }
    };

    return { delbaby };
};
