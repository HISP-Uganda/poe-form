import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { login, LOGIN } from "./utils";
import bcrypt from 'bcryptjs';
import { useApolloClient } from '@apollo/react-hooks';

export const Login = () => {
  const history = useHistory();
  const client = useApolloClient();
  const onFinish = async values => {

    const { data } = await client.query({
      query: LOGIN,
      variables: { mail: values.username }
    });

    if (data.login) {
      const isTheSame = bcrypt.compareSync(values.password, data.login.password);
      if (isTheSame) {
        login(data.login.id);
        history.push('/home')
      }
    }

  };

  return (
    <div className="wrap">
      <div className="left" />
      <div className="right">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or&nbsp;&nbsp;&nbsp;<Link to={`/register`}>Register</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
