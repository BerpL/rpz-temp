/**
 *
 * LoaderForm
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    padding: 20px;
    color: #cccccc;
  }

  button {
    padding: 12px 16px;
    color: #cccccc;
    border: 1px solid #cccccc;
    cursor: pointer;
  }
`;
function Message({
  message,
  color,
  buttonHandler = null,
  buttonMessage = 'Recargar',
}) {
  return (
    <Container>
      <p style={{ color }}>{message}</p>
      {buttonHandler && (
        // eslint-disable-next-line react/button-has-type
        <button onClick={buttonHandler}>{buttonMessage}</button>
      )}
    </Container>
  );
}

Message.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
  buttonHandler: PropTypes.func,
  buttonMessage: PropTypes.string,
};

export default Message;
