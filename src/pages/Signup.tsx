import React, { useEffect, useRef, useState } from "react";
import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import styles from "../styles/Signup.module.scss";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Input from "../components/commons/Input";
import { Input, InputSignupEmail } from "../components/commons/Input";

const Signup: React.FC = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  // 유효성 검사
  const [isFormValid, setIsFormValid] = useState(false);
  const [signUpCheck, setSignUpCheck] = useState({
    name: false,
    email: false,
    password: false,
    passwordCheck: false,
  });

  // 입력값 상태
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    babyName: "",
    babyBirthday: "",
  });
  const [emailbtn, setEmailCheck] = useState<boolean>(false);
  // 메시지 상태
  const [messages, setMessages] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    babyName: "",
  });

  const inputRef = useRef({
    email: null as HTMLInputElement | null,
    password: null as HTMLInputElement | null,
    checkPassword: null as HTMLInputElement | null,
    name: null as HTMLInputElement | null,
    babyName: null as HTMLInputElement | null,
  });
  const navigate = useNavigate();

  const gotoMypage = () => {
    navigate("/Mypage", { state: formData });
    window.location.reload();
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (formData.email.trim() === "") {
      setSignUpCheck((prev) => ({
        ...prev,
        email: false,
      }));
    }
    if (!formData.email.trim())
      return setMessages((prev) => ({ ...prev, email: "" }));
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailbtn) {
      setMessages((prev) => ({
        ...prev,
        email: emailRegex.test(formData.email)
          ? "사용가능한 이메일 입니다!"
          : "이메일 형식에 맞게 입력해 주세요!",
      }));
    } else {
      setMessages((prev) => ({
        ...prev,
        email: emailRegex.test(formData.email)
          ? "중복체크를 눌러주세요!"
          : "이메일 형식에 맞게 입력해 주세요!",
      }));
      setSignUpCheck((prev) => ({
        ...prev,
        email: false,
      }));
      setEmailCheck(false);
    }
  }, [formData.email]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (formData.password.trim() === "") {
      setSignUpCheck((prev) => ({
        ...prev,
        password: false,
      }));
    }
    if (!formData.password.trim())
      return setMessages((prev) => ({ ...prev, password: "" }));
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setMessages((prev) => ({
      ...prev,
      password: passwordRegex.test(formData.password)
        ? "사용가능한 비밀번호입니다!"
        : "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!",
    }));
    setSignUpCheck((prev) => ({
      ...prev,
      password: passwordRegex.test(formData.password) ? true : false,
    }));
  }, [formData.password]);

  // 비밀번호 확인 검사
  useEffect(() => {
    if (formData.confirmPassword.trim() === "") {
      setSignUpCheck((prev) => ({
        ...prev,
        passwordCheck: false,
      }));
    }
    if (!formData.confirmPassword.trim())
      return setMessages((prev) => ({ ...prev, confirmPassword: "" }));
    setMessages((prev) => ({
      ...prev,
      confirmPassword:
        formData.password === formData.confirmPassword
          ? "비밀번호가 일치합니다."
          : "비밀번호가 일치하지 않습니다.",
    }));
    setSignUpCheck((prev) => ({
      ...prev,
      passwordCheck:
        formData.password === formData.confirmPassword ? true : false,
    }));
  }, [formData.confirmPassword, formData.password]);

  // 이름 유효성 검사
  useEffect(() => {
    if (formData.name.trim() === "") {
      setSignUpCheck((prev) => ({
        ...prev,
        name: false,
      }));
    }
    if (!formData.name.trim())
      return setMessages((prev) => ({ ...prev, name: "" }));
    setMessages((prev) => ({
      ...prev,
      name:
        formData.name.length >= 2
          ? "사용가능한 닉네임입니다."
          : "이름은 2글자 이상 입력해주세요!",
    }));
    setSignUpCheck((prev) => ({
      ...prev,
      name: formData.name.length >= 2 ? true : false,
    }));
  }, [formData.name]);

  //입력한값에 빈값이 있는지 검사
  const emptyCheck = () => {
    if (!formData.email.trim()) {
      setSignUpCheck((prev) => ({
        ...prev,
        email: false,
      }));
      setMessages((prev) => ({ ...prev, email: "이메일을 입력해 주세요!" }));
      inputRef.current.email?.scrollIntoView({ behavior: "smooth" });
      inputRef.current.email?.focus();
      return false;
    } else if (!formData.password.trim()) {
      setMessages((prev) => ({
        ...prev,
        password: "비밀번호를 입력해 주세요!",
      }));
      inputRef.current.password?.scrollIntoView({ behavior: "smooth" });
      inputRef.current.password?.focus();
      return false;
    } else if (!formData.confirmPassword.trim()) {
      setMessages((prev) => ({
        ...prev,
        confirmPassword: "비밀번호를 한번더 입력해 주세요!",
      }));
      inputRef.current.checkPassword?.scrollIntoView({ behavior: "smooth" });
      inputRef.current.checkPassword?.focus();
      return false;
    } else if (!formData.name.trim()) {
      setMessages((prev) => ({ ...prev, name: "이름을 입력해 주세요!" }));
      inputRef.current.name?.scrollIntoView({ behavior: "smooth" });
      inputRef.current.name?.focus();
      return false;
    } else return true;
  };
  const inputEmail = formData.email;
  console.log("inputEmail>>>>", inputEmail);

  const emailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(`${API_URL}/emailCheck`, {
      inputEmail,
    });
    console.log(123, response);
    if (!inputEmail.trim()) {
      setEmailCheck(false);
    } else if (response) {
      setSignUpCheck((prev) => ({
        ...prev,
        email: true,
      }));
      console.log("response>>>", response.data.message);
      // inputRef.current.email?.scrollIntoView({ behavior: "smooth" });
      inputRef.current.email?.focus();
      setMessages((prev) => ({ ...prev, email: response.data.message }));
      // return setEmailCheck(true)
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("test>>", formData);
    //여기서부터 db연결
    if (emptyCheck()) {
      try {
        const response = await axios.post(`${API_URL}/signup`, {
          formData,
        });
        console.log("response >>", response);
        if (response.data.success) {
          console.log("회원가입 성공:", response.data.message);
          const user = formData;
          const email = user.email;
          const password = user.password;
          const emailPost = await axios.post(`${API_URL}/user`, {
            email,
            password,
          });

          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem(
            "usernumber",
            JSON.stringify(emailPost.data[0].usernumber)
          );
          sessionStorage.setItem("useremail", user.email);
          sessionStorage.setItem("username", user.name);

          alert("회원가입이 완료되었습니다!");
          gotoMypage();
        } else {
          console.log("회원가입 실패:", response.data.message);
          alert(response.data.message);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            alert("이미 사용 중인 이메일입니다. 중복검사를 진행해주세요.");
            setEmailCheck(false);
            inputRef.current.email?.scrollIntoView({ behavior: "smooth" });
            inputRef.current.email?.focus();
          } else {
            console.error("회원가입 중 오류 발생:", error.response?.data);
            alert("서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.");
          }
        } else {
          console.error("알 수 없는 오류 발생:", error);
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    }
    //  else{
    //     alert('이메일 중복체크를 눌러주세요!');
    //     inputRef.current.email?.scrollIntoView({ behavior: "smooth" });
    //     e.preventDefault();
    //     setEmailCheck(false)
    //   }
  };

  console.log("---------", signUpCheck);

  useEffect(() => {
    if (
      signUpCheck.email &&
      signUpCheck.name &&
      signUpCheck.password &&
      signUpCheck.passwordCheck
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [signUpCheck]);

  return (
    <div className={layout.container}>
      <div className={`${layout.contentsArea} ${styles.contentsArea}`}>
        <div className={`${layout.titleArea} ${typography.text4xlBd}`}>
          이메일로 가입하기
        </div>

        <div className={`${layout.contentsWrap} ${styles.contentsWrap}`}>
          <div className={styles.formsWrapper}>
            <div className={styles.formWrap}>
              <Input
                label="이름"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요."
                ref={(el) => {
                  inputRef.current.name = el;
                }}
              />
              {messages.name && <p className={styles.error}>{messages.name}</p>}
            </div>

            <div className={`${styles.formWrap} ${styles.formWrapEmail}`}>
              <div className={styles.mailWrap}>
                <InputSignupEmail
                  label="이메일"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력해주세요."
                  ref={(el: any) => {
                    inputRef.current.email = el;
                  }}
                />
                <button
                  className={`${button.btnLgBl} ${typography.textLgBd}`}
                  style={{ color: "#3B3B41" }}
                  onClick={emailCheck}
                >
                  중복체크
                </button>
              </div>
              {messages.email && (
                <p className={styles.error}>{messages.email}</p>
              )}
            </div>

            <div className={styles.formWrap}>
              <Input
                label="비밀번호"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해주세요."
                ref={(el) => {
                  inputRef.current.password = el;
                }}
              />
              {messages.password && (
                <p className={styles.error}>{messages.password}</p>
              )}
            </div>

            <div className={styles.formWrap}>
              <Input
                label="비밀번호 확인"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 한번 더 입력해주세요."
                ref={(el) => {
                  inputRef.current.checkPassword = el;
                }}
              />
              {messages.confirmPassword && (
                <p className={styles.error}>{messages.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className={`${layout.buttonArea} ${styles.buttonArea}`}>
            <Link to="/">
              <button className={`${button.btnXlYw} ${typography.textXlBd}`}>
                취소
              </button>
            </Link>
            {isFormValid ? (
              <button
                className={`${button.btnXlGr} ${typography.textXlBd}`}
                onClick={handleSubmit}
              >
                완료
              </button>
            ) : (
              <button
                className={`${button.disabled_btnXl} ${typography.textXlBd}`}
              >
                완료
              </button>
            )}

            {/* <button
              className={`${button.btnXlGr} ${typography.textXlBd}`}
              type="submit"
            >
              완료
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
