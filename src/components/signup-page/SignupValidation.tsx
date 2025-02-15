// src/components/SignupValidation.ts

export const validateEmail = (email: string, emailbtn: boolean) => {
  if (!email.trim()) return { isValid: false, message: "" };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailbtn) {
    return emailRegex.test(email)
      ? { isValid: true, message: "사용가능한 이메일 입니다!" }
      : { isValid: false, message: "이메일 형식에 맞게 입력해 주세요!" };
  } else {
    return emailRegex.test(email)
      ? { isValid: false, message: "중복체크를 눌러주세요!" }
      : { isValid: false, message: "이메일 형식에 맞게 입력해 주세요!" };
  }
};

export const validatePassword = (password: string) => {
  if (!password.trim()) return { isValid: false, message: "" };

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return passwordRegex.test(password)
    ? { isValid: true, message: "사용가능한 비밀번호입니다!" }
    : {
        isValid: false,
        message: "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!",
      };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (!confirmPassword.trim()) return { isValid: false, message: "" };

  return password === confirmPassword
    ? { isValid: true, message: "비밀번호가 일치합니다." }
    : { isValid: false, message: "비밀번호가 일치하지 않습니다." };
};

export const validateName = (name: string) => {
  if (!name.trim()) return { isValid: false, message: "" };

  return name.length >= 2
    ? { isValid: true, message: "사용가능한 닉네임입니다." }
    : { isValid: false, message: "이름은 2글자 이상 입력해주세요!" };
};
