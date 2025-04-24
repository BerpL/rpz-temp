/**
 *
 * ContainerPid
 *
 */

import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import TreeView from 'components/TreeView';
import useTree from 'hooks/useTree';
import {
  ContextMenuModalFolder,
  CONSTANTS,
} from 'components/TreeAdminContextMenu';

import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';

// import NavbarAdmin from 'components/NavbarAdmin';
import List from 'components/ListAdminPid';
// import Sticky from 'react-sticky-el';
// import { IoIosAddCircle, IoIosSearch } from 'react-icons/io/index.esm';

import {
  getAllNodesPidTree,
  createPidTree,
  updatePidTree,
  deletePidTree,
  getPidsByNode,
  movePidTree,
} from 'services/ArbolPidsService';

import { createPid, updatePid, deletePid } from 'services/PidsService';

import { useModal } from 'hooks/useModal';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';

import { MdAdd } from 'react-icons/md/index.esm';

import Modals from './Modals';
/** hooks */

const ButtonStyled = styled(Button)`
  display: inline-block;
  width: auto;
`;

function ContainerPid() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [treeData, setTreeData] = useState({ id: 0, nodos: [] });

  const [idEditF, setIdEditF] = useState(-1);
  const [idEditA, setIdEditA] = useState(-1);
  const [idEditPid, setIdEditPid] = useState(-1);

  /** Start folder states modals */
  const [showAddModalFolder, toggleAddModalFolder] = useModal();
  const [showEditModalFolder, toggleEditModalFolder] = useModal();
  /** End folder states */

  /** Start pids state modals */
  const [showAddModalPid, toggleAddModalPid] = useModal();
  const [showEditModalPid, toggleEditModalPid] = useModal();

  useEffect(() => {
    if (!showAddModalPid) setUploadProgress(0);
  }, [showAddModalPid])

  useEffect(() => {
    if (!showEditModalPid) setUploadProgress(0);
  }, [showEditModalPid])

  /** End pids state modals */

  const [pids, setPids] = useState([]);

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
      const response = await getAllNodesPidTree();
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

  /** start Folder functions */

  const handleAddFolder = async name => {
    const newNode = {
      nombre: name,
      idPidPadre: idEditF,
      orden: 1,
      nodos: [],
    };
    try {
      const response = await createPidTree(newNode);
      newNode.id = response.data.data.idArbolPid;
      addNode(newNode, idEditF);
      return true;
    } catch {
      return false;
    }
  };

  const handleEditFolder = async name => {
    const foundNode = findNode(idEditF);
    const editNode = {
      idArbolPid: foundNode.id,
      nombre: name,
      idPidPadre: foundNode.idPadre,
      orden: 1,
      nodos: [],
    };
    try {
      await updatePidTree(idEditF, editNode);
      foundNode.nombre = name;
      // addNode(newNode, idEditF);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleDeleteFolder = async (identifier, nodeTmp) => {
    try {
      await deletePidTree(identifier);

      if (node.id === nodeTmp.id) {
        handleClickNode(node.parent.id);
      }
      removeNode(nodeTmp.id, nodeTmp.parent.id);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleMoveNode = (from, to) => {
    const bodyFormData = new FormData();
    bodyFormData.set('to', to);

    async function moveNode(canMove) {
      if (canMove) {
        try {
          await movePidTree(from, bodyFormData);
        } catch (ex) {
          // console.log(ex);
        }
      }
    }

    onMoveNode(from, to, () => { }, moveNode);
  };

  /** start Folder functions */


  const options = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      setUploadProgress(percent);
    }
  }

  const handleAddPid = async values => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('nombre', values.nombre);
      bodyFormData.set('estado', true);
      bodyFormData.set('idArbolPid', idEditA);
      bodyFormData.set('archivo', values.archivo && values.archivo[0]);
      await createPid(bodyFormData, options);

      getPids();
      return true;
    } catch {
      return false;
    }
  };

  const handleEditPid = async values => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('idPid', values.idPid);
      bodyFormData.set('nombre', values.nombre);
      bodyFormData.set('estado', true);
      bodyFormData.set('idArbolPid', values.idArbolPid);
      bodyFormData.set('archivo', values.archivo && values.archivo[0]);
      await updatePid(idEditPid, bodyFormData, options);

      getPids();
      return true;
    } catch {
      return false;
    }
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

  const getPids = async () => {
    try {
      const response = await getPidsByNode(idEditA);
      // console.log(response);
      setPids(response.data.data);
    } catch { }
  };

  useEffect(
    () => {
      getPids();
    },
    [idEditA],
  );

  const handleDelete = async id => {
    try {
      await deletePid(id);
      getPids();
    } catch { }
  };

  const handleEdit = id => {
    toggleEditModalPid();
    setIdEditPid(id);
  };

  return (
    <ContainerFlex>
      <ActionsContainer>
        <Button onClick={toggleAddModalPid}>
          <MdAdd />
          New P&ID
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
                <List pids={pids} onDelete={handleDelete} onEdit={handleEdit} />
              </Col>
            </Row>
          </Col>
        </Con>
      </Row>

      <ContextMenuModalFolder onClickItem={handleClickFolderCM} />
      <Modals
        uploadProgress={uploadProgress}
        openAddFolder={showAddModalFolder}
        openEditFolder={showEditModalFolder}
        onEditFolder={handleEditFolder}
        onAddFolder={handleAddFolder}
        onAddPid={handleAddPid}
        onEditPid={handleEditPid}
        idEditFolder={idEditF}
        idEditPid={idEditPid}
        onCloseAddFolder={toggleAddModalFolder}
        onCloseEditFolder={toggleEditModalFolder}
        openAddPid={showAddModalPid}
        onCloseAddPid={toggleAddModalPid}
        openEditPid={showEditModalPid}
        onCloseEditPid={toggleEditModalPid}
      />
    </ContainerFlex>
  );
}

ContainerPid.propTypes = {};

export default memo(ContainerPid);
