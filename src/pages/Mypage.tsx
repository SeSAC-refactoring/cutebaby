import { useEffect, useState } from "react";
import BabyInput from "../components/My-page/BabyInput";
import styles from "../styles/Mypage.module.scss";
import { useNavigate } from "react-router-dom";
import {NeedLoginModal} from "../components/NeedLoginModal"; // 모달 import

export default function Mypage() {

  //모달관리
  const [openModal, setOpenModal] = useState(false);
  //페이지 시작할때 세션확인
  useEffect(() => {
    const user = sessionStorage.getItem("user"); // 세션에 담긴거가져오기
    if (!user) { // 비었다면 밑에 실행
      setOpenModal(true);
    }
  }, []);

  return (
    <div className={styles.wrap}>
      {/* openMoal이 트루면 모달 실행 */}
      {openModal && <NeedLoginModal modalState={() => setOpenModal(false)} />} 

      <div className={styles.pageContent}>
        {/* <div className={styles.icon}>수정 아이콘</div> */}
        <div className={styles.background}>
          <h1 className={styles.title}>마이페이지</h1>
          <BabyInput />
        </div>
        <div className={styles.invisible}></div>
      </div>
    </div>
  );
}
