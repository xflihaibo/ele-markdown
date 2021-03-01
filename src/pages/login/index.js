import {Form, Input, Button, Checkbox, Row, Col} from 'antd';

import './index.less';
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16
    }
};

const Login = props => {
    const onFinish = values => {
        props.history.push('/home');
        console.log('Sucdcess:', values, props);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login md-login-bag">
            <Row>
                <Col className="tms-login-container">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="帐户"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>记录密码</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
