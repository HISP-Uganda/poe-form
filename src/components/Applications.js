import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PrintApplication } from "./PrintApplication";
import { CompanyApplications } from "./CompanyApplications";

export const Applications = () => {
  let { path } = useRouteMatch();
  return <Switch>
    <Route exact path={path}>
      <CompanyApplications />
    </Route>
    <Route path={`${path}/:application`}>
      <PrintApplication />
    </Route>
  </Switch>
}
