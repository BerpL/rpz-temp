import React from 'react';
import styled from 'styled-components';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MdFolder, MdSettings, MdInsertDriveFile } from 'react-icons/md/index.esm';
import { IoIosArrowDown } from 'react-icons/io/index.esm';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

/** utilities */
import flow from 'lodash/flow';
import FileTypes from 'utils/fileTypes';
import { lighten } from 'polished';

/** components */
import TreeAdminContextMenu from 'components/TreeAdminContextMenu';
import Tree from './Tree';
import ItemStyle from './ItemStyle';

/** configurations drag and drop */
const target = {
  drop(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId === overId || draggedId === props.parent) return;
    if (!monitor.isOver({ shallow: true })) return;

    props.move(draggedId, overId, props.parent);
  },
};

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      parent: props.parent,
      nombre: props.nombre,
      items: props.item.nodos,
    };
  },
  canDrag(props) {
    return props.level === 0 ? false : props.draggable;
  },
};

/** functions select component */
const renderIcon = (type = '') => {
  switch (type) {
    case FileTypes.Folder:
      return <MdFolder />;
    case FileTypes.GROUP_ALARM:
      return <MdSettings />;
    case FileTypes.File:
      return <MdInsertDriveFile size={18} />;
    default:
      return <MdFolder />;
  }
};

const getTypeModal = (type = '', level, isControl = false) => {
  switch (type) {
    case 'arbol_principal': {
      if (level === 1) {
        return 'menu_folder_image';
      }
      if (level !== 1) {
        return 'menu_folder';
      }
      break;
    }
    case 'grupo_control': {
      if (isControl) {
        return 'menu_group';
      }
      return 'menu_folder_group';
    }
    default:
      return 'menu_folder';
  }
};

const ArrowIcon = styled.div`
  font-weight: bold;
  font-size: 13px;
  transition: transform 0.4s;
  transform: rotate(${({ collapsed }) => (collapsed ? '0deg' : '-90deg')});
  vertical-align: middle;
`;

const Icon = styled.div`
  position: relative;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SpanText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 35px);
  display: inline-block;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

const ItemSelectable = styled.span`
  cursor: pointer;
  display: block;
  flex: 1;
  color: ${({ theme: { textBold } }) => textBold};
  > svg {
    margin-right: 5px;
    flex: 0 0 16px;
    font-size: 16px;
    color: ${({ theme }) => lighten('0.2', theme.colors.primary)};
  }
`;

/** styles item container */
const style = {
  padding: 0,
  margin: 0,
  borderWidth: 0,
  position: 'static',
  top: 'auto',
  display: 'block',
};

function Item({
  connectDropTarget,
  connectDragSource,
  isDragging,
  onClickItem,
  item: {
    id = -1,
    nombre,
    nodos,
    selected,
    open,
    type: typeItem,
    esGrupo = false,
  },
  connectDragPreview,
  isOverCurrent,
  move,
  find,
  level,
  onToggleItem,
  draggable,
  control,
  type,
}) {
  const handleClickItem = identifier => {
    onClickItem(identifier);
  };

  if (connectDragPreview) {
    connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  const selector = getTypeModal(type, level, esGrupo);

  const hasChild = nodos && nodos.length > 0;

  const renderIconCollapsed = () => (
    <Icon>
      {hasChild && (
        <ArrowIcon collapsed={open} onClick={() => onToggleItem(id)}>
          <IoIosArrowDown />
        </ArrowIcon>
      )}
    </Icon>
  );

  const renderChildren = () =>
    hasChild && (
      <Tree
        level={level + 1}
        collapsed={open}
        onToggleItem={onToggleItem}
        parent={id}
        onClickItem={onClickItem}
        nombre={nombre}
        type={type}
        draggable={draggable}
        items={nodos}
        move={move}
        control={control}
        find={find}
      />
    );

  return connectDropTarget(
    connectDragSource(
      <li style={style}>
        <TreeAdminContextMenu
          id={id}
          level={level}
          isDragging={isDragging}
          selector={selector}
        >
          <ItemStyle
            style={{ paddingLeft: (level + 1) * 10 }}
            selected={selected}
            isOverCurrent={isOverCurrent}
            isMoved={isDragging}
          >
            {renderIconCollapsed()}
            <ItemSelectable onClick={() => handleClickItem(id)}>
              {renderIcon(esGrupo ? FileTypes.GROUP_ALARM : typeItem)}
              <SpanText selected={selected}>{nombre}</SpanText>
            </ItemSelectable>
          </ItemStyle>
        </TreeAdminContextMenu>
        {renderChildren()}
      </li>,
    ),
  );
}

Item.propTypes = {
  item: PropTypes.object,
  move: PropTypes.func,
  find: PropTypes.func,
  onClickItem: PropTypes.func,
  connectDropTarget: PropTypes.func,
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  isOverCurrent: PropTypes.bool,
  isDragging: PropTypes.bool,
  onToggleItem: PropTypes.func,
  type: PropTypes.string,
};

Item.defaultProps = {
  collapsed: false,
};

export default flow(
  DropTarget('ITEM', target, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  })),
  DragSource('ITEM', source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
)(Item);
