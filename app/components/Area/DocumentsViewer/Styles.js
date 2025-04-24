import styled from 'styled-components';

const ContainerItem = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  width: 100%;
  padding: 10px 7px;
  text-align: center;
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
  text-align: center;
`;

const Title2 = styled.div`
  color: rgb(0,39,118);
  font-size: 24px;
  padding: 10px 0;
  text-align: center;
`;

const FileCOntainer = styled.div`
  width: 120px;
  display: flex;
  background: rgb(0,39,118);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem 0;
  margin: 1.5rem;
  border: white;
  border-radius: 15px;
  transition: box-shadow 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px 10px rgba(0, 39, 118, 0.5);
  }
  svg {
    color: white;
  }
`;

const ContainerDoc = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export { ContainerItem, Container, Title, FileCOntainer, ContainerDoc, Title2 };
