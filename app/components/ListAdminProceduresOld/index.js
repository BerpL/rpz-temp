/**
 *
 * ListAdminProcedures
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Column, Row, Text } from 'components/List';
import FileTypes from 'utils/fileTypes';
import TreeAdminContextMenu from 'components/TreeAdminContextMenu';
import { MdFolder } from 'react-icons/md/index.esm';
import { FiFile } from 'react-icons/fi/index.esm';

const getIdentifier = (type = '', identifierContextMenu = null) => {
  switch (type) {
    case FileTypes.Folder:
      return identifierContextMenu || 'menu_folder_list';
    case FileTypes.File:
      return 'menu_file';
    case FileTypes.GROUP_ALARM:
      return 'menu_group_alarm';
    default:
      return null;
  }
};

const getIcon = (type = '') => {
  switch (type) {
    case FileTypes.Folder:
      return <MdFolder />;
    case FileTypes.File:
      return <FiFile style={{ fill: 'none', fontSize: 16 }} />;
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

function ListAdminProcedures({
  identifierContextMenu,
  header,
  onOpen,
  procedures,
  onSelect,
  folders,
}) {
  const items = [...folders, ...procedures];
  return (
    <C1>
      <C2>
        <S1 direction="column" noPadding>
          <div>{header}</div>

          <Header style={{ padding: '0px 16px' }}>
            <Column flex={10}>Nombre</Column>
            <Column flex={4}>Fecha de creación</Column>
            <Column flex={4}>Fecha de edición</Column>
          </Header>
          <Co02>
            {items.map(item => (
              <TreeAdminContextMenu
                id={item.id}
                key={item.id}
                selector={getIdentifier(item.type, identifierContextMenu)}
              >
                <Row
                  onDoubleClick={() => onOpen(item.type, item.id)}
                  onClick={() => onSelect(item.type, item)}
                  onContextMenu={() => onSelect(item.type, item)}
                >
                  <Column flex={10}>
                    <Text>
                      {getIcon(item.type)} {item.title}
                    </Text>
                  </Column>
                  <Column flex={4}>
                    <Text>{item.createdAt}</Text>
                  </Column>
                  <Column flex={4}>
                    <Text>{item.editedAt}</Text>
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

ListAdminProcedures.propTypes = {
  procedures: PropTypes.array,
  identifierContextMenu: PropTypes.string,
  header: PropTypes.any,
  onOpen: PropTypes.func,
  onSelect: PropTypes.func,
  folders: PropTypes.array,
};

export default ListAdminProcedures;
