/**
 *
 * LoaderForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const LoaderContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { bgU } }) => bgU};
`;
function LoaderForm() {
  return (
    <LoaderContainer>
      <Loader type="ThreeDots" height={40} width={40} />
    </LoaderContainer>
  );
}

LoaderForm.propTypes = {};

export default LoaderForm;
