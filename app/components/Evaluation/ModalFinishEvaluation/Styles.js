import styled from 'styled-components';
import Btn from 'components/Button';
import { darken } from 'polished';

const Title = styled.div`
  font-size: 17px;
  opacity: 0.5;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Percent = styled.div`
  font-size: 50px;
  font-weight: 600;
`;

const BarPercent = styled.div`
  width: ${({ width }) => width};
  background: ${({ theme }) => theme.colors.darkPrimary};
  height: 100%;
  border-radius: 5px;
`;

const Bar = styled.div`
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Item = styled.p`
  opacity: 0.7;
  margin-top: 0;
  margin-bottom: 5px;
`;

const Container = styled.div`
  padding: 16px 32px;
  min-width: 350px;
  color: #000;
  max-width: 400px;
`;

const Button = styled(Btn)`
  background: ${({ theme }) => theme.colors.darkPrimary};
  border: none;
  width: 100%;
  margin-top: 10px;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => darken('0.05', theme.colors.darkPrimary)};
  }
`;

export { Title, Container, Percent, Bar, BarPercent, Item, Button };
