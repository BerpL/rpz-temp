import styled from 'styled-components';
import { lighten } from 'polished';
const TextInformative = styled.p`
  font-size: 25px;
  opacity: 0.6;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const ContainerItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -16px;
  margin-right: -16px;
`;

const ItemName = styled.p`
  /* padding: 5px 25px; */
  position: absolute;
  bottom: -20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  color: rgb(10, 180, 255);
  text-transform:capitalize;
  text-align: center;
  background: rgba(63, 63, 63, 0.72);
  width: 100%;
  transition: all .2s ease-in-out;
`;

const ItemImage = styled.img`
  height: 300px;
`;

const ItemContainerImage = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.2s;
  position: relative;
  background: rgb(0, 0, 0);
  &:before {
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    transition: all 0.2s;
    background: rgba(0, 0, 0, 0.35);
    height: 100%;
  }
`;

const IconPlay = styled.div`
  width: 50px;
  height: 50px;
  z-index: 10;
  border-radius: 25px;
  background: white;
  position: absolute;
  left: calc(50% - 25px);
  top: 120px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};

  &:before {
    position: absolute;
    content: '';
    display: block;
    border-radius: 50%;
    width: 60px;
    z-index: -1;
    background: rgba(255, 255, 255, 0.4);
    height: 65px;
    transition: all 0.2s;
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  /* background: ${({ theme }) => theme.colors.text}; */
  overflow: hidden;
  user-select: none;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  &:hover {
    background: ${({ theme }) => lighten('0.1', theme.colors.text)};
  }

  &:hover ${IconPlay}:before {
    background: transparent;
  }
  &:hover ${ItemContainerImage}:before {
    background: rgba(0, 0, 0, 0.15);
  }
  &:hover p{
    color: #2a2b2b;
    background: rgb(10, 180, 255);
    padding: 12px 10px;
  }
`;

export {
  TextInformative,
  ItemContainer,
  ItemName,
  ItemImage,
  ContainerItems,
  ItemWrapper,
  ItemContainerImage,
  IconPlay,
};
