import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md/index.esm';
import { rgba } from 'polished';

const Container = styled.div`
  margin: 5px 16px;
  position: relative;
`;

const Name = styled.span`
  margin-right: 18px;
  background: ${({ theme, selected }) => selected && theme.colors.primary};
  text-decoration: ${({ enableRemove }) => enableRemove && 'line-through'};
  color: ${({ enableRemove, theme, selected }) =>
    (enableRemove && rgba(theme.colors.text, 0.5)) ||
    (selected && theme.colors.base)};
  padding: ${({ selected }) => selected && '5px 10px'};
  border-radius: 5px;
  font-size: 14px;
`;

const CloseIcon = styled.div`
  border-radius: 50%;
  background: #ff6961;
  right: 0;
  top: 3px;
  width: 18px;
  cursor: pointer;
  position: absolute;
  height: 18px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${({ theme }) => theme.colors.base};
`;

const Tag = ({ tag, enableRemove, onRemove, selected, onClick, cursor = "default" }) => (
  <Container>
    <Name
      style={{cursor}}
      selected={selected === tag.idEnclavamientoAlarma}
      enableRemove={enableRemove}
      onClick={onClick ? () => onClick(tag.idEnclavamientoAlarma) : null}
    >
      {tag.nombre}
    </Name>
    {enableRemove && (
      <CloseIcon onClick={() => onRemove(tag.idEnclavamientoAlarma)}>
        <MdClose />
      </CloseIcon>
    )}
  </Container>
);

export default Tag;
