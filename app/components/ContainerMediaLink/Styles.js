import styled from 'styled-components';
import Btn from 'components/Button';
import { rgba } from 'polished';
const Container = styled.div`
  padding: 40px 16px 24px 16px;
  min-width: 1000px;
  width: 90vw;
  display: flex;
  height: 80vh;
`;

const ContainerTreeView = styled.div`
  width: 299px;
  flex-basis: 299px;
  flex-shrink: 0;
  overflow: auto;
`;
const ContainerCols = styled.div`
  display: flex;
  width: calc(100% - 300px);
  position: relative;
  min-height: 0px;
`;

const ContainerCol = styled.div`
  flex-shrink: 0;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  width: calc(50% - 0.5px);
  position: relative;
  min-height: 0px;
  flex-direction: column;
`;

const ContainerList = styled.div`
  padding: 0 16px;
  flex-grow: 1;
  min-height: 0px;
  position: relative;
  flex-shrink: 0;
  height: calc(100% - 41px);
  overflow: auto;
`;

const Button = styled(Btn)`
  display: inline-block;
  width: auto;
  font-size: 12px;
  padding: 12px 16px;
  height: auto;
`;

const ContainerButton = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: flex-end;
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background: ${({ theme }) => rgba(theme.colors.primary, 0.2)};
`;

export {
  Container,
  ContainerCols,
  ContainerTreeView,
  ContainerCol,
  Line,
  ContainerButton,
  Button,
  ContainerList,
};
