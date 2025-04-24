/**
 *
 * EmptyListView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import questionList from './questionsList.png';

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  user-select: none;
`;

const InnerContainer = styled.div`
  margin: auto;
  max-width: 350px;
  img {
    margin: 0px 25px;
    max-width: 300px;
  }
`;
const SubMessage = styled.div`
  font-size: 16px;
  text-align: center;
  width: 100%;
  display: block;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
`;

const Message = styled.div`
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
`;

const Remark = styled.span`
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  background: ${({ theme }) => rgba(theme.colors.primary, 0.2)};
`;

const getImage = imgTag => {
  switch (imgTag) {
    case 'questionsList': {
      return questionList;
    }
    default:
      return '';
  }
};

function EmptyListView({ imgTag, message, subMessage, remark }) {
  return (
    <Container>
      <InnerContainer>
        <img src={getImage(imgTag)} alt="" />
        <Message>{message}</Message>
        <SubMessage>
          {subMessage} {remark && <Remark>{remark}</Remark>}
        </SubMessage>
      </InnerContainer>
    </Container>
  );
}

EmptyListView.propTypes = {
  imgTag: PropTypes.string,
  message: PropTypes.string,
  subMessage: PropTypes.string,
  remark: PropTypes.string,
};

export default EmptyListView;
