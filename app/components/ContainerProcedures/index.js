/**
 *
 * ContainerProcedures
 *
 */

import React, { useState, useEffect, memo } from 'react';
// import styled from 'styled-components';
import TreeView from 'components/TreeView';
import useTree from 'hooks/useTree';
import {
  ContextMenuModalFolder,
  CONSTANTS,
} from 'components/TreeAdminContextMenu';
// import _ from 'lodash';
import Modal from 'components/Modal';
import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';
// import NavbarAdmin from 'components/NavbarAdmin';
// import Sticky from 'react-sticky-el';
// import { IoIosAddCircle, IoIosSearch } from 'react-icons/io/index.esm';

import List from 'components/ListAdminProcedures';
import ContainerMediaLink from 'components/ContainerMediaLink';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
// import Search from 'V2/components/AdminSearch';

import { MdAdd } from 'react-icons/md/index.esm';

import { useModal } from 'hooks/useModal';

import {
  getAllTreeProcess,
  createTreeProcess,
  deleteTreeProcess,
  getProcessByNode,
  updateTreeProcess,
  moveTreeProcess,
} from 'services/ArbolProcesosService';

import {
  deleteProcedure,
  createProcedure,
  updateProcedure,
} from 'services/ProcesosService';

import Modals from './Modals';

