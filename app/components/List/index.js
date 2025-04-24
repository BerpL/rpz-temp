/**
 *
 * List
 *
 */

import styled from 'styled-components';
import { rgba } from 'polished';

const Row = styled.div`
  display: flex;
  user-select: none;
  margin: 0px 0px 10px 0px;
  transition: background 0.3s;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid transparent;
  background: ${({ theme }) => rgba(theme.colors.primary, 0.1)};
`;

const Header = styled.div`
  display: flex;
  margin: 0px 0px 10px 0px;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
`;

const Column = styled.div`
  padding: 0px 12px;
  /*height: 40px;*/
  min-height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: ${({ flex }) => flex || 1};
  font-size: 13px;
`;

const Text = styled.div`
  white-space: nowrap;
  font-size: 13px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;

  > svg {
    margin-right: 10px;
    vertical-align: center;
    flex: 0 0 20px;
    font-size: 20px;
  }
`;

export { Column, Header, Row, Text };
