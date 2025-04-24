/**
 *
 * ListAdminRenderedQuizzes
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FileTypes from 'utils/fileTypes';
import { Header, Column, Row, Text } from 'components/List';
import TreeAdminContextMenu from 'components/TreeAdminContextMenu';

const getIdentifier = (type = '', identifierContextMenu = null) => {
  switch (type) {
    case FileTypes.Folder:
      return identifierContextMenu || 'menu_folder_list';
    case FileTypes.File:
      return 'menu_file';
    case FileTypes.GROUP_ALARM:
      return 'menu_group_alarm';
    default:
      return 'null';
  }
};

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

function ListAdminRenderedQuizzes({ users, identifierContextMenu, onOpen }) {
  return (
    <C1>
      <C2>
        <S1 direction="column" noPadding>
          <Header style={{ padding: '0px 16px' }}>
            <Column flex={5}>Evaluation</Column>
            <Column flex={5}>User</Column>
            <Column flex={4}>Date</Column>
            <Column flex={3}>Rating (%)</Column>
            <Column flex={3}>Number of questions</Column>
          </Header>
          <Co02>
            {users.map(item => (
              <TreeAdminContextMenu
                id={item.id}
                key={item.id}
                selector={getIdentifier(item.type, identifierContextMenu)}
              >
                <Row onDoubleClick={() => onOpen(item.type, item.id)}>
                  <Column flex={5}>
                    <Text>{item.quiz}</Text>
                  </Column>
                  <Column flex={5}>
                    <Text>{item.user}</Text>
                  </Column>
                  <Column flex={4}>
                    <Text>{item.date}</Text>
                  </Column>
                  <Column flex={3}>
                    <Text>{item.puntuation}</Text>
                  </Column>
                  <Column flex={3}>
                    <Text>{item.answers}</Text>
                  </Column>
                </Row>
              </TreeAdminContextMenu>
            ))}
          </Co02>
        </S1>
      </C2>
    </C1>
  );
}

ListAdminRenderedQuizzes.propTypes = {
  users: PropTypes.array,
  identifierContextMenu: PropTypes.string,
  onOpen: PropTypes.func,
};

export default ListAdminRenderedQuizzes;
