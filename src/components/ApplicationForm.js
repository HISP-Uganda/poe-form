import React from 'react';
import { Button, Card, Form, Input, DatePicker, Select, Checkbox, InputNumber } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { CREATE_APPLICATION, COUNTRIES, GET_STAFF, GET_VEHICLES } from './utils'

const { Option } = Select
const { TextArea } = Input

export const ApplicationForm = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  const [value] = useLocalStorage('jwt');
  const [createStaff] = useMutation(CREATE_APPLICATION);

  const { loading: loadingStaff, error: staffErrors, data: staff } = useQuery(GET_STAFF, { variables: { condition: { companyId: value } } });
  const { loading: loadingVehicles, error: vehicleErrors, data: vehicles } = useQuery(GET_VEHICLES, { variables: { condition: { company: value } } });

  const onFinish = async values => {
    values = { ...values, company: value, applicationStatus: 'Approved' }
    try {
      await createStaff({ variables: { input: { application: values } } });
      history.push("/home/applications");
    } catch (e) {

    }
  };

  const onChangeVehicle = (value) => {
    const vehicle = vehicles.allVehicles.nodes.find(v => v.id === value);
    if (vehicle) {
      form.setFieldsValue({ driver: vehicle.principleDriver, assistantDriver: vehicle.optionalDriver });
    }
  }

  if (loadingStaff || loadingVehicles) return <p>Loading...</p>;
  if (staffErrors || vehicleErrors) return <p>Error :(</p>;
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
          rules={[{ required: true, message: 'Pick date of application' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="vehicle"
          label="Vehicle"
          rules={[{ required: true, message: 'Select type of vehicle' }]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={onChangeVehicle}
          >
            {vehicles.allVehicles.nodes.map(vehicle => <Option key={vehicle.id} value={vehicle.id}>{vehicle.headRegistrationNo}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          valuePropName="checked"
          name="loaded"
          rules={[]}
        >
          <Checkbox>Loaded</Checkbox>
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="typeOfGoods"
          label="Type of Goods"
          rules={[{ required: true, message: 'Select type of goods' }]}
        >
          <Select>
            <Option value="Import">Import</Option>
            <Option value="Exports">Exports</Option>
            <Option value="Distribution">Distribution</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="cargoNature"
          label="Cargo Nature"
          rules={[{ required: true, message: 'Select type of cargo nature' }]}
        >
          <Select>
            <Option value="General">General</Option>
            <Option value="Dangerous Goods">Dangerous Goods</Option>
            <Option value="Empty">Empty</Option>
            <Option value="Project or OG">Project or OG</Option>
            <Option value="Perishable">Perishable</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="clientDetails"
          label="Client Details"
          rules={[]}
          help="Please supply contacts, name, Phone, email, physical Address of client"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="expectedDepartureDate"
          label="Expected date of departure"
          rules={[]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="expectedDateOfArrival"
          label="Expected date of arrival"
          rules={[]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="departureCountry"
          label="Country of Departure"
          rules={[{ required: true, message: 'Select country of departure' }]}
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
          rules={[{ required: true, message: 'Select country of destination' }]}
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
          name="approvalTerminationCountry"
          label="Where this travel approval terminates (country)"
          rules={[{ required: true, message: 'Select specify where this travel approval terminates (country)' }]}
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
          name="approvalTerminationCity"
          label="Where this travel approval terminates (city)"
          rules={[{ required: true, message: 'Select specify where this travel approval terminates (city)' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="approvalDistance"
          label="Expected distance for the this approval"
          rules={[]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="jmpExpiryDate"
          label="JMP expiry date"
          rules={[]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="driver"
          label="Assigned PrincipleTruck driver"
          rules={[]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {staff.allStaff.nodes.map(staff => <Option key={staff.id} value={staff.id}>{staff.passportNo}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ margin: 0 }}
          name="assistantDriver"
          label="Assigned Optional Truck driver"
          rules={[]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {staff.allStaff.nodes.map(staff => <Option key={staff.id} value={staff.id}>{staff.passportNo}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ margin: 0 }}
          name="supervisor"
          label="Supervisor"
          rules={[]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {staff.allStaff.nodes.map(staff => <Option key={staff.id} value={staff.id}>{staff.passportNo}</Option>)}
          </Select>
        </Form.Item>


        <Form.Item
          style={{ margin: 0 }}
          name="lastVisitedCountries"
          label="Countries Visited in last 14 days"
          rules={[]}
        >
          <TextArea rows={4} />
        </Form.Item> <Form.Item
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
