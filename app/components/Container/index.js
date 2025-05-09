import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: ${({ overflow }) => overflow};
  background: ${({ theme: { bgA } }) => bgA};
  display: flex;
`;

export default Container;
