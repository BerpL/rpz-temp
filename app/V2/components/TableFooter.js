/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa/index.esm';

const Footer = styled.div`
  font-size: 14px;
  padding: 4px 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.admin.colors.textLight};
`;

const Span = styled.span`
  line-height: 14px;
`;
const Button = styled.button`
  padding: 0;
  cursor: pointer;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 14px;
    /* vertical-align: baseline; */
    color: ${({ theme }) => theme.admin.colors.textLight};
  }
`;
const Pagination = styled.div`
  display: flex;
`;

function TableHeader({ count = [], pagination }) {
  return (
    <Footer>
      <Span>{`Total ${count}`}</Span>
      <Pagination>
        <Span>{`${pagination.currentPage}/${pagination.maxPages}`}</Span>
        <Button onClick={pagination.onPreviousPage}>
          <FaAngleLeft />
        </Button>
        <Button onClick={pagination.onNextPage}>
          <FaAngleRight />
        </Button>
      </Pagination>
    </Footer>
  );
}

TableHeader.propTypes = {
  count: PropTypes.number,
  pagination: PropTypes.object,
};

export default TableHeader;
