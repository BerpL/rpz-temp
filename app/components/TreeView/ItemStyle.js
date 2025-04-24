import styled from 'styled-components';
import { rgba } from 'polished';
import is from 'is_js';

const getBackgroundHover = ({ isOverCurrent, selected, theme }) =>
  !isOverCurrent && !selected
    ? rgba(theme.colors.text, 0.1)
    : rgba(theme.colors.primary, 0.3);

const getBackground = ({ isOverCurrent, selected, theme }) =>
  isOverCurrent || selected ? rgba(theme.colors.primary, 0.3) : 'transparent';

const Item = styled.div`
  
  font-size: 13px;
  ${!is.ie('>=10') && 'transition: all 0.3s;'}
  background: ${getBackground};
  overflow: hidden;
  line-height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0px 12px 0px 12px;
  position: relative;
  opacity: ${({ isMoved }) => (isMoved ? '0' : '1')};
  height: ${({ isMoved }) => (isMoved ? '0px' : '38px')};

  &:hover {
    background: ${getBackgroundHover};
  }
  
`;

export default Item;
