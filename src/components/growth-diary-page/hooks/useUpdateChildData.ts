import { useEffect } from 'react';
import { babyinfo, ChildData } from '../../types';

export const useUpdateChildData = (
    babyInfo: babyinfo[],
    selectedBabyId: number | null,
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>
) => {
    useEffect(() => {
        if (!selectedBabyId) return;

        const selectedBabyInfo = babyInfo.find(
            (baby) => baby.babyid === selectedBabyId
        );

        if (selectedBabyInfo) {
            setChildData({
                gender: selectedBabyInfo.gender === 'boy' ? 'male' : 'female',
                birthDate: new Date(selectedBabyInfo.birthday),
                measurementDate: null,
                months: null,
                height: null,
                weight: null,
                headCircumference: null,
            });
        }
    }, [selectedBabyId, babyInfo, setChildData]);
};
