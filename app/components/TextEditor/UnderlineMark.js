/**
 *
 * UnderlineMark
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function UnderlineMark(props) {
  return <u {...props.attributes}>{props.children}</u>;
}

UnderlineMark.propTypes = {
  children: PropTypes.any,
};

export default UnderlineMark;
