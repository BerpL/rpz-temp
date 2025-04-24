/**
 *
 * SubtitleModuleAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 15px;
  color: ${({ theme: { textSubtitle } }) => textSubtitle};
  position: relative;
  display: inline-block;
  text-align: left;
  font-weight: normal;
  margin-left: 5px;
`;

function SubtitleModuleAdmin({ title }) {
  return <H2>{title}</H2>;
}

SubtitleModuleAdmin.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SubtitleModuleAdmin;
