/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  width: 80%;
  max-width: 1100px;
  margin: auto;
  gap: 10px;

  /* Screen larger than 600px? 2 column */
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  /* Screen larger than 900px? 3 columns */
  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function GridLayout({ children }) {
  return <Grid>{children}</Grid>;
}

export default GridLayout;
