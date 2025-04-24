import styled from 'styled-components';
import { ContainerFlex as CF, Col } from 'components/ContainerFlex';
import { lighten, rgba } from 'polished';

const ContainerFlex = styled(CF)`
  background: ${({ theme }) => theme.colors.darkBase};
  min-height: 100vh;
`;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.base};
  width: 100%;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const BeforeTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  opacity: 0.5;
  line-height: 15px;
`;
const ContainerLoader = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const PdfContainer = styled(Col)`
  flex-grow: 1;
  background: aliceblue;
  height: calc(100vh - 50px);
  padding: 0;
  color: #000;
  position: relative;
`;

const TreeContainer = styled(Col)`
  flex-basis: 300px;
  flex-shrink: 0;
  height: calc(100vh - 50px);
  padding: 0;
  position: relative;
  overflow: visible;
  margin: 0px 0px 0px ${({ open }) => (!open ? '-300px' : '0px')};
  transition: all 0.5s ease 0s;
  background: #D9CB9F;
  padding: 0px;
`;

const ButtonHandlerTree = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 20px;
  top: 10px;
  right: -50px;
  color: #000;
  z-index: 1000000;
  cursor: pointer;
  user-select: none;
  height: 50px;
  box-shadow: rgba(50, 88, 130, 0.32) 0px 15px 35px -5px;
  border-right: 5px solid rgb(0,39,118);
  background: #D9CB9F;
  span {
    display: none;
  }
  @media (min-width: 576px) {
    font-size: 12px;
    width: 100px;
    right: -100px;
    span {
      display: block;
    }
    svg {
      margin-right: 5px;
    }
  }
`;

const MediaContainer = styled(Col)`
  flex-basis: ${({ open }) => (open ? 'calc(25vw + 50px)' : '50px')};
  flex-shrink: 0;
  flex-direction: row;
  height: calc(100vh - 50px);
  background: #D9CB9F;
  padding: 0;
  transition: flex-basis 0.3s;
  overflow: hidden;
  .Visor {
    flex-shrink: 0;
    width: 25vw;
    overflow: auto;
  }
`;

const BtnReturn = styled.button`
  color: #000;
  font-weight: bold;
  text-align: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 32px 16px;
  display: flex;
  font-size: 12px;
  width: 100%;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;

const HeaderDocument = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 10;
  width: 100%;
`;
const IconMedia = styled.div`
  color: rgb(0,39,118);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => rgba(theme.colors.black, 0.2)};
  }
`;

export {
  ContainerFlex,
  PdfContainer,
  Container,
  Title,
  TreeContainer,
  BeforeTitle,
  ButtonHandlerTree,
  BtnReturn,
  ContainerLoader,
  MediaContainer,
  HeaderDocument,
  IconMedia,
};
