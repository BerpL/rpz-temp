import styled from 'styled-components';
import Btn from 'components/Button';
import { darken } from 'polished';
import Lnk from 'components/AButton';

const Title = styled.div`
  font-size: 17px;
  opacity: 0.5;
  font-weight: 600;
  margin-bottom: 5px;
`;

const EvaluationName = styled.div`
  color: rgb(0,39,118);
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const EvaluationQuestions = styled.div`
  opacity: 0.7;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;

const EvaluationTime = styled.div`
  opacity: 0.7;
  flex: 1;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  padding: 16px 32px;
  min-width: 300px;
  color: #000;
  max-width: 400px;
`;

const ContainerInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Conditions = styled.div`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 13px;
  margin-bottom: 15px;
`;

const Highlight = styled.span`
  opacity: 0.4;
  color: #000000;
`;

const Button = styled(Btn)`
  background: ${({ theme }) => theme.colors.darkPrimary};
  border: none;
  transition: background 0.3s;
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  &:hover {
    background: ${({ theme }) => darken('0.05', theme.colors.darkPrimary)};
  }
`;

const CancelButton = styled(Btn)`
  background: #c60c30;
  transition: background 0.3s;
  &:hover {
    background: #a00a27;
    /* opacity: 0.7; */
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export {
  Title,
  Container,
  EvaluationName,
  Highlight,
  EvaluationQuestions,
  EvaluationTime,
  ContainerInfo,
  Conditions,
  CancelButton,
  ContainerButtons,
  Button,
};
