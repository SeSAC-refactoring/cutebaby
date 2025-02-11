import React, { useState } from "react";
import styles from "../../styles/Mypage.module.scss";
import { BabyInfo } from "./BabyInfo";
import { BabyInputPlus } from "./BabyInputPlus";
import { NothingBaby } from "./NothingBaby";
import { babyinfo } from "../types";
import { BabyList } from "../commons/BabyList";
import { useSelectBaby } from "../../hooks/useSelectBaby";
import { useDelbaby } from "./hooks/useDelbaby";
import { BabyListColumnSmall } from "../commons/BabyList_column_small";

interface BabyInputProps {
  babyInfo: babyinfo[]; // babyInfo는 배열 형식임
  nothingBaby: boolean;
}

export const MypageBabyList: React.FC<BabyInputProps> = ({
  babyInfo,
  nothingBaby,
}) => {
  const [babyPlus, setBabyPlus] = useState<boolean>(false);
  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
  const { delbaby } = useDelbaby();
  console.log("=====", nothingBaby);

  console.log("babyinfo >>>>>>>", babyInfo);

  const Plus = () => {
    if (!babyPlus) {
      setBabyPlus(true);
      console.log("baby boolean>>", babyPlus);
      console.log("nothing baby boolean>>", nothingBaby);
    } else {
      setBabyPlus(false);
      console.log("baby boolean>>", babyPlus);
      console.log("nothing baby boolean>>", nothingBaby);
    }
  };

  return (
    <>
      <BabyListColumnSmall
        babyInfo={babyInfo}
        handleSelectBaby={handleSelectBaby}
        selectedBabyId={selectedBabyId}
      />
      {/* <button onClick={Plus} className={styles.enroll}>
          {!babyPlus ? "아기등록" : "아기정보"}
        </button>
        <button onClick={() => delbaby(selectedBabyId)}>아이삭제</button> */}
      {/* {babyPlus ? (
                <BabyInputPlus babyInfo={babyInfo} nothingBaby={nothingBaby} />
            ) : nothingBaby ? (
                <BabyInfo />
            ) : (
                <NothingBaby />
            )} */}
      <button className={styles.baby_add_btn}>아이 등록 +</button>
    </>
  );
};
