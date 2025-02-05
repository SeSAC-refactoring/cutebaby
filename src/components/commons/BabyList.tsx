import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { babyinfo } from '../types';

interface BabyListProps {
    babyInfo: babyinfo[];
    nothingBaby: boolean;
    handleSelectBaby: (babyId: number) => void;
    selectedBabyId?: number | null;
}

export const BabyList: React.FC<BabyListProps> = ({
    nothingBaby,
    babyInfo,
    handleSelectBaby,
    selectedBabyId,
}) => {
    return (
        <div>
            {!nothingBaby ? (
                <p>등록된 아이가 없습니다!</p>
            ) : (
                babyInfo.map((baby: babyinfo) => (
                    <div
                        key={baby.babyid}
                        onClick={() => handleSelectBaby(baby.babyid)}
                    >
                        {baby.babyid} - {baby.babyname}
                    </div>
                ))
            )}
        </div>
    );
};
