import styled from 'styled-components';
import { lighten } from 'polished';
const TextInformative = styled.p`
  font-size: 25px;
  opacity: 0.6;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemContainer = styled.div`
  padding: 12px 4px;
  width: 100%;
  display: flex;
`;

const ContainerItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -16px;
  margin-right: -16px;
`;

const ItemName = styled.p`
  /* padding: 0px 25px; */
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  bottom: -20px;
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
  background: rgb(0, 0, 0);
  opacity: 0.8;
  padding: 10px 0px;
`;

const ItemWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  user-select: none;
  color: rgb(10, 180, 255);
  position: relative;
  transition: all 0.5s;
  cursor: pointer;
  &:hover ${ItemContainerImage} {
    opacity: 1;
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
};
