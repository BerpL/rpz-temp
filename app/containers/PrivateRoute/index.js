import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthService, TicketService, AccountService } from 'servicesV2';
import Storage from 'storage';
import axios from 'axios';
import IdlerTimer from 'components/IdleTimer';
import history from 'utils/history';
import { getAllMainTreesKnowledge } from 'services/ArbolPrincipalService';
import { hostUrlApi } from 'services/Api';

const actualizarTiempoInterfaz = (ticketService) => {
  let startDate = new Date();
  const id = setInterval(() => {
    // const endDate = new Date();
    // guardarTiempoEntrenamiento(ticketService, {startDate, endDate, time: 0});
    // console.log("actualizarTiempoInterfaz");
    // startDate = endDate;
  }, 60000);

  return id;
}


const actualizarTiempoInterfazEntrenamiento = (ticketService) => {
  let startDate = new Date();
  setTimeout(() => {
    const endDate = new Date();
    guardarTiempoEntrenamiento(ticketService, { startDate, endDate, time: 1 });
    console.log("actualizarTiempoInterfazEntrenamiento");
    startDate = endDate;
  }, 60000);
}

const guardarTiempoEntrenamiento = (ticketService, { startDate, endDate, time }) => {
  ticketService.addRecord({
    fechaHoraIngreso: startDate.toJSON(),
    fechaHoraSalida: endDate.toJSON(),
    tiempoInterface: time,
  });
}

function PrivateRoute({ component: Component, ...rest }) {
  const [ticketService] = useState(new TicketService());
  const [accountService] = useState(new AccountService());
  const token = Storage.getToken();
  const [auth] = useState(new AuthService())

  const getAuthorized = async () => {
    
    let authorized;
    try {
      await accountService.me();
      authorized = false;
    } catch (error) {
      console.log(error);
      authorized = true;
    }

    if(authorized) {
      auth.signOut();
      history.replace('/login');
    }
  }

  useEffect(
    () => {
      getAuthorized()
    },
    []
  );

  useEffect(
    () => {
      // const response = getAuthorized();
      if (token) {
        const isAuthorized = accountService.isAuthotized(
          rest.location.pathname,
        );
        if (!isAuthorized) history.replace('/login');
      }
    },
    [rest.location.pathname, token],
  );

  useEffect(
    () => {
      let idInterval;
      if (token) {
        idInterval = actualizarTiempoInterfaz(ticketService);
      }

      return () => {
        if (idInterval) clearInterval();
      }
    },
    []
  );


  // useEffect(
  //   () => {
  //     if(token){
  //       const location = rest.location.pathname;
  //       console.log(location);
  //       if (location.includes('/area')) {
  //         actualizarTiempoInterfazEntrenamiento(ticketService);
  //       }
  //     }
  //   },
  //   [rest.location.pathname]
  // );
  return (

    <Route
      {...rest}
      render={props =>
        token ? (
          <IdlerTimer>
            <Component {...props} />
          </IdlerTimer>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
