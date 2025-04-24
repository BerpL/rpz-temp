import styled, {keyframes} from 'styled-components';
import { ContainerFlex as CF } from 'components/ContainerFlex';

const moveGradient = keyframes`
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 50% 0;
  }
  50% {
    background-position: 90% 0;
  }
  60% {
    background-position: 60%;
  }
  75% {
    background-position: 40%;
  }
  100% {
    background-position: 0 0;
  }
`;

const ContainerFlex = styled(CF)`
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.base};
  position: relative;

  @media (min-height: 600px) and (min-width: 576px) {
    justify-content: center;
  }
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