function ContainerProcedures() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [treeData, setTreeData] = useState({ id: 0, nodos: [] });

  const [idEditF, setIdEditF] = useState(-1);
  const [idEditA, setIdEditA] = useState(-1);
  const [idEditProcedure, setIdEditProcedure] = useState(-1);

  /** Start folder states modals */
  const [showAddModalFolder, toggleAddModalFolder] = useModal();
  const [showEditModalFolder, toggleEditModalFolder] = useModal();
  /** End folder states */

  /** Start Procedures state modals */
  const [showAddModalProcedure, toggleAddModalProcedure] = useModal();
  const [showEditModalProcedure, toggleEditModalProcedure] = useModal();

  useEffect(() => {
    if (!showAddModalProcedure) setUploadProgress(0);
  }, [showAddModalProcedure])

  useEffect(() => {
    if (!showEditModalProcedure) setUploadProgress(0);
  }, [showEditModalProcedure])


  const [procedures, setProcedures] = useState([]);

  const [stateModalMediaLink, setStateModalMediaLink] = useState({
    open: false,
    id: -1,
    tipo: '',
  });

  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
    addNode,
    removeNode,
  ] = useTree({
    data: treeData,
  });

  useEffect(() => {
    getTree();
  }, []);

  async function getTree() {
    try {
      const response = await getAllTreeProcess();
      setTreeData(response.data.data);
      setIdEditF(response.data.data.id);
      setIdEditA(response.data.data.id);
    } catch {
      // console.log('error');
    }
  }

  const handleClickNode = id => {
    onSelectNode(id);
    setIdEditA(id);
  };

  const handleAddFolder = async name => {
    const newNode = {
      nombre: name,
      idArbolPadre: idEditF,
      orden: 1,
      nodos: [],
    };
    try {
      const response = await createTreeProcess(newNode);
      newNode.id = response.data.data.idArbolProceso;
      addNode(newNode, idEditF);
      return true;
    } catch {
      return false;
    }
  };

  const handleEditFolder = async name => {
    const foundNode = findNode(idEditF);
    const editNode = {
      idArbolProceso: foundNode.id,
      nombre: name,
      idArbolPadre: foundNode.idPadre,
      orden: 1,
      nodos: [],
    };
    try {
      await updateTreeProcess(idEditF, editNode);
      foundNode.nombre = name;
      // addNode(newNode, idEditF);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleDeleteFolder = async (identifier, nodeTmp) => {
    try {
      await deleteTreeProcess(identifier);

      if (node.id === nodeTmp.id) {
        handleClickNode(node.parent.id);
      }
      removeNode(nodeTmp.id, nodeTmp.parent.id);
      return true;
    } catch (ex) {
      // console.log(ex);
      return false;
    }
  };

  const handleMoveNode = (from, to) => {
    const bodyFormData = new FormData();
    bodyFormData.set('to', to);

    async function moveNode(canMove) {
      if (canMove) {
        try {
          await moveTreeProcess(from, bodyFormData);
        } catch (ex) {
          // console.log(ex);
        }
      }
    }

    onMoveNode(from, to, () => { }, moveNode);
  };

  const handleClickFolderCM = async (event, data) => {
    const { type, identifier } = data;

    setIdEditF(identifier);
    const nodeTmp = findNode(identifier);

    switch (type) {
      case CONSTANTS.NEW_FOLDER:
        return toggleAddModalFolder();
      case CONSTANTS.EDIT_NAME_FOLDER:
        return toggleEditModalFolder();
      case CONSTANTS.DELETE_FOLDER:
        await handleDeleteFolder(identifier, nodeTmp);
        return true;
      default:
        return null;
    }
  };

  const options = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      setUploadProgress(percent);
    }
  }

  const handleAddProcedure = async values => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('nombre', values.nombre);
      bodyFormData.set('estado', true);
      bodyFormData.set('idArbolProceso', idEditA);
      bodyFormData.set('lectura', values.pdf && values.pdf[0]);
      bodyFormData.set('fuente', values.docx && values.docx[0]);
      await createProcedure(bodyFormData, options);

      getProcedures();
      return true;
    } catch {
      return false;
    }
  };

  const handleEditProcedure = async values => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('idProceso', values.id);
      bodyFormData.set('nombre', values.nombre);
      bodyFormData.set('estado', true);
      bodyFormData.set('IdArbolProceso', idEditA);
      bodyFormData.set('lectura', values.pdf && values.pdf[0]);
      bodyFormData.set('fuente', values.docx && values.docx[0]);
      await updateProcedure(idEditProcedure, bodyFormData, options);

      getProcedures();
      return true;
    } catch {
      return false;
    }
  };

  const getProcedures = async () => {
    try {
      const response = await getProcessByNode(idEditA);
      // console.log(response);
      setProcedures(response.data.data);
    } catch { }
  };

  useEffect(
    () => {
      getProcedures();
    },
    [idEditA],
  );

  const handleDelete = async id => {
    try {
      await deleteProcedure(id);
      getProcedures();
    } catch { }
  };

  const handleEdit = id => {
    toggleEditModalProcedure();
    setIdEditProcedure(id);
  };

  const closeModalML = () =>
    setStateModalMediaLink(d => ({
      open: false,
      id: -1,
      tipo: '',
    }));

  const handleMediaLink = (idDE, tipo) => {
    setStateModalMediaLink({
      open: true,
      tipo: 'proceso',
      id: idDE,
    });
  };

  return (
    <ContainerFlex>
      <ActionsContainer>
        <Button onClick={toggleAddModalProcedure}>
          <MdAdd />
          New Procedure
        </Button>
      </ActionsContainer>
      <Row flexGrow="1" height="100%" padding="40px 0 0 0">
        <Con
          maxWidth="1000px"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="row"
        >
          <Col
            flexBasis="300px"
            flexShrink="0"
            flexGrow="0"
            display="unset"
            overflow="auto"
            height="calc(100vh - 150px)"
          >
            <TreeView
              key="tree_files_manager"
              onToggleItem={onOpenNode}
              items={tree}
              onClickItem={handleClickNode}
              moveItem={handleMoveNode}
              findItem={findNode}
            />
          </Col>
          <Col flexGrow="1" width="100%" padding="0">
            <Row flexGrow="1" height="100%" overflow="auto">
              <Col width="100%" padding="0">
                <List
                  procedures={procedures}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onLoadMedia={handleMediaLink}
                />
              </Col>
            </Row>
          </Col>
        </Con>
      </Row>

      <ContextMenuModalFolder onClickItem={handleClickFolderCM} />
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
      <Modals
        uploadProgress={uploadProgress}
        openAddFolder={showAddModalFolder}
        openEditFolder={showEditModalFolder}
        onEditFolder={handleEditFolder}
        onAddFolder={handleAddFolder}
        onAddProcedure={handleAddProcedure}
        onEditProcedure={handleEditProcedure}
        idEditFolder={idEditF}
        idEditProcedure={idEditProcedure}
        onCloseAddFolder={toggleAddModalFolder}
        onCloseEditFolder={toggleEditModalFolder}
        openAddProcedure={showAddModalProcedure}
        onCloseAddProcedure={toggleAddModalProcedure}
        openEditProcedure={showEditModalProcedure}
        onCloseEditProcedure={toggleEditModalProcedure}
      />
    </ContainerFlex>
  );
}

ContainerProcedures.propTypes = {};

export default memo(ContainerProcedures);
