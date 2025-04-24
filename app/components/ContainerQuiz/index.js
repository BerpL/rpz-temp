/**
 *
 * ContainerQuiz
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ContainerFlex, Row, Col } from 'components/ContainerFlex';

// import randomMC from 'random-material-color';
import History from 'utils/history';
import ModalQuestionBank from 'components/ModalQuestionBank';
import {
  getQuizById,
  getQuizByIdDetail,
  getQuizKnowledgeAreas,
  changeIntents,
} from 'services/EvaluacionesService';
import {
  createDetail,
  deleteDetail,
} from 'services/DetalleEvaluacionesService';
import Modal from 'components/Modal';

import AssignEvaluation from 'components/AssignEvaluation';
// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
// import Button from 'V2/components/AdminButton';
// import Search from 'V2/components/AdminSearch';

// import { MdAdd } from 'react-icons/md/index.esm';

import ItemQuiz from './ItemQuiz';
import ListQuestions from './ListQuestions';
import HeaderListQuestions from './HeaderListQuestions';
import ItemsConfiguration from './ItemsConfiguration';

const quizInitialData = {
  color: '',
  id: '',
  descripcion: '',
  nombre: '',
  numeroPreguntas: '',
};

function ContainerQuiz({ match }) {
  const { id } = match.params;

  const [isOpenQuestionBank, setOpenQuestionBank] = useState(false);
  const [modalAssignEvaluationState, setModalAssignEvaluationState] = useState({
    isOpen: false,
    idEvaluation: id,
  });
  const [quiz, setQuiz] = useState(quizInitialData);
  const [quizDetail, setQuizDetail] = useState([]);
  const [tree, setTree] = useState({ nodos: [] });

  const getQuiz = async () => {
    try {
      const response = await getQuizById(id);
      setQuiz(response.data.data);
    } catch (err) { }
  };

  const getTree = async () => {
    try {
      const response = await getQuizKnowledgeAreas(id);
      setTree(response.data.data);
    } catch { }
  };

  const getQuizDetail = async () => {
    try {
      const response = await getQuizByIdDetail(id);
      setQuizDetail(response.data.data);
    } catch (err) { }
  };

  useEffect(() => {
    getQuiz();
    getQuizDetail();
    getTree();
  }, []);

  const returnToQuiz = () => {
    History.goBack();
  };

  const closeAssignEvaluation = () => {
    document.body.style.overflowY = 'inherit';
    setModalAssignEvaluationState(s => ({
      ...s,
      isOpen: false,
    }));
  };
  const openAssignEvaluation = () => {
    document.body.style.overflowY = 'hidden';
    setModalAssignEvaluationState(s => ({
      ...s,
      isOpen: true,
    }));
  };

  const openQuestionsBank = () => {
    document.body.style.overflowY = 'hidden';
    getTree();
    setOpenQuestionBank(true);
  };

  const closeQuestionsBank = () => {
    document.body.style.overflowY = 'inherit';
    setOpenQuestionBank(false);
  };

  const handleAddQuestionsGroup = async idAreaConocimiento => {
    const bodyFormData = new FormData();
    bodyFormData.set('idAreaConocimiento', idAreaConocimiento);
    bodyFormData.set('IdEvaluacion', id);

    try {
      await createDetail(bodyFormData);
      getQuizDetail();
      getQuiz();
      getTree();
    } catch { }
  };

  const handleDeleteDetail = async idDetail => {
    try {
      await deleteDetail(idDetail);
      getQuizDetail();
    } catch { }
  };

  const onChangeIntents = async (name, value) => {
    const bodyFormData = new FormData();
    bodyFormData.set('intentos', value);
    try {
      await changeIntents(id, bodyFormData);
      getQuiz();
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ContainerFlex>
      <ActionsContainer
        hasBack
        backMessage="Back to Assessments"
        onClickBack={returnToQuiz}
      />

      <Row width="100%" flexGrow={1}>
        <Col width="100%" flexGrow={1} padding="00 16px 0">
          <ItemQuiz  quiz={quiz} />
          <HeaderListQuestions onClickAdd={openQuestionsBank} />
          <ListQuestions groups={quizDetail} onDelete={handleDeleteDetail} />
        </Col>
        <Col flexShrink="0" width="350px" padding="0">
          <ItemsConfiguration
            openAssignEvaluation={openAssignEvaluation}
            onChangeIntents={onChangeIntents}
            intents={quiz.intentos}
          />
        </Col>
      </Row>

      <Modal
        open={modalAssignEvaluationState.isOpen}
        onClose={closeAssignEvaluation}
      >
        <AssignEvaluation
          idEvaluacionParam={modalAssignEvaluationState.idEvaluation}
          onClose={closeAssignEvaluation}
        />
      </Modal>
      <ModalQuestionBank
        treeData={tree}
        open={isOpenQuestionBank}
        onClose={closeQuestionsBank}
        onAdd={handleAddQuestionsGroup}
      />
    </ContainerFlex>
  );
}

ContainerQuiz.propTypes = {
  match: PropTypes.object,
};

export default ContainerQuiz;
