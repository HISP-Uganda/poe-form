import React from "react";
import {Card, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useHistory} from 'react-router-dom'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
export const Staff = () => {
  const history = useHistory();
  const addApplication = () => {
    history.push('/home/staff-form')
  }
  return <Card title="Staff"
               extra={<PlusOutlined style={{fontSize: 24, cursor: 'pointer'}} onClick={addApplication}/>}>
    <Table dataSource={dataSource} columns={columns}/>
  </Card>
}
