import React from 'react';
import { Button, Card, Form, Input, Select } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { CREATE_STAFF } from "./utils";


export const StaffForm = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  const [value] = useLocalStorage('jwt');
  const [createStaff] = useMutation(CREATE_STAFF);

  const onFinish = async values => {
    values = { ...values, companyId: value }
    await createStaff({ variables: { input: { staff: values } } });
    history.push("/home/staff");
    history.push("/home/staff");
  };
  return (
    <Card
      title="Registration"
      style={{
        width: '50%',
        margin: 'auto',
        height: 'auto'
      }}>
      <Form
        form={form}
        name="staff"
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
          name="designation"
          label="Designation"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="firstName"
          label="First name"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="lastName"
          label="Last name"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="otherNames"
          label="Other names"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="nationality"
          label="Nationality"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="dob"
          label="Date of Birth"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="sex"
          label="Gender"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="permitNo"
          label="Driving Permit Number"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="permitIssuer"
          label="DP Issuing Authority"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="passportNo"
          label="Passport Number"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="nationalIdNo"
          label="National ID #"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="phoneConcat1"
          label="Phone Contact 1"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="phoneConcat2"
          label="Phone Contact 2"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="residenceCountry"
          label="City of Residence"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="residenceArea"
          label="Area of residence"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="nokName"
          label="NOK full name"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="nokResidence"
          label="NOK Residence"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="nokPhone"
          label="NOK Phone"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="nokRelationship"
          label="NOK Relationship"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="nok2Name"
          label="NOK 2 full name"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="nok2Residence"
          label="NOK 2 Residence"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="nok2Phone"
          label="NOK 2 Phone"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="nok2Relationship"
          label="NOK 2 Relationship"
          rules={[]}
        >
          <Input />
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
