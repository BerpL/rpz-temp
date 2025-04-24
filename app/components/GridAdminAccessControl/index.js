/**
 *
 * GridAdminAccessControl
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardAccessControlAdmin from 'components/CardAccessControlAdmin';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

function GridAdminAccessControl({ accesses, onView }) {
  return (
    <Container>
      {accesses.map(group => (
        <CardAccessControlAdmin key={group.id} access={group} onView={onView} />
      ))}
    </Container>
  );
}

GridAdminAccessControl.propTypes = {
  accesses: PropTypes.array,
  onView: PropTypes.func,
};

export default GridAdminAccessControl;
