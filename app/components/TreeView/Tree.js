import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Item from './Item';
// import ItemND from './ItemND';

const ContainerSubTree = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: 0;
  margin: 0;
  overflow: hidden;
  transition: ${({ collapsed }) =>
    collapsed ? 'max-height .5s, opacity .4s' : 'none'};
  opacity: ${({ collapsed }) => (collapsed ? 1 : 0)};
  max-height: ${({ collapsed }) => (collapsed ? '5000000000px' : '0px')};
`;

const Tree = ({
  items,
  parent,
  move,
  find,
  collapsed,
  onClickItem,
  onToggleItem,
  level,
  nodeMain,
  control,
  type,
  draggable,
}) => (
  <ContainerSubTree collapsed={collapsed} nodeMain={nodeMain}>
    {items &&
      items.map(item => (
        <Item
          draggable={draggable}
          level={level}
          onToggleItem={onToggleItem}
          key={item.id || -1}
          id={item.id}
          type={type}
          onClickItem={onClickItem}
          nombre={item.nombre}
          parent={parent}
          item={item}
          control={control}
          move={move}
          find={find}
        />
      ))}
  </ContainerSubTree>
);

Tree.propTypes = {
  level: PropTypes.number,
  items: PropTypes.array,
  parent: PropTypes.any,
  move: PropTypes.func.isRequired,
  find: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
  onClickItem: PropTypes.func.isRequired,
  nodeMain: PropTypes.bool,
  onToggleItem: PropTypes.func,
  control: PropTypes.any,
  draggable: PropTypes.bool,
  type: PropTypes.string,
};

Tree.defaultProps = {
  nodeMain: false,
  collapsed: false,
};

export default Tree;
