import React from 'react';
import PropTypes from 'prop-types';
import Empty from './Empty';
import Item from './Item';

function List({ flowDiagrams, openDiagram }) {
  if (flowDiagrams && flowDiagrams.length > 0) {
    return (
      <>
        {flowDiagrams.map(flowDiagram => (
          <Item
            key={flowDiagram.id}
            flowDiagram={flowDiagram}
            onClick={openDiagram}
          />
        ))}
      </>
    );
  }

  return <Empty />;
}

List.propTypes = {
  flowDiagrams: PropTypes.array.isRequired,
  openDiagram: PropTypes.func.isRequired,
};

export default List;
