/**
 *
 * Tabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import Button from 'components/Button';
import Pills from './Pills';

const ChildrenContainer = styled.div`
  background: ${({ theme }) => theme.colors.base};
  height: calc(100% - 218px);
  width: 100%;
  margin-top: 25px;
  margin-bottom: 13px;
  border-radius: 10px;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  text-align: right;
`;

function Tabs({ children, onChange, tabSelected, onClickNext, items }) {
  const handleChange = tabIndex => {
    onChange(tabIndex);
  };

  const indexArray = tabSelected - 1;
  return (
    <div style={{ height: '100%' }}>
      <Pills tabSelected={tabSelected} onChange={handleChange} items={items} />
      <ChildrenContainer>{children}</ChildrenContainer>
      <ButtonContainer>
        <Button
          type={items[indexArray].isFinished ? 'normal' : 'disabled'}
          onClick={items[indexArray].isFinished ? onClickNext : () => {}}
          style={{
            cursor: items[indexArray].isFinished ? 'pointer' : 'default',
          }}
        >
          SIGUIENTE
        </Button>
      </ButtonContainer>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.any,
  onChange: PropTypes.func,
  tabSelected: PropTypes.number,
  onClickNext: PropTypes.func,
  items: PropTypes.array,
};

export default Tabs;
