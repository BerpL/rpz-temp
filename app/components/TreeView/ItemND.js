import React from 'react';
import {
  MdFolder,
  MdPlayArrow,
  MdSettings,
  MdInsertDriveFile,
} from 'react-icons/md/index.esm';
import PropTypes from 'prop-types';

import TreeAdminContextMenu from 'components/TreeAdminContextMenu';
import styled from 'styled-components';

import FileTypes from 'utils/fileTypes';
import ItemStyle from './ItemStyle';
import Tree from './Tree';

const getIcon = (type = '') => {
  switch (type) {
    case FileTypes.Folder:
      return <MdFolder />;
    case FileTypes.GROUP_ALARM:
      return <MdSettings />;
    case FileTypes.File:
      return <MdInsertDriveFile size={18} />;
    default:
      return null;
  }
};

const getSelector = (type = '') => {
  switch (type) {
    case FileTypes.Folder:
      return 'menu_folder_group';
    case FileTypes.GROUP_ALARM:
      return 'menu_group';
    default:
      return '---';
  }
};

const ArrowIcon = styled.div`
  font-weight: bold;
  transition: transform 0.4s;
  transform: rotate(${({ collapsed }) => (collapsed ? '90deg' : '0deg')});
  vertical-align: middle;
`;

const SpanText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 35px);
  display: inline-block;
  vertical-align: middle;
  color: ${({ selected, theme: { text, primary } }) =>
    selected ? primary : text};
  white-space: nowrap;
`;

const ItemSelectable = styled.span`
  cursor: pointer;
  display: block;
  flex: 1;
  color: ${({ theme: { textBold } }) => textBold};
  > svg {
    margin-right: 10px;
    margin-left: 5px;
    flex: 0 0 20px;
    font-size: 20px;
    color: ${({ theme: { primaryLight } }) => primaryLight};
  }
`;

const LiStyle = {
  padding: 0,
  margin: 0,
  borderWidth: 0,
  position: 'static',
  top: 'auto',
  display: 'block',
};

function Item({
  onClickItem,
  item: { id, title, children, selected, open, type },
  move,
  find,
  level,
  onToggleItem,
  control,
}) {
  const handleClickItem = identifier => {
    onClickItem(identifier);
  };
  const selector = getSelector(type);
  const isFile = type === FileTypes.File;

  return (
    <li style={LiStyle}>
      <TreeAdminContextMenu
        id={id}
        isDragging={false}
        selector={control ? selector : 'menu_folder'}
      >
        <ItemStyle
          style={{
            paddingLeft: isFile ? (level + 1) * 10 + 3 : (level + 1) * 10,
          }}
          selected={selected}
          isOverCurrent={false}
          isMoved={false}
        >
          {!isFile && (
            <ArrowIcon collapsed={open} onClick={() => onToggleItem(id)}>
              <MdPlayArrow />
            </ArrowIcon>
          )}

          <ItemSelectable onClick={() => handleClickItem(id)}>
            {getIcon(type)}
            <SpanText selected={selected}>{title}</SpanText>
          </ItemSelectable>
        </ItemStyle>
      </TreeAdminContextMenu>
      <Tree
        level={level + 1}
        collapsed={open}
        onToggleItem={onToggleItem}
        parent={id}
        onClickItem={onClickItem}
        title={title}
        items={children}
        move={move}
        control={control}
        find={find}
      />
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  move: PropTypes.func,
  find: PropTypes.func,
  onClickItem: PropTypes.func,
  level: PropTypes.number,
  onToggleItem: PropTypes.func,
  control: PropTypes.bool,
};

export default Item;
