/**
 *
 * Tabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import Pill from './Pill';

/* utils */
const Container = styled.div`
  display: flex;
  width: 100%;
`;

function Tabs({ onChange, tabSelected, items = [] }) {
  const handleChangeTab = index => {
    if (index !== tabSelected) {
      onChange(index);
    }
  };

  return (
    <Container>
      {items.map(item => (
        <Pill
          key={item.index}
          step={item.index}
          active={tabSelected === item.index}
          isOpened={item.isOpened}
          onClick={() =>
            item.isOpened ? handleChangeTab(item.index) : () => {}
          }
          subtitle={item.descripcion}
        />
      ))}
    </Container>
  );
}

Tabs.propTypes = {
  onChange: PropTypes.func,
  tabSelected: PropTypes.number,
  items: PropTypes.array,
};

export default Tabs;
