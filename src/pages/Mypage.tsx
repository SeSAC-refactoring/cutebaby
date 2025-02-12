import { useEffect, useState } from "react";
import { MypageBabyList } from "../components/my-page/MypageBabyList";
import styles from "../styles/Mypage.module.scss";
import { NeedLoginModal } from "../components/my-page/NeedLoginModal"; 
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBabyInfo } from "../store/babySlice";
import layout from "../styles/commons/Layout.module.scss";
import { BabyListColumnSmall } from "../components/commons/BabyListColumn_small";
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
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const username = user?.username ?? "방문자님";
  // 세션 확인 및 데이터 요청
  // useEffect(() => {
  //   if (!user) {
  //     setOpenModal(true);
  //   } else {
  //     dispatch(fetchBabyInfo());
  //   }
  // }, [dispatch, user]);
  return (
    <div className={layout.container}>
      {/* openMoal이 트루면 모달 실행 */}
      {openModal && <NeedLoginModal modalState={() => setOpenModal(false)} />}
      {/* {passwordEditModal && <PasswordEditModal />} */}
      {/* {babyAddModal && <BabyModal />} */}
      <div>
        {/* <div className={styles.icon}>수정 아이콘</div> */}
        <div className={layout.contentsArea}>
          <div className={layout.titleArea}>
            <h1 className={layout.title}>마이페이지</h1>
          </div>
          <div className={styles.user_info_wrap}>
            <div className={styles.info_title}>내 정보</div>
            <div className={styles.info_detail_wrap}>
              <div className={styles.detail_set}>
                <label className={styles.info_label}>이름</label>
                <div className={styles.name}>{username}</div>
              </div>
              <div className={styles.detail_set}>
                <label className={styles.info_label}>이메일</label>
                <div className={styles.name}>{user.userid}</div>
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
          <MypageBabyList babyInfo={babyInfo} nothingBaby={nothingBaby} />
          {/* <div className={styles.babyInfo_background}>
            <div className={styles.info_title}>우리아이 정보</div>
            <div className={styles.babyInfo_contents_wrap}>
              <div className={styles.babyList_wrap}>
                <MypageBabyList babyInfo={babyInfo} nothingBaby={nothingBaby} />
              </div>
              <div className={styles.babyInfo_wrap}>
                <img src="/img/Profile.png" alt="아기 사진" />
                <div className={styles.babyInfo_detail_wrap}>
                  <div
                    style={{ marginBottom: "32px" }}
                    className={styles.detail_set}
                  >
                    <label className={styles.info_label}>생년월일</label>
                    <div className={styles.name}>2025년 1월 10일</div>
                  </div>
                  <div className={styles.detail_set}>
                    <label className={styles.info_label}>생년월일</label>
                    <div className={styles.name}>2025년 1월 10일</div>
                  </div>
                  <div className={styles.babyInfo_btn_wrap}>
                    <button className={styles.babyInfo_edit_btn}>
                      수정
                      <img
                        className={styles.img}
                        alt="수정 아이콘"
                        src="/img/edit-01.png"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* {message.trim()
          ?
          :<BabyInput message={message} />} */}
        </div>
        <div className={styles.invisible}></div>
      </div>
    </div>
  );
}
