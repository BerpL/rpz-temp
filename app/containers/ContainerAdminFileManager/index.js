/**
 *
 * ContainerAdminFileManager
 *
 */

import React, { useState, useEffect, memo } from 'react';

import styled from 'styled-components';

import TreeView from 'components/TreeView';
import List from 'components/ListAdminArchives';
import ContainerMediaLink from 'components/ContainerMediaLink';

import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';
import {
  ContextMenuModalFolder,
  ContextMenuModalFile,
  ContextMenuModalFolderList,
  CMFolderWithImage,
  CONSTANTS,
} from 'components/TreeAdminContextMenu';
import useTree from 'hooks/useTree';

import Modal from 'components/Modal';
import { Loader } from 'components/Loader';

import ModifyFolder from 'components/ContainerModifyFolder';
import ModifyFolderImage from 'components/ContainerModifyFolderImage';
import ModifyMachinery from 'components/ContainerModifyMachinery';
import ModifyDocument from 'components/ContainerModifyDocument';
import ContainerLoadMedia from 'components/ContainerLoadMedia';
import Button from 'components/Button';
import { IoIosSearch } from 'react-icons/io/index.esm';
import Sticky from 'react-sticky-el';
import NavbarAdmin from 'components/NavbarAdmin';
import { darken, lighten } from 'polished';

import {
  getAllMainTreesKnowledge,
  deleteMainTree,
  createMainTree,
  moveMainTree,
  updateMainTree,
} from 'services/ArbolPrincipalService';

import {
  createDocument,
  updateDocument,
  deleteDocument,
} from 'services/DocumentService';
import {
  createMachinery,
  updateMachinery,
  deleteMachinery,
} from 'services/MachineryService';
import { getArchivesByArea, downloadArchive } from 'services/ArchivosService';

const ButtonStyled = styled(Button)`
  display: inline-block;
  width: auto;
`;

const ButtonAddachinery = styled(Button)`
  background: ${({ theme }) => darken('0.1', theme.colors.primary)};
  border-bottom: 5px solid ${({ theme }) => darken('0.3', theme.colors.primary)};
  transition: all 0.3s ease;
  margin-right: 10px;
  &:hover {
    background: ${({ theme }) => darken('0.1', theme.colors.primary)};
    border-bottom: 0px;
  }
`;

