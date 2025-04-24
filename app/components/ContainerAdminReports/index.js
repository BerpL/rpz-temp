/**
 *
 * ContainerAdminReports
 *
 */

import React from 'react';
import styled from 'styled-components';
import ContainerInline from 'components/ContainerInline';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import Select from 'components/Select';
import ListAdminReports from 'components/ListAdminReports';

const C0 = styled.div`
  width: 100%;
  height: 100%;
`;

const C1 = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const C2 = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const S1 = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  padding: ${({ noPadding }) => noPadding || '0px 26px'};
  flex-direction: ${({ direction }) => direction || 'row'};
  /* for Firefox */
  min-height: 0;
`;

const Co02 = styled.div`
  overflow: auto;
  flex-shrink: 1;
  flex-grow: 1;
  padding: ${({ noPadding }) => noPadding || '0px 16px'};
  /* for Firefox */
  min-height: 0;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  span,
  select,
  div {
    margin-right: 10px;
  }

  span {
    color: ${({ theme: { textBold } }) => textBold};
  }
`;
function ContainerAdminReports() {
  return (
    <C0>
      <C1>
        <C2>
          <ContainerInline
            style={{ padding: '0px 32px' }}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <TitleModuleAdmin title="Reports" />
          </ContainerInline>
          <ContainerInline
            style={{ padding: '10px 37px' }}
            alignItems="flex-end"
            justifyContent="flex-start"
          >
            <Wrapper>
              <span>Evaluations</span>
              <Select
                options={quizzesData}
                message="Select an evaluation"
              />
            </Wrapper>
            <Wrapper>
              <span>Groups</span>
              <Select options={groupsData} message="Select a group" />
            </Wrapper>
          </ContainerInline>
          <S1 noPadding>
            <Co02>
              <ListAdminReports users={usersData} />
            </Co02>
          </S1>
        </C2>
      </C1>
    </C0>
  );
}

ContainerAdminReports.propTypes = {};

export default ContainerAdminReports;

const usersData = [
  {
    id: 1,
    nombres: 'Projects',
    apellidos: 'Projects',
    usuario: 'admin',
    puntuation: '80%',
  },

  {
    id: 2,
    nombres: 'user01',
    apellidos: 'user01',
    usuario: 'user01',
    puntuation: '50%',
  },
];

const quizzesData = [
  {
    id: 1,
    key: 'evaluation_01',
    value: 'Evaluation 01',
  },

  {
    id: 2,
    key: 'evaluation_02',
    value: 'Evaluation 02',
  },
];

const groupsData = [
  {
    id: 1,
    key: 'users',
    value: 'Users',
  },

  {
    id: 2,
    key: 'administrators',
    value: 'Administrators',
  },
];
