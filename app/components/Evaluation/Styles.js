import styled from 'styled-components';
import { ContainerFlex as CF } from 'components/ContainerFlex';

const ContainerFlex = styled(CF)`
  background: ${({ theme }) => theme.colors.darkBase};
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.base};
  position: relative;
`;

const EvaluationName = styled.div`
  font-size: 20px;
  font-weight: 600;
  opacity: 0.5;
  margin-bottom: 10px;
`;

const ContainerLoader = styled(CF)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TextInformative = styled.p`
  font-size: 25px;
  opacity: 0.6;
`;

export { ContainerFlex, EvaluationName, ContainerLoader, TextInformative };
