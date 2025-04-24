/**
 *
 * ItalicMark
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ItalicMark(props) {
  return <em {...props.attributes}>{props.children}</em>;
}

ItalicMark.propTypes = {
  children: PropTypes.any,
};

export default ItalicMark;
