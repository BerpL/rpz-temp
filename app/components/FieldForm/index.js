/**
 *
 * FieldForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Field } from 'redux-form/immutable';

function FieldForm(props) {
  const { component: Component } = props;
  return <Component />;
}

FieldForm.propTypes = {
  component: PropTypes.any,
};

export default FieldForm;
