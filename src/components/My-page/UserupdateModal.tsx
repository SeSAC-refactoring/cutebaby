import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Modal.module.scss";

interface UserupdateProps {
  modalState: () => void;
}

export const UserupdateModal: React.FC<UserupdateProps> = ({ modalState }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
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

    if (!formData.email.trim()) {
      setMessages((prev) => ({ ...prev, email: "이메일을 입력해주세요!" }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/emailCheck",
        {
          email: formData.email,
        }
      );

      console.log("서버 응답:", response.data); // 디버깅 로그 추가

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
      console.error("❌ 이메일 중복 확인 오류:", error);
      setMessages((prev) => ({
        ...prev,
        email: "이메일 중복 확인 중 오류가 발생했습니다.",
      }));
    }
  };

  // 사용자 정보 업데이트 요청
  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      setMessages((prev) => ({ ...prev, name: "이름을 입력해주세요!" }));
      return;
    }
    if (!formData.email.trim()) {
      setMessages((prev) => ({ ...prev, email: "이메일을 입력해주세요!" }));
      return;
    }
    if (!emailbtn) {
      setMessages((prev) => ({
        ...prev,
        email: "이메일 중복 체크를 해주세요!",
      }));
      return;
    }

    const usernum = sessionStorage.getItem("usernumber");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/updateUser",
        {
          email: formData.email,
          username: formData.name,
          usernumber: usernum,
        }
      );

      if (response.data.success) {
        alert("정보가 성공적으로 수정되었습니다.");

        // ✅ sessionStorage 업데이트
        sessionStorage.setItem("username", formData.name);
        sessionStorage.setItem("useremail", formData.email);

        // ✅ 스토리지 이벤트 트리거 (Mypage에서 리렌더링)
        window.dispatchEvent(new Event("storage"));

        // ✅ 모달 닫기
        modalState();
      } else {
        alert("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("❌ 정보 수정 오류:", error);
    }
  };

  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_container}>
        <div className={styles.modal_title_wrap}>
          <div className={styles.modal_title}>개인 정보 수정</div>
          <div
            onClick={modalState}
            style={{
              fontSize: "40px",
              cursor: "pointer",
            }}
          >
            X
          </div>
        </div>

        {/* 이름 입력 */}
        <label>
          <h2>이름</h2>
          <input
            className={styles.modal_input}
            name="name"
            placeholder="이름 입력"
            value={formData.name}
            onChange={handleChange}
          />
          <p className={styles.error_message}>{messages.name}</p>
        </label>

        {/* 이메일 입력 */}
        <label>
          <h2>이메일</h2>
          <input
            type="email"
            name="email"
            className={styles.modal_input}
            value={formData.email}
            placeholder="이메일 입력"
            onChange={handleChange}
          />
          <p className={styles.error_message}>{messages.email}</p>
        </label>

        {/* 이메일 중복 확인 버튼 */}
        <button onClick={emailCheck}>중복 체크</button>

        {/* 버튼 */}
        <div className={styles.modal_button_container}>
          <button
            className={`${styles.modal_btn} ${styles.modal_cancel_button}`}
            onClick={modalState}
          >
            취소
          </button>
          <button
            className={`${styles.modal_btn} ${styles.modal_done_button}`}
            onClick={handleUpdate}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};
