import { useEffect, useState } from "react";
import { MypageBabyList } from "../components/my-page/MypageBabyList";
import styles from "../styles/Mypage.module.scss";
import { NeedLoginModal } from "../components/my-page/NeedLoginModal"; // 모달 import
import axios from "axios";
import { log } from "console";
import { babyinfo } from "../components/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBabyInfo } from "../store/babySlice";
import layout from "../styles/commons/Layout.module.scss";
import { BabyListColumnSmall } from "../components/commons/BabyList_column_small";
import {
  BabyModal,
  PasswordEditModal,
} from "../components/my-page/MypageModal";

export default function Mypage() {
  const [passwordEditModal, setPasswordEditModal] = useState(true);
  const [babyAddModal, setBabyAddModal] = useState(true);
  const [babyEditModal, setBabyEditModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { babyInfo, nothingBaby, loading, error } = useSelector(
    (state: RootState) => state.baby
  );
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const username = user?.username ?? '방문자님';
  const userid = user?.userid ?? '로그인이 필요한 서비스 입니다';


  // 세션 확인 및 데이터 요청
  useEffect(() => {
    if (!userString) {
      setOpenModal(true);
    } else {
      dispatch(fetchBabyInfo());
    }
  }, [dispatch, userString]);

  return (
    <div className={styles.wrap}>
      {/* openMoal이 트루면 모달 실행 */}
      {openModal && <NeedLoginModal modalState={() => setOpenModal(false)} />}
      {/* {passwordEditModal && <PasswordEditModal />} */}
      {/* {babyAddModal && <BabyModal />} */}
      <div className={styles.pageContent}>
        {/* <div className={styles.icon}>수정 아이콘</div> */}
        <div className={layout.background}>
          <h1 className={layout.title}>마이페이지</h1>

          <div className={styles.user_info_wrap}>
            <div className={styles.info_title}>내 정보</div>
            <div className={styles.info_detail_wrap}>
              <div className={styles.detail_set}>
                <label className={styles.info_label}>이름</label>
                <div className={styles.name}>{username}</div>
              </div>
              <div className={styles.detail_set}>
                <label className={styles.info_label}>이메일</label>
                <div className={styles.name}>{userid}</div>
              </div>
              <button className={styles.edit_btn}>
                비밀번호 수정{" "}
                <img
                  className={styles.img}
                  src="/img/edit-01.png"
                  alt="수정 아이콘"
                />
              </button>
            </div>
          </div>
          <div className={styles.babyInfo_background}>
            <div className={styles.info_title}>우리아이 정보</div>
            <div className={styles.babyInfo_contents_wrap}>
              <div className={styles.babyList_wrap}>
                <MypageBabyList babyInfo={babyInfo} nothingBaby={nothingBaby} />
              </div>
              {/* <div className={styles.babyInfo_wrap}> */}
                {/* <img src="/img/Profile.png" alt="아기 사진" />  */}
                {/* <div className={styles.babyInfo_detail_wrap}> */}
                  {/* <div
                    style={{ marginBottom: "32px" }}
                    className={styles.detail_set}
                  > */}
                    {/* <label className={styles.info_label}>생년월일</label> */}
                    {/* <div className={styles.name}>2025년 1월 10일</div> */}
                  </div>
                  {/* <div className={styles.detail_set}> */}
                    {/* <label className={styles.info_label}>생년월일</label> */}
                    {/* <div className={styles.name}>2025년 1월 10일</div> */}
                  {/* </div> */}
                  {/* <div className={styles.babyInfo_btn_wrap}> */}
                    {/* <button className={styles.babyInfo_edit_btn}>
                      수정
                      <img
                        className={styles.img}
                        alt="수정 아이콘"
                        src="/img/edit-01.png"
                      />
                    </button> */}
                  {/* </div> */}
                {/* </div> */}
              {/* </div> */}
            </div>
          </div>
          {/* {message.trim()
          ?
          :<BabyInput message={message} />} */}
        </div>
        <div className={styles.invisible}></div>
      </div>
    // </div>
  );
}
