import React from "react";
import { Card, Table } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { GET_COMPANY_APPLICATIONS } from './utils'

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
}];
export const CompanyApplications = () => {
    const history = useHistory();
    const [value] = useLocalStorage('jwt');
    const { loading, error, data } = useQuery(GET_COMPANY_APPLICATIONS, { variables: { condition: { companyId: value } } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const addApplication = () => {
        history.push('/home/application-form')
    }
    return <Card
        title="Company Applications"
        extra={<PlusOutlined style={{ fontSize: 24, cursor: 'pointer' }} onClick={addApplication} />}
    >
        <Table dataSource={data.allApplications.nodes} columns={columns} rowKey="id" />
    </Card>
}
