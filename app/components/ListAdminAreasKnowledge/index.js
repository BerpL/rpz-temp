/**
 *
 * ListAreasKnowledge
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Header, Column, Row, Text } from 'components/List';
// import ReactHtmlParser from 'react-html-parser';
import parse from 'html-react-parser';
import QuestionTypes from 'utils/QuestionTypes';
import { ContainerFlex, Row as R, Col } from 'components/ContainerFlex';
import Scrollbar from 'react-scrollbars-custom';
import 'react-custom-scroll/dist/reactCustomScroll';

function ListAreasKnowledge({ onOpen, questions }) {
  return (
    <ContainerFlex>
      <R flexGrow="1" height="100%">
        <Col width="100%" overflow="auto" height="100%" padding="0">
          <Scrollbar disableTrackXMousewheelScrolling>
            <div style={{ padding: '0 26px 0 26px' }}>
              <Header>
                <Column flex={1}>N°</Column>
                <Column flex={15}>Pregunta</Column>
                <Column flex={3}>Nivel</Column>
              </Header>
              {questions.map((item, index) => (
                <Row
                  key={item.idPregunta}
                  onDoubleClick={() => onOpen(item.type, item.id)}
                >
                  <Column flex={1}>
                    <Text>{index + 1}</Text>
                  </Column>
                  <Column flex={15}>
                    <Text>{parse(item.contenido)}</Text>
                  </Column>
                  <Column flex={3}>
                    <Text>{QuestionTypes[item.nivel]}</Text>
                  </Column>
                </Row>
              ))}
            </div>
          </Scrollbar>
        </Col>
      </R>
    </ContainerFlex>
  );
}

ListAreasKnowledge.propTypes = {
  questions: PropTypes.array,
  onOpen: PropTypes.func,
};

export default ListAreasKnowledge;
