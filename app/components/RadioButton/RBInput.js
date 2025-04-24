import styled from 'styled-components';

import { rgba } from 'polished';
import RadioButtonLabel from './RadioButtonLabel';

const RB = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
    }
  }
  &:checked + ${RadioButtonLabel} {
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 8px 0 ${({ theme }) => rgba(theme.colors.primary, 0.8)};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
    }
  }
`;

export default RB;
