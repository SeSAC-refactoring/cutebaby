// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// // 예방접종 데이터 타입 정의
// interface Vaccination {
//     id: number;
//     babyid: number;
//     name: string;
//     dose: string;
//     age: string;
//     additional_info?: string;
// }

// interface VaccinationState {
//     vaccinationData: Vaccination[];
//     loading: boolean;
//     error: string | null;
// }

// // 초기 상태
// const initialState: VaccinationState = {
//     vaccinationData: [],
//     loading: false,
//     error: null,
// };

// // 비동기 데이터 가져오기
// export const fetchVaccinationData = createAsyncThunk(
//     'vaccination/fetchVaccinationData',
//     async (babyid: number, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 'http://localhost:5001/api/vaccination',
//                 { babyid }
//             );
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// // Redux Slice 생성
// const vaccinationSlice = createSlice({
//     name: 'vaccination',
//     initialState,
//     reducers: {
//         clearVaccinationData: (state) => {
//             state.vaccinationData = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchVaccinationData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 fetchVaccinationData.fulfilled,
//                 (state, action: PayloadAction<Vaccination[]>) => {
//                     state.loading = false;
//                     state.vaccinationData = action.payload;
//                 }
//             )
//             .addCase(fetchVaccinationData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.vaccinationData = [];
//             });
//     },
// });

// // 액션 & 리듀서 내보내기
// export const { clearVaccinationData } = vaccinationSlice.actions;
// export default vaccinationSlice.reducer;
