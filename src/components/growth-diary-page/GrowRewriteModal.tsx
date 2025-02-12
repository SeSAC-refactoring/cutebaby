import React, { useState } from "react";
// import styles from '../../styles/Modal.module.scss'
import styles from "../../styles/Modal.module.scss";
import { newGrowData } from "../types";
import { useUpdateGrow } from "./hooks/useUpdateGrow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchgrowInfo } from "../../store/GrowthDiarySlice";
import { Input } from "../commons/Input";
//모달css로 옮기면 삭제 후 위에 주석으로 교체해야함
interface GrowRewriteModalProps {
  onClose: () => void;
  growData: newGrowData[];
  growId: number;
}
export const GrowRewriteModal: React.FC<GrowRewriteModalProps> = ({
  onClose,
  growData,
  growId,
}: any) => {
  const { requestGrow } = useUpdateGrow();
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch 추가
  const { babyInfo } = useSelector((state: RootState) => state.baby);
  const [rewriteData, setrewriteData] = useState<newGrowData>({
    babyid: null,
    id: 0,
    height: "",
    weight: "",
    head: "",
    inputData: "",
  });
  console.log("growData", growData);
  console.log("growId:", growId);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setrewriteData((prev) => ({ ...prev, [id]: value }));
  };
  const rewrite = async () => {
    setrewriteData((prev) => ({
      ...prev,
      babyid: growData[0].babyid,
      id: growId,
      inputData: growData[0].inputData,
    }));
    console.log("최종입력값", rewriteData);
    console.log("date >>", growData[0].inputData);
    try {
      await requestGrow({
        babyid: growData[0].babyid,
        id: growId,
        height: Number(rewriteData.height),
        weight: Number(rewriteData.weight),
        head: Number(rewriteData.head),
        inputData: growData[0].inputData,
      });
      alert("성장 기록이 수정되었습니다!");
      dispatch(fetchgrowInfo(babyInfo));
      onClose();
      // 입력 필드 초기화
      setrewriteData({
        babyid: growData.babyid, // 선택된 아기는 유지
        id: 0,
        height: "",
        weight: "",
        head: "",
        inputData: "",
      });
    } catch (error) {
      alert("기록 추가에 실패했습니다.");
    }
  };
  return (
    <div
      className={styles.modal_overlay}
      onClick={() => {
        onClose(false);
      }}
    >
      <div className={styles.modal_background}>
        <div className={styles.modal_container}>
          <div className={styles.modal_title_wrap}>
            <div className={styles.modal_title}>기록 수정</div>
            <div
              onClick={() => {
                onClose(false);
              }}
              style={{
                fontSize: "40px",
                cursor: "pointer",
              }}
            >
              X
            </div>
          </div>
          <div className={styles.input_set}>
            <label>신장</label>
            <input
              className={styles.modal_input}
              id="height"
              placeholder="숫자만"
              value={rewriteData.height}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.input_set}>
            <label>체중</label>
            <input
              className={styles.modal_input}
              placeholder="숫자만"
              id="weight"
              value={rewriteData.weight}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.input_set}>
            <label>머리둘레</label>
            <input
              className={styles.modal_input}
              id="head"
              placeholder="숫자만"
              value={rewriteData.head}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.modal_button_container}>
            <button
              className={`${styles.modal_btn} ${styles.modal_cancel_button}`}
            >
              취소
            </button>
            <button
              onClick={rewrite}
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
