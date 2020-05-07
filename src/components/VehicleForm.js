import React from 'react';
import {Button, Card, Form, Input, Select} from 'antd';
import { useHistory } from "react-router-dom";

const {Option} = Select;

export const VehicleForm = () => {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    history.push("/home/vehicles");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 100,
        }}
      >
        <Option value="+253">+253</Option>
        <Option value="+254">+254</Option>
        <Option value="+255">+255</Option>
        <Option value="+256">+256</Option>
        <Option value="+257">+257</Option>
      </Select>
    </Form.Item>
  );
  return (
    <Card
      title="Registration"
      style={{
        width: '50%',
        margin: 'auto',
      }}>
      <Form
        form={form}
        name="register"
        layout="vertical"
        size="large"
        onFinish={onFinish}
        initialValues={{
          prefix: '+256',
        }}
        scrollToFirstError
      >
        <Form.Item
          style={{margin: 0}}
          name="tin"
          label="Compnay / Individual TIN"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="tin_issuer"
          label="TIN Issuing Country"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="registration_no"
          label="Company Registration No"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="type"
          label="Type of Company"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="name"
          label="Registered Company / Individual Name"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="registering_country"
          label="Country of Registration"
          rules={[]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          style={{margin: 0}}
          name="physical_address"
          label="Physical Address"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="office_no"
          label="Office Phone No"
          rules={[]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="email"
          label="Company email address"
          rules={[{type: 'email', message: 'The input is not valid E-mail!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="director_contact"
          label="Company Head/Director Contact"
          rules={[]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          style={{margin: 0}}
          name="senior_contact1"
          label="Senior manager contact"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="senior_contact2"
          label="Senior manager contact 2"
          rules={[]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: 0}}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({getFieldValue}) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
