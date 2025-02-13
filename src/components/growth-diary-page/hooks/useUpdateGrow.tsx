import { useState } from "react";
import axios from "axios";

export const useUpdateGrow = () => {
  const [updateGrow, setupdateGrow] = useState(null);

  // 서버에 데이터 전송하는 함수
  const requestGrow = async (data: { babyid : number ;id:number;height: number; weight: number; head: number;inputData : string}) => {
    const API_URL = process.env.REACT_APP_API_URL;

    console.log('ㄱㅂㅈㅁㄷㅂㄱㅈㅁㄷㄹ',data)
    try {
      const response = await axios.post(`${API_URL}/api/updategrow`, data);
      setupdateGrow(response.data); // 서버 응답을 상태에 저장
      return response.data;
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      throw error;
    }
  };

  return { updateGrow, requestGrow };
};
