/**
 *
 * ItemQuiz
 *
 */

import React from 'react';
import styled from 'styled-components';
import { rgba, lighten } from 'polished';
import Button from 'components/Button';
import DropDownButton from 'components/DropDownButton';
import PropTypes from 'prop-types';
// import { MdAccessTime } from 'react-icons/md/index.esm';
// import ContainerInline from 'components/ContainerInline';

const ButtonAssign = styled(Button)`
  display: inline-block;
  width: auto;
  padding: 0 16px;
  background: ${({ theme }) => lighten('0.38', theme.colors.primary)};
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease;
  &:hover {
    background: ${({ theme }) => lighten('0.4', theme.colors.primary)};
  }
`;

const Container = styled.div`
  background-color: #fff;
  padding: 16px;
  border-bottom: 1px solid #dedede;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
`;
const Title = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.75)};
  font-size: 16px;
  font-weight: 500;
`;

const Item = styled.div`
  display: flex;
  padding: 16px 0;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => rgba(theme.colors.text, 0.1)};
  &:last-child {
    border-bottom: none;
  }
`;

const Info = styled.div``;

const Name = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.9)};
  font-size: 15px;
  font-weight: 700;
`;

const Description = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.65)};
  font-size: 13px;
`;

const Dp = styled(DropDownButton)`
  flex-shrink: 0;
  .button {
    margin: 0;
  }
`;

function ItemQuiz({ openAssignEvaluation, onChangeIntents, intents = 0 }) {
  return (
    <Container>
      <Title>Preferences</Title>
      <Item>
        <Info>
          <Name>Assign this evaluation</Name>
          <Description>
            Automatically notify your students when you assign them a
            assessment.
          </Description>
        </Info>
        <ButtonAssign onClick={openAssignEvaluation}>Assign</ButtonAssign>
      </Item>
      <Item>
        <Info>
          <Name>Student attempts</Name>
          <Description>
            How many times can students take this test?
          </Description>
        </Info>
        <Dp
          canRestrictionChange
          mode="list-numbers"
          numberList={7}
          value={intents}
          onChange={onChangeIntents}
        />
      </Item>
    </Container>
  );
}

ItemQuiz.propTypes = {
  openAssignEvaluation: PropTypes.func,
  onChangeIntents: PropTypes.func,
  intents: PropTypes.number,
};

export default ItemQuiz;
