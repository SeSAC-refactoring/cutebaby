import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 상태 타입 정의
interface BabyState {
  growInfo: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BabyState = {
  growInfo: [],
  loading: false,
  error: null,
};

//  Redux에서 `babyInfo`를 매개변수로 받도록 수정
export const fetchgrowInfo = createAsyncThunk(
  "baby/fetchgrowInfo",
  async (babyInfo: { babyid: number }[], { rejectWithValue }) => {
    // babyInfo의 타입을 명확히 정의
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      // console.log("성장 정보 요청 시작, babyInfo:", babyInfo);

      if (!babyInfo || babyInfo.length === 0) {
        return rejectWithValue("성장 정보를 요청할 babyInfo가 없습니다.");
      }

      // babyid 배열을 이용해 API 요청
      const responses = await Promise.all(
        babyInfo.map((baby) =>
          axios.post(`${API_URL}/babygrow`, { babyid: baby.babyid })
        )
      );

      // console.log(" 성장 정보 응답 받음:", responses);
      sessionStorage.setItem("babygrow", JSON.stringify(responses));
      return responses.map((res) => res.data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 리듀서 정의
const babygrowSlice = createSlice({
  name: "babygrow",
  initialState,
  reducers: {
    clearGrowInfo: (state) => {
      state.growInfo = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchgrowInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchgrowInfo.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.growInfo = action.payload;
          // console.log("성장 정보 업데이트:", action.payload);
        }
      )
      .addCase(fetchgrowInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.growInfo = [];
        // console.log("성장 정보 요청 실패:", state.error);
      });
  },
});

// 액션 및 리듀서 내보내기
export const { clearGrowInfo } = babygrowSlice.actions;
export default babygrowSlice.reducer;
