import styled from 'styled-components';
import { rgba } from 'polished';

import CBHidden from './CBHidden';
import CBIcon from './CBIcon';

const CBStyled = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  background: ${({ checked, theme: { colors } }) =>
    checked ? colors.primary : rgba(colors.text, 0.2)};
  border-radius: 3px;
  transition: all 150ms;
  justify-content: center;
  align-items: center;

  ${CBHidden}:focus + & {
    box-shadow: 0 0 0 3px
      ${({ theme: { colors } }) => rgba(colors.primary, 0.5)};
  }

  ${CBIcon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

export default CBStyled;
