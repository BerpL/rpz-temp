import styled from 'styled-components';
import Btn from 'components/Button';
import { darken } from 'polished';

const Container = styled.div`
  color: ${({ theme }) => theme.colors.base};
  width: 100%;
`;

const BeforeTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  opacity: 0.5;
  line-height: 25px;
  color: #000000;
`;

const Title = styled.div`
  font-size: 36px;
  margin-bottom: 25px;
  font-weight: 600;
  line-height: 34px;
  color: #000000;
`;

const ListItem = styled.div`
  padding: 10px 16px;
  background: #383647;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const ListItemName = styled.div`
  margin-bottom: 7px;
  font-size: 17px;
`;

const ListItemNumbersQuestions = styled.span`
  color: #c9d2e0;
  font-size: 14px;
`;

const ListItemLeft = styled.span`
  flex: 4;
`;

const ListItemRight = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled(Btn)`
  background: ${({ theme }) => theme.colors.darkPrimary};
  border: none;
  &:hover {
    background: ${({ theme }) => darken('0.05', theme.colors.darkPrimary)};
  }
`;

export {
  Container,
  Title,
  ListItem,
  ListItemName,
  Button,
  BeforeTitle,
  ListItemLeft,
  ListItemRight,
  ListItemNumbersQuestions,
};
