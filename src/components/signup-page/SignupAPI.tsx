// src/components/SignupAPI.ts
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const checkEmailDuplication = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/emailCheck`, {
      inputEmail: email,
    });
    return response.data;
  } catch (error) {
    // console.error("이메일 중복 검사 실패:", error);
    return { success: false, message: "서버 오류 발생" };
  }
};

export const registerUser = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { formData });

    return response.data;
  } catch (error) {
    // console.error("회원가입 중 오류 발생:", error);
    return { success: false, message: "서버 오류 발생" };
  }
};
