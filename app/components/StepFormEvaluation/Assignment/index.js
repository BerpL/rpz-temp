/**
 *
 * Assignment
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import { MdArrowBack, MdArrowForward } from 'react-icons/md/index.esm';
import ListUsers from './ListUsers';
import ListUsersAssignment from './ListUsersAssignment';

/* hooks */

/* components */

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`;

const Circle = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.base};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 24px 0px 23px 0px;
`;

const ContainerChildren = styled.div`
  display: flex;
  width: 100%;

  height: calc(100% - 71px);
`;

const Left = styled.div`
  width: calc(40% - 56px);
  height: 100%;
  padding: 0 16px;
`;
const Buttons = styled.div`
  flex: 0 0 112px;
  margin-top: 60px;
`;
const Right = styled.div`
  width: calc(60% - 56px);
  height: 100%;
  padding: 0 16px;
`;

function Assignment() {
  return (
    <Container>
      <Title>ASIGNACIÓN</Title>
      <ContainerChildren>
        <Left>
          <ListUsers users={usersData} />
        </Left>
        <Buttons>
          <Button
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 112,
              marginBottom: 30,
            }}
          >
            ASIGNAR
            <Circle style={{ marginLeft: 10 }}>
              <MdArrowForward />
            </Circle>
          </Button>
          <Button style={{ display: 'flex', alignItems: 'center', width: 112 }}>
            <Circle style={{ marginRight: 10 }}>
              <MdArrowBack />
            </Circle>
            QUITAR
          </Button>
        </Buttons>
        <Right>
          <ListUsersAssignment users={usersDataAssignment} />
        </Right>
      </ContainerChildren>
    </Container>
  );
}

Assignment.propTypes = {};

export default Assignment;

const usersData = [
  {
    idUsuario: 1,
    nombres: 'Luigi Lizares',
    grupo: 'Administrador',
  },
  {
    idUsuario: 2,
    nombres: 'Brian Pareja',
    grupo: 'Administrador',
  },
  {
    idUsuario: 3,
    nombres: 'Luis Valencia',
    grupo: 'Administrador',
  },
  {
    idUsuario: 4,
    nombres: 'Andy Barreda',
    grupo: 'Administrador',
  },
  {
    idUsuario: 5,
    nombres: 'Luis Muñoz',
    grupo: 'Administrador',
  },
];

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
