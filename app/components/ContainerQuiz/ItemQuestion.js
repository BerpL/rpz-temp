/**
 *
 * Question
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';
import parse from 'html-react-parser';

import Check from './Check';

const Item = styled.div`
  padding: 10px 16px;
  font-size: 15px;
  display: flex;
  align-items: flex-start;
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  &:last-child {
    padding-bottom: 16px;
  }

  span {
    display: flex;
    align-items: center;
  }
  span p {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: auto;
  }
`;

const Type = styled.span`
  color: ${({ color }) => rgba(color, 0.6)} !important;
  margin: 0;
  font-style: italic;
  font-size: 12px;
  margin-left: 5px;
`;

const getColorType = type => {
  switch (type) {
    case 1:
      return '#3ce35f';
    case 2:
      return '#F19A4D';
    case 3:
      return '#F14D76';
    default:
      return '';
  }
};

const getNameType = type => {
  switch (type) {
    case 1:
      return 'Basic';
    case 2:
      return 'Intermediate';
    case 3:
      return 'Advanced';
    default:
      return '';
  }
};

function Question({ question, onChange }) {
  const [checked, setChecked] = useState(question.estaFijada);

  const handleChange = async () => {
    const canChange = await onChange(!checked, question.id);

    if (canChange) setChecked(!checked);
  };

  return (
    <Item key={question.id}>
      <Check
        name={question.id.toString()}
        checked={checked}
        onChange={handleChange}
      />
      <span>
        {parse(question.contenido)}
        <Type color={getColorType(question.nivel)}>
          ({getNameType(question.nivel)})
        </Type>
      </span>
    </Item>
  );
}

Question.propTypes = {
  question: PropTypes.object,
};

export default Question;
