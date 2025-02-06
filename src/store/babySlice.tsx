import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { babyinfo, BabyState } from '../components/types';
import { response } from 'express';

export const initialState: BabyState = {
    babyInfo: [],
    nothingBaby: false,
    loading: false,
    error: null,
};
export const fetchBabyInfo = createAsyncThunk(
    'baby/fetchBabyInfo',
    async (_, { rejectWithValue }) => {
        try {
            const user = sessionStorage.getItem('usernumber');
            console.log('user number redux에 전달 >>>>>', user);
            const response = await axios.post(
                'http://localhost:5001/api/babyinfo',
                { user }
            );
            console.log('reduxer 안에 reponse >>', response);
            if (!response.data || response.data.length === 0) {
                return [];
            }else{
                return response.data;
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
const babySlice = createSlice({
    name: 'baby',
    initialState,
    reducers: {
        clearBabyInfo: (state) => {
            state.babyInfo = [];
            state.nothingBaby = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBabyInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchBabyInfo.fulfilled,
                (state, action: PayloadAction<babyinfo[]>) => {
                    state.loading = false;
                    state.babyInfo = action.payload;
                    state.nothingBaby = action.payload.length > 0;
                    console.log('action payload >>>>',action.payload)


                    let babyids = state.babyInfo.map((value)=>{
                        return value.babyid
                    })
                    sessionStorage.setItem('babyinfo', JSON.stringify(babyids));
                }
                
            )
            .addCase(fetchBabyInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.babyInfo = [];
                state.nothingBaby = false;
            });
    },
});

// ✅ 액션 & 리듀서 내보내기
export const { clearBabyInfo } = babySlice.actions;
export default babySlice.reducer;
