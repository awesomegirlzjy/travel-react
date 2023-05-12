import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import styles from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm = () => {

    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        navigate('/signIn/')
        // try {
        //     // post请求实现用户的注册,第一个参数表示请求地址,第二个参数为请求主体
        //     await axios.post("http://123.56.149.216:8080/auth/register", {
        //         email: values.username,  // values的属性即为Form.Item的name属性
        //         password: values.password,
        //         confirmPassword: values.confirm
        //     })
        //     // 请求成功，重定向到登录页面
        //     navigate('/signIn/')
        // } catch {
        //     alert("注册失败！")
        // }

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

            <Form.Item
                label="Confirm Password"
                name="confirm"
                hasFeedback
                rules={[
                    // required: true 表示必填，message为报错信息
                    { required: true, message: "Please input your confirm password!" },
                    // 验证输入密码与确认密码是否一致
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            // value为本单元格的输入内容，getFieldValue("password")为name属性为password的Form.Item
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("密码确认不一致！");
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
