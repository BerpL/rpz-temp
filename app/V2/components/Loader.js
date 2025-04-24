import React from 'react';
import styled from 'styled-components';
import LoaderAnimation from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color || 'rgba(0, 0, 0, 0.4)'};
`;

function Loader({ color }) {
  return (
    <Container color={color}>
      <LoaderAnimation type="ThreeDots" height={30} width={30} />
    </Container>
  );
}

Loader.propTypes = {
  color: PropTypes.string,
};

export default Loader;
