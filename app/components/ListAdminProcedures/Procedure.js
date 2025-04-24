/**
 *
 * Procedure
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FiSettings } from 'react-icons/fi/index.esm';
import api from 'services/Api';
import { MdCloudDownload, MdArchive, MdDelete, MdEdit } from 'react-icons/md/index.esm';

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
`;

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

const AButton = styled.a`
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

function Procedure({ procedure, onLoadMedia, onEdit, onDelete }) {
  return (
    <Container>
      <Icon style={{ background: '#6200ea' }}>
        <FiSettings />
      </Icon>
      <Info>
        <Title>{procedure.nombre}</Title>
      </Info>

      <Actions>
        {procedure.tieneArchivoFuente && (
          <AButton
            href={`${api.defaults.baseURL}/archivosprocesos/${procedure.docx.idArchivoProceso
              }/download`}
          >
            <MdCloudDownload />
          </AButton>
        )}
        <Button onClick={() => onLoadMedia(procedure.id)}>
          <MdArchive />
          <span>Upload media</span>
        </Button>
        <Button onClick={() => onEdit(procedure.id)}>
          <MdEdit />
        </Button>
        <Button onClick={() => onDelete(procedure.id)}>
          <MdDelete />
        </Button>
      </Actions>
    </Container>
  );
}

Procedure.propTypes = {
  procedure: PropTypes.object,
};

export default Procedure;
