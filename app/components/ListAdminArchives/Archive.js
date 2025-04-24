import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FiFile, FiSettings } from 'react-icons/fi/index.esm';
import api from 'services/Api';
import { MdCloudDownload, MdArchive, MdDelete, MdEdit } from 'react-icons/md/index.esm';
import { confirmAlert } from 'react-confirm-alert';  // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for the modal

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

const Text = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  font-size: 11px;
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

function Archive({ archive, onDownload, onLoadMedia, onEdit, onDelete }) {

  const handleDeleteClick = (id, tipo) => {
    confirmAlert({
      title: 'Delete',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete(id, tipo),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <Container>
      <Icon style={{ background: archive.tipo === 1 ? '#304ffe' : '#6200ea' }}>
        {archive.tipo === 1 ? <FiFile /> : <FiSettings />}
      </Icon>
      <Info>
        <Text>{archive.tipo === 1 ? 'Document' : 'Equipment'}</Text>
        <Title>{archive.nombre}</Title>
      </Info>

      <Actions>
        {archive.tieneArchivoFuente && (
          <AButton
            href={`${api.defaults.baseURL}/archivos/${archive.fuente.idArchivo
              }/download`}
          >
            <MdCloudDownload />
          </AButton>
        )}
        <Button onClick={() => onLoadMedia(archive.id, archive.tipo)}>
          <MdArchive />
          <span>Upload media</span>
        </Button>
        <Button onClick={() => onEdit(archive.id, archive.tipo)}>
          <MdEdit />
        </Button>
        <Button onClick={() => handleDeleteClick(archive.id, archive.tipo)}>
          <MdDelete />
        </Button>
      </Actions>
    </Container>
  );
}

Archive.propTypes = {
  archive: PropTypes.object,
  onDownload: PropTypes.func,
  onLoadMedia: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Archive;
