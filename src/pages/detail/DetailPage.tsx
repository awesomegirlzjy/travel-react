import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro, ProductComments } from "../../components";
import { DatePicker, Space, Button } from "antd";
import { commentMockData } from "./mockup"
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage: React.FC<any> = () => {
  const { touristRouteId } = useParams();

  const dispatch = useDispatch()
  const loading = useSelector(state => state.productDetail.loading)
  const error = useSelector(state => state.productDetail.error)
  const product = useSelector(state => state.productDetail.data)

  const jwt = useSelector(state => state.user.token)
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)

  // 实现对API数据的异步获取
  // 页面的初始化数据只需调用一次，所以第二个参数为空数组
  useEffect(() => {
    dispatch(getProductDetail(touristRouteId))
  }, []);

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

  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <MainLayout>
      {/* 产品简介 与 日期选择 */}
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title="标题"
              shortDescription="简介"
              price="999.9"
              coupons="coupons"
              points="{product.points}"
              discount="{product.price}"
              rating="4.8"
              pictures={["图片1", "图片2"]}
            />
            {/* <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p: any) => p.url)}
              /> */}
          </Col>
          <Col span={11}>
            <Button
              style={{marginTop: 50, marginBottom: 30, display: "block"}}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(addShoppingCartItem({jwt, touristRouteId: product.id}))
              }}
            >
              <ShoppingCartOutlined />
              加入购物车
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 锚点菜单 */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#fees" title="费用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* 产品特色 */}
      <div id="feature" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        {/* dangerouslySetInnerHTML: 将html字符串转化成html代码 */}
        {/* <div
            dangerouslySetInnerHTML={{__html: product.features}}
            style={{ margin:50 }}
          ></div> */}
      </div>
      {/* 费用 */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>费用</Typography.Title>
        </Divider>
        {/* <div
            dangerouslySetInnerHTML={{__html: product.fees}}
            style={{ margin:50 }}
          ></div> */}
      </div>
      {/* 预订须知 */}
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>预订须知</Typography.Title>
        </Divider>
        {/* <div
            dangerouslySetInnerHTML={{__html: product.notes}}
            style={{ margin:50 }}
          ></div> */}
      </div>
      {/* 商品评价*/}
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>商品评价</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  );
};
