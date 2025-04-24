import React, { useState, useEffect } from 'react';
import TreeView from 'components/TreeView';
import useTree from 'hooks/useTree';

import ModifyControlGroup from 'components/ContainerModifyControlGroup';
import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';

import {
  ContextMenuModalGroup,
  ContextMenuModalFolderGroup,
  CONSTANTS,
} from 'components/TreeAdminContextMenu';
import Modal from 'components/Modal';

import {
  getAllNodesControlGroup,
  createNodeControlGroup,
  updateNodeControlGroup,
  deleteNodeControlGroup,
} from 'services/ControlGroupService';
import TabViewer from './TabViewer';

const preLoadTime = (fn, delay = 1000) => setTimeout(() => fn(), delay);

function ContainerProcessControl() {
  const [treeData, setTreeData] = useState({ nodos: [] });

  const getTree = async () => {
    try {
      const response = await getAllNodesControlGroup();
      setTreeData(response.data.data);
      // setIdEditF(response.data.data.id);
    } catch {
      // console.log('error');
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

  const [openEControlGroup, setOpenEControlGroup] = useState(false);
  const [openAControlGroup, setOpenAControlGroup] = useState(false);

  const [stateTab, setStateTab] = useState(true);

  const [idEControlGroup, setIdEControlGroup] = useState(-1);
  const [isGroup, setIsGroup] = useState(false);
  const [tab, setTab] = useState({
    index: 1,
  });

  const closeAControlGroup = () => setOpenAControlGroup(false);
  const closeEControlGroup = () => setOpenEControlGroup(false);

  const handleClickNode = id => {
    setIdEControlGroup(id);
    onSelectNode(id);
    const nodeTmp = findNode(id);
    setIsGroup(nodeTmp.esGrupo);
    if (nodeTmp.esGrupo) {
      setStateTab(true);
      setTab(t => ({ ...t, index: 1 }));
    }
    preLoadTime(() => setStateTab(false));
  };

  const handleMoveNode = () => {};

  const handleClickItemMenuControlGroup = async (
    event,
    data,
    isGroupTmp = false,
  ) => {
    const { type, identifier } = data;

    setIdEControlGroup(identifier);
    setIsGroup(isGroupTmp);
    const nodeTmp = findNode(identifier);
    switch (type) {
      case CONSTANTS.NEW_GROUP:
        return setOpenAControlGroup(true);
      case CONSTANTS.EDIT_GROUP:
        return setOpenEControlGroup(true);
      case CONSTANTS.DELETE_GROUP: {
        await deleteFolderCallback(identifier, nodeTmp);
        return true;
      }
      default:
        return null;
    }
  };

  const handleAControlGroup = async name => {
    const newNode = {
      nombre: name,
      estado: true,
      idPadre: idEControlGroup,
      orden: 1,
      idGrupoPadre: idEControlGroup,
      nodos: [],
      esGrupo: true,
      url: '/data',
    };
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', newNode.nombre);
    bodyFormData.set(isGroup ? 'idGrupoPadre' : 'idArbol', newNode.idPadre);
    try {
      const response = await createNodeControlGroup(bodyFormData);
      newNode.id = response.data.data.idGrupoControl;
      addNode(newNode, idEControlGroup);
      return true;
    } catch {
      return false;
    }
  };
  const handleEControlGroup = async name => {
    const foundNode = findNode(idEControlGroup);

    const editNode = {
      idArbol: foundNode.id,
      nombre: name,
      estado: foundNode.estado,
      idPadre: foundNode.idPadre,
      idGrupoPadre: foundNode.idGrupoPadre,
      orden: foundNode.orden,
      nodos: [],
      esGrupo: true,
      url: foundNode.url,
    };

    const bodyFormData = new FormData();
    bodyFormData.set('nombre', editNode.nombre);
    bodyFormData.set('idGrupoControl', idEControlGroup);

    try {
      await updateNodeControlGroup(idEControlGroup, bodyFormData);
      foundNode.nombre = name;
      // addNode(newNode, idEditF);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const deleteFolderCallback = async (identifier, nodeTmp) => {
    try {
      await deleteNodeControlGroup(identifier);

      if (node.id === nodeTmp.id) {
        handleClickNode(node.parent.id);
      }
      removeNode(nodeTmp.id, nodeTmp.parent.id);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const changeTabHandler = id => {
    if (id === 1) {
      setTab(t => ({ ...t, index: 1 }));
    }

    if (id === 2) {
      setTab(t => ({ ...t, index: 2 }));
    }
  };

  useEffect(() => {}, [idEControlGroup]);

  return (
    <ContainerFlex>
      <Row flexGrow="1" height="100%" padding="40px 0 0 0">
        <Con
          maxWidth="1000px"
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
              type="grupo_control"
              onClickItem={handleClickNode}
              moveItem={handleMoveNode}
              draggable={false}
              findItem={findNode}
            />
          </Col>
          <Col flexGrow="1" width="100%" padding="0">
            <Row flexGrow="1" height="100%" overflow="auto">
              {isGroup && (
                <Col width="100%" padding="0">
                  {stateTab && <div>loading...</div>}
                  {!stateTab && (
                    <TabViewer
                      onChangeTab={changeTabHandler}
                      selected={tab.index}
                      idSelectedControlGroup={idEControlGroup}
                      key={`${idEControlGroup}tab`}
                    />
                  )}
                </Col>
              )}
            </Row>
          </Col>
        </Con>
      </Row>

      <Modal open={openAControlGroup} onClose={closeAControlGroup}>
        <ModifyControlGroup
          onModify={handleAControlGroup}
          onClose={closeAControlGroup}
        />
      </Modal>
      <Modal open={openEControlGroup} onClose={closeEControlGroup}>
        <ModifyControlGroup
          id={idEControlGroup}
          onModify={handleEControlGroup}
          onClose={closeEControlGroup}
        />
      </Modal>
      <ContextMenuModalGroup
        onClickItem={(e, data) =>
          handleClickItemMenuControlGroup(e, data, true)
        }
      />
      <ContextMenuModalFolderGroup
        onClickItem={(e, data) =>
          handleClickItemMenuControlGroup(e, data, false)
        }
      />
    </ContainerFlex>
  );
}

ContainerProcessControl.propTypes = {};

export default ContainerProcessControl;
