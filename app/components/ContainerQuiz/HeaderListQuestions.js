/**
 *
 * HeaderListQuestions
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba, lighten } from 'polished';
import Button from 'components/Button';
import { IoIosAddCircle } from 'react-icons/io/index.esm';

const Container = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
`;

const Title = styled.div`
  font-size: 18px;
  padding-left: 16px;
`;

const ButtonAddQuestions = styled(Button)`
  display: inline-block;
  width: auto;
  padding: 0 16px;
  border-bottom: 5px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => lighten('0.1', theme.colors.primary)};
  transition: all 0.2s ease;
  &:hover {
    background: ${({ theme }) => lighten('0.1', theme.colors.primary)};
    border-bottom: 0px solid transparent;
  }
`;

function HeaderListQuestions({ onClickAdd }) {
  return (
    <Container>
      <Title>Questions</Title>
      <ButtonAddQuestions onClick={onClickAdd}>
        <IoIosAddCircle />
        Add Questions
      </ButtonAddQuestions>
    </Container>
  );
}

HeaderListQuestions.propTypes = {
  onClickAdd: PropTypes.func,
};

export default HeaderListQuestions;
