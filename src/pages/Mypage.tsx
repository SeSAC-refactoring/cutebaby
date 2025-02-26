import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserupdateModal } from "../components/my-page/UserupdateModal";
import { BabyInfo } from "../components/my-page/BabyInfo";
import { useNavigate } from "react-router-dom";
import { BabyInputPlus } from "../components/my-page/BabyInputPlus";

export default function Mypage() {
  // const dispatch = useDispatch<AppDispatch>();

  // 사용자 정보를 useState로 관리 (실시간 반영)
  const storedEmail = sessionStorage.getItem("useremail") ?? "";
  const isKakaoLogin = !storedEmail.includes("@"); // 이메일에 '@'있는지 확인하기 없으면 카톡로그인
  const [userInfo, setUserInfo] = useState({
    username: sessionStorage.getItem("username") ?? "방문자님",
    userid: isKakaoLogin ? "카카오 로그인" : storedEmail, // 카톡로그인이면 카카오로그인 출력 아님 세션에 저장된거 출력
  });

  // const [openModal, setOpenModal] = useState<boolean>(false);
  const [updateModal, setOpenUpdate] = useState<boolean>(false);
  const [babyPlus, setBabyPlus] = useState<boolean>(false);
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
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      {babyPlus && (
        <div
          onClick={() => setBabyPlus(false)}
          style={{ right: "0px", top: "70px" }}
        >
          <BabyInputPlus
            onClose={() => setBabyPlus(false)}
            babyInfo={babyInfo}
          />
        </div>
      )}

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

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-6">
          <div>
            <div>
              <h1 className="text-2xl font-bd">마이페이지</h1>
            </div>
            {/* {babyInfo.length === 0 && (
              <button
                style={{ width: "30%" }}
                onClick={() => setBabyPlus(true)}
              >
                아이 등록 +
              </button>
            )} */}
          </div>
          <div className="flex flex-col gap-6">
            {/* 사용자 정보 출력하기 */}
            <div className="flex flex-col items-start gap-4 pt-5 px-6 pb-6 self-stretch bg-yellow-1 rounded-[24px]">
              <div className="flex justify-between w-full">
                <div className="">내 정보</div>
                <button
                  className="flex items-center justify-center h-8 px-3 gap-0.5 rounded-[10px] bg-yellow-4"
                  onClick={update}
                  disabled={isKakaoLogin}
                >
                  개인정보 수정
                  <img src="/img/edit-01.png" alt="수정 아이콘" />
                </button>
              </div>

              <div>
                <div>
                  <div>이름</div>
                  <div>{userInfo.username}</div>
                </div>
                <div>
                  <div>이메일</div>
                  <div>{userInfo.userid}</div>
                </div>
              </div>
            </div>

            {/* 애기 정보 출력 */}
            {babyInfo.length > 0 && <BabyInfo babyInfo={babyInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
}
