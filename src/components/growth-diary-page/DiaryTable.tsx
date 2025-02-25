import React, { useEffect, useState } from "react";
import { newGrowData } from "../types";

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
  console.log(growData);
  return (
    <div>
      <div>
        <div>측정날짜</div>
        <div>키(cm)</div>
        <div>몸무게(kg)</div>
        <div>머리둘레(cm)</div>
      </div>
      <div>
        {growData.length > 0 ? (
          <ul>
            {growData.map((info, i) => (
              <li key={i}>
                <div>{info.inputData}</div>
                <div>{Number(info.height)}</div>
                <div>{Number(info.weight)}</div>
                <div>{Number(info.head)}</div>
                <div>
                  <button onClick={() => onDelete(info.id)}>삭제</button>
                  <button onClick={() => onEdit(info.id)}>
                    수정
                    <img src="/img/edit-02.png" alt="수정아이콘"></img>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>성장 기록이 없습니다.</li>
          </ul>
        )}
      </div>
    </div>
  );
};
