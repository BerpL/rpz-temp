import React, { useEffect, useState } from 'react';
// import { FaClock, FaQuestion } from 'react-icons/fa/index.esm';
import { getUserEvaluationResult } from 'services/EvaluacionesService';
import PropTypes from 'prop-types';
import History from 'utils/history';

import {
  Title,
  Container,
  Percent,
  BarPercent,
  Bar,
  Item,
  Button,
} from './Styles';

const initialValues = {
  correctas: 0,
  incorrectas: 0,
  calificacion: 0,
};

// const getScheduledEvaluationsData = async id => {
//   try {
//     const { data } = await getQuizById(id);
//     return data.data;
//   } catch {
//     return initialValues;
//   }
// };

const ModalFinishEvaluation = ({ id }) => {
  function moveToEvaluations() {
    History.replace('/evaluations');
  }
  const [evaluationState, setEvaluationState] = useState({
    evaluation: initialValues,
    isLoading: true,
    hasError: false,
  });

  const loadDataEvaluation = async () => {
    const response = await getUserEvaluationResult(id);
    setEvaluationState(e => ({
      ...e,
      evaluation: response.data.data,
    }));
  };

  useEffect(() => {
    loadDataEvaluation();
    return () => { };
  }, []);

  const { evaluation } = evaluationState;
  // console.log(evaluation);
  return (
    <Container>
      <Title>Evaluation Result</Title>
      <Percent>{evaluation.calificacion}%</Percent>
      <Bar>
        <BarPercent width={`${evaluation.calificacion}%`} />
      </Bar>
      <Item>Correct Answers: {evaluation.correctas}</Item>
      <Item>Incorrect Answers: {evaluation.incorrectas}</Item>
      <Button onClick={moveToEvaluations}>Go to Evaluations</Button>
    </Container>
  );
};

ModalFinishEvaluation.propTypes = {
  id: PropTypes.any,
  //   onStartEvaluation: PropTypes.func,
  //   onClose: PropTypes.func,
};

export default ModalFinishEvaluation;
