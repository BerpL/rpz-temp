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

const Modal = ({ theme, width, height, ...props }) => (
  <ModalPlugin
    {...props}
    closeIconSize={20}
    styles={{
      closeButton: {
        cursor: 'pointer',
        outline: 'none',
        color: "#c60c30",
      },
      closeIcon: {
        width: 30,
        height: 30,
      },
      modal: {
        height: height || "inherit",
        maxWidth: '100%',
        background: '#ffffff',
        padding: '0px',
        overflow: props.overflow || 'hidden',
        width: width || "inherit",
      },
      overlay: {
        padding: 0,
      },
    }}
  />
);

Modal.propTypes = {};

export default withTheme(Modal);
