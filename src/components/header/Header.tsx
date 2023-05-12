import React, { useState, useEffect } from "react"
import styles from "./Header.module.css"
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Button, Dropdown, MenuProps } from "antd";
import { GlobalOutlined } from '@ant-design/icons';
import Menu from 'antd/es/menu';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
import { useSelector } from "../../redux/hooks";  // 自定义useSelector
import { useTranslation } from 'react-i18next';
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions"
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode"
import { userSlice } from "../../redux/user/slice";
    
// 定义自己的JwtPayload
interface JwtPayload extends DefaultJwtPayload {
    username: string  // 对应用户的email
}

export const Header: React.FC = () => {

    // redux实现数据共享
    const dispatch = useDispatch()

    /* 为了让组件更具有一般性，解决sotre和组件的耦合问题，使得组件能够被复用，
    我们希望能在使用useSelector()时不对参数进行类型的指定。
    实现办法是：利用TypedUseSelectorHook接口对useSelector进行重新定义
     */
    // const language = useSelector((storeState: RootState) => storeState.language)
    // const languageList = useSelector((storeState: RootState) => storeState.languageList)
    const language = useSelector(storeState => storeState.language.language)
    const languageList = useSelector(storeState => storeState.language.languageList)

    const { t } = useTranslation();
    const navigate = useNavigate();

    const jwt = useSelector(state => state.user.token)

    const [username, setUsername] = useState("123@qq.com")  // 初始化应该为空的，但这里为了测试，所以设置了内容
    
    const shoppingCartItems = useSelector(state => state.shoppingCart.items)
    const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)
    
    // useEffect(() => {
    //     // jwt不为空，就说明有人登陆了，此时我们就给这个组件的状态username设置新值
    //     if (jwt) {
    //         const token = jwt_decode<JwtPayload>(jwt)
    //         setUsername(token.username)
    //     }
    // }, [jwt])

    const items: MenuProps['items'] = [
        {
            label: "中文",
            key: '0',
        },
        {
            label: "English",
            key: '1',
        },
    ];

    const menuClickHandler = (e: any) => {
        // console.log("menuClickHandler", e);

        if (e.key === "new") {
            // console.log("menuClickHandler - new");
            const action = addLanguageActionCreator("新语言", "new_lang")

            console.log("dispatch前 - menuClickHandler - languageList", languageList);
            dispatch(action)
            console.log("dispatch后 - menuClickHandler - languageList", languageList);
        } else {
            // console.log("menuClickHandler - change");
            const action = changeLanguageActionCreator(e.key)
            console.log("dispatch前 - menuClickHandler - languageList", language);
            dispatch(action)
            console.log("dispatch后 - menuClickHandler - languageList", language);
        }
    }

    // 登出操作，清除jwt数据
    const onLogout = () => {
        dispatch(userSlice.actions.logOut())
        navigate("/")  // 重定向到首页
        window.location.reload() // 刷新页面
    }

    return (
        <div className={styles['app-header']}>
            {/* 网站口号、登录、注册部分 */}
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>{t("header.slogan")}</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15, display: 'inline' }}
                        // menu={{ items }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map((l) => {
                                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                                })}
                                {/* 添加新语言 */}
                                <Menu.Item key="new">{t("header.add_new_language")}</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >{language === "zh" ? "中文" : "英文"}</Dropdown.Button>
                    {jwt ?
                        <Button.Group className={styles['button-group']}>
                            <span  style={{ marginRight: 5}}>
                                {t("header.welcome")} 
                                <Typography.Text strong>{username}</Typography.Text>
                            </span>
                            <Button 
                                loading={shoppingCartLoading} 
                                onClick={() => navigate("/shoppingCart")}
                            >
                                {t("header.shoppingCart")}({shoppingCartItems.length})
                            </Button>
                            <Button onClick={onLogout}>{t("header.signOut")}</Button>
                        </Button.Group>
                        : 
                        <Button.Group className={styles['button-group']}>
                            <Button onClick={() => navigate('/register')}>
                                {t("header.register")}
                            </Button>
                            <Button onClick={() => navigate('/signin')}>
                                {t("header.signin")}
                            </Button>
                        </Button.Group>
                    }
                </div>
            </div>
            {/* logo、搜索部分 */}
            <Layout.Header className={styles['main-header']} >
                <span onClick={() => navigate('/')}>
                    <img src={logo} alt="" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>
                        {t("header.title")}
                    </Typography.Title>
                </span>
                <Input.Search
                    placeholder="请输入旅游目的地/主题/关键字"
                    className={styles['search-input']}
                    onSearch={(keywords) => navigate(`/search/${keywords}`)} />
            </Layout.Header>
            {/* 导航栏 */}
            <Menu mode={"horizontal"} className={styles["main-menu"]}>
                <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
                <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
                <Menu.Item key="3"> {t("header.group")} </Menu.Item>
                <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
                <Menu.Item key="5"> {t("header.private")} </Menu.Item>
                <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
                <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
                <Menu.Item key="8"> {t("header.local")} </Menu.Item>
                <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
                <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
                <Menu.Item key="11"> {t("header.study")} </Menu.Item>
                <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
                <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
                <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
            </Menu>
        </div>
    )
}