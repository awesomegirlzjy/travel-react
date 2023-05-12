import {legacy_createStore, applyMiddleware} from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'
import { actionLog } from './middlewares/actionLog'
import { changeLanguage } from './middlewares/changeLanguage'
import { productDetailSlice } from './productDetail/slice'
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { productSearchSlice } from './productSearch/slice'
import { userSlice } from './user/slice'
import { shoppingCartSlice } from './shoppingCart/slice'
import { orderSlice } from './order/slice'

// 创建并暴露store对象
// const store = legacy_createStore(languageReducer)

// 为了使用redux-toolkit，需要将从redux中引入的combineReducers换成从@reduxjs/toolkit中引入
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer,
})

// const store = legacy_createStore(
//     rootReducer, 
//     applyMiddleware(thunk, actionLog, changeLanguage)
//     )
const store = configureStore({
    reducer: rootReducer,
    // getDefaultMiddleware() 里就包含了thunk中间件
    // actionLog
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), changeLanguage],
    devTools: true  // 启用redux devtools插件（适用于谷歌浏览器）
})

export type RootState = ReturnType<typeof store.getState>

export default store
