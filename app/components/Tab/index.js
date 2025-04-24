/**
 *
 * Tab
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const C2 = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const S1 = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  padding: ${({ noPadding }) => noPadding || '0px 26px'};
  flex-direction: ${({ direction }) => direction || 'row'};
  /* for Firefox */
  min-height: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Co02 = styled.div`
  overflow: auto;
  flex-shrink: 1;
  flex-grow: 1;
  padding: ${({ noPadding }) => noPadding || '0px 16px'};
  /* for Firefox */
  min-height: 0;
  position: relative;
`;

const HeaderItem = styled.div`
  padding: 10px 16px;
  border-bottom: 2px solid
    ${({ theme: { primary }, active }) =>
    active ? primary : rgba(primary, 0.2)};
`;

function Tab({ children, items, header }) {
  const [changeTab, setChangeTab] = useState(0);
  return (
    <Wrapper>
      <C2>
        {header}
        <Header>
          {items.map((item, index) => (
            <HeaderItem
              active={index === changeTab}
              key={item.id}
              onClick={() => setChangeTab(index)}
            >
              {item.name}
            </HeaderItem>
          ))}
        </Header>
        <S1 noPadding>
          <Co02>{children[changeTab]}</Co02>
        </S1>
      </C2>
    </Wrapper>
  );
}

Tab.propTypes = {
  children: PropTypes.any.isRequired,
  items: PropTypes.array.isRequired,
  header: PropTypes.any,
};

export default Tab;
