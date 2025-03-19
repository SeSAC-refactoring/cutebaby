import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchBabyInfo } from '../../store/babySlice';
import { babyinfo } from '../types';

interface BabyListProps {
    babyInfo: babyinfo[];
    handleSelectBaby: (babyId: number) => void;
    selectedBabyId?: number | null;
    onOpenModal?: () => void;
}

export const BabyList: React.FC<BabyListProps> = ({
    babyInfo,
    handleSelectBaby,
    selectedBabyId,
    onOpenModal,
}) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBabyInfo());
    }, [dispatch, babyInfo.length]);

    return (
        // 마이페이지의 babylist 스타일의 경우 아이 등록 버튼까지 감는 div
        <div className="h-14 w-full overflow-x-auto flex items-center">
            <div className="flex gap-2">
                {/* 마이페이지의 경우에만 아이등록 버튼 생김 */}
                {onOpenModal && (
                    <div className="flex gap-2">
                        <button
                            className="w-[84px] button-blue button-xs"
                            onClick={onOpenModal}
                        >
                            아이 등록
                            <img src="img/plus-01.png" alt="plus icon" />
                        </button>
                        <div className="flex justify-center items-center">
                            <div className=" h-[20px] w-[1px] bg-gray-2 "></div>
                        </div>
                    </div>
                )}

                {babyInfo.length === 0 ? (
                    <p>등록된 아이가 없습니다!</p>
                ) : (
                    babyInfo.map((baby: babyinfo) => (
                        <button
                            key={baby.babyid}
                            onClick={() => handleSelectBaby(baby.babyid)}
                            className={`${
                                baby.babyid === selectedBabyId
                                    ? 'chip-button-blue chip-button-sm selected'
                                    : 'chip-button-blue chip-button-sm'
                            }`}
                        >
                            {baby.babyname.length > 3
                                ? baby.babyname.slice(0, 3) + '...'
                                : baby.babyname}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};
