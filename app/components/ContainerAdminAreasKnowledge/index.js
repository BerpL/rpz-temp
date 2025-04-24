/**
 *
 * ContainerAreasKnowledge
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import TreeView from 'components/NewTreeView';
/* hooks */
import useTree from 'hooks/useTree';

/* services */
import { getAllQuestionsByArea } from 'services/KnowledgeAreasServices';
import { deleteQuestionById } from 'services/QuestionService';

/* components */
import NavbarAdmin from 'components/NavbarAdmin';
import Sticky from 'react-sticky-el';
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io/index.esm';
import EmptyListView from 'components/EmptyListView';
import TreeView from 'components/TreeView';
import ListQuestionsAdmin from 'components/ListQuestionsAdmin';
import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';
import {
  ContextMenuModalFolder,
  CONSTANTS,
} from 'components/TreeAdminContextMenu';
/* utils */

/* containers */
import {
  getAllAreasKnowledge,
  createAreasKnowledge,
  updateAreasKnowledge,
  deleteAreaKnowledge,
  moveAreaKnowledge,
} from 'services/AreasConocimientoService';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';

import { MdAdd } from 'react-icons/md/index.esm';

import Modals from './Modals';

function ContainerAreasKnowledge() {
  const [treeData, setTreeData] = useState({ nodos: [] });
  const [idArea, setIdArea] = useState(-1);

  const getTree = async () => {
    try {
      const response = await getAllAreasKnowledge();
      setTreeData(response.data.data);
      setIdArea(response.data.data.id);
    } catch {
      // console.log('error');
    }
  };

  useEffect(() => {
    getTree();
  }, []);
  /** Hook del arbol */
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

  /** Estados de los modales */
  const [idEditF, setIdEditF] = useState(-1);
  const [idEditQ, setIdEditQ] = useState(false);
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [openEditFolder, setOpenEditFolder] = useState(false);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [openEditQuestion, setOpenEditQuestion] = useState(false);

  /** Estado de lista de preguntas */
  const [questions, setQuestions] = useState([]);
  // const [questionsInitial, setQuestionsInitial] = useState([]);

  /** Funciones de los modales */
  const handleCloseEditF = () => setOpenEditFolder(false);
  const handleCloseAddF = () => setOpenAddFolder(false);
  const handleCloseAddQ = () => setOpenAddQuestion(false);
  const handleOpenAddQ = () => setOpenAddQuestion(true);
  const handleCloseEditQ = () => setOpenEditQuestion(false);
  const handleOpenEditQ = id => {
    setOpenEditQuestion(true);
    setIdEditQ(id);
  };

  /** obtener preguntas del API */
  const getQuestions = async id => {
    try {
      const response = await getAllQuestionsByArea(id);
      setQuestions(response.data.data);
      // setQuestionsInitial(response.data.data);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(
    () => {
      getQuestions(idArea);
    },
    [idArea],
  );

  const handleClickNode = id => {
    setIdArea(id);
    onSelectNode(id);
  };

  const handleAddFolder = async name => {
    const newNode = {
      nombre: name,
      descripcion: '',
      idPadreConocimiento: idEditF,
      codigo: '',
      nodos: [],
    };
    try {
      const response = await createAreasKnowledge(newNode);
      newNode.id = response.data.data.idAreaConocimiento;
      addNode(newNode, idEditF);
      return true;
    } catch {
      return false;
    }
  };

  const handleMoveNode = (from, to) => {
    const bodyFormData = new FormData();
    bodyFormData.set('to', to);
    onMoveNode(
      from,
      to,
      () => { },
      async canMove => {
        if (canMove) {
          try {
            await moveAreaKnowledge(from, bodyFormData);
          } catch (ex) {
            // console.log(ex);
          }
        }
      },
    );
  };

  const handleEditFolder = async name => {
    const foundNode = findNode(idEditF);

    const editNode = {
      idAreaConocimiento: foundNode.id,
      nombre: name,
      descripcion: foundNode.descripcion,
      idPadreConocimiento: foundNode.idPadre,
      codigo: foundNode.codigo,
      nodos: [],
    };
    try {
      await updateAreasKnowledge(idEditF, editNode);
      foundNode.nombre = name;
      // addNode(newNode, idEditF);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleDelFolder = async (identifier, nodeTmp) => {
    try {
      await deleteAreaKnowledge(identifier);

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

  const handleClickFolderCM = async (event, data) => {
    const { type, identifier } = data;

    setIdEditF(identifier);
    const nodeTmp = findNode(identifier);

    switch (type) {
      case CONSTANTS.NEW_FOLDER:
        return setOpenAddFolder(true);
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
  const handleSave = () => {
    getQuestions(idArea);
    handleCloseAddQ();
    handleCloseEditQ();
  };

  const handleDelete = async id => {
    await deleteQuestionById(id);
    getQuestions(idArea);
  };

  const renderList = () =>
    questions &&
    questions.length > 0 && (
      <Con maxWidth="600px" height="100%" width="100%">
        <ListQuestionsAdmin
          questions={questions}
          onEdit={handleOpenEditQ}
          onDelete={handleDelete}
        />
      </Con>
    );
  const renderEmptyList = () =>
    questions &&
    questions.length <= 0 && (
      <EmptyListView
        message="This level has no questions"
        subMessage="Select another level or"
        remark="create a question"
        imgTag="questionsList"
      />
    );

  return (
    <div style={{ height: '100%' }}>
      <ContainerFlex>
        <ActionsContainer>
          <Button onClick={handleOpenAddQ}>
            <MdAdd />
            New Question
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
                  {renderList()}
                  {renderEmptyList()}
                </Col>
              </Row>
            </Col>
          </Con>
        </Row>
      </ContainerFlex>
      <ContextMenuModalFolder onClickItem={handleClickFolderCM} />
      <Modals
        openAddFolder={openAddFolder}
        openAddQuestion={openAddQuestion}
        openEditFolder={openEditFolder}
        onEditFolder={handleEditFolder}
        onAddFolder={handleAddFolder}
        idEditFolder={idEditF}
        idEditQ={idEditQ}
        onSave={handleSave}
        idArea={idArea}
        onCloseAddFolder={handleCloseAddF}
        openEditQuestion={openEditQuestion}
        onCloseEditQuestion={handleCloseEditQ}
        onCloseEditFolder={handleCloseEditF}
        onCloseAddQuestion={handleCloseAddQ}
      />
    </div>
  );
}

ContainerAreasKnowledge.propTypes = {};

export default ContainerAreasKnowledge;
