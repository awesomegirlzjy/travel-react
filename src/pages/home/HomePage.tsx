import React from "react"
import styles from "./HomePage.module.css"
import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners } from '../../components'
import { Row, Col, Typography, Spin } from "antd";
import { productList1, productList2, productList3 } from "./mockups";
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { Translation, withTranslation, WithTranslation } from 'react-i18next';
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
import { connect } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        giveMeData: () => dispatch(giveMeDataActionCreator())
    }
}

type PropsType = WithTranslation &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {

    // 获取数据
    componentDidMount() {
        this.props.giveMeData()
    }

    render() {
        // console.log(this.props.t)
        const { t, productList, loading, error } = this.props

        // 加载过程中（即还没有获取到数据时），页面显示的效果
        if (loading) {
            return (
                <Spin
                    size="large"
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                    }}
                />
            );
        }

        // 读取数据失败的情况下
        if (error) {
            return <div>网站出错：{error}</div>;
        }

        // 数据加载成功时的页面效果
        return (
            <MainLayout>


                {/* 导航选项 & 轮播图区域 */}

                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>


                {/* 产品推荐 */}
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="warning">

                            {/* 热门推荐 */}
                            <Translation>
                                {
                                    t => t("home_page.hot_recommended")
                                }
                            </Translation>
                        </Typography.Title>
                    }
                    sideImage={sideImage}
                    products={productList1}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="danger">

                            {/* 新品上市 */}
                            <Translation>
                                {
                                    t => t("home_page.new_arrival")
                                }
                            </Translation>
                        </Typography.Title>
                    }
                    sideImage={sideImage2}
                    products={productList2}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="success">

                            {/* 国内游推荐 */}
                            <Translation>
                                {
                                    t => t("home_page.domestic_travel")
                                }
                            </Translation>
                        </Typography.Title>
                    }
                    sideImage={sideImage3}
                    products={productList3}
                />

                {/* 合作企业 */}
                <BusinessPartners />

            </MainLayout>
        )
    }
}

export const HomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(HomePageComponent))