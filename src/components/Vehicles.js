import React from "react";
import { Card, Table } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { GET_VEHICLES } from "./utils";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }
];
export const Vehicles = () => {
  const history = useHistory();
  const [value] = useLocalStorage('jwt');
  const { loading, error, data } = useQuery(GET_VEHICLES, { variables: { condition: { companyId: value } } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const addVehicle = () => {
    history.push('/home/vehicle-form')
  }
  return <Card
    title="Vehicles"
    extra={<PlusOutlined style={{ fontSize: 24, cursor: 'pointer' }} onClick={addVehicle} />}>
    <Table dataSource={data.allVehicles.nodes} columns={columns} rowKey="id" />
  </Card>
}