const ButtonAddDocument = styled(Button)`
  background: ${({ theme }) => lighten('0.2', theme.colors.primary)};
  border-bottom: 5px solid
    ${({ theme }) => lighten('0.1', theme.colors.primary)};
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => lighten('0.2', theme.colors.primary)};
    border-bottom: 0px;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

function ContainerAdminFileManager() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [archives, setArchives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [treeData, setTreeData] = useState({ nodos: [] });

  const getTree = async () => {
    setIsLoading(true);
    try {
      const response = await getAllMainTreesKnowledge();
      setTreeData(response.data.data);
      setIdEditF(response.data.data.id);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTree();
  }, []);

  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
    addNode,
    removeNode,
  ] = useTree({ data: treeData });

  // const [date, setDate] = useState(null);
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [openEditFolder, setOpenEditFolder] = useState(false);
  const [openAddFolderImage, setOpenAddFolderImage] = useState(false);
  const [openEditFolderImage, setOpenEditFolderImage] = useState(false);
  // const [idFolderActiveCM, setIdFolderActiveCM] = useState(false);
  const [openOnLoadMedia, setOpenOnLoadMedia] = useState(false);
  const [openNewDocument, setOpenNewDocument] = useState(false);
  const [openAddMachinery, setOpenAddMachinery] = useState(false);
  const [openEditDocument, setOpenEditDocument] = useState(false);
  const [openEditMachinery, setOpenEditMachinery] = useState(false);
  const [stateModalMediaLink, setStateModalMediaLink] = useState({
    open: false,
    id: -1,
    tipo: '',
  });
  const [idEditF, setIdEditF] = useState(-1);
  const [idEMoD, setIdEMoD] = useState(-1);

  const closeModalEF = () => setOpenEditFolder(false);
  const closeModalML = () =>
    setStateModalMediaLink(d => ({
      open: false,
      id: -1,
      tipo: '',
    }));
  const closeModalAF = () => setOpenAddFolder(false);
  const closeModalEFI = () => setOpenEditFolderImage(false);
  const closeModalAFI = () => setOpenAddFolderImage(false);
  const closeModalAD = () => {
    setUploadProgress(0);
    setOpenNewDocument(false);
  };
  const closeModalAM = () => {
    setUploadProgress(0);
    setOpenAddMachinery(false);
  };
  const closeModalEM = () => {
    setUploadProgress(0);
    setOpenEditMachinery(false);
  };
  const closeModalED = () => {
    setUploadProgress(0);
    setOpenEditDocument(false);
  };
  const openModalAD = () => setOpenNewDocument(true);
  const openModalAM = () => setOpenAddMachinery(true);
  const openModalEM = () => setOpenEditMachinery(true);
  const openModalED = () => setOpenEditDocument(true);

  const handleClickNode = id => {
    // setIdFolderActiveCM(id);
    setIdEditF(id);
    onSelectNode(id);
  };

  async function getArchives() {
    try {
      const response = await getArchivesByArea(idEditF);
      setArchives(response.data.data);
    } catch (ex) {}
  }

  useEffect(
    () => {
      getArchives();
    },
    [idEditF],
  );

  const handleMoveNode = (from, to) => {
    const bodyFormData = new FormData();
    bodyFormData.set('to', to);
    onMoveNode(
      from,
      to,
      () => {},
      async canMove => {
        if (canMove) {
          try {
            await moveMainTree(from, bodyFormData);
          } catch (ex) {}
        }
      },
    );
  };

  const options = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setUploadProgress(percent);
    },
  };

  const handleAddDocument = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('estado', true);
    bodyFormData.set('idArbol', idEditF);
    bodyFormData.set('habilitarPdf', values.visualizar);
    bodyFormData.set('fuente', values.docx && values.docx[0]);
    bodyFormData.set('lectura', values.pdf && values.pdf[0]);

    try {
      await createDocument(bodyFormData, options);
      getArchives();
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleEditDoM = (id, tipo) => {
    if (tipo === 1) {
      openModalED();
    }
    if (tipo === 2) {
      openModalEM();
    }

    setIdEMoD(id);
  };

  const handleAddMachinery = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('estado', true);
    bodyFormData.set('idArbol', idEditF);
    bodyFormData.set('habilitarPdf', values.visualizar);
    bodyFormData.set('fuente', values.docx && values.docx[0]);
    bodyFormData.set('lectura', values.pdf && values.pdf[0]);
    bodyFormData.set('imagen', values.imagen && values.imagen[0]);

    try {
      await createMachinery(bodyFormData, options);
      getArchives();
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleClickFolderCM = async (event, data) => {
    const { type, identifier, level } = data;
    setIdEditF(identifier);
    const nodeTmp = findNode(identifier);
    // console.log(type);
    switch (type) {
      case CONSTANTS.NEW_FOLDER:
        return level === 0
          ? setOpenAddFolderImage(true)
          : setOpenAddFolder(true);
      case CONSTANTS.EDIT_NAME_FOLDER:
        return setOpenEditFolder(true);
      case CONSTANTS.DELETE_FOLDER: {
        await handleDelFolder(identifier, nodeTmp);
        return true;
      }
      default:
        return null;
    }
  };

  const handleClickFolderImageCM = async (event, data) => {
    const { type, identifier } = data;
    setIdEditF(identifier);
    const nodeTmp = findNode(identifier);
    switch (type) {
      case CONSTANTS.NEW_FOLDER_IMAGE:
        return setOpenAddFolder(true);
      case CONSTANTS.EDIT_FOLDER_IMAGE:
        return setOpenEditFolderImage(true);
      case CONSTANTS.DELETE_FOLDER: {
        await handleDelFolder(identifier, nodeTmp);
        return true;
      }
      default:
        return null;
    }
  };

  const handleClickFileCM = (event, data) => {
    const { type } = data;
    switch (type) {
      case CONSTANTS.LOAD_MEDIA:
        return setOpenOnLoadMedia(true);
      default:
        return null;
    }
  };

  const handleAddFolder = async (name, imagen) => {
    const newNode = {
      nombre: name,
      estado: true,
      idPadre: idEditF,
      orden: 1,
      nodos: [],
      url: '/data',
    };

    const bodyFormData = new FormData();
    bodyFormData.set('nombre', newNode.nombre);
    bodyFormData.set('estado', newNode.estado);
    bodyFormData.set('idArbolPadre', newNode.idPadre);
    bodyFormData.set('orden', newNode.orden);
    bodyFormData.set('url', newNode.url);
    bodyFormData.set('file', imagen);
    try {
      const response = await createMainTree(bodyFormData);
      newNode.id = response.data.data.idArbol;
      addNode(newNode, idEditF);
      return true;
    } catch {
      return false;
    }
  };

  const handleEditFolder = async (name, imagen) => {
    const foundNode = findNode(idEditF);

    const editNode = {
      idArbol: foundNode.id,
      nombre: name,
      estado: foundNode.estado,
      idArbolPadre: foundNode.idPadre,
      orden: foundNode.orden,
      nodos: [],
      url: foundNode.url,
    };

    const bodyFormData = new FormData();
    bodyFormData.set('idArbol', editNode.idArbol);
    bodyFormData.set('nombre', editNode.nombre);
    bodyFormData.set('estado', editNode.estado);
    bodyFormData.set('idArbolPadre', editNode.idArbolPadre);
    bodyFormData.set('orden', editNode.orden);
    bodyFormData.set('url', editNode.url);
    bodyFormData.set('file', imagen);

    try {
      await updateMainTree(idEditF, bodyFormData);
      foundNode.nombre = name;
      // addNode(newNode, idEditF);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleEditDocument = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('idDocumento', values.id);
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('estado', values.estado);
    bodyFormData.set('idArbol', values.idArbol);
    bodyFormData.set('habilitarPdf', values.visualizar);
    bodyFormData.set(
      'fuente',
      values.docx && values.docx[0] instanceof File && values.docx[0],
    );
    bodyFormData.set(
      'lectura',
      values.pdf && values.pdf[0] instanceof File && values.pdf[0],
    );
    try {
      await updateDocument(values.id, bodyFormData, options);
      getArchives();
      return true;
    } catch (ex) {
      return false;
    }
  };
  const handleEditMachinery = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('idEquipo', values.id);
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('estado', values.estado);
    bodyFormData.set('idArbol', values.idArbol);
    bodyFormData.set('habilitarPdf', values.visualizar);
    bodyFormData.set('imagen', values.imagen && values.imagen[0]);
    bodyFormData.set(
      'fuente',
      values.docx && values.docx[0] instanceof File && values.docx[0],
    );
    bodyFormData.set(
      'lectura',
      values.pdf && values.pdf[0] instanceof File && values.pdf[0],
    );
    try {
      await updateMachinery(values.id, bodyFormData, options);
      getArchives();
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleDeleteDoM = async (id, tipo) => {
    if (tipo === 1) {
      try {
        await deleteDocument(id);
      } catch (ex) {}
    }
    if (tipo === 2) {
      try {
        await deleteMachinery(id);
      } catch (ex) {}
    }

    getArchives();
  };

  const handleDelFolder = async (identifier, nodeTmp) => {
    try {
      await deleteMainTree(identifier);

      if (node.id === nodeTmp.id) {
        handleClickNode(node.parent.id);
      }
      removeNode(nodeTmp.id, nodeTmp.parent.id);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleDownloadArchive = async idArchive => {
    try {
      await downloadArchive(idArchive);
    } catch (ex) {}
  };

  // const handleClickButtonFileManager = type => {
  // console.log(type);
  //   switch (type) {
  //     case CONSTANTS_FILER_MANAGER_BUTTON.NEW_FOLDER:
  //       return setOpenAddFolder(true);
  //     case CONSTANTS_FILER_MANAGER_BUTTON.NEW_DOCUMENT:
  //       return setOpenNewDocument(true);
  //     default:
  //       return null;
  //   }
  // };

  const handleMediaLink = (idDE, tipo) => {
    setStateModalMediaLink({
      open: true,
      tipo: tipo === 1 ? 'documento' : 'equipo',
      id: idDE,
    });
  };

  return (
    <ContainerFlex>
      {isLoading && <Loader />}
      <Row flexGrow="1" height="100%" padding="40px 0 0 0">
        <Con
          maxWidth="1200px"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="row"
        >
          <Col
            flexBasis="500px"
            flexShrink="0"
            flexGrow="0"
            display="unset"
            padding="0 16px 0 0"
            overflow="auto"
            height="calc(100vh - 100px)"
          >
            <TreeView
              onToggleItem={onOpenNode}
              items={tree}
              type="arbol_principal"
              onClickItem={handleClickNode}
              moveItem={handleMoveNode}
              findItem={findNode}
            />
          </Col>
          <Col flexGrow="1" width="100%" padding="0">
            <Row flexGrow="1" height="100%" overflow="auto">
              <Col width="100%" padding="0">
                <HeaderButtons>
                  <ButtonAddachinery onClick={openModalAM}>
                    Add Equipment
                  </ButtonAddachinery>
                  <ButtonAddDocument onClick={openModalAD}>
                    Add Document
                  </ButtonAddDocument>
                </HeaderButtons>
                {/* <ContainerAdminFolderWithFiles
                  onSelect={handleSelect}
                  onOpen={handleOpen}
                  folders={files}
                /> */}
                <List
                  archives={archives}
                  onEdit={handleEditDoM}
                  onDelete={handleDeleteDoM}
                  onDownload={handleDownloadArchive}
                  onLoadMedia={handleMediaLink}
                />
              </Col>
            </Row>
          </Col>
          {/* <Col
            flexBasis="200px"
            flexShrink="0"
            flexGrow="0"
            display="unset"
            padding="0 16px 0 0"
          >
            <ContainerFileDetail file={file} groupsAccess={groupsAccess} />
          </Col> */}
        </Con>
      </Row>
      <ContextMenuModalFolder onClickItem={handleClickFolderCM} />
      <ContextMenuModalFolderList onClickItem={handleClickFolderCM} />
      <ContextMenuModalFile onClickItem={handleClickFileCM} />
      <CMFolderWithImage onClickItem={handleClickFolderImageCM} />
      <Modal open={openOnLoadMedia} onClose={() => {}}>
        <ContainerLoadMedia />
      </Modal>
      <Modal open={openAddMachinery} onClose={closeModalAM}>
        <ModifyMachinery
          onModify={handleAddMachinery}
          onClose={closeModalAM}
          uploadProgress={uploadProgress}
        />
      </Modal>
      <Modal open={openNewDocument} onClose={closeModalAD}>
        <ModifyDocument
          onModify={handleAddDocument}
          onClose={closeModalAD}
          uploadProgress={uploadProgress}
        />
      </Modal>
      <Modal open={openEditMachinery} onClose={closeModalEM}>
        <ModifyMachinery
          id={idEMoD}
          onModify={handleEditMachinery}
          onClose={closeModalEM}
          uploadProgress={uploadProgress}
        />
      </Modal>
      <Modal open={openEditDocument} onClose={closeModalED}>
        <ModifyDocument
          id={idEMoD}
          onModify={handleEditDocument}
          onClose={closeModalED}
          uploadProgress={uploadProgress}
        />
      </Modal>
      <Modal open={openAddFolder} onClose={closeModalAF}>
        <ModifyFolder onModify={handleAddFolder} onClose={closeModalAF} />
      </Modal>
      <Modal open={openEditFolder} onClose={closeModalEF}>
        <ModifyFolder
          id={idEditF}
          onModify={handleEditFolder}
          onClose={closeModalEF}
        />
      </Modal>
      <Modal
        padding="0"
        overflow="visible"
        open={stateModalMediaLink.open}
        onClose={closeModalML}
      >
        <ContainerMediaLink
          id={stateModalMediaLink.id}
          tipo={stateModalMediaLink.tipo}
        />
      </Modal>
      <Modal open={openAddFolderImage} onClose={closeModalAFI}>
        <ModifyFolderImage onModify={handleAddFolder} onClose={closeModalAFI} />
      </Modal>
      <Modal open={openEditFolderImage} onClose={closeModalEFI}>
        <ModifyFolderImage
          id={idEditF}
          onModify={handleEditFolder}
          onClose={closeModalEFI}
        />
      </Modal>
    </ContainerFlex>
  );
}

ContainerAdminFileManager.propTypes = {};

export default memo(ContainerAdminFileManager);
