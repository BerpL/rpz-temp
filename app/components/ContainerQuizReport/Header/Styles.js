import styled from 'styled-components';

const ContainerHeader = styled.div`
  background-color: #fff;
  color: #292a3a;
  flex-direction: column;
  padding: 30px 24px 20px;
  display: flex;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border-top: 6px solid ${({ theme }) => theme.colors.primary};
`;

const Name = styled.div`
  font-size: 25px;
  text-align: center;
  width: 60%;
  margin: auto;
`;

const Circle = styled.div`
  width: 88px;
  height: 88px;

  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  flex-direction: column;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 18px;
    margin-bottom: 2px;
  }
`;

const Square = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
  flex-direction: column;
  margin-right: 16px;
  p {
    opacity: 0.4;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
  }
`;

const CirclesContainer = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;

  ${Square}:last-child {
    margin-right: 0px;
  }
`;

export { ContainerHeader, Name, Circle, CirclesContainer, Square };
