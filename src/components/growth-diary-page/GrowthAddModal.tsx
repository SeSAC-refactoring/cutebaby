import React from 'react';
import { DiaryInputArea } from './DiaryInputArea';
import { DiaryTable } from './DiaryTable';

import { newGrowData } from '../types';

interface GrowthAddModalProps {
    setSelectedGrowId: React.Dispatch<React.SetStateAction<number | null>>;
    setOpenRewriteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDelModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenAppendModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBabyId: number | null;
    growData: newGrowData[];
}

export const GrowthAddModal = ({
    setSelectedGrowId,
    setOpenRewriteModal,
    setOpenDelModal,
    setOpenAddModal,
    setOpenAppendModal,
    selectedBabyId,
    growData,
}: GrowthAddModalProps) => {
    // 수정 모달 열기
    const handleEdit = (selectedGrowId: number) => {
        setSelectedGrowId(selectedGrowId);
        setOpenRewriteModal(true);
    };

    // 삭제 모달 열기
    const handleDelete = (selectedGrowId: number) => {
        setSelectedGrowId(selectedGrowId);
        setOpenDelModal(true);
    };

    return (
        <div
            onClick={() => {
                setOpenAddModal(false);
            }}
            className="modalBg"
        >
            <div onClick={(e) => e.stopPropagation()} className="whiteboxModal">
                <div className="flex justify-between">
                    <div className="flex gap-4 items-end">
                        <h2>성장기록</h2>
                        <button
                            className="md:hidden button-yellow button-xs"
                            onClick={() => setOpenAppendModal(true)}
                        >
                            <p>성장기록 추가</p>
                            <img
                                src="../img/icons/i-chevron-right-s20.svg"
                                alt=">"
                            />
                        </button>
                    </div>

                    <div
                        onClick={() => {
                            setOpenAddModal(false);
                        }}
                    >
                        <img
                            src="/img/Button-close.png"
                            alt="닫기"
                            className="cursor-pointer"
                        />
                    </div>
                </div>

                <div className="hidden md:block">
                    <DiaryInputArea
                        setOpenAddModal={setOpenAddModal}
                        selectedBabyId={selectedBabyId}
                    />
                </div>

                <DiaryTable
                    growData={growData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};
