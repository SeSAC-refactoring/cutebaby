import React from "react";
import styles from "../../styles/Modal.module.scss";
import button from "../../styles/commons/Button.module.scss";
import text from "../../styles/commons/Typography.module.scss";
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
    <div className={styles.modal_overlay}>
      <div className={`${styles.modal_container} ${styles.modalWrap}`}>
        <p className={styles.modal_title}>정말 삭제하시겠습니까?</p>
        <div className={styles.modal_button_container}>
          <button
            className={`${button.btnXlYw} ${text.textMdBd}`}
            onClick={onClose}
          >
            아니오
          </button>
          <button
            className={`${button.btnXlGr} ${text.textMdBd}`}
            onClick={onDelGrow}
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
};
