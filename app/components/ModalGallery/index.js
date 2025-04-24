/**
 *
 * Modal
 *
 */

import React from 'react';
import ModalPlugin from 'react-responsive-modal';
import { withTheme } from 'styled-components';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const styles = {
  closeButton: {
    cursor: 'pointer',
    outline: 'none',
    color: '#fff',
    padding: '10px',
    right: '40px',
    fontSize: '50px',
    background: 'rgb(0,39,118)',
    transform: 'translateX(50%)', 
    position: 'fixed',
    borderRadius: '10px'
  },
  modal: {
    width: '90%',
    background: 'transparent',
    padding: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  },
};

function Modal(props) {
  return <ModalPlugin {...props} closeIconSize={30} styles={styles} />;
}

Modal.propTypes = {};

export default withTheme(Modal);
