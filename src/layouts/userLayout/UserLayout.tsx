import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
const { Header, Footer, Content } = Layout;

//React18中props删除了children属性，当我们的在ts环境下使用props.children会报错
//定义一个Iprops的interface，指定children属性，因为children是可有可无的，所以设置为可选属性，类型为React.ReactNode
interface IProps {
  children?: React.ReactNode;
}

export const UserLayout: React.FC<IProps> = (props) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              选择语言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img alt="logo" className={styles["logo"]} src={logo} />
              <span className={styles["title"]}>React 旅游网</span>
            </Link>
          </div>
          <div className={styles["desc"]}>
            慕课网 是我朝最具影响力的 线上课程学习网站
          </div>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Footer就不写了，太累了</Footer>
    </Layout>
  );
};
