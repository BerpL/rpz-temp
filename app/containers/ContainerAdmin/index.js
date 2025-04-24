/**
 *
 * ContainerAdmin
 *
 */

import React, { useState, useEffect } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withTheme } from 'styled-components';
/* components */
import TreeContainerAdmin from 'components/TreeContainerAdmin';
import BodyContainer from 'V2/components/AdminContainer';
import SidebarContainer from 'V2/components/AdminSidebar';
import Navbar from 'V2/components/AdminNavbar';
import ContentContainer from 'V2/components/AdminContent';
import Wrapper from 'V2/components/AdminWrapper';

import { AccountService, AuthService, TicketService } from 'servicesV2';

import Storage from '../../storage';

import AdminUsers from 'containers/ContainerAdminUsers/Loadable';
import AdminGroups from 'containers/ContainerAdminGroups/Loadable';
import AdminAccessControl from 'containers/ContainerAdminAccessControl/Loadable';
import AdminFileManager from 'containers/ContainerAdminFileManager/Loadable';
import AdminVideos from 'components/ContainerAdminVideos/Loadable';
import AdminDiagrams from 'components/ContainerAdminDiagrams/Loadable';
import AdminQuizzesReport from 'components/ContainerQuizzesReport/Loadable';
import AdminQuizReport from 'components/ContainerQuizReport/Loadable';
import AdminObjects3D from 'components/ContainerAdminObjetos3D/Loadable';
import AdminMediaFileManager from 'containers/ContainerAdminMediaFileManager/Loadable';
import ContainerProcessControl from 'components/ContainerProcessControl/Loadable';
import Pid from 'components/ContainerPid/Loadable';
import Procedures from 'components/ContainerProcedures/Loadable';
import AreasKnowledge from 'components/ContainerAdminAreasKnowledge/Loadable';
import Quizes from 'components/ContainerQuizes/Loadable';
import Quiz from 'components/ContainerQuiz/Loadable';
import AdminBalances from 'containers/Admin/Balance/Loadable';
import AdminAccesos from 'containers/Admin/Accesos/Loadable';
import AdminDiagramsAccess from 'containers/Admin/PermisosDiagramas/Loadable';
import AdminVideosAccess from 'containers/Admin/PermisosVideos/Loadable';
import AdminPidAccess from 'containers/Admin/PermisosPIDs/Loadable'
import AdminProcesosAccess from 'containers/Admin/PermisosProcesos/Loadable'
import History from 'utils/history';
function ContainerAdmin({ location }) {
  const [modulesTmp, setModulesTmp] = useState([]);
  const [auth] = useState(new AuthService());
  const [account] = useState(new AccountService());
  const [user] = useState(Storage.getUser());
  const [name, setName] = useState('');
  const [ticketService] = useState(new TicketService());

  const goTo = pathname => {
    if (location.pathname === pathname) return null;
    return History.push(pathname);
  };

  const handleLogOut = async () => {
    const currentDate = new Date();
    const sessionStart = new Date(Number(Storage.getStartSession()));
    const tiempoInterface = Math.floor((currentDate - sessionStart) / 60000); // Convertir de milisegundos a minutos
    const record = {
      fechaHoraIngreso: sessionStart.toISOString(),
      fechaHoraSalida: currentDate.toISOString(),
      tiempoInterface,
    };
    try {
      await ticketService.addRecord(record);
    } catch (error) {
      console.error('Error al finalizar la sesión:', error);
    }
    auth.signOut();
    goTo('/login');
  };

  const handleInterface = () => {
    goTo('/');
  };
  // const handleChangePassword = () => {};
  const handleItem = item => {
    if (item.url) {
      setName(item.nombre);
      History.push(item.url);
    }
  };

  useEffect(() => {
    // modules.unshift(panelPrincipal);
    const modules = account.allowedModules();

    setModulesTmp(modules);

    modules.find(a => {
      const subModulo = a.subModulos.find(b =>
        b.url.includes(location.pathname),
      );

      if (subModulo) {
        setName(subModulo.nombre);
        return subModulo;
      }

      return false;
    });
  }, []);

  return (
    <Wrapper>
      <Navbar name={name} />
        <SidebarContainer>
        <TreeContainerAdmin
          onGoInterfaz={handleInterface}
          onLogout={handleLogOut}
          hasInterface={account.allowInterfaceView()}
          user={user}
          modules={modulesTmp}
          onItem={handleItem}
          selected={location.pathname}
        />
      </SidebarContainer>
      <BodyContainer>
        <ContentContainer>
          <Route path="/admin/question" component={AreasKnowledge} />
          <Route path="/admin/control" component={ContainerProcessControl} />
          <Route exact path="/admin/quizzes" component={Quizes} />
          <Route path="/admin/procedures" component={Procedures} />
          <Route path="/admin/media" component={AdminMediaFileManager} />
          <Route path="/admin/pids" component={Pid} />
          <Route path="/admin/archives" component={AdminFileManager} />
          <Route exact path="/admin/quiz/:id" component={Quiz} />
          <Route path="/admin/quizzes/reports" component={AdminQuizzesReport} />
          <Route
            exact
            path="/admin/quiz/:id/report"
            component={AdminQuizReport}
          />
          <Route path="/admin/user" component={AdminUsers} />
          <Route path="/admin/group" component={AdminGroups} />
          <Route path="/admin/diagrams" component={AdminDiagrams} />
          <Route path="/admin/balances" component={AdminBalances} />
          <Route path="/admin/folderaccess" component={AdminAccesos} />
          <Route path="/admin/diagramsaccess" component={AdminDiagramsAccess} />
          <Route path="/admin/videoaccess" component={AdminVideosAccess} />
          <Route path="/admin/pidaccess" component={AdminPidAccess} />
          <Route path="/admin/processaccess" component={AdminProcesosAccess} />
          <Route path="/admin/objects3D" component={AdminObjects3D} />
          <Route path="/admin/videos" component={AdminVideos} />
          <Route path="/admin/access" component={AdminAccessControl} />
        </ContentContainer>
      </BodyContainer>
    </Wrapper>
  );
}

ContainerAdmin.propTypes = {
  location: PropTypes.object,
};

export default withTheme(ContainerAdmin);
