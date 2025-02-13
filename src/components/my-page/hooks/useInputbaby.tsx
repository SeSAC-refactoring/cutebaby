import { useState } from "react";
import axios from "axios";

export const useInputbaby = () => {
  const [newbaby, setNewbaby] = useState(null);
  const user = sessionStorage.getItem('usernumber');
  // 서버에 데이터 전송하는 함수
  const request = async (data: { babyid : number ;height: number; weight: number; head: number;inputData : string}) => {
    try {
      const response = await axios.post("http://localhost:5001/api/newbaby", data);
      setNewbaby(response.data); // 서버 응답을 상태에 저장
      return response.data;
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      throw error;
    }
  };

  return { newbaby, request };
};
