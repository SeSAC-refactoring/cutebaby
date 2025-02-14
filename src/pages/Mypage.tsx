import { useEffect, useState } from 'react';
// import { MypageBabyList } from "../components/my-page/MypageBabyList";
// import { MypageBabyList } from "../components/my-page/MypageBabyList";

<<<<<<< HEAD
import { NeedLoginModal } from '../components/my-page/NeedLoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchBabyInfo } from '../store/babySlice';
=======
import { NeedLoginModal } from "../components/my-page/NeedLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBabyInfo } from "../store/babySlice";
>>>>>>> 86d0413 (0213 모달 원복 푸시)
import {
    BabyModal,
    PasswordEditModal,
} from '../components/my-page/MypageModal';
import { UserupdateModal } from '../components/my-page/UserupdateModal';
import { BabyInfo } from '../components/my-page/BabyInfo';
import { useSelectBaby } from '../hooks/useSelectBaby';
import { BabyListColumnSmall } from '../components/commons/BabyListColumn_small';

import styles from '../styles/Mypage.module.scss';
import layout from '../styles/commons/Layout.module.scss';
import modal from '../styles/Modal.module.scss';
import { useNavigate } from 'react-router-dom';

import styles from "../styles/Mypage.module.scss";
import layout from "../styles/commons/Layout.module.scss";
import modal from "../styles/Modal.module.scss";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
    const dispatch = useDispatch<AppDispatch>();

<<<<<<< HEAD
    // 사용자 정보를 useState로 관리 (실시간 반영)
    const storedEmail = sessionStorage.getItem('useremail') ?? '';
    const isKakaoLogin = !storedEmail.includes('@'); // 이메일에 '@'있는지 확인하기 없으면 카톡로그인
    const [userInfo, setUserInfo] = useState({
        username: sessionStorage.getItem('username') ?? '방문자님',
        userid: isKakaoLogin ? '카카오 로그인' : storedEmail, // 카톡로그인이면 카카오로그인 출력 아님 세션에 저장된거 출력
    });

    // const [openModal, setOpenModal] = useState<boolean>(false);
    const [updateModal, setOpenUpdate] = useState<boolean>(false);
    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );

    //  로그인 안했을 시 // 로그인 페이지로 리디렉션
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    });

    const update = () => {
        if (!isKakaoLogin) {
            setOpenUpdate(true);
        }
=======
  // 사용자 정보를 useState로 관리 (실시간 반영)
  const storedEmail = sessionStorage.getItem("useremail") ?? "";
  const isKakaoLogin = !storedEmail.includes("@"); // 이메일에 '@'있는지 확인하기 없으면 카톡로그인
  const [userInfo, setUserInfo] = useState({
    username: sessionStorage.getItem("username") ?? "방문자님",
    userid: isKakaoLogin ? "카카오 로그인" : storedEmail, // 카톡로그인이면 카카오로그인 출력 아님 세션에 저장된거 출력
  });

  // const [openModal, setOpenModal] = useState<boolean>(false);
  const [updateModal, setOpenUpdate] = useState<boolean>(false);
  const { babyInfo, nothingBaby } = useSelector(
    (state: RootState) => state.baby
  );

  //  로그인 안했을 시 // 로그인 페이지로 리디렉션
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  const update = () => {
    if (!isKakaoLogin) {
      setOpenUpdate(true);
    }
  };

  // sessionStorage가 변경되면 state 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedEmail = sessionStorage.getItem("useremail") ?? "";
      const kakaoLogin = !updatedEmail.includes("@");

      setUserInfo({
        username: sessionStorage.getItem("username") ?? "방문자님",
        userid: kakaoLogin ? "카카오 로그인" : updatedEmail,
      });
>>>>>>> 86d0413 (0213 모달 원복 푸시)
    };

