/**
 *
 * ButtonAdminAction
 *
 */
import styled from 'styled-components';
import ButtonAdmin from 'components/ButtonAdmin';
import { rgba } from 'polished';

const Button = styled(ButtonAdmin)`
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 23px;
  line-height: 20px;
  padding: 0px 16px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
  outline: none;
  border-radius: 25px;
  user-select: none;
  font-size: 9px;
  transition: all 0.3s;
  box-shadow: none;
  color: ${({ theme: { text } }) => text};
  background: ${({ theme: { textMenu } }) => rgba(textMenu, 0.2)};

  &:hover {
    box-shadow: none;
    background: ${({ theme: { textMenu } }) => rgba(textMenu, 0.4)};
  }
`;

export default Button;
