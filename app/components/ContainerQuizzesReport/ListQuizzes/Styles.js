import styled from 'styled-components';
import Sl from 'components/Select';
const HeaderRow = styled.div`
  display: flex;
  height: 50px;
  flex: 1;
  font-size: 14px;
  opacity: 0.7;
  margin-bottom: 5px;
  color: #393a68;
  user-select: none;
  align-items: center;
`;

const ItemRow = styled.div`
  display: flex;
  flex: 1;
  color: #393a68;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;
  user-select: none;
  &:hover {
    background: transparent;
    cursor: pointer;
  }
`;

const Select = styled(Sl)`
  select {
    background: white;
    font-size: 14px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    color: #000;
    height: auto;
    padding: 8px 5px;
    border: none;
    &:focus {
      background: white;
      border: none;
    }
  }
`;

const PercentBox = styled.div`
  padding: 2px 8px;
  border-radius: 4px;
  width: 70px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  background-color: #ec0b43;
  color: #fff;
`;

const CellRow = styled.div`
  padding: ${({ padding }) => padding || '10px 16px'};
  flex-grow: ${({ flexGrow }) => flexGrow || 1};
  flex-shrink: ${({ flexShrink }) => flexShrink || 1};
  flex-basis: ${({ flexBasis }) => flexBasis || '100%'};
`;

const ContainerList = styled.div`
  padding: 24px 0;
`;

export { HeaderRow, CellRow, ItemRow, PercentBox, ContainerList, Select };
