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

// fetchgrowInfo 액션 정의
export const fetchgrowInfo = createAsyncThunk(
  'baby/fetchgrowInfo',
  async (_, { rejectWithValue }) => {
    try {
        const babyinfo: number[] = JSON.parse(sessionStorage.getItem('babyinfo') || '[]');
       
      if (!babyinfo.length) return rejectWithValue("저장된 babyinfo가 없습니다.");

      const responses = await Promise.all(
        babyinfo.map((babyid) => axios.post('http://localhost:5001/api/babygrow', { babyid }))
      );
      console.log('grow resposne >> ' , responses)
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
