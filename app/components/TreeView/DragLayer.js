import React, { forwardRef } from 'react';
import { DragLayer } from 'react-dnd';
import { MdFolder } from 'react-icons/md/index.esm';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import styled from 'styled-components';

const Item = styled.div`
  color: ${({ theme }) => theme.colors.base};
  font-size: 13px;
  transition: all 0.3s;
  background: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  line-height: 36px;
  display: inline-block;
  border-radius: 20px;
  box-shadow: 0 0px 20px 0px ${({ theme }) => rgba(theme.colors.primary, 0.5)};
  align-items: center;
  padding: 0px 26px 0px 26px;
  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.salmon};
  }
`;

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};
function getItemStyles(props) {
  const { currentOffset } = props;

  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x || 0}px, ${y || 0}px)`;
  return {
    transform,
    marginLeft: `${70}px`,
    marginTop: `${15}px`,
  };
}
const DragLayerComponent = forwardRef((props, ref) => {
  const { item, itemType, isDragging } = props;
  if (!isDragging) {
    return null;
  }

  function renderItem() {
    switch (itemType) {
      case 'ITEM':
        return (
          <Item key={item.id}>
            <MdFolder />
            {item.nombre}
          </Item>
        );
      default:
        return null;
    }
  }

  return (
    <div ref={ref} style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  );
});

DragLayerComponent.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  isDragging: PropTypes.bool,
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(DragLayerComponent);
