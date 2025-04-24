import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  width:  ${({width}) => width};
  max-width: ${({maxWidth}) => maxWidth};
  margin: auto;
  flex-direction: column;
`;

function Content({ children, maxWidth = '1100px', width = '80%' }) {
  return <Container maxWidth={maxWidth} width={width}>{children}</Container>;
}

Content.propTypes = {
  children: PropTypes.any,
};

export default Content;
