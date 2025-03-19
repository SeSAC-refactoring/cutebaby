import React from 'react';
import { DiaryInputArea } from './DiaryInputArea';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSelectBaby } from '../../hooks/useSelectBaby';

interface GrowthAppendModalProps {
    setOpenAppendModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const GrowthAppendModal = ({
    setOpenAppendModal,
    setOpenAddModal,
}: GrowthAppendModalProps) => {
    const { babyInfo } = useSelector((state: RootState) => state.baby);
    const { selectedBabyId } = useSelectBaby(babyInfo);

    return (
        <div
            onClick={() => {
                setOpenAppendModal(false);
            }}
            className="modalBg"
        >
            <div onClick={(e) => e.stopPropagation()} className="whiteboxModal">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between">
                        <h2>성장기록 추가</h2>
                        <div
                            onClick={() => {
                                setOpenAppendModal(false);
                            }}
                        >
                            <img
                                src="/img/Button-close.png"
                                alt="닫기"
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    <DiaryInputArea
                        setOpenAddModal={setOpenAddModal}
                        selectedBabyId={selectedBabyId}
                    />
                </div>
            </div>
        </div>
    );
};
