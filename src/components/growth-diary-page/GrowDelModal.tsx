import React from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchgrowInfo } from "../../store/GrowthDiarySlice";
import { newGrowData } from "../types";

interface GrowDelModalProps {
  onClose: () => void;
  growData: newGrowData[];
  growId: number;
}

export const GrowDelModal: React.FC<GrowDelModalProps> = ({
  onClose,
  growData,
  growId,
}) => {
  const babyInfo = useSelector((state: RootState) => state.baby.babyInfo);

  const dispatch = useDispatch<AppDispatch>();

  const onDelGrow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const API_URL = process.env.REACT_APP_API_URL;

    // console.log(e.currentTarget.value);
    // const selectedGrowId = Number(e.currentTarget.value);

    try {
      const response = await axios.post(`${API_URL}/delgrow`, {
        growId: growId,
      });
      dispatch(fetchgrowInfo(babyInfo));
      onClose();
    } catch (error) {
      alert("삭제에 실패하였습니다. 관리자에게 문의하세요");
    }
  };

  return (
    <div>
      <div>
        <p>정말 삭제하시겠습니까?</p>
        <div>
          <button onClick={onClose}>아니오</button>
          <button onClick={onDelGrow}>예</button>
        </div>
      </div>
    </div>
  );
};
