import styled from 'styled-components';

import Item from './Item';

const Wrapper = styled.div`
  height: ${({ width }) => (width ? `${width}px` : 'auto')};
  width: ${({ height }) => (height ? `${height}px` : 'auto')};
  display: ${({ display }) => display || 'block'};

  & ${Item} {
    margin-right: ${({ display }) => (display === 'flex' ? '15px' : '0px')};
  }

  & ${Item}:last-child {
    margin-right: 0px;
  }
`;

export default Wrapper;
