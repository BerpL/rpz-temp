/**
 *
 * CheckBox
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CBContainer from './CBContainer';
import CBHidden from './CBHidden';
import CBStyled from './CBStyled';
import CBIcon from './CBIcon';
import CBWrapper from './CBWrapper';

function CheckBox({ checked, ...props }) {
  return (
    <CBWrapper>
      <CBContainer>
        <CBHidden checked={checked} {...props} />
        <CBStyled checked={checked}>
          <CBIcon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </CBIcon>
        </CBStyled>
      </CBContainer>
      <span style={{ marginLeft: 8 }} />
    </CBWrapper>
  );
}

CheckBox.propTypes = {};

export default CheckBox;
