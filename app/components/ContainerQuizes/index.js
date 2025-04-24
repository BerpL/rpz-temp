/**
 *
 * ContainerQuizes
 *
 */

import React, { useEffect, useState } from 'react';

import ListAdminQuizes from 'components/ListAdminQuizes';

import ModifyQuiz from 'components/ContainerModifyQuiz';
import randomMC from 'random-material-color';
import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';
import History from 'utils/history';
import Modal from 'components/Modal';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';

import { MdAdd } from 'react-icons/md/index.esm';

/** servicios */
import {
  getAllQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from 'services/EvaluacionesService';

function ContainerQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [modalState, setModalState] = useState({
    isOpenModalE: false,
    isOpenModalA: false,
    idEditQuiz: -1,
  });

  const getQuizzes = async () => {
    try {
      const response = await getAllQuizzes();
      setQuizzes(response.data.data);
    } catch { }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const handleClickItem = quiz => {
    History.push(`/admin/quiz/${quiz.id}`);
  };

  const openModalEditQuiz = id => {
    setModalState(p => ({
      ...p,
      isOpenModalE: true,
      idEditQuiz: id,
    }));
  };
  const closeModalEditQuiz = () => {
    setModalState(p => ({
      ...p,
      isOpenModalE: false,
    }));
  };

  const openModalAddQuiz = () => {
    setModalState(p => ({
      ...p,
      isOpenModalA: true,
    }));
  };
  const closeModalAddQuiz = () => {
    setModalState(p => ({
      ...p,
      isOpenModalA: false,
    }));
  };

  const handleDeleteQuiz = async idx => {
    try {
      await deleteQuiz(idx);
      getQuizzes();
    } catch { }
  };
  const handleAddQuiz = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('descripcion', valuesTmp.descripcion);
    bodyFormData.set('duracion', valuesTmp.duracion);
    bodyFormData.set('color', randomMC.getColor());

    try {
      await createQuiz(bodyFormData);
      getQuizzes();
      return true;
    } catch (ex) {
      return false;
    }
  };
  const handleEditQuiz = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('idEvaluacion', modalState.idEditQuiz);
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('descripcion', valuesTmp.descripcion);
    bodyFormData.set('duracion', valuesTmp.duracion);

    try {
      await updateQuiz(modalState.idEditQuiz, bodyFormData);
      getQuizzes();
      return true;
    } catch (ex) {
      return false;
    }
  };

  return (
    <ContainerFlex>
      <ActionsContainer>
        <Button onClick={openModalAddQuiz}>
          <MdAdd />
          New Assessment
        </Button>
      </ActionsContainer>

      <ListAdminQuizes
        quizes={quizzes}
        onClick={handleClickItem}
        onEdit={openModalEditQuiz}
        onDelete={handleDeleteQuiz}
      />

      <Modal open={modalState.isOpenModalA} onClose={closeModalAddQuiz}>
        <ModifyQuiz onModify={handleAddQuiz} onClose={closeModalAddQuiz} />
      </Modal>

      <Modal open={modalState.isOpenModalE} onClose={closeModalEditQuiz}>
        <ModifyQuiz
          onModify={handleEditQuiz}
          id={modalState.idEditQuiz}
          onClose={closeModalEditQuiz}
        />
      </Modal>
    </ContainerFlex>
  );
}

ContainerQuizzes.propTypes = {};

export default ContainerQuizzes;

const QuizsData = [
  {
    id: 1,
    duration: 60,
    answers: '50',
    title: 'Estándares de Seguridad – 14 Reglas de Vida',
    description: 'Estándares de Seguridad – 14 Reglas de Vida',
    color: randomMC.getColor(),
  },
  {
    id: 2,
    duration: 45,
    answers: '20',
    title: 'Gestión De Incidentes, Inspecciones, Auditoria Y Señalización',
    description: 'Descripción de evaluación N°2',
    color: randomMC.getColor(),
  },
  {
    id: 3,
    duration: 20,
    answers: '10',
    title: 'Incidentes, Inspecciones de Seguridad y Codigo de Colores',
    description: 'Descripción de evaluación N°2',
    color: randomMC.getColor(),
  },
  {
    id: 4,
    duration: 35,
    answers: '50',
    title: 'Plan de Preparación y Respuesta a Emergencias',
    description: 'Descripción de evaluación N°2',
    color: randomMC.getColor(),
  },
  {
    id: 5,
    duration: 60,
    answers: '50',
    title: 'Evaluación del Curso',
    description: 'Descripción de evaluación N°1',
    color: randomMC.getColor(),
  },
];
