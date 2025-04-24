/**
 *
 * ContainerAdminAssignmentQuizzes
 *
 */

import React from 'react';
import styled from 'styled-components';
// import Button from 'components/Button';
import ContainerInline from 'components/ContainerInline';
import Button from 'components/Button';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import ListAdminAssignmentQuizzes from 'components/ListAdminAssignmentQuizzes';
import Select from 'components/Select';
import NavbarAdmin from 'components/NavbarAdmin';
import Sticky from 'react-sticky-el';
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io/index.esm';
import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';

const ButtonStyled = styled(Button)`
  display: inline-block;
  width: auto;
`;

function ContainerAdminAssignmentQuizzes() {
  return (
    <ContainerFlex>
      <Sticky stickyStyle={{ zIndex: 100 }}>
        <Row height="65px" display="unset" width="100%">
          <NavbarAdmin>
            <Con
              width="1000px"
              maxWidth="1000px"
              flexDirection="row"
              flexGrow="1"
              alignItems="center"
              justifyContent="flex-start"
            >
              <ButtonStyled onClick={() => { }}>
                <IoIosSearch />
                Find an Assessment
              </ButtonStyled>
              <ButtonStyled onClick={() => setOpenModal(true)}>
                <IoIosAddCircle />
                New Assessment
              </ButtonStyled>
            </Con>
          </NavbarAdmin>
        </Row>
      </Sticky>
      <Row>
        <ContainerInline
          style={{ padding: '0px 32px' }}
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <span>Assessments</span>
          <Select options={quizzesData} message="Select an assessment" />
        </ContainerInline>
      </Row>

      <Row width="100%" flexGrow={1} padding="26px 0 26px 0">
        <Col width="100%" flexGrow={1} padding="0">
          <Con width="1000px" maxWidth="1000px">
            <ListAdminAssignmentQuizzes users={usersData} />
          </Con>
        </Col>
      </Row>
    </ContainerFlex>
  );
}

ContainerAdminAssignmentQuizzes.propTypes = {};

export default ContainerAdminAssignmentQuizzes;

const usersData = [
  {
    id: 1,
    nombres: 'Proyectos',
    apellidos: 'Proyectos',
    usuario: 'admin',
    grupo: 'Administradores',
  },

  {
    id: 2,
    nombres: 'usuario01',
    apellidos: 'usuario01',
    usuario: 'usuario01',
    grupo: 'Usuarios',
  },
];

const quizzesData = [
  {
    id: 1,
    key: 'evaluacion_01',
    value: 'Evaluacion 01',
  },

  {
    id: 2,
    key: 'evaluacion_02',
    value: 'Evaluacion 02',
  },
];
