import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from 'containers/PrivateRoute';
import AdminPage from 'containers/ContainerAdmin/Loadable';
import HomePage from 'components/ContainerHome/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import FlowDiagrams from 'components/FlowDiagrams/Loadable';
import FlowDiagram from 'components/FlowDiagram/Loadable';
import VirtualWalks from 'components/VirtualWalks/Loadable';
import VirtualWalk from 'components/VirtualWalk/Loadable';
import VisorInteractivo from 'components/IFrame';
import Login from 'containers/Login/Loadable';
import Area from 'components/Area/Loadable';
import Evaluations from 'components/Evaluations/Loadable';
import Pids from 'components/Interface/Pids/Loadable';
import Procedures from 'components/Interface/Procedures/Loadable';
import Evaluation from 'components/Evaluation/Loadable';
import BalanceForm from '../../V2/components/AdminBalanceForm';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  height: 100%;
  min-height: 100%;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  flex-grow: 1;
`;
//overflow: auto;
export default () => {
  return (
    <AppWrapper>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/admin" component={AdminPage} />
        <PrivateRoute path="/evaluations" component={Evaluations} />
        <PrivateRoute path="/evaluation/:id" component={Evaluation} />
        <PrivateRoute path="/flowdiagrams" component={FlowDiagrams} />
        <PrivateRoute path="/flowdiagram/:id" component={FlowDiagram} />
        <PrivateRoute path="/virtualwalks" component={VirtualWalks} />
        <PrivateRoute path="/procedures" component={Procedures} />
        <PrivateRoute path="/pids" component={Pids} />
        <PrivateRoute path="/area/:id" component={Area} />
        <PrivateRoute path="/virtualwalk/:id" component={VirtualWalk} />
        <PrivateRoute path="/InteractiveEquipment/:tipointeractivo" component={VisorInteractivo} />
        <PrivateRoute path="/balanceform" component={BalanceForm} />
        <Route path="/login" component={Login} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
