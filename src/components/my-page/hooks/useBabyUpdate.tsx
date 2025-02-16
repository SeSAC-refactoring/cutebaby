import { useState } from "react";
import axios from "axios";

export const useBabyUpdate = () => {
  const [updatebaby, setUpdatebaby] = useState(null);

  // 서버에 데이터 전송하는 함수
  const requestbaby = async (formData: FormData) => {
    // console.log("🔍 전송할 데이터 (formData):", [...formData.entries()]); // ✅ FormData 데이터 확인
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      // console.log(formData);
      for (const pair of formData.entries()) {
        // console.log("📌 FormData:", pair[0], pair[1]);
      }

      const response = await axios.post(`${API_URL}/updateBaby`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUpdatebaby(response.data); // 서버 응답을 상태에 저장
      return response.data;
    } catch (error) {
      // console.error("❌ 데이터 전송 실패:", error);
      throw error;
    }
  };

  return { updatebaby, requestbaby };
};
