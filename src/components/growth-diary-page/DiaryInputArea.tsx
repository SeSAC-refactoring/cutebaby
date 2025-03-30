import React from 'react';

import { useDiaryHandler } from './hooks/useDiaryHandler';
import { Input } from '../commons/Input';

interface DiaryInputAreaProps {
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBabyId: number | null;
}

export const DiaryInputArea: React.FC<DiaryInputAreaProps> = ({
    setOpenAddModal,
    selectedBabyId,
}) => {
    const {
        newGrowData,
        setNewGrowData,
        inputRef,
        handleDiaryInputChange,
        handleKeyDown,
        handleDiarySubmit,
        isSubmitting,
    } = useDiaryHandler(selectedBabyId);

    return (
        <>
            <article className="inputArea">
                <div className="forms">
                    <Input
                        label="측정날짜"
                        type="date"
                        id="inputData"
                        value={newGrowData.inputData}
                        onChange={handleDiaryInputChange}
                        ref={(el) => {
                            inputRef.current.inputData = el;
                        }}
                    />

                    <div className="inputWrapper">
                        <Input
                            label="키"
                            type="number"
                            id="height"
                            placeholder="61.1"
                            value={String(newGrowData.height)}
                            onChange={handleDiaryInputChange}
                            onKeyDown={handleKeyDown}
                            ref={(el) => {
                                inputRef.current.height = el;
                            }}
                        />
                        <span>cm</span>
                    </div>

                    <div className="inputWrapper">
                        <Input
                            label="몸무게"
                            type="number"
                            id="weight"
                            placeholder="6.4"
                            value={String(newGrowData.weight)}
                            onChange={handleDiaryInputChange}
                            onKeyDown={handleKeyDown}
                            ref={(el) => {
                                inputRef.current.weight = el;
                            }}
                        />
                        <span>kg</span>
                    </div>

                    <div className="inputWrapper">
                        <Input
                            label="머리둘레"
                            type="number"
                            id="head"
                            placeholder="40.5"
                            value={String(newGrowData.head)}
                            onChange={handleDiaryInputChange}
                            onKeyDown={handleKeyDown}
                            ref={(el) => {
                                inputRef.current.head = el;
                            }}
                        />
                        <span>cm</span>
                    </div>
                </div>

                <div className="btns">
                    <button
                        onClick={() =>
                            setNewGrowData({
                                babyid: newGrowData.babyid,
                                id: 0,
                                height: '',
                                weight: '',
                                head: '',
                                inputData: new Date()
                                    .toISOString()
                                    .split('T')[0],
                            })
                        }
                        className="button-yellow"
                    >
                        <p>초기화</p>
                        <img src="/img/arrow-rotate-left-01.png" alt="초기화" />
                    </button>
                    <button
                        onClick={handleDiarySubmit}
                        style={{
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                        className="button-black"
                    >
                        <p>{isSubmitting ? '저장 중' : '추가하기'}</p>
                        <img src="/img/plus-02.png" alt="추가하기" />
                    </button>
                </div>
            </article>
        </>
    );
};
