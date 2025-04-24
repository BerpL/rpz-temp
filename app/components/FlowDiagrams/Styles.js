import styled from 'styled-components';
import { ContainerFlex as CF } from 'components/ContainerFlex';

const ContainerFlex = styled(CF)`
  background: ${({ theme }) => theme.colors.darkBase};
  min-height: 100vh;
  display: block;
`;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 25px;
  width: 80%;
  max-width: 1100px;
  margin: auto;
  line-height: 34px;
`;

const BeforeTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  opacity: 0.5;
  line-height: 25px;
`;
const ContainerLoader = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

export { ContainerFlex, Container, Title, BeforeTitle, ContainerLoader };
