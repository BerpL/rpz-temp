/**
 *
 * BoldMark
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function BoldMark(props) {
  return <strong {...props.attributes}>{props.children}</strong>;
}

BoldMark.propTypes = {
  children: PropTypes.any,
};

export default BoldMark;
