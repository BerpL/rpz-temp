import styled from 'styled-components';

const Con = styled.div.attrs(
  ({
    flex = 'inherit',
    flexGrow = 'inherit',
    flexBasis = 'auto',
    flexShrink = 'inherit',
    display = 'flex',
    flexDirection = 'column',
    justifyContent = 'inherit',
    alignItems = 'inherit',
    overflow = 'scroll',
    flexWrap = 'inherit',
    margin = '0 auto',
    maxWidth = '600px',
    padding = '0',
  }) => ({
    display,
    flex,
    flexDirection,
    justifyContent,
    flexGrow,
    alignItems,
    flexBasis,
    flexShrink,
    overflow,
    flexWrap,
    maxWidth,
    padding,
    margin,
  }),
)`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: 0px;
  max-width: ${({ maxWidth }) => maxWidth};
  min-height: 0px;
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex: ${({ flex }) => flex};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-basis: ${({ flexBasis }) => flexBasis};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  overflow: ${({ overflow }) => overflow};
`;

export default Con;
