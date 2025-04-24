/**
 *
 * ItemGroup
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from 'react-icons/io/index.esm';
import { rgba } from 'polished';
import { MdDelete } from 'react-icons/md/index.esm';
import DropDownButton from 'components/DropDownButton';
import {
  modifyAdvancedQuestions,
  modifyIntermediateQuestions,
  modifyBasicQuestions,
  addFixedQuestion,
  removeFixedQuestion,
} from 'services/DetalleEvaluacionesService';
import QuestionItem from './ItemQuestion';

const Container = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Header = styled.div`
  font-size: 14px;
  height: 62px;
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
  flex-shrink: 0;
  user-select: none;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  justify-content: space-between;
  svg {
    margin-right: 20px;
  }
`;

const ContainerQuestions = styled.div`
  width: 100%;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '10000px' : '0px')};
  transition: max-height 0.3s ease;
`;

const Button = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
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
`;

const Left = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
`;

const Right = styled.div`
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  transition: all 0.5s;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  button {
    svg {
      margin-right: 5px;
    }
  }
  button:last-child {
    margin-right: 0;
    svg {
      margin-right: 0;
    }
  }
`;

function ItemGroup({ group, onDelete }) {
  const [isOpen, setOpen] = useState(true);
  const questions =
    (group.areaConocimiento && group.areaConocimiento.preguntas) || [];

  const basicNumberQuestions =
    questions && questions.filter(q => q.nivel == 1).length;
  const intermediateNumberQuestions =
    questions && questions.filter(q => q.nivel == 2).length;
  const advancedNumberQuestions =
    questions && questions.filter(q => q.nivel == 3).length;

  const handleChangeI = async (name, valueItem) => {
    const bodyFormData = new FormData();
    bodyFormData.set('nIntermediate', valueItem);
    try {
      await modifyIntermediateQuestions(group.id, bodyFormData);

      return true;
    } catch {
      return false;
    }
  };

  const handleChangeA = async (name, valueItem) => {
    const bodyFormData = new FormData();
    bodyFormData.set('nAvanzadas', valueItem);
    try {
      await modifyAdvancedQuestions(group.id, bodyFormData);

      return true;
    } catch {
      return false;
    }
  };

  const handleChangeB = async (name, valueItem) => {
    const bodyFormData = new FormData();
    bodyFormData.set('nBasic', valueItem);
    try {
      await modifyBasicQuestions(group.id, bodyFormData);

      return true;
    } catch {
      return false;
    }
  };

  const handleChangeQuestionState = async (checked, idQuestion) => {
    const bodyFormData = new FormData();
    bodyFormData.set('idPregunta', idQuestion);
    try {
      if (checked) {
        await addFixedQuestion(group.id, bodyFormData);
      } else {
        await removeFixedQuestion(group.id, idQuestion);
      }

      return true;
    } catch {
      return false;
    }
  };

  return (
    <Container>
      <Header>
        <Left onClick={() => setOpen(!isOpen)}>
          <IoIosArrowDown />
          {group.areaConocimiento.nombre}
        </Left>
        <Right>
          <DropDownButton
            mode="list-number-generated"
            name="basics"
            canRestrictionChange
            value={group.numeroBasicas || 0}
            numberList={basicNumberQuestions}
            onChange={handleChangeB}
          />
          <DropDownButton
            canRestrictionChange
            mode="list-number-generated"
            numberList={intermediateNumberQuestions}
            name="intermediate"
            value={group.numeroIntermedias || 0}
            onChange={handleChangeI}
          />
          <DropDownButton
            canRestrictionChange
            mode="list-number-generated"
            name="advanced"
            value={group.numeroAvanzadas}
            onChange={handleChangeA}
            numberList={advancedNumberQuestions || 0}
          />
          <Button onClick={() => onDelete(group.id)}>
            <MdDelete />
          </Button>
        </Right>
      </Header>
      <ContainerQuestions key={2} isOpen={isOpen}>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onChange={handleChangeQuestionState}
          />
        ))}
      </ContainerQuestions>
    </Container>
  );
}

ItemGroup.propTypes = {
  group: PropTypes.object,
  onDelete: PropTypes.func,
};

export default ItemGroup;
