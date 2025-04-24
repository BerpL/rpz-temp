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

function Modal(props) {
  const {
    theme: { secondary, textBold },
    bg,
  } = props;

  return (
    <ModalPlugin
      {...props}
      closeIconSize={20}
      styles={{
        closeButton: { cursor: 'pointer', outline: 'none', color: textBold },
        modal: {
          maxWidth: '100%',
          background: 'white' || secondary,
          padding: props.padding || '32px 0px',
          borderRadius: '10px',
          overflow: props.overflow || 'hidden',
        },
        overlay: {
          padding: 0,
        },
      }}
    />
  );
}

Modal.propTypes = {};

export default withTheme(Modal);
