/**
 *
 * Link
 *
 */

import styled from 'styled-components';
import { darken } from 'polished';

const Link = styled.button`
  font-size: ${({ size }) => (size ? `${size}px` : '13px')};
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
  color: ${({ theme: { primary } }) => primary};
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  &:hover {
    color: ${({ theme: { primary } }) => darken('0.1', primary)};
  }
`;

export default Link;
