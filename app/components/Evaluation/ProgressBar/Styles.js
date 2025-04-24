import styled from 'styled-components';
import { rgba } from 'polished';

const Container = styled.div`
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  margin-right: 16px;
`;

const BarComplete = styled.div`
  width: 150px;
  height: 4px;
  background: ${({ theme }) => rgba(theme.colors.darkPrimary, 0.5)};
`;

const Bar = styled.div`
  width: ${({ width }) => width};
  height: 4px;
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.darkPrimary};
`;

const Text = styled.p`
  font-size: 12px;
  margin-top: 0px;
  margin-bottom: 5px;
`;

export { Container, Bar, BarComplete, Text };
