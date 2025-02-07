import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
const storedBabyInfo = sessionStorage.getItem('babyinfo');
const babyids: number[] = storedBabyInfo ? JSON.parse(storedBabyInfo) : [];

// fetchgrowInfo 액션 정의
export const fetchgrowInfo = createAsyncThunk(
  'baby/fetchgrowInfo',
  async (_, { rejectWithValue }) => {
    try {
      console.log('세션 babyinfo:', sessionStorage.getItem('babyinfo'));

      // ✅ sessionStorage 값이 없을 경우 기본값 설정
      const storedBabyInfo = sessionStorage.getItem('babyinfo');
      const babyids: number[] = storedBabyInfo ? JSON.parse(storedBabyInfo) : [];

      if (!babyids.length) return rejectWithValue("저장된 babyinfo가 없습니다.");

      // babyid 배열을 이용해 API 요청
      const responses = await Promise.all(
        babyids.map((babyid) => axios.post('http://localhost:5001/api/babygrow', { babyid }))
      );

      console.log('grow response >>', responses);
      sessionStorage.setItem('babygrow', JSON.stringify(responses));

      return responses.map((res) => res.data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


// 리듀서 정의
const babygrowSlice = createSlice({
  name: 'babygrow',
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
      .addCase(fetchgrowInfo.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.growInfo = action.payload;
        console.log('growaction >>', action.payload)
      })
      .addCase(fetchgrowInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.growInfo = [];
        console.log('state.growInfo >>', state.growInfo)

      });
  },
});

// 액션 및 리듀서 내보내기
export const { clearGrowInfo } = babygrowSlice.actions;
export default babygrowSlice.reducer;
