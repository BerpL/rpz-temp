/**
 *
 * Message
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cont = styled.div`
  border-radius: 5px;
  min-height: 38px;
  background: #3b3b3b;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 0 0 16px;
  margin-bottom: 15px;
  font-size: 13px;
  justify-content: space-between;
  display: flex;
  color: ${({ theme }) => theme.colors.base};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  padding: 3px;
  outline: none;
  color: ${({ color }) => color};
`;

function Message({ message, actions = [], style }) {
  return (
    <Cont style={style}>
      {message}
      <Actions>
        {actions.map(action => (
          <Button
            onClick={action.onClick}
            key={action.index}
            color={action.color}
          >
            {action.title}
          </Button>
        ))}
      </Actions>
    </Cont>
  );
}

Message.propTypes = {
  message: PropTypes.string,
  actions: PropTypes.array,
  style: PropTypes.object,
};

export default Message;
