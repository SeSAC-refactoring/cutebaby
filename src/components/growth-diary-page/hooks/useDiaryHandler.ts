import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useNewGrow } from './useNewGrow';
import { newGrowData } from '../../types';
import { fetchgrowInfo } from '../../../store/GrowthDiarySlice';

export const useDiaryHandler = (selectedBabyId: number | null) => {
    const dispatch = useDispatch<AppDispatch>(); // Redux dispatch 추가
    const { babyInfo } = useSelector((state: RootState) => state.baby);
    const { request } = useNewGrow();

    // focus를 위한 ref
    const inputRef = useRef({
        height: null as HTMLInputElement | null,
        weight: null as HTMLInputElement | null,
        head: null as HTMLInputElement | null,
        inputData: null as HTMLInputElement | null,
    });

    const [newGrowData, setNewGrowData] = useState<newGrowData>({
        babyid: null,
        id: 0,
        height: '',
        weight: '',
        head: '',
        inputData: new Date().toISOString().split('T')[0],
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (selectedBabyId) {
            setNewGrowData((prev) => ({ ...prev, babyid: selectedBabyId }));
        }
    }, [selectedBabyId]);

    // 입력 필드 변경 시 handler
    const handleDiaryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewGrowData((prev) => ({ ...prev, [id]: value }));
        // console.log(newGrowData);
    };

    // 엔터 시 handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 Enter 동작(폼 제출) 방지
            const { height, weight, head } = newGrowData;

            const allFieldsFilled: boolean =
                newGrowData.height && newGrowData.weight && newGrowData.head; // 모든 필드가 채워져 있는지 확인
            const currentField: string = e.currentTarget.id; // 엔터 이벤트가 일어난 입력 필드

            if (allFieldsFilled) {
                handleDiarySubmit(); // 모든 필드가 채워졌으면 제출
                return;
            }

            // 비어있는 필드로 포커스 이동
            if (!height) {
                inputRef.current.height?.focus();
            } else if (!weight) {
                inputRef.current.weight?.focus();
            } else if (!head) {
                inputRef.current.head?.focus();
            }
        }
    };

    // 제출 시 handler
    const handleDiarySubmit = async () => {
        if (isSubmitting) return; // 버튼 중복 클릭(엔터 연타) 방지

        const { babyid, height, weight, head, inputData } = newGrowData;

        // 정보가 없으면 없는 필드로 focus
        if (!babyid) return alert('아기를 선택하세요!');
        if (!height) return inputRef.current.height?.focus();
        if (!weight) return inputRef.current.weight?.focus();
        if (!head) return inputRef.current.head?.focus();

        try {
            setIsSubmitting(true);
            await request({
                babyid: babyid,
                height: Number(height),
                weight: Number(weight),
                head: Number(head),
                inputData: inputData,
            });
            alert('성장 기록이 추가되었습니다!');
            dispatch(fetchgrowInfo(babyInfo));

            // 입력 필드 초기화
            setNewGrowData({
                babyid: babyid, // 선택된 아기는 유지
                id: 0,
                height: '',
                weight: '',
                head: '',
                inputData: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            alert('기록 추가에 실패했습니다.');
        } finally {
            setIsSubmitting(false); // 요청 완료 후 버튼 다시 활성화
        }
    };

    return {
        newGrowData,
        setNewGrowData,
        inputRef,
        handleDiaryInputChange,
        handleKeyDown,
        handleDiarySubmit,
        isSubmitting,
    };
};
