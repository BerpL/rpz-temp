/**
 *
 * ContainerRenderedQuizzes
 *
 */

import React from 'react';
import styled from 'styled-components';
import ContainerInline from 'components/ContainerInline';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import ListAdminRenderedQuizzes from 'components/ListAdminRenderedQuizzes';
import Select from 'components/Select';

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
function ContainerRenderedQuizzes() {
  return (
    <C0>
      <C1>
        <C2>
          <ContainerInline
            style={{ padding: '0px 32px' }}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <TitleModuleAdmin title="Rendered Evaluations" />
            <Wrapper>
              <span>Groups</span>
              <Select options={groupsData} message="Select a group" />
            </Wrapper>
          </ContainerInline>
          <S1 noPadding>
            <Co02>
              <ListAdminRenderedQuizzes users={usersData} />
            </Co02>
          </S1>
        </C2>
      </C1>
    </C0>
  );
}

ContainerRenderedQuizzes.propTypes = {};

export default ContainerRenderedQuizzes;

const usersData = [
  {
    id: 1,
    quiz: 'Evaluation 01',
    user: 'Juan Perez de la Torre',
    date: '10 May. 2019',
    puntuation: '80%',
    answers: 30,
  },

  {
    id: 1,
    quiz: 'Evaluation 01',
    user: 'Melissa Nuñes Muñoz',
    date: '10 May. 2019',
    puntuation: '90%',
    answers: 30,
  },
];

const groupsData = [
  {
    id: 1,
    key: 'usuarios',
    value: 'Users',
  },

  {
    id: 2,
    key: 'administradores',
    value: 'Administrators',
  },
];
