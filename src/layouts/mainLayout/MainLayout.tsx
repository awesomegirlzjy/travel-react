import React from 'react'
import { Header, Footer } from '../../components'
import styles from './MainLayout.module.css'

//React18中props删除了children属性，当我们在ts环境下使用props.children会报错
//定义一个Iprops的interface，指定children属性，因为children是可有可无的，所以设置为可选属性，类型为React.ReactNode
interface IProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<IProps> = ({ children }) => {
  return <>
    <Header/>
    <div className={styles["page-content"]}>{children}</div>
    <Footer />
  </>
  
}
