/**
 *
 * ItemQuiz
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdAccessTime, MdDelete, MdEdit } from 'react-icons/md/index.esm';
import { rgba } from 'polished';
import { convertStringToDate, getTimeBetweenDates } from 'utils/DateUtils';
// import ContainerInline from 'components/ContainerInline';

const Container = styled.div`
  background-color: #fff;
  padding: 16px;
  border-bottom: 1px solid #dedede;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

// const Square = styled.div`
//   background-color: ${({ color }) => color};
//   height: 88px;
//   flex-basis: 88px;
//   flex-shrink: 0;
//   width: 88px;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 45px;
//   color: ${({ theme }) => theme.colors.base};
// `;

const Name = styled.div`
  color: #393a68;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 14px;
  cursor: pointer;
  width: 50%;
  min-height: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const Answers = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #6b7c93;
  cursor: pointer;
  padding-left: 5px;
`;

const Info = styled.div`
  flex-grow: 1;
  padding: 0 85px 0 16px;
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

const CreatedAt = styled.div`
  font-size: 12px;
  border-radius: 2px;
  color: #6b7c93;
  float: left;
  line-height: 1.2em;
  margin-top: 4px;
`;

const Actions = styled.div`
  padding: 10px 16px;
  display: flex;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  top: 0;
  button:first-child {
    margin-right: 5px;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  cursor: pointer;
  padding: 3px;
  outline: none;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.base};
  border: 1px solid ${({ theme }) => rgba(theme.colors.text, 0.2)};
  color: ${({ theme }) => rgba(theme.colors.text, 0.9)};
  height: 30px;
  svg {
    font-size: 16px;
  }
  span {
    margin-left: 5px;
  }
`;

function ItemQuiz({ quiz, idx, onClick, onDelete, onEdit }) {
  const fechaCreacion = convertStringToDate(quiz.fechaCreacion);
  const fechaActual = new Date(Date.now());

  const numeroPreguntas =
    quiz.numeroPreguntas == null ? 0 : quiz.numeroPreguntas;

  const stringQuestions = numeroPreguntas === 1 ? 'question' : 'questions';

  return (
    <Container>
      <Actions>
        <Button onClick={() => onEdit(quiz.id)}>
          <MdEdit />
        </Button>
        <Button onClick={() => onDelete(quiz.id)}>
          <MdDelete />
        </Button>
      </Actions>
      {/* <Square color="#848586">{idx}</Square> */}
      <Info>
        <Name onClick={() => onClick(quiz)}>
          {quiz.nombre}
          <Answers>
            ({numeroPreguntas} {stringQuestions})
          </Answers>
        </Name>
        <Duration>
          <MdAccessTime /> {quiz.duracion} minutes
        </Duration>
        <CreatedAt>
          Created {getTimeBetweenDates(fechaCreacion, fechaActual)} ago
        </CreatedAt>
      </Info>
    </Container>
  );
}

ItemQuiz.propTypes = {
  quiz: PropTypes.object,
  idx: PropTypes.number,
  onClick: PropTypes.func,
};

export default ItemQuiz;
