import React from 'react'
import styles from '../../styles/Mypage.module.scss'


export const BabyInputPlus = () => {
  return (
    <>
           <div className={styles.info_box}>
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
