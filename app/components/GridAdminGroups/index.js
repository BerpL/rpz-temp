/**
 *
 * GridAdminGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CardGroupAdmin from 'components/CardGroupAdmin';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

function GridAdminGroups({ groups, onEdit, onDelete }) {
  return (
    <Container>
      {groups.map(group => (
        <CardGroupAdmin
          key={group.id}
          group={group}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Container>
  );
}

GridAdminGroups.propTypes = {
  groups: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default GridAdminGroups;
