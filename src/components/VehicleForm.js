import React from 'react';
import { Button, Card, Form, Input, InputNumber } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { CREATE_VEHICLE } from "./utils";

export const VehicleForm = () => {
  const [form] = Form.useForm();
  let history = useHistory();

  const [value] = useLocalStorage('jwt');
  const [createVehicle] = useMutation(CREATE_VEHICLE);

  const onFinish = async values => {
    values = { ...values, company: value }
    await createVehicle({ variables: { input: { vehicle: values } } });
    history.push("/home/vehicles");
  };

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
          name="country"
          label="Country of Truck Head Registration"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="headRegistrationNo"
          label="Country of Truck Head Registration"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="principleDriver"
          label="Assigned PrincipleTruck driver"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="optionalDriver"
          label="Assigned Optional Truck driver"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="manufactureYear"
          label="Year of Manufacture"
          rules={[]}
        >
          <InputNumber min={1990} defaultValue={1990} />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="configuration"
          label="Truck configuration"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="model"
          label="Model"
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
