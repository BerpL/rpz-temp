import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-width: 1100px;
  min-height: 100vh;
  display: flex;

  @media (max-width: 577px) {
    min-width: 320px;
  }
`;

export default Wrapper;
