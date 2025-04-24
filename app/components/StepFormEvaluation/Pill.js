/**
 *
 * Pill
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

/* utils */
import { rgba } from 'polished';

/* components */
import Pen from './Icons/Pen';
import Question from './Icons/Question';
import LinkIcon from './Icons/Link';
import Rocket from './Icons/Rocket';

const getIcon = (index, clIcon) => {
  switch (index) {
    case 1:
      return <Pen fill={clIcon} />;
    case 2:
      return <Question fill={clIcon} />;
    case 3:
      return <LinkIcon fill={clIcon} />;
    case 4:
      return <Rocket fill={clIcon} />;
    default:
      return '';
  }
};

const Container = styled.div`
  width: 170px;
  height: 140px;
  user-select: none;
  background: ${({ bgContainer }) => bgContainer};
  color: ${({ clContainer }) => clContainer};
  border-radius: 10px;
  transition: all 0.3s ease-out;
  display: flex;
  justify-content: center;
  padding: 20px 5px 0px 5px;
  opacity: ${({ bgOpacity }) => bgOpacity};
  cursor: ${({ cuContainer }) => cuContainer};
  box-shadow: 0 0 20px 0 ${({ bsContainer }) => bsContainer};
  &:hover {
    box-shadow: 0 0 20px 0 ${({ bsContainerHover }) => bsContainerHover};
  }
`;

const Circle = styled.div`
  margin-top: 6px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 56px;
  border-radius: 50%;
  transition: all 0.2s ease-out;
  background: ${({ bgCircle }) => bgCircle};
  margin-right: 10px;
`;

const Content = styled.div`
  flex: 0 0 80px;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  transition: all 0.2s ease-out;
  color: ${({ clTitle }) => clTitle};
`;
const SubTitle = styled.div`
  font-weight: 500;
  font-size: 13px;
  transition: all 0.2s ease-out;
  color: ${({ clSubTitle }) => clSubTitle};
`;

function Pill({ step, subtitle, active, theme, onClick, isOpened }) {
  const bgContainer = active ? theme.colors.primary : theme.colors.base;
  const clContainer = active ? theme.colors.base : theme.colors.text;
  const cuContainer = active || !isOpened ? 'default' : 'pointer';
  const bgOpacity = isOpened ? 1 : 0.8;
  const bsContainer = active
    ? rgba(theme.colors.primary, 0.8)
    : theme.colors.transparent;
  const bsContainerHover = active
    ? rgba(theme.colors.primary, 0.8)
    : theme.colors.transparent;
  const bgCircle = active ? theme.colors.base : rgba(theme.colors.text, 0.1);
  const clTitle = active ? theme.colors.base : rgba(theme.colors.text, 0.5);
  const clSubTitle = active
    ? rgba(theme.colors.base, 0.9)
    : rgba(theme.colors.text, 0.4);
  const clIcon = active ? theme.colors.primary : rgba(theme.colors.text, 0.5);
  return (
    <Container
      onClick={onClick}
      bgContainer={bgContainer}
      cuContainer={cuContainer}
      clContainer={clContainer}
      bgOpacity={bgOpacity}
      bsContainer={bsContainer}
      bsContainerHover={bsContainerHover}
    >
      <Circle bgCircle={bgCircle}>{getIcon(step, clIcon)}</Circle>
      <Content>
        <Title clTitle={clTitle}>Paso {step}</Title>
        <SubTitle clSubTitle={clSubTitle}>{subtitle}</SubTitle>
      </Content>
    </Container>
  );
}

Pill.propTypes = {
  step: PropTypes.number,
  subtitle: PropTypes.string,
  active: PropTypes.any,
  theme: PropTypes.object,
  onClick: PropTypes.func,
  isOpened: PropTypes.any,
};

export default withTheme(Pill);
