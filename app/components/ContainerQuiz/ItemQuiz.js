/**
 *
 * ItemQuiz
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdAccessTime } from 'react-icons/md/index.esm';
import { rgba } from 'polished';
// import ContainerInline from 'components/ContainerInline';

const Container = styled.div`
  background-color: #fff;
  padding: 55px;
  border-bottom: 1px solid #dedede;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Square = styled.div`
  background-color: ${({ color }) => color};
  height: 88px;
  flex-basis: 88px;
  flex-shrink: 0;
  width: 88px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  color: ${({ theme }) => theme.colors.base};
`;

const Name = styled.div`
  color: #393a68;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
  width: 100%;
`;

const Answers = styled.span`
  font-size: 13px;
  font-weight: 400;
  padding-bottom: 6px;
  color: #6b7c93;
`;

const Info = styled.div`
  flex-grow: 1;
  padding: 0 16px;
`;

const Duration = styled.div`
  color: #6b7c93;
  width: 100%;
  font-size: 12px;
  padding-bottom: 10px;
  svg {
    font-size: 16px;
  }
`;

const Description = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  width: 100%;
  font-size: 15px;
  padding-bottom: 10px;
`;

function ItemQuiz({ quiz }) {
  const numeroPreguntas =
    quiz.numeroPreguntas == null ? 0 : quiz.numeroPreguntas;

  const stringQuestions = numeroPreguntas === 1 ? 'question' : 'questions';

  return (
    <Container>
      {/* <Square color={quiz.color}>Q</Square> */}
      <Info>
        <Name>
          {quiz.nombre}
          <Answers>
            ( {numeroPreguntas} {stringQuestions} )
          </Answers>
        </Name>

        <Duration>
          <MdAccessTime /> {quiz.duracion} minutes
        </Duration>
        <Description>{quiz.descripcion}</Description>
      </Info>
    </Container>
  );
}

ItemQuiz.propTypes = {
  quiz: PropTypes.object,
};

export default ItemQuiz;
