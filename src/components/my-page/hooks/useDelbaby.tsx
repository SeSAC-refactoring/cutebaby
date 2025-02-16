// hooks/useDelbaby.ts
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchBabyInfo } from "../../../store/babySlice";
import { AppDispatch } from "../../../store";

export const useDelbaby = () => {
  const dispatch = useDispatch<AppDispatch>();
  const delbaby = async (babyId: number | null) => {
    const API_URL = process.env.REACT_APP_API_URL;

    // console.log(babyId);
    const babyid = Number(babyId);
    if (!babyId) {
      alert("삭제할 아이를 선택하세요.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/delbaby`, { babyid });

      dispatch(fetchBabyInfo());

      // console.log("아기 삭제 완료:", babyId);
      return true;
    } catch (error) {
      // console.error("아기 삭제 실패:", error);
      alert("아기 삭제에 실패했습니다.");
    }
  };

  return { delbaby };
};
