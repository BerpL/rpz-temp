import React, { useEffect, useState } from 'react';
import { FaClock, FaQuestion } from 'react-icons/fa/index.esm';
import { getQuizById } from 'services/EvaluacionesService';
import PropTypes from 'prop-types';
import {
  Title,
  Container,
  EvaluationName,
  EvaluationQuestions,
  EvaluationTime,
  ContainerInfo,
  Highlight,
  Conditions,
  Button,
  CancelButton,
  ContainerButtons,
} from './Styles';

const initialValues = {
  nombre: '',
  numeroPreguntas: 0,
  duracion: 0,
};

const getScheduledEvaluationsData = async id => {
  try {
    const { data } = await getQuizById(id);
    return data.data;
  } catch {
    return initialValues;
  }
};

const ModalStartEvaluation = ({ id, onClose, onStartEvaluation }) => {
  const [evaluationState, setEvaluationState] = useState({
    evaluation: initialValues,
    isLoading: true,
    hasError: false,
  });

  const loadDatEvaluation = async () => {
    const data = await getScheduledEvaluationsData(id);
    setEvaluationState(e => ({
      ...e,
      evaluation: data,
    }));
  };

  useEffect(() => {
    loadDatEvaluation();
    return () => { };
  }, []);

  const { evaluation } = evaluationState;

  const durationTime =
    evaluation.duracion === 1
      ? `${evaluation.duracion} minute`
      : `${evaluation.duracion} minutes`;

  const numberQuestions =
    evaluation.numeroPreguntas === 1
      ? `${evaluation.numeroPreguntas} question`
      : `${evaluation.numeroPreguntas} questions`;

  return (
    <Container>
      <Title>Attention</Title>
      <EvaluationName>{evaluation.nombre}</EvaluationName>
      <ContainerInfo>
        <EvaluationTime>
          <FaClock /> {durationTime}
        </EvaluationTime>
        <EvaluationQuestions>
          <FaQuestion /> {numberQuestions}
        </EvaluationQuestions>
      </ContainerInfo>
      <Conditions>
        If you are completely sure to take this evaluation, click on the{' '}
        <Highlight>NEXT</Highlight> button. Otherwise, click on the{' '}
        <Highlight>CANCEL</Highlight> button, as once the evaluation has started,
        there is no possibility to go back.
      </Conditions>
      <ContainerButtons>
        <Button onClick={onStartEvaluation}>Next</Button>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </ContainerButtons>
    </Container>
  );
};

ModalStartEvaluation.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onStartEvaluation: PropTypes.func,
};

export default ModalStartEvaluation;
