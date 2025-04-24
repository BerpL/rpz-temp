import styled from 'styled-components';

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

const CellRow = styled.div`
  padding: ${({ padding }) => padding || '10px 16px'};
  flex-grow: ${({ flexGrow }) => flexGrow || 1};
  flex-shrink: ${({ flexShrink }) => flexShrink || 1};
  flex-basis: ${({ flexBasis }) => flexBasis || '100%'};
`;

const ContainerList = styled.div`
  padding: 24px 0;
`;

export { CellRow, ItemRow, ContainerList };