<<<<<<< HEAD
    // sessionStorage가 변경되면 state 업데이트
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedEmail = sessionStorage.getItem('useremail') ?? '';
            const kakaoLogin = !updatedEmail.includes('@');

            setUserInfo({
                username: sessionStorage.getItem('username') ?? '방문자님',
                userid: kakaoLogin ? '카카오 로그인' : updatedEmail,
            });
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className={layout.container}>
            {/* 로그인 필요 모달 */}
            {/* {openModal && (
                <NeedLoginModal modalState={() => setOpenModal(false)} />
            )} */}

            <div>
                <div className={layout.contentsArea}>
                    <div className={layout.titleArea}>
                        <h1 className={layout.title}>마이페이지</h1>
                    </div>

                    {/* 사용자 정보 출력하기 */}
                    <div className={styles.user_info_wrap}>
                        <div className={styles.info_title}>내 정보</div>
                        <div className={styles.info_detail_wrap}>
                            <div className={styles.detail_set}>
                                <label className={styles.info_label}>
                                    이름
                                </label>
                                <div className={styles.name}>
                                    {userInfo.username}
                                </div>
                            </div>
                            <div className={styles.detail_set}>
                                <label className={styles.info_label}>
                                    이메일
                                </label>
                                <div className={styles.name}>
                                    {userInfo.userid}
                                </div>
                            </div>
                            <button
                                className={`${styles.edit_btn} ${
                                    isKakaoLogin ? styles.disabled : ''
                                }`}
                                onClick={update}
                                disabled={isKakaoLogin}
                            >
                                개인정보 수정
                                <img
                                    className={styles.img}
                                    src="/img/edit-01.png"
                                    alt="수정 아이콘"
                                />
                            </button>
                        </div>
                    </div>

                    {/* 애기 정보 출력 */}
                    <BabyInfo babyInfo={babyInfo} />
                </div>
            </div>
            {/* 수정 모달 */}
            {updateModal && (
                <UserupdateModal
                    modalState={() => {
                        setOpenUpdate(false);
                        // 정보가 수정되면 상태 업데이트
                        const updatedEmail =
                            sessionStorage.getItem('useremail') ?? '';
                        const kakaoLogin = !updatedEmail.includes('@');

                        setUserInfo({
                            username:
                                sessionStorage.getItem('username') ??
                                '방문자님',
                            userid: kakaoLogin ? '카카오 로그인' : updatedEmail,
                        });
                    }}
                />
            )}
        </div>
    );
=======
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={layout.container}>
      {/* 로그인 필요 모달 */}
      {/* {openModal && (
                <NeedLoginModal modalState={() => setOpenModal(false)} />
            )} */}

      <div>
        <div className={layout.contentsArea}>
          <div className={layout.titleArea}>
            <h1 className={layout.title}>마이페이지</h1>
          </div>

          {/* 사용자 정보 출력하기 */}
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
              <button
                className={`${styles.edit_btn} ${
                  isKakaoLogin ? styles.disabled : ""
                }`}
                onClick={update}
                disabled={isKakaoLogin}
              >
                개인정보 수정
                <img
                  className={styles.img}
                  src="/img/edit-01.png"
                  alt="수정 아이콘"
                />
              </button>
            </div>
          </div>

          {/* 애기 정보 출력 */}
          <BabyInfo babyInfo={babyInfo} />
        </div>
      </div>
      {/* 수정 모달 */}
      {updateModal && (
        <UserupdateModal
          modalState={() => {
            setOpenUpdate(false);
            // 정보가 수정되면 상태 업데이트
            const updatedEmail = sessionStorage.getItem("useremail") ?? "";
            const kakaoLogin = !updatedEmail.includes("@");

            setUserInfo({
              username: sessionStorage.getItem("username") ?? "방문자님",
              userid: kakaoLogin ? "카카오 로그인" : updatedEmail,
            });
          }}
        />
      )}
    </div>
  );
>>>>>>> fdec2f3 (Revert "0214 모달 CSS 수정중|마이페이지-아기정보수정,성장일지-계산기 진행중")
}
