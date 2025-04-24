import React from 'react';
// { useState }

import PropTypes from 'prop-types';
import { Row, Col, Con } from 'components/ContainerFlex';
import { QuestionItem } from '../QuestionItem';
import { ListAlternatives } from '../ListAlternatives';
import { Body, ContainerWrap } from './Styles';

function ChangeQuestion({
  question,
  index,
  alternatives,
  alternativeSelected,
  ...props
}) {
  let haveAnswered = false;
  if (question.tipo === 1) {
    if (alternativeSelected) {
      haveAnswered = true;
    }
  }
  if (question.tipo === 2) {
    if (alternativeSelected) {
      if (Object.keys(alternativeSelected).length > 0) {
        haveAnswered = true;
      }
    }
  }
  return (
    <Body>
      <QuestionItem
        title={question.contenido}
        urlImagen={question.urlImagen}
        index={index}
      />
      <ListAlternatives
        typeQuestion={question.tipo}
        alternatives={question.alternativas}
        idQuestion={question.idPregunta}
        haveAnswered={haveAnswered}
        step={index}
        alternativeSelected={alternativeSelected}
        {...props}
      />
    </Body>
  );
}

ChangeQuestion.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  alternatives: PropTypes.array,
};

function Question(props) {
  return (
    <ContainerWrap isActive={props.isActive}>
      <Row flexGrow="1">
        <Con
          maxWidth="1000px"
          height="100vh"
          width="100%"
          display="flex"
          flexDirection="row"
        >
          <Col flexGrow="1">
            <ChangeQuestion {...props} />
          </Col>
        </Con>
      </Row>
    </ContainerWrap>
  );
}

export default Question;
