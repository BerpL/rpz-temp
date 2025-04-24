/**
 *
 * ListAdminUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Column, Row } from 'components/List';
import ImageCircular from 'components/ImageCircular';
import ButtonAdminAction from 'components/ButtonAdminAction';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination';

const Actions = styled.div`
  button:first-child {
    margin-right: 26px;
  }
`;
function ListAdminUsers({ users, onEdit, onDelete }) {
  const {
    currentPage,
    maxPages,
    currentItems,
    hasPreviousPage,
    onPreviousPage,
    onNextPage,
    hasNextPage,
  } = usePagination({ items: users, itemsPerPage: 6 });

  const hasPagination = maxPages > 1;

  return (
    <div>
      <Header>
        {/* <Column>Image</Column> */}
        <Column flex={4}>Name</Column>
        <Column flex={1}>User</Column>
        <Column flex={1}>Group</Column>
        <Column flex={3} />
      </Header>
      {currentItems.map(item => (
        <Row key={item.idUsuario}>
          {/* <Column>
            <ImageCircular src={item.ubicacionFoto} width={32} />
          </Column> */}
          <Column flex={4}>{item.nombre}</Column>
          <Column flex={1}>{item.usuario}</Column>
          <Column flex={1}>{item.grupo.nombre}</Column>
          <Column flex={3}>
            <Actions>
              <ButtonAdminAction onClick={() => onEdit(item.idUsuario)}>
                Edit
              </ButtonAdminAction>
              <ButtonAdminAction onClick={() => onDelete(item.idUsuario)}>
                Delete
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

ListAdminUsers.propTypes = {
  users: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListAdminUsers;
