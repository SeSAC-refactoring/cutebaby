import { useEffect, useState } from 'react';
import { babyinfo } from '../components/types';

// BabyList에서 클릭한 babyid를 저장
export const useSelectBaby = (babyInfo: babyinfo[]) => {
    const [selectedBabyId, setSelectedBabyId] = useState<number | null>(null);

    // babyInfo가 업데이트될 때 첫 번째 아이 선택
    useEffect(() => {
        if (babyInfo.length > 0) {
            setSelectedBabyId(babyInfo[0].babyid);
        }
    }, [babyInfo]);

    // BabyList에서 클릭한 babyid를 저장
    const handleSelectBaby = (babyId: number) => {
        setSelectedBabyId(babyId);
    };

    useEffect(() => {
        console.log('현재 선택된 아이 ID:', selectedBabyId);
    }, [selectedBabyId]);

    return { selectedBabyId, handleSelectBaby };
};
