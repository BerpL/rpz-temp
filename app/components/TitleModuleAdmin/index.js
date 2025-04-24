/**
 *
 * TitleModuleAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H1 = styled.h1.attrs(({ textAlign = 'left' }) => ({
  textAlign,
}))`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  display: inline-block;
  text-align: ${({ textAlign }) => textAlign};
  font-weight: 700;
  padding-top: 10px;
  text-transform: uppercase;
  padding-bottom: 20px;
  height: 67px;
  margin: 0;
`;

function TitleModuleAdmin({ title, textAlign }) {
  return <H1 textAlign={textAlign}>{title}</H1>;
}

TitleModuleAdmin.propTypes = {
  title: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
};

export default TitleModuleAdmin;
