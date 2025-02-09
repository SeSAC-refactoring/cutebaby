import { useEffect, useState } from "react";
import { MypageBabyList } from "../components/my-page/MypageBabyList";
import styles from "../styles/Mypage.module.scss";
import { NeedLoginModal } from "../components/NeedLoginModal"; // 모달 import
import axios from "axios";
import { log } from "console";
import { babyinfo } from "../components/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBabyInfo } from "../store/babySlice";

export default function Mypage() {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { babyInfo, nothingBaby, loading, error } = useSelector(
    (state: RootState) => state.baby
  );
  const user = sessionStorage.getItem("user");

  // 세션 확인 및 데이터 요청
  useEffect(() => {
    if (!user) {
      setOpenModal(true);
    } else {
      dispatch(fetchBabyInfo());
    }
  }, [dispatch, user]);

  return (
    <div className={styles.wrap}>
      {/* openMoal이 트루면 모달 실행 */}
      {openModal && <NeedLoginModal modalState={() => setOpenModal(false)} />}

      <div className={styles.pageContent}>
        {/* <div className={styles.icon}>수정 아이콘</div> */}
        <div className={styles.background}>
          <h1 className={styles.title}>마이페이지</h1>
          <MypageBabyList babyInfo={babyInfo} nothingBaby={nothingBaby} />
          {/* {message.trim()
          ?
          :<BabyInput message={message} />} */}
        </div>
        <div className={styles.invisible}></div>
      </div>
    </div>
  );
}
