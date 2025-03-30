import React from 'react';
import { newGrowData } from '../types';

interface DiaryTableProps {
    growData: newGrowData[];
    onEdit: (growId: number) => void;
    onDelete: (growId: number) => void;
}

export const DiaryTable: React.FC<DiaryTableProps> = ({
    growData,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="diaryTable">
            {growData.length > 0 ? (
                <>
                    <div className="tableTitle">
                        <div className="date">날짜</div>
                        <div>
                            <p>키</p>
                            <p>(cm)</p>
                        </div>
                        <div>
                            <p>몸무게</p>
                            <p>(kg)</p>
                        </div>
                        <div>
                            <p>머리둘레</p>
                            <p>(cm)</p>
                        </div>
                    </div>

                    <ul>
                        {growData.map((info, i) => (
                            <li key={i}>
                                <div className="value">{info.inputData}</div>
                                <div className="value">
                                    {Number(info.height)}
                                </div>
                                <div className="value">
                                    {Number(info.weight)}
                                </div>
                                <div className="value">{Number(info.head)}</div>

                                <div className="buttons">
                                    <button
                                        onClick={() => onEdit(info.id)}
                                        className="button-blue"
                                    >
                                        수정
                                        <img
                                            src="/img/edit-02.png"
                                            alt="수정아이콘"
                                        />
                                    </button>
                                    <button
                                        onClick={() => onDelete(info.id)}
                                        className="button-coral"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="bg-gray-1 rounded-[2rem] p-6 sm:h-0 sm:grow">
                    <div className="h-[35rem] sm:h-full bottom-0 flex justify-center items-center backdrop-blur-sm">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <img src="/img/Ggoggo-003-2.svg" />
                            <div className="sm:text-lg text-sm font-md text-gray-6">
                                <strong>성장기록</strong>을 추가해보세요!
                                <br /> 우리아이의 성장기록을 보여드려요:)
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
