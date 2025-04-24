/**
 *
 * ListAlarmInterlock
 *
 */

import React from 'react';
// import PropTypes from 'prop-typess';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Column, Row, Text } from 'components/List';
import FileTypes from 'utils/fileTypes';
import TreeAdminContextMenu from 'components/TreeAdminContextMenu';
import ButtonAdmin from 'components/ButtonAdmin';

const getIdentifier = (type = '', identifierContextMenu = null) => {
  switch (type) {
    case FileTypes.Folder:
      return identifierContextMenu || 'menu_folder_list';
    case FileTypes.File:
      return 'menu_file';
    default:
      return null;
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

function ListAlarmInterlock({ files, identifierContextMenu }) {
  return (
    <C1>
      <C2>
        <S1 direction="column" noPadding>
          <div style={{ padding: '0px 16px 15px' }}>
            <ButtonAdmin sm>New Interlock/Alarm</ButtonAdmin>
          </div>

          <Header style={{ padding: '0px 16px' }}>
            <Column flex="none">Id</Column>
            <Column flex={14}>Instrument</Column>
          </Header>
          <Co02>
            {files.map(item => (
              <TreeAdminContextMenu
                id={item.id}
                key={item.id}
                selector={getIdentifier(item.type, identifierContextMenu)}
              >
                <Row>
                  <Column flex="none">
                    <Text>{item.identifier}</Text>
                  </Column>
                  <Column flex={14}>
                    <Text>{item.instrument}</Text>
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

ListAlarmInterlock.propTypes = {
  files: PropTypes.array,
  identifierContextMenu: PropTypes.string,
};

export default ListAlarmInterlock;
