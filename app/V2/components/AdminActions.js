import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import { MdArrowBack } from 'react-icons/md/index.esm';

const BackButton = styled.button`
  padding: 4px 8px;
  color: ${({ theme }) => theme.admin.colors.text};
  font-size: ${({ size }) => size || '14px'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => lighten(0.3, theme.admin.colors.textLight)};
  }
  svg {
    margin-top: 1px;
    margin-right: 4px;
  }
`;

function Back({ message, onClick }) {
  return (
    <BackButton onClick={onClick}>
      <MdArrowBack />
      {message}
    </BackButton>
  );
}

Back.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func,
};

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const ActionsWrapper = styled.div`
  display: flex;
`;

function Actions({ children, hasBack, backMessage, onClickBack }) {
  return (
    <Container>
      <div>
        {hasBack && <Back message={backMessage} onClick={onClickBack} />}
      </div>
      <ActionsWrapper>{children}</ActionsWrapper>
    </Container>
  );
}

Actions.propTypes = {
  children: PropTypes.any,
  hasBack: PropTypes.bool,
  backMessage: PropTypes.string,
  onClickBack: PropTypes.func,
};

export default Actions;
