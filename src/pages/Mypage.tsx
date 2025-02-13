import { useEffect, useState } from "react";
// import { MypageBabyList } from "../components/my-page/MypageBabyList";
// import { MypageBabyList } from "../components/my-page/MypageBabyList";
import styles from "../styles/Mypage.module.scss";
import modal from "../styles/Modal.module.scss";
import { NeedLoginModal } from "../components/my-page/NeedLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBabyInfo } from "../store/babySlice";
import layout from "../styles/commons/Layout.module.scss";
import {
  BabyModal,
  PasswordEditModal,
} from "../components/my-page/MypageModal";
import { UserupdateModal } from "../components/my-page/UserupdateModal";
import { BabyInfo } from "../components/my-page/BabyInfo";
import { useSelectBaby } from "../hooks/useSelectBaby";
import { BabyListColumnSmall } from "../components/commons/BabyListColumn_small";

export default function Mypage() {
  const dispatch = useDispatch<AppDispatch>();

  // 사용자 정보를 useState로 관리 (실시간 반영)
  const [userInfo, setUserInfo] = useState({
    username: sessionStorage.getItem("username") ?? "방문자님",
    userid: sessionStorage.getItem("useremail") ?? "",
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [updateModal, setOpenUpdate] = useState<boolean>(false);
  const { babyInfo, nothingBaby } = useSelector(
    (state: RootState) => state.baby
  );
  const update = () => {
    setOpenUpdate(true);
  };
  //sessionStorage가 변경되면 state 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo({
        username: sessionStorage.getItem("username") ?? "방문자님",
        userid: sessionStorage.getItem("useremail") ?? "",
      });
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  console.log(updateModal);
  return (
    <div className={layout.container}>
      {/* 로그인 필요 모달 */}
      {openModal && <NeedLoginModal modalState={() => setOpenModal(false)} />}
      <div>
        <div className={layout.contentsArea}>
          <div className={layout.titleArea}>
            <h1 className={layout.title}>마이페이지</h1>
          </div>
          {/* 사용자 정보 출력하기*/}
          <div className={styles.user_info_wrap}>
            <div className={styles.info_title}>내 정보</div>
            <div className={styles.info_detail_wrap}>
              <div className={styles.detail_set}>
                <label className={styles.info_label}>이름</label>
                <div className={styles.name}>{userInfo.username}</div>
              </div>
              <div className={styles.detail_set}>
                <label className={styles.info_label}>이메일</label>
                <div className={styles.name}>{userInfo.userid}</div>
              </div>
              <button className={styles.edit_btn} onClick={update}>
                개인정보 수정
                <img
                  className={styles.img}
                  src="/img/edit-01.png"
                  alt="수정 아이콘"
                />
              </button>
              {/* 수정 모달 */}
              {updateModal && (
                <div
                  onClick={() => setOpenUpdate(false)}
                  className={styles.modal_overlay}
                >
                  <UserupdateModal
                    modalState={() => {
                      setOpenUpdate(false);
                      // 정보가 수정되면 상태 업데이트
                      setUserInfo({
                        username:
                          sessionStorage.getItem("username") ?? "방문자님",
                        userid: sessionStorage.getItem("useremail") ?? "",
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          {/*애기 정보 출력 */}
          {/* <MypageBabyList babyInfo={babyInfo} nothingBaby={nothingBaby} /> */}
          <BabyInfo babyInfo={babyInfo} />
          {/* <MypageBabyList babyInfo={babyInfo} nothingBaby={nothingBaby} /> */}
        </div>
      </div>
    </div>
  );
}
