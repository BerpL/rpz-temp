import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck } from 'react-icons/md/index.esm';
import { AlternativeContainer, Button, NextContainer } from './Styles';
import AlternativeItem from './AlternativeItem';

function ListAlternatives({
  alternatives,
  onChangeAlternative,
  alternativeSelected,
  typeQuestion,
  onMoveNextQuestion,
  haveAnswered,
  questionsCount,
  step,
  onFinishEvaluation,
  ...props
}) {
  return (
    <>
      <AlternativeContainer>
        {alternatives.map((alt, idx) => (
          <AlternativeItem
            key={alt.idAlternativa}
            index={idx}
            {...props}
            typeQuestion={typeQuestion}
            alternativeSelected={alternativeSelected}
            onChangeAlternative={onChangeAlternative}
            alternative={alt}
          />
        ))}
      </AlternativeContainer>
      <div style={{ marginLeft: 60 }}>
        {haveAnswered && (
          <NextContainer>
            {questionsCount - 1 !== step ? (
              <Button onClick={onMoveNextQuestion}>
                Ok <MdCheck />
              </Button>
            ) : (
              <Button style={{ width: 140 }} onClick={onFinishEvaluation}>
                Finish <MdCheck />
              </Button>
            )}
          </NextContainer>
        )}
      </div>
    </>
  );
}

ListAlternatives.propTypes = {
  alternatives: PropTypes.array,
  onChangeAlternative: PropTypes.func,
  alternativeSelected: PropTypes.any,
  typeQuestion: PropTypes.number,
  haveAnswered: PropTypes.bool,
  onMoveNextQuestion: PropTypes.func,
  questionsCount: PropTypes.number,
  step: PropTypes.number,
  onFinishEvaluation: PropTypes.func,
};

export default ListAlternatives;
