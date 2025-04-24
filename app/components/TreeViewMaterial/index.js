/**
 *
 * TreeViewMaterial
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/* components */
import Node from './Node';

const Container = styled.div`
  height: 100%;
  width: 100%;
  user-select: none;
`;

function TreeViewMaterial({
  data,
  onToggleItem,
  findItem,
  onClickItem,
  ...props
}) {
  return (
    <Container>
      <Node
        level={0}
        onToggleItem={onToggleItem}
        key={data.id}
        id={data.id}
        onClickItem={onClickItem}
        nombre={data.nombre}
        parent={null}
        move={() => {}}
        item={data}
        find={findItem}
        {...props}
      />
    </Container>
  );
}

TreeViewMaterial.propTypes = {
  data: PropTypes.object,
  onToggleItem: PropTypes.func,
  findItem: PropTypes.func,
  onClickItem: PropTypes.func,
};

export default TreeViewMaterial;
