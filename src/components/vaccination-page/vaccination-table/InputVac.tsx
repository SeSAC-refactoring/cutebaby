import { useState } from "react";
import axios from "axios";

export const InputVac = () => {
  const [newVac, setNewVac] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  // 서버에 데이터 전송하는 함수
  const requestVac = async (data: {
    babyid: number;
    vaccinationid: number;
    dosenumber: number;
    dosedate: string | null;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/newVac`, data);
      setNewVac(response.data); // 서버 응답을 상태에 저장
      // console.log("newvac>>>>", newVac);
      return response.data;
    } catch (error) {
      // console.error("데이터 전송 실패:", error);
      throw error;
    }
  };

  return { newVac, requestVac };
};
