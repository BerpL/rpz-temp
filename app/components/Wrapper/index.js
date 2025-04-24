/**
 *
 * Wrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const C1 = styled.div`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height * 0.8}px` : '100%')};
  position: relative;
`;

export const C2 = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const S1 = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  padding: ${({ noPadding }) => noPadding || '0px 26px'};
  flex-direction: ${({ direction }) => direction || 'row'};
  /* for Firefox */
  min-height: 0;
`;

export const Co01 = styled.div`
  overflow: auto;
  flex-shrink: 1;
  flex-grow: 1;
  padding: ${({ noPadding }) => noPadding || '0px 16px'};
  /* for Firefox */
  min-height: 0;
  position: relative;
`;

function Wrapper({
  noPadding = true,
  children,
  style: { Co01: Co01Style = {}, S1: S1Style = {} } = {},
}) {
  return (
    <C1>
      <C2>
        <S1 style={S1Style} noPadding={noPadding}>
          <Co01 noPadding={noPadding} style={Co01Style}>
            {children}
          </Co01>
        </S1>
      </C2>
    </C1>
  );
}

Wrapper.propTypes = {
  children: PropTypes.any,
  noPadding: PropTypes.bool,
  style: PropTypes.object,
};

export default Wrapper;
