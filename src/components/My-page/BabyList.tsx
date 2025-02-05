import React, { useState } from 'react'
import styles from "../../styles/Mypage.module.scss";
import BabyInfo from "./BabyInfo";
import { BabyInputPlus } from './BabyInputPlus';
import { NothingBaby } from './NothingBaby';

interface Baby {
    babyname: string;
    birthday: string;
    gender: string;
    picture: string | null; // picture가 null일 수도 있으므로
  }
  
  interface BabyInputProps {
    babyInfo: Baby[];  // babyInfo는 배열 형식임
    nothingBaby : boolean
  }

 export const BabyList: React.FC<BabyInputProps> = ({ babyInfo ,nothingBaby}) => {
    const [babyPlus , setBabyPlus] = useState<boolean>(false)
    console.log('=====',nothingBaby);
    
    console.log('>>>>>>>',babyInfo)
    const Plus = ()=>{
        if(!babyPlus){
            setBabyPlus(true)
            console.log('baby boolean>>',babyPlus)
            console.log('nothing baby boolean>>',nothingBaby)

        }else{
            setBabyPlus(false)
            console.log('baby boolean>>',babyPlus)
            console.log('nothing baby boolean>>',nothingBaby)

        }
    }

  return (
    <>
    <div className={styles.user_list}>
          <div className={styles.user_wrap}>
            {nothingBaby?babyInfo.map((baby:Baby , index:number)=>(
                  <div key={index} className={styles.user}>{baby.babyname}</div>
            )):'등록된 아이가 없습니다!' }
            {}
            {/* <div className={styles.user}>김하나</div>
            <div className={styles.user}>김두리</div>
            <div className={styles.user}>김세찌</div> */}
          </div>
          <button onClick={Plus}className={styles.enroll}>{!babyPlus?'아기등록':'아기정보'}</button>
        </div>
        {babyPlus?<BabyInputPlus babyInfo={babyInfo} nothingBaby={nothingBaby} />:
        nothingBaby ? <BabyInfo/>:<NothingBaby />
          }

    </>
)
}
