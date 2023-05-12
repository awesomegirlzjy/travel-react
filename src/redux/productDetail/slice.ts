import { AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: false,
    error: null,
    data: null,
};

export const getProductDetail : any = createAsyncThunk(
    "productDetail/getProductDetail",   // "命名空间/action"
    async (touristRouteId: string, thunkAPI) => { 
        // thunkAPI.dispatch()   // thunkAPI中包含了一系列redux的相关功能，如dispatch(),getState()等
        console.log("slice - createAsyncThunk()")
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        return data
    }
)

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,

    // 此处的reducers实际上是将原来的reducer和对应的action直接绑定到一起了
    // 此处的reducers是一个对象，对象中的每个元素对应一个action以及该action的处理函数（处理函数即真正的reudcer）
    reducers: {
        // fetchStart: (state) => {
        //     // return { ...state, loading: true };
        //     // 有了immer框架后(redux-toolkit自带了)，我们就不需要写成上面的语句了，而直接对要修改的内容进行赋值就可以了；
        //     // 但immer的底层也是新创建了一个变量后再返回的，即上面的语句
        //     // immer主要是使得开发人员能更更方便简洁的写代码
        //     console.log("productDetail/slice.ts - fetchStart")
        //     state.loading = true;
        // },
        // fetchSuccess: (state, action) => {
        //     console.log("productDetail/slice.ts - fetchSuccess")
        //     state.data = action.payload;
        //     state.loading = false;
        //     state.error = null;
        // },
        // fetchFail: (state, action: PayloadAction<string | null>) => {
        //     //   const ddd = action.payload;
        //     console.log("productDetail/slice.ts - fetchFail")
        //     state.loading = false;
        //     state.error = action.payload;
        // },
    },
    
    // 异步中间件必须要在 extraReducers 字段中访问，这样能固定返回 pending、fulfilled、rejected. 
    // 这样，数据流就是直接由RTK自动控制了
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            // return { ...state, loading: true };
            // 有了immer框架后(redux-toolkit自带了)，我们就不需要写成上面的语句了，而直接对要修改的内容进行赋值就可以了；
            // 但immer的底层也是新创建了一个变量后再返回的，即上面的语句
            // immer主要是使的开发人员能更更贱方便简洁的写代码
            console.log("productDetail/slice.ts - pending")
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            console.log("productDetail/slice.ts - fulfilled")
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            //   const ddd = action.payload;
            console.log("productDetail/slice.ts - rejected")
            state.loading = false;
            state.error = action.payload;
        },
    }
});

