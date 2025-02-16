import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Modal.module.scss";
import modal from "../../styles/Modal.module.scss";
import { Input, InputSignupEmail } from "../commons/Input";
// import typography from "../styles/commons/Typography.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import button from "../../styles/commons/Button.module.scss";

interface UserupdateProps {
  modalState: () => void;
}

export const UserupdateModal: React.FC<UserupdateProps> = ({ modalState }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: sessionStorage.getItem("useremail") || "",
    name: sessionStorage.getItem("username") || "",
  });
  const [messages, setMessages] = useState({
    email: "",
    name: "",
  });

  const [emailbtn, setEmailCheck] = useState<boolean>(false);

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (!formData.email.trim()) {
      setMessages((prev) => ({ ...prev, email: "" }));
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailbtn) {
      setMessages((prev) => ({
        ...prev,
        email: emailRegex.test(formData.email)
          ? "사용 가능한 이메일입니다!"
          : "이메일 형식이 올바르지 않습니다!",
      }));
    } else {
      setMessages((prev) => ({
        ...prev,
        email: emailRegex.test(formData.email)
          ? "중복 체크를 해주세요!"
          : "이메일 형식이 올바르지 않습니다!",
      }));
      setEmailCheck(false);
    }
  }, [formData.email]);

  // 이메일 중복 확인 요청
  const emailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("formdata.email>>>", formData.email);
    // console.log("formdata.email type >>", typeof formData.email);

    if (!formData.email.trim()) {
      setMessages((prev) => ({ ...prev, email: "이메일을 입력해주세요!" }));
      return;
    }
    if (!formData.email.includes("@")) {
      setMessages((prev) => ({
        ...prev,
        email: "유효하지 않은 이메일 주소입니다!",
      }));
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/emailCheck`, {
        inputEmail: formData.email,
      });

      // console.log("서버 응답:", response); // 디버깅 로그 추가
      // console.log("서버에서 응답받은 user", response.data.user[0].userid);
      if (response.data.success) {
        setEmailCheck(true);
        setMessages((prev) => ({
          ...prev,
          email: "사용 가능한 이메일입니다!",
        }));
      } else {
        setEmailCheck(false);
        setMessages((prev) => ({
          ...prev,
          email: "이미 사용 중인 이메일입니다!",
        }));
      }
    } catch (error) {
      // console.error(" 이메일 중복 확인 오류:", error);
      setMessages((prev) => ({
        ...prev,
        email: "이메일 중복 확인 중 오류가 발생했습니다.",
      }));
    }
  };

  // 사용자 정보 업데이트 요청
  const handleUpdate = async () => {
    const storedName = sessionStorage.getItem("username") || "";
    const storedEmail = sessionStorage.getItem("useremail") || "";

    const updatedName = formData.name.trim() || storedName;
    const updatedEmail = formData.email.trim() || storedEmail;

    if (updatedName === storedName && updatedEmail === storedEmail) {
      modalState();
      return;
    }

    if (!updatedName) {
      setMessages((prev) => ({ ...prev, name: "이름을 입력해주세요!" }));
      return;
    }
    if (!updatedEmail) {
      setMessages((prev) => ({ ...prev, email: "이메일을 입력해주세요!" }));
      return;
    }
    if (!emailbtn && updatedEmail !== storedEmail) {
      setMessages((prev) => ({
        ...prev,
        email: "이메일 중복 체크를 해주세요!",
      }));
      return;
    }

    const usernum = sessionStorage.getItem("usernumber");

    try {
      const response = await axios.post(`${API_URL}/updateUser`, {
        email: updatedEmail,
        username: updatedName,
        usernumber: usernum,
      });

      if (response.data.success) {
        alert("정보가 성공적으로 수정되었습니다.");

        // sessionStorage 업데이트
        sessionStorage.setItem("username", updatedName);
        sessionStorage.setItem("useremail", updatedEmail);

        // 스토리지 이벤트 트리거 (Mypage에서 리렌더링)
        window.dispatchEvent(new Event("storage"));

        // 모달 닫기
        modalState();
      } else {
        alert("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      // console.error("정보 수정 오류:", error);
    }
  };

  return (
    <div onClick={modalState} className={modal.modal_overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modal.modalWrapW640}`}
      >
        <div className={modal.titleArea}>
          <div className={`${modal.modal_title} ${typography.text4xlBd}`}>개인 정보 수정</div>
          <div
            onClick={() => {
              modalState();
            }}
            className={modal.closeBtn}
          >
            <img src="/img/icons/i-modal-close-s32.svg" alt="" />
          </div>
        </div>
        <div className={modal.modalContentsArea}>
          <div className={styles.modalContentsAreaWrap}>
            <div className={styles.modal_Input_wrap}>
              {/* 이름 입력 */}
              <Input
                label="이름"
                name="name"
                placeholder="이름 입력"
                value={formData.name}
                onChange={handleChange}
              ></Input>
              <p className={`${styles.error_message} ${typography.textBsMd}`}>
                {messages.name}
              </p>
              {/* 이메일 입력 */}
              <div className={styles.check_wrap}>
                <InputSignupEmail
                  label="이메일"
                  type="email"
                  name="email"
                  placeholder="이메일 입력"
                  value={formData.email}
                  onChange={handleChange}
                ></InputSignupEmail>
                <button
                  className={`${button.btnLgBl} ${typography.textXlBd}`}
                  onClick={emailCheck}
                >
                  중복 체크
                </button>
              </div>
              <p className={`${styles.error_message} ${typography.textBsMd}`}>
                {messages.email}
              </p>
              {/* </label> */}

              {/* 이메일 중복 확인 버튼 */}
            </div>
          </div>
          <div className={styles.modal_button_container}>
            <button
              className={`${button.btnXlYw} ${typography.textXlBd}`}
              onClick={modalState}
            >
              취소
            </button>
            <button
              className={`${button.btnXlGr} ${typography.textXlBd}`}
              onClick={handleUpdate}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
