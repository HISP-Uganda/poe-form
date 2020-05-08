import React from "react";
import { Card, Table } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useHistory, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useLocalStorage } from 'react-use';
import { GET_COMPANY_APPLICATIONS } from './utils'

const columns = [{
    "title": "Assigned MOH ID",
    "dataIndex": "assignedMohId",
    "key": "assignedMohId"
}, {
    "title": "Date of Application",
    "dataIndex": "applicationDate",
    "key": "applicationDate"
}, {
    "title": "Loaded ",
    "dataIndex": "loaded",
    "key": "loaded"
}, {
    "title": "Type of Goods",
    "dataIndex": "typeOfGoods",
    "key": "typeOfGoods"
}, {
    "title": "Cargo Nature",
    "dataIndex": "cargoNature",
    "key": "cargoNature"
}, {
    "title": "Client Details",
    "dataIndex": "clientDetails",
    "key": "clientDetails"
}, {
    "title": "Expected date of departure",
    "dataIndex": "expectedDepartureDate",
    "key": "expectedDepartureDate"
}, {
    "title": "Expected time of arrival",
    "dataIndex": "expectedDateOfArrival",
    "key": "expectedDateOfArrival"
}, {
    "title": "Country of Departure",
    "dataIndex": "departureCountry",
    "key": "departureCountry"
}, {
    "title": "City of departure",
    "dataIndex": "departureCity",
    "key": "departureCity"
}, {
    "title": "Country of Destination",
    "dataIndex": "destinationCountry",
    "key": "destinationCountry"
}, {
    "title": "Where this travel apporval terminates (country)",
    "dataIndex": "approvalTerminationCountry",
    "key": "approvalTerminationCountry"
}, {
    "title": "Where this travel apporval terminates (city)",
    "dataIndex": "approvalTerminationCity",
    "key": "approvalTerminationCity"
}, {
    "title": "JMP expiry date",
    "dataIndex": "jmpExpiryDate",
    "key": "jmpExpiryDate"
}, {
    "title": "Expected distance for the this approval",
    "dataIndex": "approvalDistance",
    "key": "approvalDistance"
}, {
    "title": "Countries Visited in last 14 days",
    "dataIndex": "lastVisitedCountries",
    "key": "lastVisitedCountries"
}, {
    "title": "Physical address in Uganda",
    "dataIndex": "ugandaPhysicalAddress",
    "key": "ugandaPhysicalAddress"
}, {
    "title": "Planned duration in Uganda in days",
    "dataIndex": "daysInUganda",
    "key": "daysInUganda"
}, {
    "title": "Application Status",
    "dataIndex": "applicationStatus",
    "key": "applicationStatus"
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
        <Table dataSource={data.allApplications.nodes} columns={columns} rowKey="id" scroll={{ x: 1300 }} />
    </Card>
}
