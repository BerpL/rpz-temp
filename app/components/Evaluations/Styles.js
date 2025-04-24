import styled from 'styled-components';
import { ContainerFlex as CF } from 'components/ContainerFlex';

const ContainerFlex = styled(CF)`
  background: ${({ theme }) => theme.colors.darkBase};
  min-height: 100vh;
  display: block;
`;

export { ContainerFlex };
