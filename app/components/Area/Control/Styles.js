import styled from 'styled-components';
import { Col } from 'components/ContainerFlex';
import { lighten } from 'polished';

const TreeContainer = styled(Col)`
  width: 310px;
  height: 100vh;
  padding: 0;
  position: absolute;
  overflow: visible;
  left: ${({ open }) => (open ? '0px' : '-310px')};
  transition: all 0.5s ease 0s;
  background: #D9CB9F;
  padding: 0px;
  z-index: 1000;
`;

const TagDetailContainer = styled(Col)`
  flex-shrink: 0;
  background: #17428B;
  padding: 0;
  position: absolute;
  overflow: visible;
  padding: 0px;
  display: none;
  overflow:auto;
  z-index: 100000;
`;

const Message = styled.div`
  position: absolute;
  flex: 1;
  text-align: center;
  top: 0;
  left: 0;
  font-size: 12px;
  padding: 20px;
  display: flex;
  width: 100%;
  background: ${({ active, theme }) => active && theme.colors.darkBase};
  height: 100%;
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  justify-content: center;
`;

const ViewContainer = styled(Col)`
  flex-shrink: 0;
  padding: 0;
  position: relative;
  overflow: visible;
  padding: 0px;
`;

const PanZoom = styled.div`
  position: relative;
  flex: 1;
  user-select: none;
  overflow: hidden;
`;

const PanZoomInner = styled.div.attrs(({ transform, styleInnerContainer }) => ({
  style: {
    transform,
    ...styleInnerContainer,
  },
}))`
  position: relative;
  transform-origin: left top;
`;

const Img = styled.img`
  width: auto !important;
  height: auto !important;
  max-width: inherit !important;
`;

const ButtonHandlerTree = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: -50px;
  color: #000;
  z-index: 100;
  cursor: pointer;
  user-select: none;
  height: 50px;
  span {
    display: none;
  }
  @media (min-width: 576px) {
    font-size: 20px;
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

const CloseIcon = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;

  svg {
    color: #c60c30;
    width: 25px;
    height: 25px;
  }


  @media only screen and (min-width: 480px) {
   display: none;
  }

`

export {
  TreeContainer,
  CloseIcon,
  TagDetailContainer,
  ViewContainer,
  Message,
  ButtonHandlerTree,
  PanZoom,
  PanZoomInner,
  Img,
};
