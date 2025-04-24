/**
 *
 * ContainerInline
 *
 */

import styled from 'styled-components';

const ContainerInline = styled.div`
  width: 100%;
  padding: ${({ padding }) => padding || '10px 0px'};
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

export default ContainerInline;
