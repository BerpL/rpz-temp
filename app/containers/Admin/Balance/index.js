import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md/index.esm';
import useTree from 'hooks/useTree';
import Modal from 'components/Modal';
import TreeView from 'components/TreeView';
import AdminBalanceFormUpdate from 'V2/components/AdminBalanceFormUpdate';
import AdminBalanceForm from 'V2/components/AdminBalanceForm';
import { Row, Col, Con } from 'components/ContainerFlex';
import {
  ContextMenuModalFolder,
  CONSTANTS,
} from 'components/TreeAdminContextMenu';
import Modals from './Modals'
// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Table from 'V2/components/Table';
import { BalanceService } from 'servicesV2';

import {
  getAllNodesFlujosTree,
  getFlujosTreeById,
  deleteFlujosTree,
  getFlujosByNode,
  createFlujosTree,
  moveFlujosTree,
  updateFlujosTree,
} from 'services/ArbolFlujosService';
import { useModal } from 'hooks/useModal';

function ContainerAdminBalances() {
  const [currentPageTable, setCurrentPageTable] = useState(1);
  const [balanceService] = useState(new BalanceService());
  const [idEditA, setIdEditA] = useState(-1);
  const [idEditF, setIdEditF] = useState(-1);
  const [treeData, setTreeData] = useState({ id: 0, nodos: [] });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [balances, setBalances] = useState([]);
  const [showAddModalFolder, toggleAddModalFolder] = useModal();
  const [showEditModalFolder, toggleEditModalFolder] = useModal();
  const [modalState, setModalState] = useState({
    isOpenModalE: false,
    isOpenModalA: false,
    idEditBalance: -1,
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

  const getBalances = async () => {
    try {
      const response = await getFlujosByNode(idEditA);
      setBalances(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddFolder = async name => {
    const newNode = {
      nombre: name,
      idFlujoPadre: idEditF,
      orden: 1,
      nodos: [],
    };
    // console.log(newNode)
    try {
      const response = await createFlujosTree(newNode);
      // console.log(response);
      newNode.id = response.data.data.idArbolFlujo;
      addNode(newNode, idEditF);
      return true;
    } catch {
      return false;
    }
  };
  const handleEditFolder = async name => {
    const foundNode = findNode(idEditF);
    //console.log(foundNode)
    const editNode = {
      idArbolProceso: foundNode.id,
      nombre: name,
      idArbolPadre: foundNode.idPadre,
      orden: 1,
      nodos: [],
    };
    try {
      await updateFlujosTree(idEditF, editNode);
      foundNode.nombre = name;
      // addNode(newNode, idEditF);
      return true;
    } catch (ex) {
      return false;
    }
  };

  useEffect(() => {
    getBalances();
  }, [idEditA]);

  const openModalEditBalance = (id, currentPage) => {
    setCurrentPageTable(currentPage);
    setModalState(p => ({
      ...p,
      isOpenModalE: true,
      idFlujo: id,
    }));
  };
  const closeModalEditBalance = () => {
    setUploadProgress(0);
    setModalState(p => ({
      ...p,
      isOpenModalE: false,
    }));
  };

  const handleDeleteFolder = async (identifier, nodeTmp) => {
    try {
      await deleteFlujosTree(identifier);

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
  const handleDeleteBalance = async (idx, currentPage) => {
    try {
      await balanceService.deleteBalance(idx);
      setCurrentPageTable(currentPage);
      getBalances();
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddBalance = () => {
    getBalances();
  };
  const handleEditBalance = () => {
    getBalances();
  };

  const openModalAddBalance = () => {
    setModalState(p => ({
      ...p,
      isOpenModalA: true,
    }));
  };
  const closeModalAddBalance = () => {
    setUploadProgress(0);
    setModalState(p => ({
      ...p,
      isOpenModalA: false,
    }));
  };
  const handleClickNode = id => {
    onSelectNode(id);
    setIdEditA(id);
  };

  const handleMoveNode = (from, to) => {
    const bodyFormData = new FormData();
    bodyFormData.set('to', to);

    async function moveNode(canMove) {
      if (canMove) {
        try {
          await moveFlujosTree(from, bodyFormData);
        } catch (ex) {
          // console.log(ex);
        }
      }
    }

    onMoveNode(from, to, () => {}, moveNode);
  };

  useEffect(() => {
    getTree();
  }, []);

  async function getTree() {
    try {
      const response = await getAllNodesFlujosTree();
      // console.log(response)
      setTreeData(response.data.data);
      setIdEditF(response.data.data.id);
      setIdEditA(response.data.data.id);
    } catch {
      // console.log('error');
    }
  }

  const handleClickFolderCM = async (event, data) => {
    const { type, identifier } = data;

    setIdEditF(identifier);
    const nodeTmp = findNode(identifier);
    //console.log(nodeTmp)

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

  const titles = [
    {
      key: 'nombre',
      value: 'Name',
      weight: 3,
    },
    {
      key: 'codigo',
      value: 'Code',
    },
  ];

  const actions = [
    {
      action: 'edit',
      value: 'idFlujo',
      onClick: openModalEditBalance,
    },
    {
      action: 'delete',
      value: 'idFlujo',
      onClick: handleDeleteBalance,
    },
  ];

  return (
    <>
      <ActionsContainer>
        <Button onClick={openModalAddBalance}>
          <MdAdd />
          New Balance
        </Button>
      </ActionsContainer>
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
                <Table titles={titles} data={balances} actions={actions} initialPage={currentPageTable} />
              </Col>
            </Row>
          </Col>
        </Con>
      </Row>

      <ContextMenuModalFolder onClickItem={handleClickFolderCM} />

      <Modal open={modalState.isOpenModalA} onClose={closeModalAddBalance}>
        <AdminBalanceForm
          onModify={handleAddBalance}
          onClose={closeModalAddBalance}
          idArbol={idEditA}
          // uploadProgress={uploadProgress}
        />
      </Modal>

      <Modal open={modalState.isOpenModalE} onClose={closeModalEditBalance}>
        <AdminBalanceFormUpdate
          onModify={handleEditBalance}
          id={modalState.idFlujo}
          onClose={closeModalEditBalance}
          idArbol={idEditA}
        />
      </Modal>
      <Modals
        openAddFolder={showAddModalFolder}
        openEditFolder={showEditModalFolder}
        onEditFolder={handleEditFolder}
        onAddFolder={handleAddFolder}
        idEditFolder={idEditF}
        onCloseAddFolder={toggleAddModalFolder}
        onCloseEditFolder={toggleEditModalFolder}
      />
    </>
  );
}

ContainerAdminBalances.propTypes = {};

export default ContainerAdminBalances;
