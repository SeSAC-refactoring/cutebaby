import React from 'react';
import modal from '../../styles/Modal.module.scss';
import styles from '../../styles/GrowthDiary.module.scss';
import layout from '../../styles/commons/Layout.module.scss';
import typography from '../../styles/commons/Typography.module.scss';
import button from '../../styles/commons/Button.module.scss';
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
        <div className={styles.pageTopArea}>
            <div className={modal.titleArea}>
                <h2 className={`${layout.title} ${typography.text4xlBd}`}>
                    성장기록
                </h2>
                <div
                    onClick={() => {
                        setOpenAddModal(false);
                    }}
                    className={modal.closeBtn}
                >
                    <img src="/img/icons/i-modal-close-s32.svg" alt="" />
                </div>
            </div>
            <div className={styles.input_background}>
                <div className={styles.inputArea_wrap}>
                    <div className={styles.formArea}>
                        <div>
                            <Input
                                label="측정날짜"
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
                        <div>
                            <Input
                                label="키"
                                className={styles.input}
                                type="number"
                                id="height"
                                placeholder="숫자 입력"
                                value={String(newGrowData.height)}
                                onChange={handleDiaryInputChange}
                                onKeyDown={handleKeyDown}
                                ref={(el) => {
                                    inputRef.current.height = el;
                                }}
                            />
                            <span className={typography.textSmBd}>cm</span>
                        </div>
                        <div>
                            <Input
                                label="몸무게"
                                className={styles.input}
                                type="number"
                                id="weight"
                                placeholder="숫자 입력"
                                value={String(newGrowData.weight)}
                                onChange={handleDiaryInputChange}
                                onKeyDown={handleKeyDown}
                                ref={(el) => {
                                    inputRef.current.weight = el;
                                }}
                            />
                            <span className={typography.textSmBd}>kg</span>
                        </div>
                        <div>
                            <Input
                                label="머리둘레"
                                className={styles.input}
                                type="number"
                                id="head"
                                placeholder="숫자 입력"
                                value={String(newGrowData.head)}
                                onChange={handleDiaryInputChange}
                                onKeyDown={handleKeyDown}
                                ref={(el) => {
                                    inputRef.current.head = el;
                                }}
                            />
                            <span className={typography.textSmBd}>cm</span>
                        </div>
                    </div>

                    <div className={styles.diaryCalBtnArea}>
                        <button
                            className={`${button.btnLgYw} ${typography.textLgBd}`}
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
                        >
                            초기화
                            <img
                                src="/img/arrow-rotate-left-01.png"
                                alt="초기화 아이콘"
                            ></img>
                        </button>
                        <button
                            className={`${button.btnLgGr} ${typography.textLgBd}`}
                            onClick={handleDiarySubmit}
                            style={{
                                cursor: isSubmitting
                                    ? 'not-allowed'
                                    : 'pointer',
                            }}
                        >
                            {isSubmitting ? '저장 중' : '추가하기'}
                        </button>
                    </div>
                </div>
            </div>
            <p>
                백분위수란 같은 성별과 연령을 가진 100명을 오름차순으로 나열했을
                때 이 중 몇 번째에 해당되는지를 의미합니다. (예: 97%는 상위 3%를
                의미)
            </p>
        </div>
    );
};
