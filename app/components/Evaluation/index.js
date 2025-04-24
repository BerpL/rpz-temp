/**
 *
 * Evaluation
 *
 */

import React, { useState, useEffect } from 'react';
import {
  generateEvaluation,
  saveUserEvaluation,
} from 'services/EvaluacionesService';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader';
import Modal from 'components/ModalDark';
import { ContainerFlex, ContainerLoader, TextInformative } from './Styles';
import { EvaluationsSystem } from './EvaluationsSystem';
import { ModalFinishEvaluation } from './ModalFinishEvaluation';

const getGeneratedEvaluation = async id => {
  try {
    const { data } = await generateEvaluation(id);

    return data;
  } catch {
    return [];
  }
};

function Evaluation({ match }) {
  const { id } = match.params;

  const [modalFinishEvaluation, setModalFinishEvaluation] = useState({
    isOpen: false,
  });

  const [questionsState, setQuestionsState] = useState({
    questions: [],
    idUserEvaluation: -1,
    isLoading: true,
    hasError: false,
    tiempo: 0,
    message: null,
  });

  const loadQuestionsEvaluations = async () => {
    const response = await getGeneratedEvaluation(id);

    const data = response.data || {};

    setTimeout(() => {
      setQuestionsState(e => ({
        ...e,
        questions: data.preguntas || [],
        message: response.message,
        tiempo: data.tiempo,
        idUserEvaluation: data.idEvaluacionUsuario || -1,
        isLoading: false,
      }));
    }, 1000);
  };

  useEffect(() => {
    loadQuestionsEvaluations();
  }, []);

  useEffect(() => {}, []);

  const { questions } = questionsState;

  const hasRender =
    questions && questions.length > 0 && !questionsState.isLoading;

  const hasMessage = !hasRender && questionsState.message;

  const handleFinishEvaluation = async answersUnformatted => {
    const answers = [];
    Object.keys(answersUnformatted).forEach(key => {
      if (answersUnformatted[key] instanceof Object) {
        Object.keys(answersUnformatted[key]).forEach(keyChild => {
          const answer = {
            idPregunta: key,
            idAlternativa: answersUnformatted[key][keyChild],
            idEvaluacionUsuario: questionsState.idUserEvaluation,
          };
          answers.push(answer);
        });
      } else {
        const answer = {
          idPregunta: key,
          idAlternativa: answersUnformatted[key],
          idEvaluacionUsuario: questionsState.idUserEvaluation,
        };
        answers.push(answer);
      }
    });

    await saveUserEvaluation(id, answers);

    // console.log(response);

    setModalFinishEvaluation(m => ({
      ...m,
      isOpen: true,
    }));
  };

  function renderEvaluationSystem() {
    return (
      hasRender && (
        <EvaluationsSystem
          tiempo={questionsState.tiempo}
          questions={questions}
          onFinishEvaluation={handleFinishEvaluation}
        />
      )
    );
  }

  function renderLoader() {
    return (
      questionsState.isLoading && (
        <ContainerLoader>
          <Loader />
        </ContainerLoader>
      )
    );
  }

  function renderMessage() {
    return (
      hasMessage && (
        <ContainerLoader>
          <TextInformative>{questionsState.message}</TextInformative>
        </ContainerLoader>
      )
    );
  }

  return (
    <ContainerFlex>
      {renderEvaluationSystem()}
      {renderLoader()}
      {renderMessage()}

      <Modal
        open={modalFinishEvaluation.isOpen}
        onClose={() => {}}
        showCloseIcon={false}
      >
        <ModalFinishEvaluation id={questionsState.idUserEvaluation} />
      </Modal>
    </ContainerFlex>
  );
}

Evaluation.propTypes = {
  match: PropTypes.object,
};

export default Evaluation;
