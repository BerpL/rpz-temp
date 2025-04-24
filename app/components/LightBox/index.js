/**
 *
 * LightBox
 *
 */

import React from 'react';
import ModalPlugin from 'react-responsive-modal';
import { withTheme } from 'styled-components';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function LightBox(props) {
  const {
    theme: { base },
  } = props;
  return (
    <ModalPlugin
      {...props}
      closeIconSize={20}
      styles={{
        closeButton: {
          cursor: 'pointer',
          outline: 'none',
          color: base,
          padding: '30px 30px 0px 0px',
          position: 'fixed',
          top: 0,
          right: 0,
        },
        modal: {
          position: 'unset',
          maxWidth: '50%',
          padding: '0px',
          background: 'transparent',
        },
        overlay: {
          padding: 0,
        },
      }}
    />
  );
}

LightBox.propTypes = {};

export default withTheme(LightBox);
