import React from 'react';
import { Button, Card, Form, Input, Select } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { login, } from './utils';
import bcrypt from 'bcryptjs';
import { CREATE_COMPANY, COUNTRIES } from "./utils";

const { Option } = Select;

export const Register = () => {
  const [form] = Form.useForm();

  const [createCompany] = useMutation(CREATE_COMPANY);

  let history = useHistory();

  const onFinish = async values => {
    let { prefix, confirm, phone, password, ...others } = values;
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    others = { ...others, phone: prefix + phone, password }
    const { data } = await createCompany({ variables: { input: { company: others } } });
    login(data.createCompany.company.id)
    history.push("/home");
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
          style={{ margin: 0 }}
          name="tin"
          label="Compnay / Individual TIN"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="issuingCountry"
          label="TIN Issuing Country"
          rules={[]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {COUNTRIES.map(country => <Option key={country.code} value={country.code}>{country.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="companyRegistrationNo"
          label="Company Registration No"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="type"
          label="Type of Company"
          rules={[]}
        >
          <Select>
            <Option value="Freight">Freight</Option>
            <Option value="Forwarders">Forwarders</Option>
            <Option value="Transport Company">Transport Company</Option>
            <Option value="Individual">Individual</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="companyName"
          label="Registered Company / Individual Name"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="country"
          label="Country of Registration"
          rules={[]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {COUNTRIES.map(country => <Option key={country.code} value={country.code}>{country.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="address"
          label="Physical Address"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="phone"
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
          style={{ margin: 0 }}
          name="email"
          label="Company email address"
          rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, {
            required: true,
            message: 'Please supply email address'
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="directorContact"
          label="Company Head/Director Contact"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="managerContact"
          label="Senior manager contact"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="manager2Contact"
          label="Senior manager contact 2"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
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
          <Input.Password />
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
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
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
