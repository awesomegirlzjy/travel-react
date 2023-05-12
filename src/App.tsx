import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Navigate, Routes, Outlet } from "react-router-dom"
import { 
  HomePage, 
  SignInPage, 
  ErrorPage, 
  RegisterPage, 
  DetailPage, 
  SearchPage, 
  ShoppingCartPage,
  PlaceOrderPage
 } from './pages';
import { useDispatch } from 'react-redux';
import { useSelector } from "./redux/hooks"
import { getShoppingCart } from './redux/shoppingCart/slice';

// 定义私有路径(如购物车页面): 所有私有路径对应的页面都只能登录用户才能访问；否则需要重定向到登录页面
// 参数 isAuthenticated: 是否登录
// 参数 ...rest: 其他参数
const PrivateRoute = ({  isAuthenticated, ...rest }:
  {  isAuthenticated: boolean }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}

function App() {

  const dispatch = useDispatch()
  const jwt = useSelector((s) => s.user.token)

  // 通过jwt的变化来判断是否需要执行此处的副作用
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      {/* 配置所有路由 */}
      <BrowserRouter>
        <Routes>
          {/* 首页 */}
          <Route path="/" element={<HomePage />} />
          {/* 注册页面 */}
          <Route path="/register" element={<RegisterPage />} />
          {/* 登录页面 */}
          <Route path="/signin" element={<SignInPage />} />
          {/* 旅游路线详情页面 */}
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          {/* 搜索展示页面 */}
          <Route path="/search/:keywords?" element={<SearchPage />} />
          {/* 使用私有路径定义购物车页面 */}
          <Route path='/shoppingCart' element={
            <PrivateRoute
              isAuthenticated={jwt !== null}
               />
          }>
             <Route path='/shoppingCart' element={<ShoppingCartPage/>}/>
          </Route>
          {/* 使用私有路径定义支付页面 */}
          <Route path='/placeOrder' element={
            <PrivateRoute
              isAuthenticated={jwt !== null}
               />
          }>
             <Route path='/placeOrder' element={<PlaceOrderPage/>}/>
          </Route>
          {/* 错误页面 */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path='*' element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
