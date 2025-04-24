/**
 *
 * QuestionItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { MdModeEdit, MdDelete } from 'react-icons/md/index.esm';
import parse from 'html-react-parser';

const Wrapper = styled.div`
  overflow: hidden;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.16);
  margin-bottom: 20px;
  border: 1px solid #cbcaca;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
`;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  transition: background 0.1s, min-height 0.3s;
  position: relative;
`;

const Body = styled.div`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.base};
  padding: 16px;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  transition: opacity 0.3s ease, padding 0.5s ease, max-height: 0.6s ease;
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  transition: all 0.5s;
  align-items: center;
  padding: 0px 16px;
  justify-content: space-between;
`;

const Title = styled.span`
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
`;

const Description = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  margin: 0;
  margin-bottom: 10px;
  p {
    margin: 0;
  }
`;

const Type = styled.span`
  color: ${({ color }) => rgba(color, 0.6)} !important;
  margin: 0;
  font-style: italic;
  font-size: 12px;
  margin-left: 5px;
`;

const TitleAlternatives = styled.span`
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => rgba(theme.colors.text, 0.4)};
  font-size: 13px;
  position: absolute;
  top: 1px;
  left: 15px;
  background: ${({ theme }) => theme.colors.base};
  padding: 0px 10px;
`;

const QuestionDivider = styled.div`
  position: relative;
  margin-bottom: 24px;
  padding-top: 12px;
  clear: both;
  border-bottom: 1px solid #d8d8d8;
`;

const AlternativesList = styled.div`
  margin-left: -26px;
  overflow: hidden;
  transition: all 0.5s;
`;

const AlternativeWrap = styled.div`
  display: inline-block;
  width: 50%;
`;

const Alternative = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  p {
    margin: 0;
  }
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 26px;
  flex-basis: 20px;
  flex-shrink: 0;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  transition: all 0.5s;
  display: flex;
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

function QuestionItem({ isCollapsed, pregunta, idx, onEdit, onDelete }) {
  return (
    <Wrapper>
      <Cont>
        <Header>
          <Left>
            <Title>
              Question {idx + 1}
              <Type color={getColorType(pregunta.nivel)}>
                ({getNameType(pregunta.nivel)})
              </Type>
            </Title>
          </Left>
          <Right isCollapsed={isCollapsed}>
            <Button onClick={() => onEdit(pregunta.id)}>
              <MdModeEdit />
              Edit
            </Button>
            <Button onClick={() => onDelete(pregunta.id)}>
              <MdDelete />
              Delete
            </Button>
          </Right>
        </Header>

        <Body>
          <Description>{parse(pregunta.contenido)}</Description>
          <QuestionDivider>
            <TitleAlternatives>Alternatives</TitleAlternatives>
          </QuestionDivider>

          <AlternativesList>
            {pregunta.alternativas.map(alternativa => (
              <AlternativeWrap key={alternativa.id}>
                <Alternative>
                  <Circle
                    color={alternativa.correcta ? '#3ce35f' : '#F14D76'}
                  />
                  {parse(alternativa.contenido)}
                </Alternative>
              </AlternativeWrap>
            ))}
          </AlternativesList>
        </Body>
      </Cont>
    </Wrapper>
  );
}

QuestionItem.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isCollapsed: PropTypes.bool,
  pregunta: PropTypes.object,
  idx: PropTypes.any,
};

export default QuestionItem;
