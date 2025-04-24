/**
 *
 * GroupInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import Textarea from './Textarea';
import Label from './Label';

const Container = styled.div`
  height: 100%;
  margin-bottom: 13px;
`;

function GroupInput({ labelText, style, ...props }) {
  return (
    <Container style={style}>
      <Label>{labelText}</Label>
      <Textarea {...props} />
    </Container>
  );
}

GroupInput.propTypes = {
  labelText: PropTypes.string,
  style: PropTypes.object,
};

export default GroupInput;
