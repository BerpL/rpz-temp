import React from 'react';
import PropTypes from 'prop-types';
import Empty from './Empty';
import Item from './Item';

function List({ virtualWalks, openVirtualWalk }) {
  if (virtualWalks && virtualWalks.length > 0) {
    return (
      <>
        {virtualWalks.map(virtualWalk => (
          <Item
            key={virtualWalk.id}
            virtualWalk={virtualWalk}
            onClick={openVirtualWalk}
          />
        ))}
      </>
    );
  }

  return <Empty />;
}

List.propTypes = {
  virtualWalks: PropTypes.array.isRequired,
  openVirtualWalk: PropTypes.func.isRequired,
};

export default List;
