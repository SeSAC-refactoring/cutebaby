import React, { useEffect, useState } from 'react';
import styles from '../../styles/Modal.module.scss';
import { newGrowData } from '../types';
import { useUpdateGrow } from './hooks/useUpdateGrow';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchgrowInfo } from '../../store/GrowthDiarySlice';

interface GrowRewriteModalProps {
    onClose: () => void;
    growData: newGrowData[];
    growId: number;
}

export const GrowRewriteModal: React.FC<GrowRewriteModalProps> = ({
    onClose,
    growData,
    growId,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { babyInfo } = useSelector((state: RootState) => state.baby);
    const { requestGrow } = useUpdateGrow();

    // 기본 데이터 저장
    const [basicdata, setBasicdata] = useState<newGrowData>({
        babyid: null,
        id: 0,
        height: '',
        weight: '',
        head: '',
        inputData: '',
    });

    // 수정 데이터 상태
    const [rewriteData, setrewriteData] = useState<newGrowData>(basicdata);

    // growData가 변경될 때 기본값 설정
    useEffect(() => {
        if (growData.length === 0) return; // 데이터가 없을 경우 실행 방지

        const beforedate = growData.find((value) => value.id === growId);
        if (beforedate) {
            setBasicdata(beforedate);
            setrewriteData(beforedate); // 기본값을 rewriteData에도 즉시 반영
        }
    }, [growData, growId]);

    // growData가 변경될 때 rewriteData도 즉시 반영
    useEffect(() => {
        setrewriteData(basicdata);
    }, [basicdata]);

    // 입력 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setrewriteData((prev) => ({ ...prev, [id]: value }));
    };

    // 포커스 시 기존 값 초기화
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id } = e.target;
        setrewriteData((prev) => ({ ...prev, [id]: '' }));
    };

    // 포커스를 잃을 때 기본값 복구
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setrewriteData((prev) => ({
            ...prev,
            [id]: value.trim() === '' ? basicdata[id as keyof newGrowData] : value,
        }));
    };

    // 수정 버튼 클릭 시 실행
    const handleRewrite = async () => {
        try {
            await requestGrow({
                babyid: Number(growData[0].babyid),
                id: growId,
                height: Number(rewriteData.height),
                weight: Number(rewriteData.weight),
                head: Number(rewriteData.head),
                inputData: rewriteData.inputData,
            });

            alert('성장 기록이 수정되었습니다!');
            dispatch(fetchgrowInfo(babyInfo));
            onClose();
        } catch (error) {
            alert('기록 수정에 실패했습니다.');
        }
    };

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_background}>
                <div className={styles.modal_container}>
                    <div className={styles.modal_title_wrap}>
                        <div className={styles.modal_title}>기록 수정</div>
                        <div
                            onClick={onClose}
                            style={{
                                fontSize: '40px',
                                cursor: 'pointer',
                            }}
                        >
                            X
                        </div>
                    </div>

                    <div className={styles.input_set}>
                        <label>측정날짜</label>
                        <input
                            type="date"
                            className={styles.modal_input}
                            id="inputData"
                            value={rewriteData.inputData}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.input_set}>
                        <label>신장</label>
                        <input
                            className={styles.modal_input}
                            id="height"
                            placeholder="숫자만 입력"
                            value={rewriteData.height}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className={styles.input_set}>
                        <label>체중</label>
                        <input
                            className={styles.modal_input}
                            id="weight"
                            placeholder="숫자만 입력"
                            value={rewriteData.weight}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className={styles.input_set}>
                        <label>머리둘레</label>
                        <input
                            className={styles.modal_input}
                            id="head"
                            placeholder="숫자만 입력"
                            value={rewriteData.head}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className={styles.modal_button_container}>
                        <button
                            className={`${styles.modal_btn} ${styles.modal_cancel_button}`}
                            onClick={onClose}
                        >
                            취소
                        </button>
                        <button
                            onClick={handleRewrite}
                            className={`${styles.modal_btn} ${styles.modal_done_button}`}
                        >
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
