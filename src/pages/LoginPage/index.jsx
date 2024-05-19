import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Checkbox, Button,message,Space } from 'antd'
// import './index.scss'
// import logo from '@/assets/logo.png'
// import { useStore } from '@/store'
import classes from './index.module.css'
import instance from '../../api/instance';

function LoginPage() {
    // const { loginStore } = useStore()
    const navigate = useNavigate()
    const onFinish = async(values) => {
        console.log(values);
        // await loginStore.getToken({
        //     mobile: values.username,
        //     code: values.password
        // })
        await instance.post('/user/login',{})
        navigate('/',{replace:true})
        message.success('登陆成功了哦亲！')
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
    }
    return (
        <div className={classes.login}>
            <Card className={classes.login_container}>
                {/* <img className={classes.login_logo} src={logo} alt="" /> */}
                <h3>机场行李管理系统</h3>
                <Form
                    name="basic"
                    validateTrigger={['onBlur', 'onChange']}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {

                                required: true,
                                message: '请输入用户名',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号',
                                validateTrigger: 'onBlur',
                            },

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
                                message: '请输入密码',
                            },
                            {
                                len: 6,
                                message: '请输入6位数字密码',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginPage