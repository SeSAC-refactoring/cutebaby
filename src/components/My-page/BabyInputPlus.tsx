import React from 'react'
import styles from '../../styles/Mypage.module.scss'


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

export const BabyInputPlus: React.FC<BabyInputProps> = ({babyInfo, nothingBaby}) => {


  return (
    <>
           <div className={styles.info_box}>
            {nothingBaby}
            <h3 className={styles.info_title}>아기 등록하기</h3>
            <form>
            <section>
            <label>이름 :</label>
            <input type="text" />
            </section>

            <section>
            <label>생년월일 :</label>
            <input type="date" />
            </section>

            <section>
            <label>성별 :</label>
            <label >
            <input type="checkbox" />
            남아
            </label>
            <label >
            <input type="checkbox" />
            여아
            </label>
            </section>
            </form> 

            {/* <section>
                <div className={styles.image_box }>image영역일듯</div>
            </section> */}


        </div>
        <button className={styles.edit_btn}>완료</button>

    </>
  )
}
