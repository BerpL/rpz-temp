import styled from 'styled-components';

const ContainerItem = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background: rgb(0,39,118);
  font-size: 14px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px 7px;
  margin: 5px 0;
  text-overflow: ellipsis;
  cursor: pointer;
  img {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  overflow: auto;
  height: 100%;
  width: 100%;
  padding: 0px 16px;
`;

const Title = styled.div`
  color: #fff;
  font-size: 24px;
  padding: 10px 0;
`;

const Title2 = styled.div`
  color: rgb(0,39,118);
  font-size: 24px;
  padding: 10px 0;
`;

export { ContainerItem, Container, Title, Title2 };
