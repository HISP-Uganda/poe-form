import React from "react";
import { Link, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { Applications } from "./Applications";
import { Staff } from "./Staff";
import { Layout, Menu } from 'antd';
import { ApplicationForm } from "./ApplicationForm";
import { StaffForm } from "./StaffForm";
import { Vehicles } from "./Vehicles";
import { VehicleForm } from "./VehicleForm";
import { logout } from "./utils";

const { Header, Content, Footer } = Layout;

export const Home = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory();

  const destroy = () => {
    logout();
    history.push('/')
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{ display: 'flex' }}>
          <Menu.Item key="1"><Link to={`${url}/applications`}>Applications</Link></Menu.Item>
          <Menu.Item key="2"><Link to={`${url}/staff`}>Staff</Link></Menu.Item>
          <Menu.Item key="3"><Link to={`${url}/vehicles`}>Vehicles</Link></Menu.Item>
          <Menu.Item key="4" style={{ marginLeft: 'auto' }} onClick={destroy}>Logout</Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <Switch>
          <Route exact path={path}>
            <Applications />
          </Route>
          <Route path={`${path}/applications`}>
            <Applications />
          </Route>
          <Route path={`${path}/vehicles`}>
            <Vehicles />
          </Route><Route path={`${path}/staff`}>
            <Staff />
          </Route>
          <Route path={`${path}/application-form`}>
            <ApplicationForm />
          </Route>
          <Route path={`${path}/staff-form`}>
            <StaffForm />
          </Route>
          <Route path={`${path}/vehicle-form`}>
            <VehicleForm />
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>HISP Uganda ©2020</Footer>
    </Layout>
  )
}
