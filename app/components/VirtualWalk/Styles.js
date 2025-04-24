import styled from 'styled-components';
import { ContainerFlex as CF } from 'components/ContainerFlex';
// import { darken } from 'polished';

const ContainerFlex = styled(CF)`
  background: ${({ theme }) => theme.colors.darkBase};
  min-height: 100vh;
  display: block;
`;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.base};
  width: 100%;
  position: relative;
`;

const ContainerVideo = styled.div`
  padding: 32px 0;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
  line-height: 34px;
  color: ${({ theme }) => theme.colors.text};
`;

const BeforeTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  opacity: 0.8;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.text};
  line-height: 25px;
`;
const ContainerLoader = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

export {
  ContainerFlex,
  ContainerVideo,
  Container,
  Title,
  BeforeTitle,
  ContainerLoader,
};
