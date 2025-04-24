import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  @media (max-width: 577px) {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
  }
`;

function Content({ children }) {
  return <Container>{children}</Container>;
}

Content.propTypes = {
  children: PropTypes.any,
};

export default Content;
