import React from "react";
import { Card, Table } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { GET_STAFF } from "./utils";


const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Age',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Address',
    dataIndex: 'nationalIdNo',
    key: 'nationalIdNo',
  },
];
export const Staff = () => {
  const [value] = useLocalStorage('jwt');
  const { loading, error, data } = useQuery(GET_STAFF, { variables: { condition: { companyId: value } } });
  const history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const addApplication = () => {
    history.push('/home/staff-form')
  }
  return <Card title="Staff"
    extra={<PlusOutlined style={{ fontSize: 24, cursor: 'pointer' }} onClick={addApplication} />}>
    <Table dataSource={data.allStaff.nodes} columns={columns} rowKey="id" />
  </Card>
}
