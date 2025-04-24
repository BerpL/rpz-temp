import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from './Item';
import CustomDragLayer from './DragLayer';

const Container = styled.div`
  width: 100%;
  user-select: none;
`;

const ContainerTreeView = styled.div``;

const Index = ({
  onClickItem,
  items,
  moveItem,
  findItem,
  onToggleItem,
  control,
  type,
  draggable = true,
}) => (
  <ContainerTreeView>
    <Container>
      <Item
        level={0}
        draggable={draggable}
        onToggleItem={onToggleItem}
        key={items.id}
        control={control}
        id={items.id}
        onClickItem={onClickItem}
        nombre={items.nombre}
        parent={null}
        move={moveItem}
        item={items}
        type={type}
        find={findItem}
      />
      <CustomDragLayer />
    </Container>
  </ContainerTreeView>
);

Index.propTypes = {
  control: PropTypes.any,
  onClickItem: PropTypes.func,
  findItem: PropTypes.func,
  moveItem: PropTypes.func,
  items: PropTypes.object,
  onToggleItem: PropTypes.func,
  draggable: PropTypes.bool,
  type: PropTypes.string,
};

export default Index;
