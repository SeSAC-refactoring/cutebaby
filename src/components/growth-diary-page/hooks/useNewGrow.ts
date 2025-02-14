import { useState } from "react";
import axios from "axios";

export const useNewGrow = () => {
  const [newGrow, setNewGrow] = useState(null);

  // 서버에 데이터 전송하는 함수
  const request = async (data: { babyid : number ;height: number; weight: number; head: number;inputData : string}) => {

    const API_URL = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.post(`${API_URL}/newgrow`, data);
      setNewGrow(response.data); // 서버 응답을 상태에 저장
      return response.data;
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      throw error;
    }
  };

  return { newGrow, request };
};
