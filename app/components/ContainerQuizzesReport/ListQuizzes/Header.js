import React from 'react';

import { HeaderRow, CellRow } from './Styles';

const Header = () => (
  <HeaderRow>
    <CellRow>Assessment Name</CellRow>
    <CellRow flexBasis="130px" flexShrink="0">
      Date
    </CellRow>
    <CellRow flexBasis="150px" flexShrink="0">
      Average Score (%)
    </CellRow>
    <CellRow flexBasis="120px" flexShrink="0">
      Number of Questions
    </CellRow>
  </HeaderRow>
);

export default Header;
