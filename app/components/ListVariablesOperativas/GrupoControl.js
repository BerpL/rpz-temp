import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FiSettings } from 'react-icons/fi/index.esm';
import { MdDelete, MdEdit } from 'react-icons/md/index.esm';

const Container = styled.div`
  overflow: hidden;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.16);
  margin-bottom: 10px;
  border: 1px solid #cbcaca;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background: white;
  padding: 10px 16px;
  display: flex;
`;

const Info = styled.div`
  padding-left: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Actions = styled.div`
  padding-left: 16px;
  display: flex;
  flex-shrink: 0;
`;

const Title = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.7)};
  margin-right: 20px;
`;

const SubTitleContainer = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  font-size: 14px;
  display: flex;
`;
/*
  ${Title}:first-child {
    margin-right: 20px;
  }
*/
const Icon = styled.div`
  font-size: 12px;
  flex-shrink: 0;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.base};
  svg {
    fill: none;
    font-size: 16px;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  padding: 3px;
  outline: none;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.base};
  border: 1px solid ${({ theme }) => rgba(theme.colors.text, 0.2)};
  color: ${({ theme }) => rgba(theme.colors.text, 0.9)};
  height: 30px;
  svg {
    font-size: 16px;
  }
  span {
    margin-left: 5px;
  }
`;

function GrupoControl({ grupo, onEdit, onDelete }) {
  //console.log("GRUPOO: ",grupo)
  return (
    <Container>
      <Icon style={{ background: '#304ffe' }}>
        <FiSettings />
      </Icon>
      <Info>
        <Title>Tipo Instrumento: {grupo.tipoInstrumento}</Title>       
        <SubTitleContainer>
          <Title>Tag: {grupo.tag}</Title>
          <Title>Pid: {grupo.pid}</Title>
        </SubTitleContainer>
      </Info>

      <Actions>
        <Button onClick={() => onEdit(grupo.idListaInstrumento)}>
          <MdEdit />
        </Button>
        <Button onClick={() => onDelete(grupo.idListaInstrumento)}>
          <MdDelete />
        </Button>
      </Actions>
    </Container>
  );
}

GrupoControl.propTypes = {
  grupo: PropTypes.object,
  onEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default GrupoControl;