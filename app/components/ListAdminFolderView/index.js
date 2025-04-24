/**
 *
 * ListAdminFolderView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdFolder } from 'react-icons/md/index.esm';
import TreeAdminContextMenu from 'components/TreeAdminContextMenu';
import { FiFile } from 'react-icons/fi/index.esm';
import { Header, Column, Row, Text } from 'components/List';
import FileTypes from 'utils/fileTypes';

const ScrollContainer = styled.div`
  overflow-y: auto;
  padding: 0 26px;
  height: 0;
  flex: 1;
  overflow-x: hidden;
`;

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

function ListAdminFolderView({
  folders,
  files,
  onSelect,
  onOpen,
  identifierContextMenu,
}) {
  const items = [...folders, ...files];

  return (
    <ScrollContainer>
      <Header>
        <Column flex={4}>Nombre</Column>
        <Column>Ultima Modificación</Column>
        <Column>Propietario</Column>
      </Header>
      {items.map(item => (
        <TreeAdminContextMenu
          id={item.id}
          key={item.id}
          selector={getIdentifier(item.type, identifierContextMenu)}
        >
          <Row
            onContextMenu={() => onSelect(item.type, item)}
            onClick={() => onSelect(item.type, item)}
            onDoubleClick={() => onOpen(item.type, item.id)}
          >
            <Column flex={4}>
              <Text>
                {getIcon(item.type)} {item.title}
              </Text>
            </Column>
            <Column>
              <Text>{item.date}</Text>
            </Column>
            <Column>
              <Text>{item.user}</Text>
            </Column>
          </Row>
        </TreeAdminContextMenu>
      ))}
    </ScrollContainer>
  );
}

ListAdminFolderView.propTypes = {
  folders: PropTypes.array,
  files: PropTypes.array,
  onSelect: PropTypes.func,
  onOpen: PropTypes.func,
  identifierContextMenu: PropTypes.string,
};

export default ListAdminFolderView;
