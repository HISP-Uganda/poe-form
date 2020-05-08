import React from "react";
import { Card, Table } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { GET_STAFF } from "./utils";


const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  }, {
    title: 'Other Names',
    dataIndex: 'otherNames',
    key: 'otherNames',
  },
  {
    title: 'National ID',
    dataIndex: 'nationalIdNo',
    key: 'nationalIdNo',
  },{
    title: 'Nationality',
    dataIndex: 'nationality',
    key: 'nationality',
  }
  ,{
    title: 'Country of Residence',
    dataIndex: 'residenceCountry',
    key: 'residenceCountry',
  },{
    title: 'Passport No',
    dataIndex: 'passportNo',
    key: 'passportNo',
  },{
    title: 'Driving Permit Number',
    dataIndex: 'permitNo',
    key: 'permitNo',
  },{
    title: 'Driving Permit Issuer',
    dataIndex: 'permitIssuer',
    key: 'permitIssuer',
  },{
    title: 'Phone contact',
    dataIndex: 'phoneConcat1',
    key: 'phoneConcat1',
  },{
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
  },{
    title: 'Gender',
    dataIndex: 'sex',
    key: 'sex',
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
