import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = 
    "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 
    "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 推荐信息api调用失败

interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    data: any,  // 获取到的数据
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    data: any   // 获取数据失败后的错误信息
}

export type RecommendProductAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction; 

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
  };
};

export const fetchRecommendProductSuccessActionCreator = (data: any) : FetchRecommendProductSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        data: data
    }
}

export const fetchRecommendProductFailActionCreator = (error: any):FetchRecommendProductFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        data: error
    }
}


// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
// 此处该函数的主要作用是：异步获取API中的数据
export const giveMeDataActionCreator = (): ThunkAction<
  void, // 当前函数的返回值
  RootState,  // store中state的类型
  unknown,  // action中额外的参数
  RecommendProductAction  // action
> => async (dispatch, getState) => {
  console.log("giveMeDataActionCreator()....")
  // dispatch(fetchRecommendProductStartActionCreator());
  // try {
  //   const { data } = await axios.get(
  //     "http://123.56.149.216:8080/api/productCollections"
  //   );
  //   dispatch(fetchRecommendProductSuccessActionCreator(data));
  // } catch (error: any) {
  //   dispatch(fetchRecommendProductFailActionCreator(error.message));
  // }
};