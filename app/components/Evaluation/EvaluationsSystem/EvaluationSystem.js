import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdExpandLess, MdExpandMore } from 'react-icons/md/index.esm';
import {
  Button,
  ButtonsContainer,
  EvaluationSystemContainer,
  Bottom,
  QuestionsWrapper,
  QuestionsInnerWrapper,
} from './Styles';
import { ProgressBar } from '../ProgressBar';
import Question from './Question';
import Timer from '../Timer';

const noop = () => { };

function EvaluationsSystem({
  questions: questionsTmp,
  onFinishEvaluation,
  tiempo,
}) {
  const [stateQuestions, setStateQuestions] = useState({
    questions: questionsTmp,
    questionActive: 0,
    questionsCount: questionsTmp.length,
    answeredQuestions: 0,
    alternativesSelected: {},
    direction: 'next',
  });


  function handleNextQuestion() {
    if (stateQuestions.questionActive < stateQuestions.questionsCount - 1) {
      setStateQuestions(s => ({
        ...s,
        questionActive: s.questionActive + 1,
      }));
    }
  }

  function handlePrevQuestion() {
    if (stateQuestions.questionActive > 0) {
      setStateQuestions(s => ({
        ...s,
        questionActive: s.questionActive - 1,
      }));
    }
  }

  function renderNextButton() {
    let eventOnClick = handleNextQuestion;
    let cursor = 'pointer';
    if (stateQuestions.questionActive >= stateQuestions.questionsCount - 1) {
      eventOnClick = noop;
      cursor = 'default';
    }

    return (
      <Button style={{ cursor }} onClick={eventOnClick}>
        <MdExpandMore />
      </Button>
    );
  }

  function renderPrevButton() {
    let eventOnClick = handlePrevQuestion;
    let cursor = 'pointer';
    if (stateQuestions.questionActive <= 0) {
      eventOnClick = noop;
      cursor = 'default';
    }

    return (
      <Button style={{ cursor, marginRight: 5 }} onClick={eventOnClick}>
        <MdExpandLess />
      </Button>
    );
  }

  const {
    questionActive,
    alternativesSelected,
    questions,
    questionsCount,
  } = stateQuestions;

  function handleChangeAlternative(idAlternative, questionId, typeQuestion) {
    if (typeQuestion === 1) {
      if (alternativesSelected[questionId] === idAlternative) {
        delete alternativesSelected[questionId];
      } else {
        alternativesSelected[questionId] = idAlternative;
      }
    }
    if (typeQuestion === 2) {
      if (!alternativesSelected[questionId]) {
        alternativesSelected[questionId] = {};
      }
      if (alternativesSelected[questionId][idAlternative]) {
        delete alternativesSelected[questionId][idAlternative];
      } else {
        alternativesSelected[questionId][idAlternative] = idAlternative;
      }
      if (alternativesSelected[questionId]) {
        if (Object.keys(alternativesSelected[questionId]).length <= 0) {
          delete alternativesSelected[questionId];
        }
      }
    }
    setStateQuestions(s => ({
      ...s,
      answeredQuestions: Object.keys(s.alternativesSelected).length,
    }));
  }

  const percentageAnswered = `${(stateQuestions.answeredQuestions * 100) /
    questionsCount}%`;

  function handleFinishEvaluation() {
    onFinishEvaluation(alternativesSelected);
  }

  return (
    <EvaluationSystemContainer>
      <Timer
        minutes={parseInt(tiempo, 0)}
        onFinishTimer={handleFinishEvaluation}
      />
      <QuestionsWrapper>
        <QuestionsInnerWrapper
          style={{ transform: `translate(0,${-questionActive * 100}vh)` }}
        >
          {questions.map((q, idx) => (
            <Question
              key={q.idPregunta}
              question={q}
              index={idx}
              questionId={q.idPregunta}
              onFinishEvaluation={handleFinishEvaluation}
              isActive={questionActive === idx}
              questionsCount={questionsCount}
              alternativeSelected={alternativesSelected[q.idPregunta]}
              onChangeAlternative={handleChangeAlternative}
              onMoveNextQuestion={handleNextQuestion}
            />
          ))}
        </QuestionsInnerWrapper>
      </QuestionsWrapper>
      <Bottom>
        <ButtonsContainer>
          <ProgressBar progress={percentageAnswered} />
          {renderPrevButton()}
          {renderNextButton()}
        </ButtonsContainer>
      </Bottom>
    </EvaluationSystemContainer>
  );
}

EvaluationsSystem.propTypes = {
  questions: PropTypes.array,
  onFinishEvaluation: PropTypes.func,
};

export default EvaluationsSystem;
