/**
 *
 * ListAdminAccessControlDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Header, Column, Row } from 'components/List';

import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination';

function ListAdminAccessControlDetail({ accessControlDetail }) {
  const {
    currentPage,
    maxPages,
    currentItems,
    hasPreviousPage,
    onPreviousPage,
    onNextPage,
    hasNextPage,
  } = usePagination({ items: accessControlDetail, itemsPerPage: 6 });
  const hasPagination = maxPages > 1;
  return (
    <div>
      <Header>
      <Column>Entry Date</Column>
      <Column>Session Time (HH:MM)</Column>
      <Column>Training Time (HH:MM)</Column>
      </Header>
      {currentItems.map(item => (
        <Row key={item.id}>
          <Column>{item.fechaIngreso}</Column>
          <Column>{item.tiempoSesion}</Column>
          <Column>{item.tiempoEntrenamiento}</Column>
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

ListAdminAccessControlDetail.propTypes = {
  accessControlDetail: PropTypes.array,
};

export default ListAdminAccessControlDetail;
