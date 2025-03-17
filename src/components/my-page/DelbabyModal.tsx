import React, { useEffect } from "react";
import { useDelbaby } from "./hooks/useDelbaby";
import { babyinfo } from "../types";

interface DelbabyProps {
  onClose: () => void;
  babyInfo: babyinfo[];
  handleSelectBaby: number | null;
}

export const DelbabyModal: React.FC<DelbabyProps> = ({
  onClose,
  handleSelectBaby,
}) => {
  const { delbaby } = useDelbaby();

  // `handleSelectBaby`가 올바른 값인지 확인
  useEffect(() => {
    // console.log("삭제할 babyid:", handleSelectBaby);
  }, [handleSelectBaby]);

  // 모달 닫기
  const goBack = () => {
    // console.log(" 모달 닫기 실행");
    onClose();
  };

  // 아이 삭제 핸들러
  const handleDelete = async () => {
    if (handleSelectBaby !== null) {
      const success = await delbaby(handleSelectBaby);
      if (success) {
        // console.log(" 아이 삭제 성공");
        onClose();
      } else {
        // console.error(" 아이 삭제 실패");
      }
    } else {
      // console.error("⚠ 삭제할 babyid가 null입니다.");
    }
  };

  return (
    <div onClick={goBack} className="modalBg">
      <div className="smallModal">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-xl sm:text-2xl font-bd">
            정말 삭제하시겠습니까?
          </div>
          <div className="flex gap-4">
            <button
              onClick={goBack}
              className="button button-yellow button-lg w-full"
            >
              취소
            </button>
            <button
              onClick={handleDelete}
              className="button-black button-lg w-full"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
