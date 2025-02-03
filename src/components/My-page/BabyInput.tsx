import React, { useState } from 'react'
import styles from "../../styles/Mypage.module.scss";
import BabyInfo from "./BabyInfo";
import { BabyInputPlus } from './BabyInputPlus';


export default function BabyInput() {
    const [babyPlus , setBabyPlus] = useState<boolean>(false)

    const Plus = ()=>{
        if(!babyPlus){
            setBabyPlus(true)
        }else{
            setBabyPlus(false)
        }
    }

  return (
    <>
    <div className={styles.user_list}>
          <div className={styles.user_wrap}>
            {/* <div className={styles.user}>김하나</div>
            <div className={styles.user}>김두리</div>
            <div className={styles.user}>김세찌</div> */}
          </div>
          <button onClick={Plus}className={styles.enroll}>아이등록</button>
        </div>
        {babyPlus?<BabyInputPlus />:<BabyInfo />}

    </>
)
}
