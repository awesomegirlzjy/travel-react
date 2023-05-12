import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import "antd/dist/antd.css";
import "./i18n/configs"
// redux实现数据共享
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from "axios"

// 与服务器进行连接时，设置的header参数
axios.defaults.headers['x-icode'] = 'FB80558A73FA658E'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* 引入Provider，并将store注入 */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* <DatePicker /> */}
  </React.StrictMode>
);

// store.subscribe(() => {
//   root.render(   // <React.StrictMode> 用来检查App组件内写的东西是否合理
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
// })


