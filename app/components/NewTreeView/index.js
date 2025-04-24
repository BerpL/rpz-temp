/**
 *
 * NewTreeView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import Item from './Item';

const Container = styled.div`
  height: 100%;
  width: 100%;
  user-select: none;
`;

function NewTreeView({ data, onToggleItem, findItem, onClickItem }) {
  return (
    <Container>
      <Item
        level={0}
        onToggleItem={onToggleItem}
        key={data.id}
        id={data.id}
        onClickItem={onClickItem}
        title={data.title}
        parent={null}
        move={() => {}}
        item={data}
        find={findItem}
      />
    </Container>
  );
}

NewTreeView.propTypes = {
  data: PropTypes.object,
  onToggleItem: PropTypes.func,
  findItem: PropTypes.func,
  onClickItem: PropTypes.func,
};

export default NewTreeView;
