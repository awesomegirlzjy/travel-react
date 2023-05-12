import styles from "./SignInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { signIn } from "../../redux/user/slice"; 
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jwt = useSelector(state => state.user.token)  // user是store里的对象名，token是slice里定义好的状态
  const loading = useSelector(state => state.user.loading)
  const error = useSelector(state => state.user.error)

  useEffect(() => {
    // jwt不为null，表示用户已经登录，此时就将页面重定向到主页
    if(jwt !== null) {
      console.log(jwt)
      navigate("/")
    } 
  }, [jwt])

  const onFinish = (values: any) => {
    // console.log("Success:", values);
    dispatch(signIn({
      email: values.username,
      password: values.password
    }))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        {/* loading 为true时，这个button上就会显示一个转圈的花来表示正在加载 */}
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
