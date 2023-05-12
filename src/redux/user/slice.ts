import { AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { responsiveArray } from "antd/es/_util/responsiveObserver";
import axios from "axios";

interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null;  // jwt 
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null,
};

export const signIn : any = createAsyncThunk(
    "user/signIn",   // 文件夹名称/变量名称
    async (paramaters: {
        email: string,
        password: string
    }, thunkAPI) => {

        // const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
        //     email: paramaters.email,
        //     password: paramaters.password
        // });
        
        // return data.token
        return "fdsbiuheafvbsdhseroihgbdaoahfnjv"
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = null
            state.error = null
            state.loading = false
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});