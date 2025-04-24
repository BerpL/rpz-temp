/**
 *
 * ListAdminGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Column, Row, Text } from 'components/List';
import ButtonAdminAction from 'components/ButtonAdminAction';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination';

const Actions = styled.div`
  button:first-child {
    margin-right: 26px;
  }

  button:nth-child(2) {
    margin-right: 26px;
  }
`;

function ListAdminGroups({ groups, onEdit, onDelete, onEditAccess }) {
  const {
    currentPage,
    maxPages,
    currentItems,
    hasPreviousPage,
    onPreviousPage,
    onNextPage,
    hasNextPage,
  } = usePagination({ items: groups, itemsPerPage: 6 });

  const hasPagination = maxPages > 1;

  return (
    <div>
      <Header>
        <Column>Name</Column>
        <Column flex={3}>Description</Column>
        <Column flex={2} />
      </Header>
      {currentItems.map(item => (
        <Row key={item.idGrupo}>
          <Column>
            <Text>{item.nombre}</Text>
          </Column>
          <Column flex={3}>
            <Text>{item.descripcion}</Text>
          </Column>
          <Column flex={2}>
            <Actions>
              <ButtonAdminAction onClick={() => onEdit(item.idGrupo)}>
                Edit
              </ButtonAdminAction>
              <ButtonAdminAction onClick={() => onDelete(item.idGrupo)}>
                Delete
              </ButtonAdminAction>
              <ButtonAdminAction onClick={() => onEditAccess(item.idGrupo)}>
                Access
              </ButtonAdminAction>
            </Actions>
          </Column>
        </Row>
      ))}

      {hasPagination && (
        <Pagination
          hasPrevPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          current={currentPage}
          prev={onPreviousPage}
          next={onNextPage}
          max={maxPages}
        />
      )}
    </div>
  );
}

ListAdminGroups.propTypes = {
  groups: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onEditAccess: PropTypes.func,
};

export default ListAdminGroups;
