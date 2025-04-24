/**
 *
 * Tabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import { ContainerFlex, Row, Col } from 'components/ContainerFlex';
import Pills from './Pills';

const ChildrenContainer = styled.div`
  background: ${({ theme }) => theme.colors.base};
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow: auto;
`;

function Tabs({ children, onChange, tabSelected, items }) {
  const handleChange = tabIndex => {
    onChange(tabIndex);
  };

  return (
    <ContainerFlex>
      <Row height="130px" overflow="visible" flexShrink="0" padding="0 0 20px">
        <Col padding="0" overflow="visible">
          <Pills
            tabSelected={tabSelected}
            onChange={handleChange}
            items={items}
          />
        </Col>
      </Row>
      <Row height="100%" flexGrow="1" overflow="hidden">
        <Col width="100%" padding="0">
          <ChildrenContainer>{children}</ChildrenContainer>
        </Col>
      </Row>
    </ContainerFlex>
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
