import React from 'react';
import { newGrowData } from '../types';
import styles from '../../styles/GrowthDiary.module.scss';
import button from '../../styles/commons/Button.module.scss';
import typography from '../../styles/commons/Typography.module.scss';
import { DiaryInputArea } from './DiaryInputArea';
import { DiaryTable } from './DiaryTable';

interface RecentGrowthRecordProps {
    growData: newGrowData[];
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RecentGrowthRecord: React.FC<RecentGrowthRecordProps> = ({
    growData,
    setOpenAddModal,
}) => {
    return (
        <div className="recentGrowthRecord">
            <div className="titleArea">
                <span className="title">가장 최근 기록</span>
                <span className="recentDate">
                    {new Date(growData[0].inputData).toLocaleDateString(
                        'ko-KR',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }
                    )}
                </span>
            </div>

            <div className="items">
                <div className="item height">
                    <span>키</span>
                    <span className="item-value">{growData[0].height} cm</span>
                </div>
                <div className="item weight">
                    <span>몸무게</span>
                    <span className="item-value">{growData[0].weight} kg</span>
                </div>
                <div className="item head">
                    <span>머리둘레</span>
                    <span className="item-value">{growData[0].head} cm</span>
                </div>
            </div>
            {/* <div>
        <button onClick={() => setOpenAddModal(true)}>성장기록 보러가기</button>
      </div> */}
        </div>
    );
};
