import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToolBar = styled.div`
  display: flex;
  position: absolute;
  padding: 2px 5px;
  align-items: center;
  bottom: 97%;
  left: 30px;
  font-size: 20px;
  z-index: 1;
  border-radius: 4px 4px 0 0;
  background: ${({ theme }) => theme.colors.base};
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.05);
  color: #393a68;
  border: 1px solid #e0e0e0;
  border-bottom: none;
`;

const FormatToolbar = props => <ToolBar>{props.children}</ToolBar>;

FormatToolbar.propTypes = {
  children: PropTypes.any,
};

export default FormatToolbar;
