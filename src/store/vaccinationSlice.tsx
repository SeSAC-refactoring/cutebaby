import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// 예방접종 데이터 타입 정의
interface VaccinationData {
    babyid: number;
    vaccinationid: number;
    dosenumber: any;
    dosedate: any;
}

interface VaccinationState {
    vaccinationData: VaccinationData[];
    loading: boolean;
    error: string | null;
}

// 초기 상태
const initialState: VaccinationState = {
    vaccinationData: [],
    loading: false,
    error: null,
};

// 데이터 가져오기
export const fetchVaccinationData = createAsyncThunk(
    'vaccination/fetchVaccinationData', // Redux에서 액션을 구분하는 이름
    
    async (babyid: number, { rejectWithValue }) => {
        const API_URL = process.env.REACT_APP_API_URL;

        console.log('store에서 babyid', babyid)
        try {
            // 백엔드 서버에 요청 보내기
            const response = await axios.post(
                `${API_URL}/api/vaccination`,
                { babyid } // babyid 값을 받아 해당 아기의 예방접종 데이터 조회
            );
            if (!response.data || response.data.length === 0) {
                return [];
            } else {
                return response.data;
            }
        } catch (error: any) {
            // API 요청 실패 시 오류 처리
            return rejectWithValue(error.message); // 에러 메세지를 Redux 스토어에 저장
        }
    }
);

// Redux Slice 생성
const vaccinationSlice = createSlice({
    name: 'vaccination',
    initialState,
    reducers: {
        clearVaccinationData: (state) => {
            state.vaccinationData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVaccinationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchVaccinationData.fulfilled,
                (state, action: PayloadAction<VaccinationData[]>) => {
                    state.loading = false;
                    state.vaccinationData = action.payload;
                    console.log('action payload', action.payload);
                    console.log(
                        'Redux store vaccinationData:',
                        state.vaccinationData
                    );

                    let babyids = state.vaccinationData.map((value) => {
                        return value.babyid;
                    });
                    sessionStorage.setItem(
                        'vaccinationData',
                        JSON.stringify(babyids)
                    );
                }
            )
            .addCase(fetchVaccinationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.vaccinationData = [];
            });
    },
});

// 액션 & 리듀서 내보내기
export const { clearVaccinationData } = vaccinationSlice.actions;
export default vaccinationSlice.reducer;
