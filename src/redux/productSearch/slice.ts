import { AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { responsiveArray } from "antd/es/_util/responsiveObserver";
import axios from "axios";

interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}

const initialState: ProductSearchState = {
    loading: false,
    error: null,
    data: null,
    pagination: null
};

export const searchProduct : any = createAsyncThunk(
    "productSearch/searchProduct",
    async (paramaters: {
        keywords: string,
        nextPage: number | string,
        pageSize: number | string
    }, thunkAPI) => {
        // let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
        // if (paramaters.keywords) {
        //     url += `&keyword=${paramaters.keywords}`
        // }
        // const response = await axios.get(url);
        // return {
        //     data: response.data,
        //     pagination: JSON.parse(response.headers["x-pagination"] as string)  // 将字符串转换为JS对象
        // }
    }
)

export const productSearchSlice = createSlice({
    name: "productSearch",
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            console.log("searchProduct/slice.ts - pending")
            state.loading = true;
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            console.log("searchProduct/slice.ts - fulfilled")
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            console.log("searchProduct/slice.ts - rejected")
            state.loading = false;
            state.error = action.payload;
        },
    }
});