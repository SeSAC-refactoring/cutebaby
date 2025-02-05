import { useState } from 'react';

// BabyList에서 클릭한 babyid를 저장
const useSelectBaby = (babyId: number) => {
    const [selectedBabyId, setSelectedBabyId] = useState<number | null>(null);

    setSelectedBabyId(babyId);
    console.log(selectedBabyId);
};
