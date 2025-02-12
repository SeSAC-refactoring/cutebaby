import { useState } from "react";
import axios from "axios";

export const DelVac = () => {
  const [delVac, setDelVac] = useState(null);
  // 서버에 데이터 전송하는 함수
  const requestDelVac = async (data: { babyid : number; vaccinationid : number; dosenumber:number; dosedate:string | null;}) => {
    try {
      const response = await axios.post("http://localhost:5001/api/delVac", data);
      setDelVac(response.data); // 서버 응답을 상태에 저장
      console.log('delvac>>>>',delVac)
      return response.data;
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      throw error;
    }
  };

  return { delVac, requestDelVac };
};