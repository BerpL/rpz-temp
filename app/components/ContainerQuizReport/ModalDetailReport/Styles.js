import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  padding: 16px 24px;
`;

const Name = styled.div`
  display: flex;
  p {
    padding-left: 5px;
    margin: 0;
  }
`;

const Answer = styled.div`
  i {
    display: flex;
    align-items: center;
    svg {
      font-size: 18px;
    }
    p {
      padding-left: 5px;
      margin: 0;
    }
  }
`;
const ItemContainer = styled.div`
  margin-bottom: 30px;
`;

export { Container, Answer, Name, ItemContainer };
