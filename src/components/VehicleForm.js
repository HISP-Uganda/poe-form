import React from 'react';
import { Button, Card, Form, Input, InputNumber, Select } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { CREATE_VEHICLE, COUNTRIES, GET_STAFF } from "./utils";

const { Option } = Select;
export const VehicleForm = () => {
  const [form] = Form.useForm();
  let history = useHistory();

  const [value] = useLocalStorage('jwt');
  const [createVehicle] = useMutation(CREATE_VEHICLE);
  const { loading, error, data } = useQuery(GET_STAFF, { variables: { condition: { companyId: value } } });


  const onFinish = async values => {
    values = { ...values, company: value }
    await createVehicle({ variables: { input: { vehicle: values } } });
    history.push("/home/vehicles");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
          manufactureYear: 1995,
        }}
        scrollToFirstError
      >
        <Form.Item
          style={{ margin: 0 }}
          name="country"
          label="Country of Truck Head Registration"
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
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {data.allStaff.nodes.map(staff => <Option key={staff.id} value={staff.id}>{staff.passportNo}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="optionalDriver"
          label="Assigned Optional Truck driver"
          rules={[]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {data.allStaff.nodes.map(staff => <Option key={staff.id} value={staff.id}>{staff.passportNo}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="manufactureYear"
          label="Year of Manufacture"
          rules={[]}
        >
          <InputNumber min={1990} />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="configuration"
          label="Truck configuration"
          rules={[]}
        >
          <Select>
            <Option value="Rigid">Rigid</Option>
            <Option value="Articulated">Articulated</Option>
            <Option value="Pulling">Pulling</Option>
          </Select>
        </Form.Item>
        <Form.Item
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
