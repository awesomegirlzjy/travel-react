import React from "react";
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrderPage: React.FC = (props) => {

  const jwt = useSelector(state => state.user.token)
  const loading = useSelector(state => state.order.loading)
  const order = useSelector(state => state.order.currentOrder)

  const diapatch = useDispatch()


  return (
    <MainLayout>
      <Row>
        <Col span={12}>
            <PaymentForm />
        </Col>
        <Col span={12}>
            <CheckOutCard
              loading={loading}
              order={order}
              onCheckout={() => {
                diapatch(placeOrder({jwt, orderId: order.id}))
              }}
            />
        </Col>
      </Row>
    </MainLayout>
  );
};
