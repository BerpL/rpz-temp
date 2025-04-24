/**
 *
 * Assignment
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

/* hooks */

/* components */
import ListUsers from './ListUsers';

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`;

const InnerContainer = styled.div`
  max-width: 850px;
  margin: auto;
`;

const Title = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 24px 0px 23px 0px;
`;

function Assignment() {
  return (
    <Container>
      <Title>PERIODO DE EVALUACIÓN</Title>
      <InnerContainer>
        <ListUsers users={usersDataAssignment} />
      </InnerContainer>
    </Container>
  );
}

Assignment.propTypes = {};

export default Assignment;

const usersDataAssignment = [
  {
    idUsuario: 1,
    estado: 'Inscrito',
    nombres: 'Luigi Lizares',
    grupo: 'Administrador',
    usuario: 'llizares',
  },
  {
    idUsuario: 2,
    estado: 'Inscrito',
    nombres: 'Brian Pareja',
    grupo: 'Administrador',
    usuario: 'bpareja',
  },
  {
    idUsuario: 3,
    estado: 'En proceso',
    nombres: 'Luis Valencia',
    grupo: 'Administrador',
    usuario: 'lvalencia',
  },
  {
    idUsuario: 4,
    estado: 'Evaluado',
    nombres: 'Andy Barreda',
    grupo: 'Administrador',
    usuario: 'abarreda',
  },
  {
    idUsuario: 5,
    estado: 'Evaluado',
    nombres: 'Luis Muñoz',
    grupo: 'Administrador',
    usuario: 'lmuñoz',
  },
];
