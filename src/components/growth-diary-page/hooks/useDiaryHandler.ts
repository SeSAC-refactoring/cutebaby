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

    useEffect(() => {
        if (selectedBabyId) {
            setNewGrowData((prev) => ({ ...prev, babyid: selectedBabyId }));
        }
    }, [selectedBabyId]);

    // 입력 필드 변경 시 handler
    const handleDiaryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewGrowData((prev) => ({ ...prev, [id]: value }));
        console.log(newGrowData);
    };

    // 엔터 시 handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 Enter 동작(폼 제출) 방지

            if (e.currentTarget.id === 'height') {
                inputRef.current.weight?.focus(); // 체중 입력 필드로 이동
            } else if (e.currentTarget.id === 'weight') {
                inputRef.current.head?.focus(); // 머리둘레 입력 필드로 이동
            } else if (e.currentTarget.id === 'head') {
                handleDiarySubmit(); // 마지막 필드(머리둘레)에서 Enter 누르면 자동으로 제출
            }
        }
    };

    // 제출 시 handler
    const handleDiarySubmit = async () => {
        if (!newGrowData.babyid) {
            alert('아기를 선택하세요!');
            return;
        } else if (!newGrowData.height) {
            inputRef.current.height?.focus();
        } else if (!newGrowData.weight) {
            inputRef.current.weight?.focus();
        } else if (!newGrowData.head) {
            inputRef.current.head?.focus();
        } else {
            try {
                await request({
                    babyid: newGrowData.babyid,
                    height: Number(newGrowData.height),
                    weight: Number(newGrowData.weight),
                    head: Number(newGrowData.head),
                    inputData: newGrowData.inputData,
                });
                alert('성장 기록이 추가되었습니다!');
                dispatch(fetchgrowInfo(babyInfo));

                // 입력 필드 초기화
                setNewGrowData({
                    babyid: newGrowData.babyid, // 선택된 아기는 유지
                    id: 0,
                    height: '',
                    weight: '',
                    head: '',
                    inputData: new Date().toISOString().split('T')[0],
                });
            } catch (error) {
                alert('기록 추가에 실패했습니다.');
            }
        }
    };

    return {
        newGrowData,
        setNewGrowData,
        inputRef,
        handleDiaryInputChange,
        handleKeyDown,
        handleDiarySubmit,
    };
};
