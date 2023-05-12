import React from "react";
import styles from "./ShoppingCart.module.css"
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from "antd";
import { PaymentCard, ProductList } from "../../components";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { clearShoppingCartItem, checkout } from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";

export const ShoppingCartPage: React.FC = () => {

	const shoppingCartItems = useSelector(storeState => storeState.shoppingCart.items)
    const shoppingCartLoading = useSelector(storeState => storeState.shoppingCart.loading)
    const jwt = useSelector(state => state.user.token)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	return (
		<MainLayout>
			<Row>
				{/* 购物车清单 */}
				<Col span={16}>
					<div className={styles["product-list-container"]}>
						<ProductList data={shoppingCartItems.map(i => i.touristRoute)} />
					</div>
				</Col>
				{/* 支付卡组件 */}
				<Col span={8}>
					<Affix>
						<div className={styles["payment-card-container"]}>
							<PaymentCard 
							loading={shoppingCartLoading}
							originalPrice={shoppingCartItems
								.map(i => i.originalPrice)
								.reduce((a, b) => a+b, 0)}
							price={shoppingCartItems
								.map(i => i.originalPrice * (i.discountPresent ? i.discountPresent : 1))
								.reduce((a, b) => a+b, 0)}
							// 用户点击下单按钮时的操作
							onCheckout={() => {
								// if(shoppingCartItems.length <= 0) {
								// 	return
								// }
								// dispatch(checkout(jwt))
								navigate("/placeOrder")
							}}
							// 清空购物车操作
							onShoppingCartClear={() => {
								dispatch(clearShoppingCartItem({
									jwt, 
									itemIds: shoppingCartItems.map(i => i.id)}))
							}}
							 />
						</div>
					</Affix>
				</Col>
			</Row>
		</MainLayout>
	);
};
