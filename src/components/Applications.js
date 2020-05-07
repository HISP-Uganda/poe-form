import React from "react";
import {Card, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {Link, Route, Switch, useHistory, useRouteMatch} from 'react-router-dom'
import {PrintApplication} from "./PrintApplication";

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
export const Applications = () => {
  const history = useHistory();
  let {path} = useRouteMatch();

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
    {
      title: 'action',
      dataIndex: 'Action',
      key: 'action',
      render: (text, record) => <Link to={`/home/applications/${record.name}`}>View</Link>,
    }
  ];
  const addApplication = () => {
    history.push('/home/application-form')
  }
  return <Switch>
    <Route exact path={path}>
      <Card
        title="Applications"
        extra={<PlusOutlined style={{fontSize: 24, cursor: 'pointer'}} onClick={addApplication}/>}
      >
        <Table dataSource={dataSource} columns={columns}/>
      </Card>
    </Route>
    <Route path={`${path}/:application`}>
      <PrintApplication/>
    </Route>
  </Switch>
}
