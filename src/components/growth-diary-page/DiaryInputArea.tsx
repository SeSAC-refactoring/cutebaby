import React from 'react';
import styles from '../../styles/GrowthDiary.module.scss';
import { useDiaryHandler } from './hooks/useDiaryHandler';

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
    } = useDiaryHandler(selectedBabyId);

    return (
        <div className={styles.modalWrap}>
            <div className={styles.modal_title_wrap}>
                <div>성장기록</div>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setOpenAddModal(false);
                    }}
                >
                    X
                </div>
            </div>
            <div className={styles.input_background}>
                <div className={styles.inputArea_wrap}>
                    <div>
                        <label className={styles.label} htmlFor="inputData">
                            측정날짜
                        </label>
                        <div>
                            <input
                                className={styles.input}
                                type="date"
                                id="inputData"
                                value={newGrowData.inputData}
                                onChange={handleDiaryInputChange}
                                ref={(el) => {
                                    inputRef.current.inputData = el;
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="height">
                            키
                        </label>
                        <div >
                            <input
                                className={styles.input}
                                type="number"
                                id="height"
                                placeholder="숫자 입력"
                                value={newGrowData.height}
                                onChange={handleDiaryInputChange}
                                onKeyDown={handleKeyDown}
                                ref={(el) => {
                                    inputRef.current.height = el;
                                }}
                            />
                            <span className={styles.list_title}>cm</span>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="weight">
                            몸무게
                        </label>
                        <div>
                            <input
                                className={styles.input}
                                type="number"
                                id="weight"
                                placeholder="숫자 입력"
                                value={newGrowData.weight}
                                onChange={handleDiaryInputChange}
                                onKeyDown={handleKeyDown}
                                ref={(el) => {
                                    inputRef.current.weight = el;
                                }}
                            />
                            <span className={styles.list_title}>kg</span>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="head">
                            머리둘레
                        </label>
                        <div>
                            <input
                                className={styles.input}
                                type="number"
                                id="head"
                                placeholder="숫자 입력"
                                value={newGrowData.head}
                                onChange={handleDiaryInputChange}
                                onKeyDown={handleKeyDown}
                                ref={(el) => {
                                    inputRef.current.head = el;
                                }}
                            />
                            <span className={styles.list_title}>cm</span>
                        </div>
                    </div>
                </div>
               
            </div>
            <div className={styles.container_btn}>
                <button
                    onClick={() =>
                        setNewGrowData({
                        babyid: newGrowData.babyid,
                        id: 0,
                        height: '',
                        weight: '',
                        head: '',
                        inputData: new Date().toISOString().split('T')[0],
                         })
                    }
                            className={styles.reset_btn}>초기화</button>

                <button className={styles.add_btn} onClick={handleDiarySubmit}>추가하기</button>
            </div>

        </div>
    );
};
