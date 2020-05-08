import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { CREATE_APPLICATION } from './utils'


export const ApplicationForm = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  const [value] = useLocalStorage('jwt');
  const [createStaff] = useMutation(CREATE_APPLICATION);

  const onFinish = async values => {
    values = { ...values, company: value }
    await createStaff({ variables: { input: { application: values } } });
    history.push("/home/applications");
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
          name="applicationDate"
          label="Date of Application"
          rules={[]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          style={{ margin: 0 }}
          name="loaded"
          label="Loaded "
          rules={[]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          style={{ margin: 0 }}
          name="typeOfGoods"
          label="Type of Goods"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="cargoNature"
          label="Cargo Nature"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="clientDetails"
          label="Client Details"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="expectedDepartureDate"
          label="Expected date of departure"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="expectedDateOfArrival"
          label="Expected date of arrival"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="departureCountry"
          label="Country of Departure"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="departureCity"
          label="City of departure"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="destinationCountry"
          label="Country of Destination"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="approvalTerminationCountry"
          label="Where this travel apporval terminates (country)"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="approvalTerminationCity"
          label="Where this travel apporval terminates (city)"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="approvalDistance"
          label="Exxpected distance for the this approval"
          rules={[]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="jmpExpiryDate"
          label="JMP expiry date"
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="lastVisitedCountries"
          label="Countries Visited in last 14 days"
          rules={[]}
        >
          <Input />
        </Form.Item> <Form.Item
          style={{ margin: 0 }}
          name="ugandaPhysicalAddress"
          label="Physical address in Uganda"
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
