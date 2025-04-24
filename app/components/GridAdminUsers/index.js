/**
 *
 * GridAdminUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CardUserAdmin from 'components/CardUserAdmin';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

function GridAdminUsers({ users, onEdit, onDelete }) {
  return (
    <Container>
      {users.map(user => (
        <CardUserAdmin
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Container>
  );
}

GridAdminUsers.propTypes = {
  users: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default GridAdminUsers;
